import { useEffect, useState } from 'react';
import { site } from '@/content';

/** Port of thinkable_render_studies_library() — the research library fed by the GGtude studies API. */
interface Study {
  id: number; title: string; authors?: string; journal?: string; year?: number | string; doi?: string;
  study_type?: string; conditions?: string[]; sample_size?: number; key_findings?: string; image_url?: string;
}
interface Summary { total_studies?: number; total_rcts?: number; conditions?: string[] }

const TYPE_LABELS: Record<string, string> = {
  rct: 'Randomized controlled trial', observational: 'Observational study', case_study: 'Case study',
  real_world: 'Real-world data', review: 'Review paper', other: 'Research study',
};
const API = import.meta.env.VITE_STUDIES_API || site.studiesApi;
const doiHref = (doi?: string) => (doi ? `https://doi.org/${doi.replace(/^https?:\/\/doi\.org\//, '')}` : undefined);
const imageUrl = (s: Study) => (!s.image_url ? '' : s.image_url.startsWith('http') ? s.image_url : `https://api.ggtude.com/services${s.image_url}`);

export function StudiesLibrary() {
  const [studies, setStudies] = useState<Study[] | null>(null);
  const [summary, setSummary] = useState<Summary>({});
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let alive = true;
    Promise.all([fetch(API).then((r) => r.json()), fetch(`${API}/summary`).then((r) => r.json()).catch(() => ({}))])
      .then(([list, sum]) => { if (!alive) return; setStudies(list?.success ? list.data : []); setSummary(sum?.data || {}); if (!list?.success) setFailed(true); })
      .catch(() => { if (alive) { setStudies([]); setFailed(true); } });
    return () => { alive = false; };
  }, []);

  return (
    <section className="studies-library" aria-label="Thinkable research studies">
      <div className="studies-library-inner">
        <div className="studies-library-head">
          <p className="eyebrow">RESEARCH LIBRARY</p>
          <h2>Published studies behind Thinkable.</h2>
          <p>Review the published research connected to Thinkable, GGtude, and related mobile cognitive training programs. The library is pulled from the live research API so partners can evaluate study type, population, outcomes, and evidence fit.</p>
        </div>
        {studies && studies.length > 0 && (
          <div className="studies-stats" aria-label="Research summary">
            <div><strong>{summary.total_studies ?? studies.length}</strong><span>Published studies</span></div>
            <div><strong>{summary.total_rcts ?? studies.filter((s) => s.study_type === 'rct').length}</strong><span>Randomized controlled trials</span></div>
            <div><strong>{summary.conditions?.length ?? 0}</strong><span>Condition and topic areas</span></div>
          </div>
        )}
        {studies === null ? (
          <div className="studies-empty"><h3>Loading research library…</h3></div>
        ) : failed || studies.length === 0 ? (
          <div className="studies-empty">
            <h3>Research library temporarily unavailable</h3>
            <p>The published studies API could not be reached. Please try again shortly or discuss the evidence review in a partner demo.</p>
          </div>
        ) : (
          <div className="studies-grid">
            {studies.map((s) => (
              <article className="study-card" key={s.id}>
                {imageUrl(s) && (
                  <a className="study-card-image" href={doiHref(s.doi) || '#'} aria-label={s.title} target="_blank" rel="noopener">
                    <img src={imageUrl(s)} alt="" loading="lazy" />
                  </a>
                )}
                <div className="study-card-body">
                  <div className="study-meta">
                    <span>{TYPE_LABELS[s.study_type || 'other'] || TYPE_LABELS.other}</span>
                    {s.year ? <span>{s.year}</span> : null}
                    {s.sample_size ? <span>N={s.sample_size}</span> : null}
                  </div>
                  <h3>{s.title}</h3>
                  {s.authors && <p className="study-authors">{s.authors}</p>}
                  {s.journal && <p className="study-journal">{s.journal}</p>}
                  {s.conditions?.length ? <div className="study-tags" aria-label="Conditions">{s.conditions.slice(0, 4).map((c) => <span key={c}>{c}</span>)}</div> : null}
                  {s.key_findings && <p className="study-findings">{s.key_findings}</p>}
                  {s.doi && <a className="study-link" href={doiHref(s.doi)} target="_blank" rel="noopener">View publication</a>}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
