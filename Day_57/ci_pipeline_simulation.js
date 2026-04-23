const pipelineSteps = [
  {
    name: "Checkout repository",
    command: "actions/checkout",
    status: "success",
  },
  {
    name: "Set up Node.js",
    command: "setup-node@18",
    status: "success",
  },
  {
    name: "Install dependencies",
    command: "npm ci",
    status: "success",
  },
  {
    name: "Run validation",
    command: "npm test",
    status: "success",
  },
];

function runPipeline(steps) {
  console.log("CI pipeline step simulation\n");

  const results = [];

  for (const step of steps) {
    console.log(`Running: ${step.name}`);
    console.log(`Command: ${step.command}`);

    if (step.status !== "success") {
      results.push({ step: step.name, status: "failed" });
      console.log(`Pipeline stopped at: ${step.name}`);
      break;
    }

    results.push({ step: step.name, status: "passed" });
    console.log("Step passed\n");
  }

  console.log("Pipeline summary:");
  console.table(results);
}

runPipeline(pipelineSteps);
