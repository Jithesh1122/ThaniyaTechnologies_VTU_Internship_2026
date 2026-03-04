/**
 * Integrated backend practice
 * Combines validation, permission checks, query shaping, and cache-aware reads.
 */

const cache = new Map();
const dataStore = [
  { id: 1, title: "Prepare API design", ownerId: "u1", priority: "high", status: "open" },
  { id: 2, title: "Add auth guard", ownerId: "u2", priority: "medium", status: "open" },
  { id: 3, title: "Review caching", ownerId: "u1", priority: "low", status: "done" },
];

function successResponse(data, message = "OK") {
  return { success: true, message, data };
}

function errorResponse(message, code, details = null) {
  return { success: false, message, error: { code, details } };
}

function validateCreatePayload(payload) {
  const errors = [];
  if (!payload || typeof payload !== "object") {
    return [{ field: "payload", message: "Payload must be an object" }];
  }
  if (!payload.title || payload.title.trim().length < 3) {
    errors.push({ field: "title", message: "Title must be at least 3 characters" });
  }
  if (payload.priority && !["low", "medium", "high"].includes(payload.priority)) {
    errors.push({ field: "priority", message: "Priority must be low, medium, or high" });
  }
  return errors;
}

function checkPermission(user, allowedRoles) {
  if (!user || !allowedRoles.includes(user.role)) {
    return false;
  }
  return true;
}

function parseListQuery(query = {}) {
  const page = Math.max(1, Number(query.page) || 1);
  const limit = Math.min(20, Math.max(1, Number(query.limit) || 5));
  const sortBy = ["id", "priority", "status"].includes(query.sortBy) ? query.sortBy : "id";
  const order = query.order === "desc" ? -1 : 1;
  return { page, limit, sortBy, order };
}

function listTasksService(query) {
  const key = JSON.stringify(query);
  if (cache.has(key)) {
    return successResponse({ source: "cache", items: cache.get(key) }, "Tasks fetched");
  }

  const { page, limit, sortBy, order } = parseListQuery(query);
  const sorted = [...dataStore].sort((a, b) => (a[sortBy] > b[sortBy] ? order : -order));
  const start = (page - 1) * limit;
  const items = sorted.slice(start, start + limit);

  cache.set(key, items);
  return successResponse({ source: "db", items }, "Tasks fetched");
}

function createTaskService(user, payload) {
  if (!checkPermission(user, ["admin", "editor"])) {
    return errorResponse("Forbidden", "FORBIDDEN");
  }

  const errors = validateCreatePayload(payload);
  if (errors.length > 0) {
    return errorResponse("Validation failed", "VALIDATION_ERROR", errors);
  }

  const task = {
    id: dataStore.length + 1,
    title: payload.title.trim(),
    ownerId: user.id,
    priority: payload.priority || "medium",
    status: "open",
  };

  dataStore.push(task);
  cache.clear();

  return successResponse(task, "Task created");
}

const userEditor = { id: "u1", role: "editor" };
const userViewer = { id: "u9", role: "viewer" };

console.log("List #1:", listTasksService({ page: 1, limit: 2, sortBy: "id", order: "asc" }));
console.log("List #2 (cached):", listTasksService({ page: 1, limit: 2, sortBy: "id", order: "asc" }));
console.log("Create by viewer:", createTaskService(userViewer, { title: "New secure endpoint" }));
console.log("Create by editor:", createTaskService(userEditor, { title: "New secure endpoint", priority: "high" }));
console.log("List after create:", listTasksService({ page: 1, limit: 5, sortBy: "id", order: "asc" }));
