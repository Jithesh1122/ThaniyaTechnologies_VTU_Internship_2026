const totalItems = 1000;
const itemHeight = 40;
const viewportHeight = 200;
const overscan = 2;

function getVisibleRange(scrollTop) {
  const firstVisibleIndex = Math.floor(scrollTop / itemHeight);
  const visibleCount = Math.ceil(viewportHeight / itemHeight);

  const startIndex = Math.max(0, firstVisibleIndex - overscan);
  const endIndex = Math.min(
    totalItems - 1,
    firstVisibleIndex + visibleCount + overscan - 1
  );

  return { startIndex, endIndex };
}

function renderWindow(scrollTop) {
  const { startIndex, endIndex } = getVisibleRange(scrollTop);
  const renderedItems = [];

  for (let index = startIndex; index <= endIndex; index += 1) {
    renderedItems.push(`Item ${index}`);
  }

  console.log(`ScrollTop: ${scrollTop}`);
  console.log(`Rendering items ${startIndex} to ${endIndex}`);
  console.log(renderedItems.join(", "));
  console.log("");
}

function runPractice() {
  console.log("Windowed list rendering simulation\n");

  const scrollPositions = [0, 80, 240, 1200];

  for (const scrollTop of scrollPositions) {
    renderWindow(scrollTop);
  }
}

runPractice();
