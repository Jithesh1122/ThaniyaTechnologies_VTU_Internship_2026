const incomingJobs = [
  { id: "job-201", type: "webhook-retry", shouldFailUntil: 0, attempts: 0 },
  { id: "job-202", type: "invoice-email", shouldFailUntil: 2, attempts: 0 },
  { id: "job-203", type: "pdf-export", shouldFailUntil: 5, attempts: 0 },
];

const maxAttempts = 3;
const retryQueue = [...incomingJobs];
const completedJobs = [];
const deadLetterQueue = [];

function executeJob(job) {
  job.attempts += 1;

  if (job.attempts <= job.shouldFailUntil) {
    throw new Error(`Temporary processing failure on attempt ${job.attempts}`);
  }

  return `${job.type} completed on attempt ${job.attempts}`;
}

function runWorker() {
  console.log("Retry and dead-letter queue simulation\n");

  while (retryQueue.length > 0) {
    const job = retryQueue.shift();

    try {
      const result = executeJob(job);
      completedJobs.push({
        id: job.id,
        attempts: job.attempts,
        status: "completed",
        result,
      });
      console.log(`${job.id} completed successfully`);
    } catch (error) {
      console.log(`${job.id} failed: ${error.message}`);

      if (job.attempts >= maxAttempts) {
        deadLetterQueue.push({
          id: job.id,
          attempts: job.attempts,
          reason: error.message,
        });
        console.log(`${job.id} moved to dead-letter queue`);
      } else {
        retryQueue.push(job);
        console.log(`${job.id} requeued for another attempt`);
      }
    }

    console.log("");
  }

  console.log("Completed jobs:");
  console.table(completedJobs);

  console.log("Dead-letter jobs:");
  console.table(deadLetterQueue);
}

runWorker();
