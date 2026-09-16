/** Extract shared, static markup from an existing WordPress template. Never executes PHP. */
export function templateFragment(source: string, name: string): string {
  const start = `<!-- ${name}:start -->`;
  const end = `<!-- ${name}:end -->`;
  const first = source.indexOf(start);
  const last = source.indexOf(end, first + start.length);
  if (first < 0 || last < 0) throw new Error(`Missing shared template fragment: ${name}`);
  return source.slice(first + start.length, last).trim();
}
