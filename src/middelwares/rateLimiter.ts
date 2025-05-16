// rateLimiter.ts
import rateLimit from "express-rate-limit";

export const limiter = rateLimit({
  windowMs: 15* 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable `X-RateLimit-*` headers
  message: {
    message: "Too many requests, please try again later.",
  },
});
