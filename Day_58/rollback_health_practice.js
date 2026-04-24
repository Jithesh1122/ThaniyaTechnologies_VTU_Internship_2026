const deploymentChecks = [
  { stage: "10% traffic", health: "healthy" },
  { stage: "30% traffic", health: "healthy" },
  { stage: "60% traffic", health: "unhealthy" },
];

function evaluateDeployment(checks) {
  console.log("Health-check and rollback simulation\n");

  for (const check of checks) {
    console.log(`Evaluating stage: ${check.stage}`);

    if (check.health !== "healthy") {
      console.log(`Health status: ${check.health}`);
      console.log("Action: stop rollout and trigger rollback to previous version\n");
      return;
    }

    console.log("Health status: healthy");
    console.log("Action: continue rollout\n");
  }

  console.log("Deployment reached final stage successfully");
}

evaluateDeployment(deploymentChecks);
