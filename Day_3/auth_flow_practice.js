/**
 * Practical auth flow simulation:
 * - token metadata generation
 * - expiry check
 * - authorization guard
 * - role guard
 */

function createTokenMeta(userId, role, expiresInSeconds) {
  const issuedAt = Math.floor(Date.now() / 1000);
  return {
    userId,
    role,
    iat: issuedAt,
    exp: issuedAt + expiresInSeconds,
  };
}

function isTokenExpired(tokenMeta, nowInSeconds = Math.floor(Date.now() / 1000)) {
  if (!tokenMeta || typeof tokenMeta !== "object") return true;
  return nowInSeconds >= tokenMeta.exp;
}

function authorizeRequest(tokenMeta) {
  if (!tokenMeta) {
    return { allowed: false, statusCode: 401, reason: "Missing token" };
  }

  if (isTokenExpired(tokenMeta)) {
    return { allowed: false, statusCode: 401, reason: "Token expired" };
  }

  return {
    allowed: true,
    statusCode: 200,
    user: { id: tokenMeta.userId, role: tokenMeta.role },
  };
}

function checkRole(user, allowedRoles = []) {
  if (!user || !allowedRoles.includes(user.role)) {
    return { allowed: false, statusCode: 403, reason: "Forbidden" };
  }
  return { allowed: true, statusCode: 200 };
}

// Demo scenarios
const validAccess = createTokenMeta("u_101", "editor", 3600);
const expiredAccess = createTokenMeta("u_202", "viewer", -10);

const authA = authorizeRequest(validAccess);
const authB = authorizeRequest(expiredAccess);

console.log("Valid token auth result:", authA);
console.log("Expired token auth result:", authB);

if (authA.allowed) {
  console.log("Role check (editor -> editor/admin):", checkRole(authA.user, ["editor", "admin"]));
  console.log("Role check (editor -> admin):", checkRole(authA.user, ["admin"]));
}
