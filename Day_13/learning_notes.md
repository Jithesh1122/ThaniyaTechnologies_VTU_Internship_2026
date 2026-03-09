# Learning Notes

## Topic Focus
Rate limiting and API security hardening for backend services.

## Concepts Learned
1. Rate limiting goals:
- Protect APIs from abuse, bot traffic, and accidental overuse.
- Maintain service stability under burst traffic.

2. Policy strategy:
- Use different limits for public, authenticated, and sensitive endpoints.
- Keep stricter limits for login, signup, password reset, and OTP paths.

3. Limiting models:
- Fixed window and sliding window basics.
- Token bucket mindset for smoother traffic control.

4. Security hardening alignment:
- Avoid exposing detailed internal errors.
- Validate and sanitize inputs before business logic.
- Restrict payload size to reduce misuse risk.

5. Operational impact:
- Better resilience during high request spikes.
- Improved reliability and safer endpoint behavior.

## Practical Completion
- Designed a reusable middleware-oriented throttling approach.
- Mapped endpoint categories to policy levels.
- Defined a safe response pattern for blocked requests.

## Outcome
Improved readiness to implement secure, policy-driven API protection in MERN backend projects.
