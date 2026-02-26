/**
 * Day 2 Practical: Express-style error handling and validation demo
 * This file simulates backend flow without requiring Express installation.
 */

class AppError extends Error {
  constructor(message, statusCode = 500, code = "APP_ERROR", details = null) {
    super(message);
    this.name = "AppError";
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
    this.isOperational = true;
  }
}

function successResponse(data, message = "Success", meta = {}) {
  return {
    success: true,
    message,
    data,
    meta,
  };
}

function errorResponse(error) {
  return {
    success: false,
    message: error.message || "Unexpected error",
    error: {
      code: error.code || "INTERNAL_ERROR",
      details: error.details || null,
    },
  };
}

function validateCreateTaskPayload(payload) {
  const errors = [];

  if (!payload || typeof payload !== "object") {
    throw new AppError("Payload must be an object", 400, "INVALID_PAYLOAD");
  }

  if (!payload.title || payload.title.trim().length < 3) {
    errors.push({
      field: "title",
      message: "Title is required and should be at least 3 characters",
    });
  }

  if (payload.priority && !["low", "medium", "high"].includes(payload.priority)) {
    errors.push({
      field: "priority",
      message: "Priority must be one of: low, medium, high",
    });
  }

  if (errors.length > 0) {
    throw new AppError("Validation failed", 422, "VALIDATION_ERROR", errors);
  }
}

function createTaskController(payload) {
  validateCreateTaskPayload(payload);

  const newTask = {
    id: Date.now(),
    title: payload.title.trim(),
    priority: payload.priority || "medium",
    status: "todo",
    createdAt: new Date().toISOString(),
  };

  return successResponse(newTask, "Task created successfully");
}

function globalErrorHandler(err) {
  if (err instanceof AppError && err.isOperational) {
    return {
      statusCode: err.statusCode,
      body: errorResponse(err),
    };
  }

  const fallback = new AppError("Internal server error", 500, "INTERNAL_ERROR");
  return {
    statusCode: 500,
    body: errorResponse(fallback),
  };
}

function simulateRequest(payload) {
  try {
    const response = createTaskController(payload);
    return { statusCode: 201, body: response };
  } catch (err) {
    return globalErrorHandler(err);
  }
}

const goodPayload = { title: "Prepare API module", priority: "high" };
const badPayload = { title: "Hi", priority: "urgent" };

console.log("Good payload result:");
console.log(simulateRequest(goodPayload));

console.log("\nBad payload result:");
console.log(simulateRequest(badPayload));
