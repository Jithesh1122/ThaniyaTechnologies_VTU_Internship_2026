function fakeServerToggle(shouldSucceed) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldSucceed) {
        resolve({ ok: true });
      } else {
        reject(new Error("Server rejected toggle update"));
      }
    }, 300);
  });
}

async function runPractice() {
  console.log("Optimistic toggle simulation\n");

  let isEnabled = false;

  const scenarios = [true, false];

  for (const shouldSucceed of scenarios) {
    const previousValue = isEnabled;
    isEnabled = !isEnabled;

    console.log(`Optimistically updated toggle to: ${isEnabled}`);

    try {
      await fakeServerToggle(shouldSucceed);
      console.log(`Server confirmed toggle state: ${isEnabled}\n`);
    } catch (error) {
      isEnabled = previousValue;
      console.log(`Rollback triggered: ${error.message}`);
      console.log(`Restored toggle state to: ${isEnabled}\n`);
    }
  }
}

runPractice();
