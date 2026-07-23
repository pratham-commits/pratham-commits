export interface AiProvider {
  id: string;
  label: string;
  href: (encodedPrompt: string) => string;
}

export function buildEvalPrompt(siteUrl: string): string {
  const base = siteUrl.replace(/\/$/, '');
  return [
    'You are a senior technical hiring manager reviewing a developer portfolio.',
    `Read ${base}/llms.txt and the public pages at ${base}. Use only information from those sources.`,
    'If you cannot access them, say so and do not invent details.',
    '',
    'Write a concise evaluation with:',
    '1) Profile snapshot (role focus, location, availability)',
    '2) Strengths backed by specific evidence (metrics, shipped features, repos, demos)',
    '3) Best-fit roles (full-stack web, LLM/product engineering, etc.)',
    '4) Fair gaps or open questions',
    '',
    'Prioritize evidence from Blink Analytics internship, production-style projects (Pikd, Recursive Reasoning), and GitHub/live demo links.',
    'Tone: professional, evidence-based, balanced.',
  ].join('\n');
}

export const aiProviders: AiProvider[] = [
  {
    id: 'chatgpt',
    label: 'ChatGPT',
    href: (q) => `https://chatgpt.com/?q=${q}`,
  },
  {
    id: 'claude',
    label: 'Claude',
    href: (q) => `https://claude.ai/new?q=${q}`,
  },
  {
    id: 'gemini',
    label: 'Gemini',
    href: (q) => `https://gemini.google.com/app?q=${q}`,
  },
  {
    id: 'perplexity',
    label: 'Perplexity',
    href: (q) => `https://www.perplexity.ai/search?q=${q}`,
  },
  {
    id: 'copilot',
    label: 'Copilot',
    href: (q) => `https://copilot.microsoft.com/?q=${q}`,
  },
  {
    id: 'mistral',
    label: 'Mistral',
    href: (q) => `https://chat.mistral.ai/chat?q=${q}`,
  },
];

export function providerChatUrl(provider: AiProvider, siteUrl: string): string {
  return provider.href(encodeURIComponent(buildEvalPrompt(siteUrl)));
}
