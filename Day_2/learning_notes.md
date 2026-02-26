# Learning Notes - Day 2

## Topic Focus
Centralized error handling and request validation flow for scalable MERN backends.

## Concepts Learned
1. Operational vs programmer errors:
- Operational errors (validation failure, resource not found) should return controlled user-facing responses.
- Programmer errors should be logged and handled without leaking internals.

2. Standard error object design:
- Use custom error class with 'statusCode', 'code', and 'details'.
- Keep response shape consistent for frontend reliability.

3. Global error middleware pattern:
- Throw errors inside controller/service logic.
- Pass errors to a single global handler.
- Map unknown errors to safe generic responses.

4. Validation-first request handling:
- Validate input at API boundary before business logic.
- Return structured validation errors with field-level details.

5. Response consistency:
- Standard success/error envelopes reduce frontend condition complexity.

## Practical Completion
- Implemented:
  - `AppError` class
  - `validateCreateTaskPayload` function
  - `createTaskController` simulation
  - `globalErrorHandler` simulation
  - Consistent `successResponse` and `errorResponse` helpers

## Outcome
- Today I improved backend engineering quality by introducing reusable error and validation foundations that can directly fit future Express APIs.
