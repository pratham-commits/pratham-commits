import { kv } from '@vercel/kv';

const ONLINE_PREFIX = 'presence:online:';
const TOTAL_KEY = 'presence:total:sessions';
const SESSION_PREFIX = 'presence:session:';

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function isPresenceConfigured(): boolean {
  return Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
}

export function isValidSessionId(sessionId: string): boolean {
  return UUID_RE.test(sessionId);
}

export async function registerPresence(sessionId: string): Promise<void> {
  await kv.set(`${ONLINE_PREFIX}${sessionId}`, '1', { ex: 45 });

  const isFirstSeen = await kv.set(`${SESSION_PREFIX}${sessionId}`, '1', {
    nx: true,
  });
  if (isFirstSeen) {
    await kv.incr(TOTAL_KEY);
  }
}

export async function readPresenceStats(): Promise<{
  total: number;
  online: number;
}> {
  const [totalRaw, onlineKeys] = await Promise.all([
    kv.get<number>(TOTAL_KEY),
    kv.keys(`${ONLINE_PREFIX}*`),
  ]);

  return {
    total: typeof totalRaw === 'number' ? totalRaw : 0,
    online: onlineKeys.length,
  };
}
