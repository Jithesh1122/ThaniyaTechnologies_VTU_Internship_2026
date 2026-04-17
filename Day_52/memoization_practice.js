const products = [
  { id: 1, name: "Keyboard", category: "accessories", price: 1200 },
  { id: 2, name: "Mouse", category: "accessories", price: 800 },
  { id: 3, name: "Monitor", category: "display", price: 10500 },
  { id: 4, name: "Laptop", category: "computing", price: 65000 },
  { id: 5, name: "Dock", category: "accessories", price: 2500 },
];

function expensiveFilter(list, category) {
  console.log(`Computing filter for category: ${category}`);

  return list.filter((item) => item.category === category);
}

function createMemoizedFilter() {
  let lastCategory = null;
  let lastResult = null;

  return function memoizedFilter(list, category) {
    if (lastCategory === category && lastResult) {
      console.log(`Using cached result for category: ${category}`);
      return lastResult;
    }

    lastCategory = category;
    lastResult = expensiveFilter(list, category);
    return lastResult;
  };
}

function runPractice() {
  console.log("Memoized derived-state simulation\n");

  const memoizedFilter = createMemoizedFilter();
  const selectedCategories = [
    "accessories",
    "accessories",
    "display",
    "display",
    "computing",
  ];

  for (const category of selectedCategories) {
    const result = memoizedFilter(products, category);
    console.log(`Visible items: ${result.map((item) => item.name).join(", ")}`);
    console.log("");
  }
}

runPractice();
