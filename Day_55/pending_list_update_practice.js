function fakeListRequest(shouldSucceed, item) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldSucceed) {
        resolve({ savedItem: item });
      } else {
        reject(new Error(`Failed to save "${item.label}"`));
      }
    }, 300);
  });
}

async function runPractice() {
  console.log("Optimistic list update with pending state simulation\n");

  let items = [];

  const submissions = [
    { label: "Design review", shouldSucceed: true },
    { label: "Client sync", shouldSucceed: false },
  ];

  for (const submission of submissions) {
    const optimisticItem = {
      id: Date.now() + Math.random(),
      label: submission.label,
      status: "pending",
    };

    items = [...items, optimisticItem];
    console.log("After optimistic add:");
    console.table(items);

    try {
      await fakeListRequest(submission.shouldSucceed, optimisticItem);
      items = items.map((item) =>
        item.id === optimisticItem.id ? { ...item, status: "confirmed" } : item
      );
      console.log("After server confirmation:");
      console.table(items);
    } catch (error) {
      items = items.filter((item) => item.id !== optimisticItem.id);
      console.log(`Rollback triggered: ${error.message}`);
      console.log("After failed optimistic add rollback:");
      console.table(items);
    }

    console.log("");
  }
}

runPractice();
