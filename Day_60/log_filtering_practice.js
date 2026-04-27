const logRecords = [
  { level: "info", message: "Server boot complete", route: "/" },
  { level: "info", message: "Request succeeded", route: "/health" },
  { level: "warn", message: "Cache miss spike detected", route: "/reports" },
  { level: "error", message: "Unhandled exception in worker", route: "/jobs" },
  { level: "warn", message: "Retry threshold nearing limit", route: "/sync" },
];

function filterLogs(records, levels) {
  return records.filter((record) => levels.includes(record.level));
}

function runPractice() {
  console.log("Log filtering simulation\n");

  const importantLogs = filterLogs(logRecords, ["warn", "error"]);

  console.log("Filtered warning and error logs:");
  console.table(importantLogs);
}

runPractice();
