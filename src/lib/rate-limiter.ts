// Simple in-memory rate limiter to prevent abuse on public deployments

interface RateLimitRecord {
  timestamps: number[];
}

const ipRequestMap = new Map<string, RateLimitRecord>();

// Clean up records older than 10 minutes periodically
setInterval(() => {
  const now = Date.now();
  const windowMs = 10 * 60 * 1000;
  for (const [ip, record] of ipRequestMap.entries()) {
    const recent = record.timestamps.filter((ts) => now - ts < windowMs);
    if (recent.length === 0) {
      ipRequestMap.delete(ip);
    } else {
      record.timestamps = recent;
    }
  }
}, 60 * 1000);

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetSeconds: number;
}

/**
 * Check if an IP has exceeded limits.
 * Default: 10 requests per 60 seconds.
 */
export function checkRateLimit(
  ip: string,
  maxRequests: number = 10,
  windowMs: number = 60 * 1000
): RateLimitResult {
  const now = Date.now();
  let record = ipRequestMap.get(ip);

  if (!record) {
    record = { timestamps: [] };
    ipRequestMap.set(ip, record);
  }

  // Filter timestamps within the window
  record.timestamps = record.timestamps.filter((ts) => now - ts < windowMs);

  if (record.timestamps.length >= maxRequests) {
    const oldestTimestamp = record.timestamps[0];
    const resetSeconds = Math.ceil((oldestTimestamp + windowMs - now) / 1000);
    return {
      allowed: false,
      remaining: 0,
      resetSeconds: Math.max(1, resetSeconds),
    };
  }

  // Record current request
  record.timestamps.push(now);

  return {
    allowed: true,
    remaining: maxRequests - record.timestamps.length,
    resetSeconds: Math.ceil(windowMs / 1000),
  };
}
