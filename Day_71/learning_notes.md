# Learning Notes: Session Persistence and Protected Navigation

## Why This Topic Matters
In a real MERN project, login is not only about sending credentials to the backend. The frontend must also manage:
- Whether the user stays logged in after refresh
- Which pages require authentication
- How failed login or invalid input is shown
- How user data is restored safely after page reload

These decisions shape both reliability and user experience.

## Session Persistence
Session persistence means the frontend remembers enough information to restore the logged-in state after refresh.

Common stored values:
- JWT token
- Basic user info
- Role or permission-related data

This is often stored in `localStorage` for simple flows, though it should still be handled carefully.

## Protected Navigation
Some pages should not be accessible unless the user is authenticated. Examples:
- Dashboard
- Profile page
- Role-specific routes

Protected navigation ensures:
- Unauthenticated users are redirected
- Sensitive pages stay guarded
- The UI behaves consistently with backend access rules

## Form Validation Flow
Frontend validation improves usability before backend submission.

Examples:
- Required fields must not be empty
- Email format should look valid
- Password confirmation should match

This does not replace backend validation, but it helps reduce avoidable failed submissions and gives faster feedback to the user.

## Error Handling in Auth Flow
A good auth flow should handle:
- Missing input
- Invalid credentials
- Expired or invalid tokens
- Redirect behavior after failed access

This makes the application feel more stable and easier to use.

## Design Lessons
- Auth is both a security flow and a user-experience flow
- Session persistence should be deliberate and easy to recover from
- Protected routes should mirror real access expectations
- Validation should help the user early without replacing backend checks
- Frontend auth behavior becomes stronger when state, storage, and redirects work together

## Practical Reflection
The practical exercises showed that authentication flow is more than a login form. It is a combination of storage, route rules, validation, and clear state restoration after refresh or redirect.
