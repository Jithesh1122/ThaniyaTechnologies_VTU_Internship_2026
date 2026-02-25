/**
 * Reusable API utilities for Node/Express + MongoDB projects.
 */

function createSuccessResponse(data, message = "OK", meta = {}) {
  return {
    success: true,
    message,
    data,
    meta,
  };
}

function createErrorResponse(message, code = "APP_ERROR", details = null) {
  return {
    success: false,
    message,
    error: {
      code,
      details,
    },
  };
}

function parsePagination(query = {}) {
  const rawPage = Number(query.page);
  const rawLimit = Number(query.limit);

  const page = Number.isInteger(rawPage) && rawPage > 0 ? rawPage : 1;
  const limit = Number.isInteger(rawLimit) && rawLimit > 0 ? Math.min(rawLimit, 100) : 10;
  const skip = (page - 1) * limit;

  return { page, limit, skip };
}

function buildSort(query = {}, allowedFields = ["createdAt", "updatedAt", "title", "priority"]) {
  const sortBy = allowedFields.includes(query.sortBy) ? query.sortBy : "createdAt";
  const order = query.order === "asc" ? 1 : -1;
  return { [sortBy]: order };
}

function buildProjection(fields = "", allowedFields = []) {
  if (!fields || !allowedFields.length) return {};

  return fields
    .split(",")
    .map((f) => f.trim())
    .filter((f) => allowedFields.includes(f))
    .reduce((acc, field) => {
      acc[field] = 1;
      return acc;
    }, {});
}

function buildTaskFilters(query = {}) {
  const filter = {};

  if (query.status) filter.status = query.status;
  if (query.priority) filter.priority = query.priority;

  if (query.q && query.q.trim()) {
    filter.$or = [
      { title: { $regex: query.q.trim(), $options: "i" } },
      { description: { $regex: query.q.trim(), $options: "i" } },
    ];
  }

  return filter;
}

// Demo usage
const query = {
  page: "2",
  limit: "20",
  sortBy: "updatedAt",
  order: "desc",
  fields: "title,status,createdAt,secretField",
  status: "in_progress",
  q: "api",
};

const pagination = parsePagination(query);
const sort = buildSort(query);
const projection = buildProjection(query.fields, ["title", "status", "createdAt", "updatedAt"]);
const filters = buildTaskFilters(query);

console.log("Pagination:", pagination);
console.log("Sort:", sort);
console.log("Projection:", projection);
console.log("Filters:", filters);
console.log("Success envelope:", createSuccessResponse([{ id: 1, title: "Demo Task" }], "Tasks fetched", { pagination }));
console.log("Error envelope:", createErrorResponse("Validation failed", "VALIDATION_ERROR", { field: "title" }));
