/**
 * Practical storage-key generation simulation.
 * Demonstrates normalized naming for uploaded files.
 */

function normalizeName(name) {
  return String(name || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9.-]/g, "");
}

function buildStorageKey(ownerId, fileName) {
  const normalizedFileName = normalizeName(fileName);
  const safeOwnerId = normalizeName(ownerId);

  return `${safeOwnerId}/${Date.now()}-${normalizedFileName}`;
}

console.log("Storage key #1:", buildStorageKey("User 101", "My Resume.pdf"));
console.log("Storage key #2:", buildStorageKey("Portfolio Team", "Screenshot Final.PNG"));
