# Learning Notes

## Topic Focus
Building a lightweight Student API using Node.js core HTTP module.

## Concepts Learned
- Request routing using method and path matching.
- API design for list, create, and delete operations.
- Body parsing and safe JSON validation with clear error messages.
- Input validation for required fields and id checks.
- Status code usage for success and failure cases.
- Importance of predictable API response structure for client integration.

## Practical Outcomes
- Implemented endpoint behavior for:
  - GET /students
  - POST /students
  - DELETE /students/:id
- Handled key error responses:
  - invalid payload
  - missing required fields
  - invalid or missing student id
  - route not found

## Skills Reinforced
- Node.js backend logic
- REST-style endpoint handling
- Validation and error response design
- API testing mindset
