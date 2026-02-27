# Learning Notes

## Topic Focus
Authentication and authorization flow design for scalable MERN applications.

## Concepts Learned
1. Access token and refresh token separation:
- Access token should be short-lived and used for API authorization.
- Refresh token should be long-lived, stored securely, and rotated.

2. Token lifecycle design:
- Issue access token after login.
- Use refresh token endpoint to re-issue access token without forcing frequent logins.
- Invalidate refresh tokens on logout or suspicious activity.

3. Route protection strategy:
- Verify token before protected route execution.
- Attach verified user context to request object.
- Enforce role-based checks for admin or privileged routes.

4. Security practices:
- Avoid exposing sensitive payload data inside tokens.
- Keep strict token expiry.
- Use secure cookie options where relevant (`httpOnly`, `secure`, `sameSite`).

5. Error handling approach in auth flow:
- Return consistent unauthorized/forbidden responses.
- Keep failure messages safe and not overly revealing.

## Practical Completion
- Implemented utility patterns for:
  - token generation metadata
  - token expiry validation
  - request authorization simulation
  - role permission checks

## Outcome
Improved backend security understanding and prepared reusable authentication logic patterns that can be adapted directly in Express-based APIs.
