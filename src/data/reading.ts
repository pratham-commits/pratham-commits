// ---------------------------------------------------------------------------
// Reading shelf: articles, videos, repos, papers you recommend.
// Edit this file to add links; they show on /reading (Pinterest-style masonry).
// ---------------------------------------------------------------------------

export type ReadingKind = 'article' | 'video' | 'repo' | 'paper' | 'book';

export type ReadingStatus = 'reading' | 'finished' | 'queued';

/** Tile height in the masonry wall: omit for stable auto “random” sizing. */
export type ReadingTileSize = 's' | 'm' | 'l' | 'xl';

export interface ReadingItem {
  title: string;
  href: string;
  kind: ReadingKind;
  /** Optional one-line why it’s worth your time */
  note?: string;
  status?: ReadingStatus;
  size?: ReadingTileSize;
}

export const readingPage = {
  title: 'Exploring',
  /** Page <title> suffix */
  documentTitle: 'Exploring · Pratham Shah',
  description:
    'Articles, videos, repos, and papers I am exploring or have finished and would send to a friend.',
  intro:
    'Articles, videos, repos, and papers I recommend: a running list, not a ranked catalog.',
} as const;

/**
 * Add entries here: order is pin order in the masonry wall.
 *
 * Fields:
 * - kind → label on tile (PAPER, ARTICLE, …)
 * - status → optional: reading | finished | queued
 * - size → optional: s | m | l | xl (skip for auto “random” height)
 * - note → optional blurb (shown on m/l/xl tiles)
 */
export const readingItems: ReadingItem[] = [
  {
    title: 'Attention Is All You Need',
    href: 'https://arxiv.org/abs/1706.03762',
    kind: 'paper',
    status: 'finished',
    size: 'xl',
    note: 'The transformer paper. Still the clearest mental model for why modern LLM stacks look the way they do.',
  },
  {
    title: '3Blue1Brown: But what is a neural network?',
    href: 'https://www.youtube.com/watch?v=aircAruvnKk',
    kind: 'video',
    status: 'finished',
    size: 'l',
    note: 'Best intuition-first intro before you touch backprop math.',
  },
  {
    title: 'Karpathy: Let’s build GPT',
    href: 'https://www.youtube.com/watch?v=kCc8FMFcVNk',
    kind: 'video',
    status: 'reading',
    size: 'xl',
    note: 'Build a tiny GPT from scratch in an afternoon. Pairs well with your Vanilla Transformer repo.',
  },
  {
    title: 'Pikd',
    href: 'https://github.com/pratham-commits/pikd',
    kind: 'repo',
    status: 'finished',
    size: 'm',
    note: 'Your own project: example of how a repo pin looks on the wall.',
  },
  {
    title: 'The Missing Semester of Your CS Education',
    href: 'https://missing.csail.mit.edu/',
    kind: 'article',
    status: 'finished',
    note: 'Shell, git, vim, debugging: dense and practical.',
  },
  {
    title: 'Designing Data-Intensive Applications',
    href: 'https://dataintensive.net/',
    kind: 'book',
    status: 'reading',
    size: 'l',
    note: 'Slow read, but the storage/replication chapters stick forever.',
  },
  {
    title: 'LoRA: Low-Rank Adaptation of Large Language Models',
    href: 'https://arxiv.org/abs/2106.09685',
    kind: 'paper',
    status: 'finished',
    size: 'm',
    note: 'Short paper, huge impact on how people fine-tune without full weights.',
  },
  {
    title: 'Recursive Reasoning',
    href: 'https://github.com/pratham-commits/Recursive-reasoning',
    kind: 'repo',
    status: 'finished',
    note: 'Sudoku + recursive transformer loops.',
  },
  {
    title: 'Paul Graham: How to Do Great Work',
    href: 'http://paulgraham.com/greatwork.html',
    kind: 'article',
    status: 'queued',
    size: 's',
  },
  {
    title: 'Anthropic: Core Views on AI Safety',
    href: 'https://www.anthropic.com/news/core-views-on-ai-safety',
    kind: 'article',
    status: 'queued',
    size: 'm',
    note: 'Useful framing when you are explaining RLHF work on a resume.',
  },
  {
    title: 'Streamlit docs',
    href: 'https://docs.streamlit.io/',
    kind: 'article',
    status: 'finished',
    note: 'Quick reference when shipping Frame Tracker / Recursive Reasoning demos.',
  },
  {
    title: 'Neural Networks: Zero to Hero (playlist)',
    href: 'https://www.youtube.com/playlist?list=PLAqhIrjkxbuWI05v9XExfu0DnlPxf-bH0',
    kind: 'video',
    status: 'queued',
    note: 'Karpathy playlist: watch in order if you want the full arc.',
  },
  {
    title: 'Chinchilla: training compute optimal models',
    href: 'https://arxiv.org/abs/2203.15556',
    kind: 'paper',
    status: 'queued',
    size: 'l',
    note: 'Why “bigger is always better” stopped being the whole story.',
  },
  {
    title: 'The Pragmatic Programmer',
    href: 'https://pragprog.com/titles/tpp20/the-pragmatic-programmer-20th-anniversary-edition/',
    kind: 'book',
    status: 'finished',
    note: 'Classic craft book: DRY, tracer bullets, rubber ducking.',
  },
  {
    title: 'Vercel: Astro deployment guide',
    href: 'https://vercel.com/docs/frameworks/astro',
    kind: 'article',
    status: 'finished',
    size: 's',
  },
  {
    title: 'Snap Log',
    href: 'https://github.com/pratham-commits/Snap-Log',
    kind: 'repo',
    status: 'finished',
    size: 'm',
    note: 'Chrome extension pin: no note on `s` tiles, more text on `m` and up.',
  },
  {
    title: 'Andrej Karpathy: State of GPT',
    href: 'https://www.youtube.com/watch?v=bZQun8Y4L2A',
    kind: 'video',
    status: 'finished',
    size: 'm',
    note: 'Broad survey talk: good before diving into a new architecture paper.',
  },
  {
    title: 'RLHF: InstructGPT paper',
    href: 'https://arxiv.org/abs/2203.02155',
    kind: 'paper',
    status: 'reading',
    note: 'Connects directly to internship bullets; omit `size` to see auto height.',
  },
  {
    title: 'Frame Tracker',
    href: 'https://frame-tracker.streamlit.app/',
    kind: 'repo',
    status: 'finished',
    size: 'l',
    note: 'Live demo link works too: use repo or deployed URL, whichever you want to promote.',
  },
];

/** Mono label on each pin */
export const readingKindBadge: Record<ReadingKind, string> = {
  article: 'ARTICLE',
  book: 'BOOK',
  video: 'VIDEO',
  repo: 'REPO',
  paper: 'PAPER',
};

export const readingStatusLabels: Record<ReadingStatus, string> = {
  reading: 'Reading',
  finished: 'Finished',
  queued: 'Queued',
};
