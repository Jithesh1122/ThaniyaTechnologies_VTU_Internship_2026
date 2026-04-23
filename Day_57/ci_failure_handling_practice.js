const scenarios = [
  {
    label: "Successful validation",
    steps: [
      { name: "Install dependencies", passed: true },
      { name: "Run syntax check", passed: true },
      { name: "Run tests", passed: true },
    ],
  },
  {
    label: "Failing validation",
    steps: [
      { name: "Install dependencies", passed: true },
      { name: "Run syntax check", passed: false },
      { name: "Run tests", passed: true },
    ],
  },
];

function evaluateScenario(scenario) {
  console.log(`Scenario: ${scenario.label}`);

  for (const step of scenario.steps) {
    if (!step.passed) {
      console.log(`${step.name}: failed`);
      console.log("Result: pipeline should stop and report the failure\n");
      return;
    }

    console.log(`${step.name}: passed`);
  }

  console.log("Result: pipeline completed successfully\n");
}

function runPractice() {
  console.log("CI failure handling simulation\n");

  for (const scenario of scenarios) {
    evaluateScenario(scenario);
  }
}

runPractice();
