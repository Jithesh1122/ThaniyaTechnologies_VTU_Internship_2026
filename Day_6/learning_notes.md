# Learning Notes

## Topic Focus
Caching and asynchronous background processing for production-oriented MERN systems.

## Concepts Learned
1. Caching strategy basics:
- Use caching for frequently requested data to reduce database load.
- Define clear cache keys and TTL values based on data volatility.

2. Cache invalidation principles:
- Invalidate cache on create/update/delete operations affecting cached entities.
- Prefer predictable invalidation rules over ad-hoc clearing.

3. Background job processing:
- Move non-critical slow operations out of request-response cycle.
- Use queue-driven processing for email, notifications, or report generation.

4. Retry and failure handling:
- Use bounded retries for transient failures.
- Track failed attempts and route persistent failures for manual inspection.

5. Practical architecture impact:
- Caching improves latency and throughput.
- Queue workflows improve user response time and system resilience.

## Practical Completion
- Implemented utility patterns for:
  - in-memory cache with TTL handling
  - cache read/write/invalidate helpers
  - lightweight job queue simulation
  - retry logic for transient task failures

## Outcome
Improved ability to design backend workflows that balance speed, stability, and maintainability in MERN applications.
