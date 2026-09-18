import type { APIRoute } from 'astro';
import {
  isPresenceConfigured,
  isValidSessionId,
  readPresenceStats,
  registerPresence,
} from '../../lib/presence-kv';

export const prerender = false;

const JSON_HEADERS = {
  'Content-Type': 'application/json',
  'Cache-Control': 'no-store',
} as const;

export const GET: APIRoute = async () => {
  if (!isPresenceConfigured()) {
    return new Response(JSON.stringify({ configured: false, total: null, online: null }), {
      headers: JSON_HEADERS,
    });
  }

  try {
    const stats = await readPresenceStats();
    return new Response(
      JSON.stringify({ configured: true, total: stats.total, online: stats.online }),
      { headers: JSON_HEADERS },
    );
  } catch {
    return new Response(JSON.stringify({ configured: false, total: null, online: null }), {
      status: 503,
      headers: JSON_HEADERS,
    });
  }
};

export const POST: APIRoute = async ({ request }) => {
  if (!isPresenceConfigured()) {
    return new Response(JSON.stringify({ configured: false, total: null, online: null }), {
      headers: JSON_HEADERS,
    });
  }

  let sessionId = '';
  try {
    const body = (await request.json()) as { sessionId?: string };
    sessionId = body.sessionId ?? '';
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
      status: 400,
      headers: JSON_HEADERS,
    });
  }

  if (!isValidSessionId(sessionId)) {
    return new Response(JSON.stringify({ error: 'Invalid sessionId' }), {
      status: 400,
      headers: JSON_HEADERS,
    });
  }

  try {
    await registerPresence(sessionId);
    const stats = await readPresenceStats();
    return new Response(
      JSON.stringify({ configured: true, total: stats.total, online: stats.online }),
      { headers: JSON_HEADERS },
    );
  } catch {
    return new Response(JSON.stringify({ configured: false, total: null, online: null }), {
      status: 503,
      headers: JSON_HEADERS,
    });
  }
};
