function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function step(name, durationMs) {
  await delay(durationMs);
  return `${name} finished in ${durationMs}ms`;
}

async function runFlowWithDeadline(deadlineMs) {
  const startedAt = Date.now();
  const flowSteps = [
    { name: "validate-input", durationMs: 120 },
    { name: "fetch-profile", durationMs: 220 },
    { name: "enrich-response", durationMs: 260 },
  ];

  const completed = [];

  for (const currentStep of flowSteps) {
    const elapsed = Date.now() - startedAt;
    const remaining = deadlineMs - elapsed;

    if (remaining <= 0 || currentStep.durationMs > remaining) {
      throw new Error(
        `Deadline exceeded before ${currentStep.name}. Remaining time: ${remaining}ms`
      );
    }

    const result = await step(currentStep.name, currentStep.durationMs);
    completed.push(result);
  }

  return completed;
}

async function runPractice() {
  console.log("Deadline-based flow control simulation\n");

  const deadlines = [800, 450];

  for (const deadlineMs of deadlines) {
    try {
      console.log(`Running flow with ${deadlineMs}ms deadline`);
      const result = await runFlowWithDeadline(deadlineMs);
      console.log("Completed steps:");
      console.log(result);
      console.log("");
    } catch (error) {
      console.log(`Stopped: ${error.message}\n`);
    }
  }
}

runPractice();
