/**
 * Practical file-validation simulation.
 * Demonstrates size, type, and metadata checks.
 */

function validateUpload(file, metadata) {
  const allowedTypes = ["application/pdf", "image/png", "image/jpeg"];
  const maxSizeInBytes = 2 * 1024 * 1024;
  const errors = [];

  if (!file || typeof file !== "object") {
    errors.push("file is required");
  } else {
    if (!allowedTypes.includes(file.type)) {
      errors.push("unsupported file type");
    }

    if (!Number.isFinite(file.size) || file.size <= 0 || file.size > maxSizeInBytes) {
      errors.push("invalid file size");
    }
  }

  if (!metadata || typeof metadata !== "object") {
    errors.push("metadata is required");
  } else {
    if (!metadata.title || metadata.title.trim().length < 3) {
      errors.push("title is required");
    }

    if (!metadata.ownerId || metadata.ownerId.trim().length === 0) {
      errors.push("ownerId is required");
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

console.log(
  "Valid upload:",
  validateUpload(
    { name: "resume.pdf", type: "application/pdf", size: 120000 },
    { title: "Resume Upload", ownerId: "U1" }
  )
);

console.log(
  "Invalid upload:",
  validateUpload(
    { name: "archive.zip", type: "application/zip", size: 9000000 },
    { title: "A", ownerId: "" }
  )
);
