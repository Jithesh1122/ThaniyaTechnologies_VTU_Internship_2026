# Learning Notes: Structured Logging and Log Filtering

## Why This Topic Matters
Once an application is running outside local development, logs become one of the main ways to understand what the system is doing. When issues happen in staging or production, logs often provide the first clues.

Weak logging can create problems such as:
- Hard-to-search output
- Missing context around failures
- Too much noise without useful signal
- Slower debugging during incidents

## Plain Logs vs Structured Logs
Plain logs are simple text messages like:
- Server started
- Request failed
- Database connected

These can be useful, but they become harder to search and analyze at scale.

Structured logs organize data into fields such as:
- timestamp
- level
- message
- requestId
- route
- userId

This makes logs more consistent and easier to filter.

## Log Levels
Common log levels help separate normal system activity from important issues:
- `info`: normal system behavior
- `warn`: unexpected but not fatal condition
- `error`: failure that needs attention

Using levels consistently helps teams focus on what matters during troubleshooting.

## Context Fields
Context makes logs more useful. A message like `request failed` is weak by itself. A message becomes more helpful when it includes:
- Which route failed
- Which request id was involved
- What service was being called
- Which environment produced the log

That extra context helps connect events during debugging.

## Filtering and Operations
Structured logs make it easier to:
- Show only errors
- Search by request id
- Group logs by service or route
- Find patterns during incidents

This is one reason structured logging is closely related to observability.

## Design Lessons
- Logs are operational tools, not just development output
- Good logs need both readability and context
- Levels reduce noise during investigation
- Structured fields improve filtering and traceability
- Logging decisions affect how quickly issues can be diagnosed

## Practical Reflection
The practical exercises showed that the same application activity becomes easier to reason about when logs are structured consistently. Even simple systems benefit from logs that can be filtered, grouped, and read with more context.
