function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function createFlakyService(failuresBeforeSuccess) {
  let calls = 0;

  return async function requestResource() {
    calls += 1;

    if (calls <= failuresBeforeSuccess) {
      throw new Error(`Temporary failure on attempt ${calls}`);
    }

    return {
      ok: true,
      message: `Resource fetched on attempt ${calls}`,
    };
  };
}

async function retryWithBackoff(task, maxAttempts, baseDelayMs) {
  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      const result = await task();
      console.log(`Success on attempt ${attempt}`);
      return result;
    } catch (error) {
      console.log(`Attempt ${attempt} failed: ${error.message}`);

      if (attempt === maxAttempts) {
        throw new Error(`Stopped after ${maxAttempts} attempts`);
      }

      const waitTime = baseDelayMs * 2 ** (attempt - 1);
      console.log(`Waiting ${waitTime}ms before retrying...`);
      await delay(waitTime);
    }
  }
}

async function runPractice() {
  console.log("Retry with exponential backoff\n");

  const flakyService = createFlakyService(2);

  try {
    const result = await retryWithBackoff(flakyService, 4, 200);
    console.log("Final result:", result);
  } catch (error) {
    console.log("Operation failed:", error.message);
  }
}

runPractice();
