const rateLimit = require('express-rate-limit');

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  handler: (req, res) => {
    // Include CORS header so browsers can read the JSON body on blocked requests
    res
      .status(429)
      .set('Retry-After', '10')
      .set('Access-Control-Allow-Origin', '*')
      .json({
        error: {
          code: 'RATE_LIMITED',
          message: 'Too many requests. Try again in 10 seconds.',
          retryAfter: 10,
        },
      });
  },
});

module.exports = { apiLimiter };
