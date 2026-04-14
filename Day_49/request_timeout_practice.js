function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function simulatedDependency(responseTimeMs) {
  await delay(responseTimeMs);
  return `Dependency responded in ${responseTimeMs}ms`;
}

function withTimeout(taskPromise, timeoutMs) {
  return Promise.race([
    taskPromise,
    new Promise((_, reject) => {
      setTimeout(() => {
        reject(new Error(`Timed out after ${timeoutMs}ms`));
      }, timeoutMs);
    }),
  ]);
}

async function runPractice() {
  console.log("Request timeout simulation\n");

  const scenarios = [
    { label: "fast dependency", responseTimeMs: 200, timeoutMs: 500 },
    { label: "slow dependency", responseTimeMs: 900, timeoutMs: 500 },
  ];

  for (const scenario of scenarios) {
    try {
      console.log(`Running ${scenario.label}`);
      const result = await withTimeout(
        simulatedDependency(scenario.responseTimeMs),
        scenario.timeoutMs
      );
      console.log(`Success: ${result}\n`);
    } catch (error) {
      console.log(`Failure: ${error.message}\n`);
    }
  }
}

runPractice();
