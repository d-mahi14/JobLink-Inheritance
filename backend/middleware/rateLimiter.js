// Simple in-memory rate limiter
// For production, consider using Redis or a proper rate limiting library

const rateLimitStore = new Map();

// Clean up old entries every 15 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of rateLimitStore.entries()) {
    if (now > value.resetTime) {
      rateLimitStore.delete(key);
    }
  }
}, 15 * 60 * 1000);

export const createRateLimiter = (options = {}) => {
  const {
    windowMs = 15 * 60 * 1000, // 15 minutes
    maxRequests = 100, // Max requests per window
    message = 'Too many requests, please try again later.'
  } = options;

  return (req, res, next) => {
    const identifier = req.ip || req.connection.remoteAddress;
    const key = `${identifier}-${req.path}`;
    const now = Date.now();

    let record = rateLimitStore.get(key);

    if (!record) {
      record = {
        count: 1,
        resetTime: now + windowMs
      };
      rateLimitStore.set(key, record);
      return next();
    }

    if (now > record.resetTime) {
      record.count = 1;
      record.resetTime = now + windowMs;
      return next();
    }

    if (record.count >= maxRequests) {
      const retryAfter = Math.ceil((record.resetTime - now) / 1000);
      
      res.set({
        'X-RateLimit-Limit': maxRequests,
        'X-RateLimit-Remaining': 0,
        'X-RateLimit-Reset': new Date(record.resetTime).toISOString(),
        'Retry-After': retryAfter
      });

      return res.status(429).json({
        success: false,
        message,
        retryAfter: `${retryAfter} seconds`
      });
    }

    record.count++;
    
    res.set({
      'X-RateLimit-Limit': maxRequests,
      'X-RateLimit-Remaining': maxRequests - record.count,
      'X-RateLimit-Reset': new Date(record.resetTime).toISOString()
    });

    next();
  };
};

// Predefined rate limiters for different use cases
export const authRateLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 5, // 5 login attempts
  message: 'Too many authentication attempts, please try again after 15 minutes.'
});

export const apiRateLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 100, // 100 requests
  message: 'Too many requests, please try again later.'
});

export const uploadRateLimiter = createRateLimiter({
  windowMs: 60 * 60 * 1000, // 1 hour
  maxRequests: 10, // 10 uploads per hour
  message: 'Too many uploads, please try again later.'
});