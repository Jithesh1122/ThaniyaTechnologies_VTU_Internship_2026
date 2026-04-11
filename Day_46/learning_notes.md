# Learning Notes: Retry, Backoff, and Circuit Breakers

## Why This Topic Matters
Backend systems often depend on databases, third-party APIs, payment services, email providers, and internal microservices. Even if our own code is correct, these dependencies can fail or become slow. A reliable backend must respond to that instability without making the situation worse.

## Retry Logic
Retries are useful when a failure is temporary, such as a timeout, a short network interruption, or a brief rate limit. Retrying immediately without a plan can overload the dependency further, so retries should be limited and intentional.

Key ideas:
- Retry only for failure types that may recover soon
- Keep retry count bounded
- Log retry attempts clearly
- Avoid retrying validation or permanent business-rule failures

## Exponential Backoff
Backoff increases the delay between retry attempts. This reduces repeated pressure on the failing dependency and gives it time to recover.

Typical pattern:
- Attempt 1: no or minimal delay
- Attempt 2: slightly longer wait
- Attempt 3: longer wait again
- Stop after a safe maximum number of attempts

Benefits:
- Prevents aggressive retry storms
- Improves system behavior under load
- Gives external services time to recover

## Circuit Breaker Concept
A circuit breaker protects the calling service when repeated failures happen. Instead of continuing to send requests that are likely to fail, it temporarily blocks calls.

Common states:
- Closed: requests flow normally
- Open: requests are blocked after repeated failures
- Half-open: a small test request is allowed to check recovery

This pattern improves stability because the service stops wasting time and resources on known-failing operations.

## Graceful Degradation
Sometimes the best response is not full success but controlled fallback behavior. For example:
- Return cached data
- Show partial information
- Respond with a safer temporary message
- Skip optional enrichment logic

Graceful degradation keeps the main system usable even when one dependency is unhealthy.

## Design Lessons
- Reliability is part of backend design, not just infrastructure
- Retry policies should be selective, not automatic for every error
- Circuit breakers help isolate dependency failure from the whole system
- Fallbacks should be planned before incidents happen
- Observability is important so retry and breaker behavior can be monitored

## Practical Reflection
The practical simulations made it easier to see that resilience patterns are about control. Without retry limits and circuit breaking, a backend can amplify failure. With guardrails, the system becomes calmer, more predictable, and easier to recover.
