function fakeRequest(mode) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (mode === "success") {
        resolve([{ id: 1, name: "Asha" }, { id: 2, name: "Rohan" }]);
        return;
      }

      if (mode === "empty") {
        resolve([]);
        return;
      }

      reject(new Error("Failed to fetch project data"));
    }, 250);
  });
}

async function runScenario(mode) {
  console.log(`Scenario: ${mode}`);
  console.log("UI -> loading");

  try {
    const data = await fakeRequest(mode);

    if (data.length === 0) {
      console.log("UI -> empty state\n");
      return;
    }

    console.log("UI -> success state");
    console.table(data);
    console.log("");
  } catch (error) {
    console.log(`UI -> error state: ${error.message}\n`);
  }
}

async function runPractice() {
  console.log("Request lifecycle state simulation\n");

  await runScenario("success");
  await runScenario("empty");
  await runScenario("error");
}

runPractice();
