import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Cf7Form as Cf7FormDef } from '@/content/types';

/**
 * Renders a Contact Form 7 form definition (pulled into content/site.json) and submits it to the
 * CF7 REST endpoint on WordPress, so submissions keep landing in the same Flamingo inbox / mail flow
 * as the live site. In dev, /wp-json is proxied to WP by vite.config.ts.
 */
interface Field {
  tag: string; name: string; required: boolean; label: string;
  placeholder?: string; autocomplete?: string; options?: string[]; includeBlank?: boolean; value?: string;
}

function parseCf7(template: string): { fields: Field[]; submitLabel: string } {
  const fields: Field[] = [];
  let submitLabel = 'Submit';
  const labelFor = new Map<string, string>();
  for (const m of template.matchAll(/<label>([\s\S]*?)\[[^\]]+\][\s\S]*?<\/label>/g)) {
    const tag = m[0].match(/\[(\w+)\*?\s+([\w-]+)/);
    if (tag) labelFor.set(tag[2], m[1].trim());
  }
  for (const m of template.matchAll(/\[(\w+)(\*?)\s*([^\]]*)\]/g)) {
    const [, tag, star, rest] = m;
    const quoted = [...rest.matchAll(/"([^"]*)"/g)].map((q) => q[1]);
    const tokens = rest.replace(/"[^"]*"/g, '').trim().split(/\s+/).filter(Boolean);
    if (tag === 'submit') { submitLabel = quoted[0] || submitLabel; continue; }
    if (['response', 'acceptance'].includes(tag)) continue;
    const name = tokens[0];
    const f: Field = { tag, name, required: star === '*', label: labelFor.get(name) || name };
    for (const t of tokens.slice(1)) {
      if (t.startsWith('autocomplete:')) f.autocomplete = t.slice('autocomplete:'.length);
      if (t === 'include_blank') f.includeBlank = true;
    }
    if (/\bplaceholder\b/.test(rest)) f.placeholder = quoted[0];
    if (tag === 'select') f.options = quoted;
    if (tag === 'hidden') f.value = quoted[0] ?? '';
    fields.push(f);
  }
  return { fields, submitLabel };
}

export function Cf7Form({ form, onSuccess, className, submitClassName }: { form: Cf7FormDef; onSuccess?: string; className?: string; submitClassName?: string }) {
  const navigate = useNavigate();
  const [status, setStatus] = useState<{ kind: 'idle' | 'sending' | 'error' | 'info'; message?: string; invalid?: Record<string, string> }>({ kind: 'idle' });
  const { fields, submitLabel } = parseCf7(form.form?.content || '');
  const base = (import.meta.env.VITE_FORMS_BASE || '').replace(/\/$/, '');

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    data.set('_wpcf7', String(form.id));
    data.set('_wpcf7_version', '6.1.6');
    data.set('_wpcf7_locale', 'en_US');
    data.set('_wpcf7_unit_tag', `wpcf7-f${form.id}-o1`);
    data.set('_wpcf7_container_post', '0');
    setStatus({ kind: 'sending' });
    try {
      const res = await fetch(`${base}/wp-json/contact-form-7/v1/contact-forms/${form.id}/feedback`, { method: 'POST', body: data });
      const json = await res.json();
      if (json.status === 'mail_sent') {
        if (onSuccess) navigate(onSuccess); else setStatus({ kind: 'info', message: json.message });
        return;
      }
      const invalid: Record<string, string> = {};
      for (const f of json.invalid_fields || []) invalid[f.field] = f.message;
      setStatus({ kind: 'error', message: json.message || 'There was an error trying to send your request. Please try again later.', invalid });
    } catch {
      setStatus({ kind: 'error', message: 'There was an error trying to send your request. Please try again later.' });
    }
  };

  return (
    <form className={className ?? 'wpcf7-form'} onSubmit={onSubmit} noValidate>
      {fields.map((f) => f.tag === 'hidden' ? (
        <input key={f.name} type="hidden" name={f.name} value={f.value} />
      ) : (
        <p key={f.name}>
          <label>
            {f.label}
            <span className="wpcf7-form-control-wrap" data-name={f.name}>
              {f.tag === 'select' ? (
                <select name={f.name} required={f.required} defaultValue="" aria-invalid={!!status.invalid?.[f.name]}>
                  {f.includeBlank && <option value="">—Please choose an option—</option>}
                  {f.options?.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              ) : f.tag === 'textarea' ? (
                <textarea name={f.name} required={f.required} placeholder={f.placeholder} rows={4} aria-invalid={!!status.invalid?.[f.name]} />
              ) : (
                <input type={f.tag === 'email' ? 'email' : f.tag === 'tel' ? 'tel' : 'text'} name={f.name} required={f.required} placeholder={f.placeholder} autoComplete={f.autocomplete} aria-invalid={!!status.invalid?.[f.name]} />
              )}
              {status.invalid?.[f.name] && <span className="wpcf7-not-valid-tip field-error">{status.invalid[f.name]}</span>}
            </span>
          </label>
        </p>
      ))}
      <p>
        <input type="submit" className={submitClassName ?? 'wpcf7-submit'} disabled={status.kind === 'sending'} value={status.kind === 'sending' ? 'Sending…' : submitLabel} />
      </p>
      {status.message && <p className={`form-status wpcf7-response-output ${status.kind === 'error' ? 'is-error' : 'is-info'}`} role="alert">{status.message}</p>}
    </form>
  );
}
