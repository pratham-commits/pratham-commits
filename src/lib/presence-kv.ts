import { Redis } from '@upstash/redis';

const ONLINE_PREFIX = 'presence:online:';
const TOTAL_KEY = 'presence:total:sessions';
const SESSION_PREFIX = 'presence:session:';

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function redisUrl(): string | undefined {
  return process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
}

function redisToken(): string | undefined {
  return process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;
}

function getRedis(): Redis {
  const url = redisUrl();
  const token = redisToken();
  if (!url || !token) {
    throw new Error('Redis REST credentials are not configured');
  }
  return new Redis({ url, token });
}

export function isPresenceConfigured(): boolean {
  return Boolean(redisUrl() && redisToken());
}

export function isValidSessionId(sessionId: string): boolean {
  return UUID_RE.test(sessionId);
}

export async function registerPresence(sessionId: string): Promise<void> {
  const redis = getRedis();
  await redis.set(`${ONLINE_PREFIX}${sessionId}`, '1', { ex: 45 });

  const isFirstSeen = await redis.set(`${SESSION_PREFIX}${sessionId}`, '1', {
    nx: true,
  });
  if (isFirstSeen) {
    await redis.incr(TOTAL_KEY);
  }
}

export async function readPresenceStats(): Promise<{
  total: number;
  online: number;
}> {
  const redis = getRedis();
  const [totalRaw, onlineKeys] = await Promise.all([
    redis.get<number>(TOTAL_KEY),
    redis.keys(`${ONLINE_PREFIX}*`),
  ]);

  return {
    total: typeof totalRaw === 'number' ? totalRaw : 0,
    online: onlineKeys.length,
  };
}
