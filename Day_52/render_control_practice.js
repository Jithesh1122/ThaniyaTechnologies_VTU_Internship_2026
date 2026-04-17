function shallowEqual(objA, objB) {
  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  for (const key of keysA) {
    if (objA[key] !== objB[key]) {
      return false;
    }
  }

  return true;
}

function createMemoizedChildRenderer() {
  let lastProps = null;

  return function renderChild(props) {
    if (lastProps && shallowEqual(lastProps, props)) {
      console.log("Child render skipped because props stayed stable");
      return;
    }

    lastProps = props;
    console.log(`Child rendered with label="${props.label}"`);
  };
}

function runPractice() {
  console.log("Render control and stable-props simulation\n");

  const renderChild = createMemoizedChildRenderer();

  const scenarios = [
    { label: "Save", theme: "light" },
    { label: "Save", theme: "light" },
    { label: "Save", theme: "dark" },
    { label: "Save", theme: "dark" },
    { label: "Publish", theme: "dark" },
  ];

  for (const scenario of scenarios) {
    renderChild(scenario);
  }
}

runPractice();
