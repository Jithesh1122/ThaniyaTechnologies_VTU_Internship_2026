# Learning Notes

## Topic Focus
Observability patterns for backend services.

## Concepts Learned
1. Structured logging:
- Use machine-readable log objects with consistent keys.
- Include context such as request id, route, status, and error code.

2. Log levels and filtering:
- `info` for normal operations.
- `warn` for recoverable anomalies.
- `error` for failures requiring attention.

3. Request correlation:
- Assign unique request ids and include them in every log event.
- Correlation improves traceability for multi-step backend flows.

4. Operational metrics:
- Track request volume, failure count, and average processing duration.
- Metrics help detect regressions and unhealthy behavior early.

5. Error observability:
- Capture error type, context, and safe message.
- Avoid leaking sensitive internals while preserving debugging value.

## Practical Completion
- Implemented:
  - structured logger utility
  - request context with correlation id
  - metrics collector for request outcomes
  - error capture and summary report generation

## Outcome
Improved ability to design backend systems that are measurable, diagnosable, and easier to maintain in production-like scenarios.
