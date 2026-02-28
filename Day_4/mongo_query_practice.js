/**
 * Mongo query and aggregation practice
 * Focus: safe filter/sort/projection/pagination patterns
 */

function parsePagination(query = {}) {
  const pageNum = Number(query.page);
  const limitNum = Number(query.limit);

  const page = Number.isInteger(pageNum) && pageNum > 0 ? pageNum : 1;
  const limit = Number.isInteger(limitNum) && limitNum > 0 ? Math.min(limitNum, 100) : 20;
  const skip = (page - 1) * limit;

  return { page, limit, skip };
}

function buildSort(query = {}, allowed = ["createdAt", "updatedAt", "priority", "status"]) {
  const sortBy = allowed.includes(query.sortBy) ? query.sortBy : "createdAt";
  const order = query.order === "asc" ? 1 : -1;
  return { [sortBy]: order };
}

function buildProjection(fields = "", allowedFields = []) {
  if (!fields.trim()) return {};

  return fields
    .split(",")
    .map((x) => x.trim())
    .filter((x) => allowedFields.includes(x))
    .reduce((acc, field) => {
      acc[field] = 1;
      return acc;
    }, {});
}

function buildFilters(query = {}) {
  const filter = {};

  if (query.status) filter.status = query.status;
  if (query.priority) filter.priority = query.priority;

  if (query.search && query.search.trim()) {
    const value = query.search.trim();
    filter.$or = [
      { title: { $regex: value, $options: "i" } },
      { description: { $regex: value, $options: "i" } },
    ];
  }

  return filter;
}

function buildTaskPipeline(query = {}) {
  const { page, limit, skip } = parsePagination(query);
  const filter = buildFilters(query);
  const sort = buildSort(query);
  const projection = buildProjection(query.fields || "", [
    "title",
    "status",
    "priority",
    "createdAt",
    "updatedAt",
  ]);

  const pipeline = [{ $match: filter }, { $sort: sort }];

  if (Object.keys(projection).length > 0) {
    pipeline.push({ $project: projection });
  }

  pipeline.push({ $skip: skip }, { $limit: limit });

  return { page, limit, pipeline };
}

const sampleQuery = {
  page: "2",
  limit: "10",
  status: "in_progress",
  priority: "high",
  search: "auth",
  sortBy: "updatedAt",
  order: "desc",
  fields: "title,status,createdAt,secret",
};

console.log(buildTaskPipeline(sampleQuery));
