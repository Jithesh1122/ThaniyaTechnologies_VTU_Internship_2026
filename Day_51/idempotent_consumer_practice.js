const incomingEvents = [
  { id: "evt-001", type: "email.send", payload: { to: "user@example.com" } },
  { id: "evt-002", type: "report.generate", payload: { reportId: "weekly-sales" } },
  { id: "evt-001", type: "email.send", payload: { to: "user@example.com" } },
  { id: "evt-003", type: "cache.refresh", payload: { key: "dashboard" } },
  { id: "evt-002", type: "report.generate", payload: { reportId: "weekly-sales" } },
];

const processedEventIds = new Set();

function handleEvent(event) {
  switch (event.type) {
    case "email.send":
      return `Email prepared for ${event.payload.to}`;
    case "report.generate":
      return `Report generated for ${event.payload.reportId}`;
    case "cache.refresh":
      return `Cache refreshed for ${event.payload.key}`;
    default:
      throw new Error(`Unknown event type: ${event.type}`);
  }
}

function runPractice() {
  console.log("Idempotent consumer simulation\n");

  const results = [];

  for (const event of incomingEvents) {
    if (processedEventIds.has(event.id)) {
      console.log(`Skipped duplicate event ${event.id}`);
      results.push({ id: event.id, status: "duplicate-skipped" });
      continue;
    }

    const result = handleEvent(event);
    processedEventIds.add(event.id);
    console.log(`Processed ${event.id}: ${result}`);
    results.push({ id: event.id, status: "processed", result });
  }

  console.log("\nConsumer summary:");
  console.table(results);
}

runPractice();
