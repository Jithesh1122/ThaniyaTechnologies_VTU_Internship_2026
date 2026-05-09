const attempts = [
  { attempt: 1, shouldSucceed: false },
  { attempt: 2, shouldSucceed: true },
];

function fakeRetryableRequest(shouldSucceed) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldSucceed) {
        resolve("Fresh data loaded successfully");
      } else {
        reject(new Error("Temporary network issue"));
      }
    }, 200);
  });
}

async function runPractice() {
  console.log("Retry and feedback simulation\n");

  for (const step of attempts) {
    console.log(`Attempt ${step.attempt}`);
    console.log("UI -> loading");

    try {
      const result = await fakeRetryableRequest(step.shouldSucceed);
      console.log(`UI -> success: ${result}\n`);
      break;
    } catch (error) {
      console.log(`UI -> error: ${error.message}`);
      console.log("UI -> show retry option\n");
    }
  }
}

runPractice();
