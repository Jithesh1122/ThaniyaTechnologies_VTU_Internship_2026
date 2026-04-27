const logs = [
  {
    timestamp: "2026-04-27T10:00:00Z",
    level: "info",
    message: "Server started",
    service: "api-service",
    port: 3000,
  },
  {
    timestamp: "2026-04-27T10:01:10Z",
    level: "info",
    message: "Request completed",
    route: "/health",
    requestId: "req-101",
    statusCode: 200,
  },
  {
    timestamp: "2026-04-27T10:02:25Z",
    level: "warn",
    message: "Slow downstream response",
    dependency: "payment-service",
    durationMs: 1450,
  },
  {
    timestamp: "2026-04-27T10:03:40Z",
    level: "error",
    message: "Database connection failed",
    service: "api-service",
    requestId: "req-102",
  },
];

function runPractice() {
  console.log("Structured logging simulation\n");

  for (const log of logs) {
    console.log(JSON.stringify(log));
  }
}

runPractice();
