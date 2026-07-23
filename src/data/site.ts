// ---------------------------------------------------------------------------
// All site copy lives here. Edit this file to customize the site; see the
// "What to customize" section in THEME.md.
// ---------------------------------------------------------------------------

export interface Project {
  id: string;
  title: string;
  meta: string;
  description: string;
  href: string;
  demo?: string;
}

export interface SideRepo {
  title: string;
  description: string;
  href: string;
  demo?: string;
}

export type SocialIcon =
  | 'email'
  | 'linkedin'
  | 'github'
  | 'medium'
  | 'x'
  | 'leetcode';

export interface SocialLink {
  label: string;
  icon: SocialIcon;
  href: string;
}

export interface ExperienceEntry {
  company: string;
  role: string;
  dates: string;
  highlights: string[];
  impact: string;
}

export interface EducationEntry {
  school: string;
  degree: string;
  dates: string;
  /** e.g. CGPA */
  meta?: string;
  /** In progress vs completed */
  status?: 'completed' | 'upcoming';
  /** Notable coursework (esp. in-demand / technical) */
  subjects?: string[];
  note?: string;
  logo?: 'pdeu' | 'bits';
}

export interface OpenSourceContribution {
  title: string;
  repo: string;
  href: string;
  description: string;
}

export const site = {
  // Identity
  name: 'PRATHAM SHAH',
  /** Short name/monogram for nav + footer */
  navName: 'PRATHAM SHAH',
  /** Role + location subline in the hero */
  subline: 'Dev += research · INDIA',

  /** Shown in nav beside name */
  availability: 'AVAILABLE FOR WORK',
  /** Mono kicker above hero title */
  heroKicker: 'I am',

  // <head>
  title: 'Pratham Shah, Developer',
  description:
    'Developer portfolio of Pratham Shah. Fast, thoughtful products for the web.',

  /** One-liner under the hero title */
  heroTagline:
    'I build lean web products and stay one arXiv binge ahead of the curve.',

  /** About section (full paragraph) */
  about:
    "I like building things that feel fast and considered: lean web products that range from static sites to AI agents, made with real care so the code won't embarrass me later. The rest of my time goes to papers I don't strictly need to read, mostly because I can't help it.",

  experience: [
    {
      company: 'Blink Analytics',
      role: 'LLM Intern',
      dates: 'May 2025 to July 2026',
      highlights: [
        'Built a phone-call AI interview agent: which can serve as a reminder agent and screening agent.',
        'Built bulk candidate processing: recruiters can upload and process large sets of prospects instead of handling them one by one.',
        'Built payments and interview credits: companies buy plans/credits and those credits control how many AI interviews they can run.',
        'Shipped ATS and recruiter tools: resume scoring, candidate profiles, job open/close, search/filters, candidate emails, and interview reports (including PDF).',
        'Improved how quickly interview reports are ready after a session, and cleaned up backend Docker deploys.',
        'Improved the existing live interview room: better speech recognition, AI agent model routing, noise cancellation, session reliability, and network monitoring.',
        'Reviewed and helped merge teammate pull requests across  company repos.',
        'Optimized language models using Reinforcement Learning from Human Feedback (RLHF) and Supervised Fine-Tuning (SFT).',
        'Integrated optimized LLM pipelines into internal recruitment tools with cross-functional teams.',
      ],
      impact: '62 merged PRs · 470+ commits across  company repos',
    },
  ] satisfies ExperienceEntry[],

  education: [
    {
      school: 'BITS Pilani, Pilani Campus',
      degree: 'ME Computer Science',
      dates: '2026 to 2028',
      status: 'upcoming',
      logo: 'bits',
    },
    {
      school: 'Pandit Deendayal Energy University (PDEU)',
      degree: 'B.Tech Computer Engineering',
      dates: '2022 to 2026',
      meta: 'CGPA 9.562',
      status: 'completed',
      logo: 'pdeu',
      subjects: [
        'Data Structures and Algorithms',
        'Operating Systems',
        'Database Management Systems',
        'Computer Networks',
        'Machine Learning',
        'Artificial Intelligence',
        'Computer Vision',
        'Big Data',
        'Information Retrieval',
        'Software Engineering',
      ],
    },
  ] satisfies EducationEntry[],

  openSourceContributions: [
    {
      title: 'Run LLM judge when --evaluate is passed',
      repo: 'Tracer-Cloud / opensre',
      href: 'https://github.com/Tracer-Cloud/opensre/pull/2090',
      description:
        'Merged fix for OpenSRE: the --evaluate path now calls run_opensre_llm_judge() during delivery when a rubric is present, with regression tests for the happy path, skip guards, and error fallback. Closes #2070.',
    },
  ] satisfies OpenSourceContribution[],

  // Projects: archive catalog
  projects: [
    {
      id: 'A001',
      title: 'Pikd',
      meta: 'NEXT.JS · FACE RECOGNITION',
      description:
        'Event photo delivery with face recognition: guests scan once and collect every photo they appear in, in seconds.',
      href: 'https://github.com/pratham-commits/pikd',
      demo: 'https://pikd-photos.vercel.app/',
    },
    {
      id: 'A002',
      title: 'Recursive Reasoning',
      meta: 'ML · RECURSIVE TRANSFORMER',
      description:
        'Recursive Transformer for Sudoku that re-processes its own output in thinking loops, based on “Less is More: Recursive Reasoning with Tiny Networks,” with a Streamlit dashboard for loop-by-loop visualization.',
      href: 'https://github.com/pratham-commits/Recursive-reasoning',
      demo: 'https://recursive-reasoning.streamlit.app/',
    },
    {
      id: 'A003',
      title: 'Reflect Reads',
      meta: 'MERN · BOOKSTORE',
      description:
        'Full-stack book browsing and ordering: React/Vite + Tailwind frontend, Express REST API, MongoDB, and JWT auth.',
      href: 'https://github.com/pratham-commits/reflect_reads',
    },
  ] satisfies Project[],

  /** Witty one-liner above casual repos */
  sideReposIntro: 'Built for me first. Grab anything that saves you time too.',

  sideRepos: [
    {
      title: 'Vanilla Transformer',
      description:
        'PyTorch “Attention Is All You Need” from scratch for English-French translation.',
      href: 'https://github.com/pratham-commits/Vanilla-transformer-implementation',
    },
    {
      title: 'Frame Tracker',
      description:
        'Streamlit app to upload videos, scrub frame-by-frame, jump quickly, and export frames as PNG.',
      href: 'https://github.com/pratham-commits/frame-tracker',
      demo: 'https://frame-tracker.streamlit.app/',
    },
    {
      title: 'CartPole',
      description:
        'Deep Q-Network agent in PyTorch trained to solve OpenAI Gym’s CartPole-v1.',
      href: 'https://github.com/pratham-commits/CartPole',
    },
    {
      title: 'Snap Log',
      description:
        'Browser console logger (Chrome extension) that captures serialized objects, network errors, and stack traces at full fidelity.',
      href: 'https://github.com/pratham-commits/Snap-Log',
    },
    {
      title: 'pluck',
      description:
        'Client-side extractor (Chrome extension) for images, GIFs, and video embedded in DOCX, PPTX, and PDF. No upload; runs in the browser.',
      href: 'https://github.com/pratham-commits/pluck',
    },
  ] satisfies SideRepo[],

  // Primary contact: icon-only actions.
  contact: [
    {
      label: 'Email Pratham Shah',
      icon: 'email',
      href: 'mailto:prathamsshah724@gmail.com',
    },
    {
      label: 'LinkedIn',
      icon: 'linkedin',
      href: 'https://www.linkedin.com/in/pratham-shah',
    },
  ] satisfies SocialLink[],

  // Other places on the web, separate from direct contact.
  elsewhere: [
    {
      label: 'GitHub',
      icon: 'github',
      href: 'https://github.com/pratham-commits',
    },
    {
      label: 'Medium',
      icon: 'medium',
      href: 'https://medium.com/@prathamsshah724',
    },
    {
      label: 'X',
      icon: 'x',
      href: 'https://x.com/Pratham_commits',
    },
    {
      label: 'LeetCode',
      icon: 'leetcode',
      href: 'https://leetcode.com/u/cheesy7/',
    },
  ] satisfies SocialLink[],
};
