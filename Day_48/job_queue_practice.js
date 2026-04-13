const jobs = [
  { id: "job-101", type: "send-email", payload: { to: "user1@example.com" } },
  { id: "job-102", type: "generate-report", payload: { reportId: "sales-weekly" } },
  { id: "job-103", type: "sync-analytics", payload: { period: "daily" } },
];

function processJob(job) {
  console.log(`Processing ${job.id} (${job.type})`);

  switch (job.type) {
    case "send-email":
      return `Email queued for ${job.payload.to}`;
    case "generate-report":
      return `Report prepared for ${job.payload.reportId}`;
    case "sync-analytics":
      return `Analytics synced for ${job.payload.period} period`;
    default:
      throw new Error(`Unknown job type: ${job.type}`);
  }
}

function runQueue(queue) {
  console.log("Background job queue simulation\n");

  const completed = [];

  for (const job of queue) {
    try {
      const result = processJob(job);
      completed.push({ id: job.id, status: "completed", result });
      console.log(`Completed: ${result}\n`);
    } catch (error) {
      completed.push({ id: job.id, status: "failed", error: error.message });
      console.log(`Failed: ${error.message}\n`);
    }
  }

  console.log("Final job summary:");
  console.table(completed);
}

runQueue(jobs);
