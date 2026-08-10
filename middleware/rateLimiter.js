const rateLimit = require('express-rate-limit');

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  handler: (req, res) => {
    res
      .status(429)
      .set('Retry-After', '900')
      .json({
        error: {
          code: 'RATE_LIMITED',
          message: 'Too many requests. Try again in 15 minutes.',
          retryAfter: 900,
        },
      });
  },
});

module.exports = { apiLimiter };
