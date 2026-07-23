import type { APIRoute } from 'astro';
import { site } from '../data/site';
import { buildLlmsDocument } from '../lib/llms-document';

export const prerender = true;

export const GET: APIRoute = ({ site: astroSite }) => {
  const base =
    astroSite?.href.replace(/\/$/, '') ?? 'https://example.com';
  const body = buildLlmsDocument(base, site);

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
