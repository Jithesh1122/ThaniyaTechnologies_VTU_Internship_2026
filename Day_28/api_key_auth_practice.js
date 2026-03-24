/**
 * Practical API key authentication simulation.
 * Demonstrates key validation and scope-based authorization.
 */

const apiKeys = [
  { key: "key_public_123", active: true, scopes: ["read:reports"] },
  { key: "key_admin_456", active: true, scopes: ["read:reports", "write:reports"] },
  { key: "key_old_789", active: false, scopes: ["read:reports"] },
];

function findApiKey(rawKey) {
  return apiKeys.find((entry) => entry.key === rawKey) || null;
}

function authorizeRequest(rawKey, requiredScope) {
  if (!rawKey) {
    return {
      success: false,
      message: "Missing API key",
    };
  }

  const keyEntry = findApiKey(rawKey);

  if (!keyEntry || !keyEntry.active) {
    return {
      success: false,
      message: "Invalid or inactive API key",
    };
  }

  if (!keyEntry.scopes.includes(requiredScope)) {
    return {
      success: false,
      message: "Insufficient scope",
    };
  }

  return {
    success: true,
    message: "Authorized",
    scopes: keyEntry.scopes,
  };
}

console.log("Read access:", authorizeRequest("key_public_123", "read:reports"));
console.log("Write denied:", authorizeRequest("key_public_123", "write:reports"));
console.log("Write allowed:", authorizeRequest("key_admin_456", "write:reports"));
console.log("Inactive key:", authorizeRequest("key_old_789", "read:reports"));
