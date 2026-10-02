// Minimal markdown renderer for NOTES.md (no deps):
// paragraphs, `code`, **bold**, links, -/*/1. lists, #..#### headings,
// ``` fenced blocks. HTML is escaped first.
const esc = (s: string): string =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const inline = (s: string): string =>
  esc(s)
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\[([^\]]+)\]\((https?:[^)\s]+)\)/g, '<a href="$2" rel="noreferrer">$1</a>');

export function renderMd(md: string): string {
  const out: string[] = [];
  let para: string[] = [];
  let list: string[] = [];
  let ordered = false;
  let code: string[] | null = null;
  const flush = () => {
    if (para.length) out.push(`<p>${para.map(inline).join('<br>')}</p>`);
    para = [];
    if (list.length)
      out.push(`<${ordered ? 'ol' : 'ul'}>${list.map((i) => `<li>${inline(i)}</li>`).join('')}</${ordered ? 'ol' : 'ul'}>`);
    list = [];
  };
  for (const line of md.split('\n')) {
    const t = line.trim();
    if (t.startsWith('```')) {
      if (code === null) { flush(); code = []; }
      else { out.push(`<pre><code>${esc(code.join('\n'))}</code></pre>`); code = null; }
      continue;
    }
    if (code !== null) { code.push(line); continue; }
    if (!t) { flush(); continue; }
    const h = t.match(/^(#{1,4})\s+(.+)$/);
    if (h) {
      flush();
      const n = Math.min(h[1].length + 2, 6);
      out.push(`<h${n}>${inline(h[2])}</h${n}>`);
      continue;
    }
    const li = t.match(/^[-*]\s+(.+)$/) ?? t.match(/^\d+[.)]\s+(.+)$/);
    if (li) {
      const isOl = /^\d/.test(t);
      if (list.length && ordered !== isOl) flush();
      if (para.length) flush();
      ordered = isOl;
      list.push(li[1]);
      continue;
    }
    if (list.length) flush();
    para.push(t);
  }
  flush();
  if (code !== null) out.push(`<pre><code>${esc(code.join('\n'))}</code></pre>`);
  return out.join('\n');
}
