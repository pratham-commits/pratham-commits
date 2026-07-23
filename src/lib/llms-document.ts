import { site } from '../data/site';

type Site = typeof site;

export function buildLlmsDocument(baseUrl: string, data: Site): string {
  const url = baseUrl.replace(/\/$/, '');
  const lines: string[] = [
    `# ${data.name}`,
    '',
    '> Machine-readable summary for AI assistants evaluating this portfolio.',
    '',
    '## Site',
    `- [Homepage](${url}/)`,
    `- [Exploring / reading list](${url}/exploring/)`,
    `- [LLM summary (this file)](${url}/llms.txt)`,
    '',
    '## Identity',
    `- Name: ${data.name}`,
    `- Subline: ${data.subline}`,
    `- Availability: ${data.availability}`,
    `- Tagline: ${data.heroTagline}`,
    '',
    '## About',
    data.about,
    '',
    '## Experience',
  ];

  for (const job of data.experience) {
    lines.push(`### ${job.company} (${job.dates})`);
    lines.push(`Role: ${job.role}`);
    lines.push(`Impact: ${job.impact}`);
    for (const h of job.highlights) {
      lines.push(`- ${h}`);
    }
    lines.push('');
  }

  lines.push('## Education');
  for (const ed of data.education) {
    lines.push(`### ${ed.school} (${ed.dates})`);
    lines.push(`Degree: ${ed.degree}`);
    if (ed.meta) lines.push(ed.meta);
    if (ed.note) lines.push(ed.note);
    if (ed.subjects?.length) {
      lines.push(`Coursework: ${ed.subjects.join(', ')}`);
    }
    lines.push('');
  }

  lines.push('## Open source contributions');
  for (const pr of data.openSourceContributions) {
    lines.push(`### ${pr.title} (${pr.repo})`);
    lines.push(pr.description);
    lines.push(`- [Pull request](${pr.href})`);
    lines.push('');
  }

  lines.push('## Selected projects');
  for (const p of data.projects) {
    lines.push(`### ${p.id} ${p.title} (${p.meta})`);
    lines.push(p.description);
    lines.push(`- [Repository](${p.href})`);
    if (p.demo) lines.push(`- [Live demo](${p.demo})`);
    lines.push('');
  }

  lines.push('## Side repos');
  lines.push(data.sideReposIntro);
  for (const r of data.sideRepos) {
    lines.push(`### ${r.title}`);
    lines.push(r.description);
    lines.push(`- [Repository](${r.href})`);
    if (r.demo) lines.push(`- [Live demo](${r.demo})`);
    lines.push('');
  }

  lines.push('## Contact');
  for (const c of data.contact) {
    lines.push(`- [${c.label}](${c.href})`);
  }
  lines.push('');
  lines.push('## Elsewhere');
  for (const e of data.elsewhere) {
    lines.push(`- [${e.label}](${e.href})`);
  }

  return `${lines.join('\n').trim()}\n`;
}
