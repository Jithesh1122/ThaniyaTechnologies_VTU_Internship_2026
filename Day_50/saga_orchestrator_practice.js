class SagaOrchestrator {
  constructor(steps) {
    this.steps = steps;
    this.completedSteps = [];
  }

  async execute() {
    for (const step of this.steps) {
      try {
        await step.action();
        this.completedSteps.push(step);
        console.log(`Completed: ${step.name}`);
      } catch (error) {
        console.log(`Failed at ${step.name}: ${error.message}`);
        await this.compensate();
        throw new Error(`Saga failed at ${step.name}`);
      }
    }

    console.log("Saga completed successfully");
  }

  async compensate() {
    console.log("Running compensations in reverse order");

    for (let index = this.completedSteps.length - 1; index >= 0; index -= 1) {
      const step = this.completedSteps[index];
      await step.compensate();
      console.log(`Compensated: ${step.name}`);
    }
  }
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function runPractice() {
  console.log("Saga orchestrator simulation\n");

  const steps = [
    {
      name: "reserve-stock",
      action: async () => delay(100),
      compensate: async () => delay(50),
    },
    {
      name: "authorize-payment",
      action: async () => delay(100),
      compensate: async () => delay(50),
    },
    {
      name: "schedule-shipment",
      action: async () => {
        await delay(100);
        throw new Error("Shipment service unavailable");
      },
      compensate: async () => delay(50),
    },
  ];

  const orchestrator = new SagaOrchestrator(steps);

  try {
    await orchestrator.execute();
  } catch (error) {
    console.log(error.message);
  }
}

runPractice();
