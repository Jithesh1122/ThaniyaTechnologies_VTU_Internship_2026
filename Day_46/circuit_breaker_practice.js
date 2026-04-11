class CircuitBreaker {
  constructor(action, failureThreshold, cooldownCalls) {
    this.action = action;
    this.failureThreshold = failureThreshold;
    this.cooldownCalls = cooldownCalls;
    this.state = "CLOSED";
    this.failureCount = 0;
    this.blockedCalls = 0;
  }

  async execute() {
    if (this.state === "OPEN") {
      this.blockedCalls += 1;
      console.log(`Call blocked while circuit is OPEN (${this.blockedCalls})`);

      if (this.blockedCalls >= this.cooldownCalls) {
        this.state = "HALF_OPEN";
        console.log("Circuit moved to HALF_OPEN for a recovery check");
      } else {
        throw new Error("Circuit is open");
      }
    }

    try {
      const result = await this.action();
      this.failureCount = 0;
      this.blockedCalls = 0;

      if (this.state === "HALF_OPEN") {
        console.log("Recovery confirmed, circuit closed again");
      }

      this.state = "CLOSED";
      return result;
    } catch (error) {
      this.failureCount += 1;
      console.log(`Execution failed. Failure count: ${this.failureCount}`);

      if (this.failureCount >= this.failureThreshold) {
        this.state = "OPEN";
        this.blockedCalls = 0;
        console.log("Failure threshold reached, circuit opened");
      }

      throw error;
    }
  }
}

function createUnstableDependency() {
  let callCount = 0;

  return async function dependencyCall() {
    callCount += 1;

    if (callCount <= 3) {
      throw new Error(`Dependency failure on call ${callCount}`);
    }

    return `Dependency recovered on call ${callCount}`;
  };
}

async function runPractice() {
  console.log("Circuit breaker simulation\n");

  const dependency = createUnstableDependency();
  const breaker = new CircuitBreaker(dependency, 2, 2);

  for (let index = 1; index <= 7; index += 1) {
    try {
      const result = await breaker.execute();
      console.log(`Call ${index} result: ${result}`);
    } catch (error) {
      console.log(`Call ${index} error: ${error.message}`);
    }

    console.log(`Current state: ${breaker.state}\n`);
  }
}

runPractice();
