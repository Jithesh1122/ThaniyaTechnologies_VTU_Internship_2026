const settings = {
  totalItems: 500,
  itemHeight: 50,
  viewportHeight: 250,
  overscan: 1,
};

function calculateVirtualLayout(scrollTop) {
  const firstVisibleIndex = Math.floor(scrollTop / settings.itemHeight);
  const visibleCount = Math.ceil(settings.viewportHeight / settings.itemHeight);

  const startIndex = Math.max(0, firstVisibleIndex - settings.overscan);
  const endIndex = Math.min(
    settings.totalItems - 1,
    firstVisibleIndex + visibleCount + settings.overscan - 1
  );

  const topSpacerHeight = startIndex * settings.itemHeight;
  const bottomSpacerHeight =
    (settings.totalItems - endIndex - 1) * settings.itemHeight;

  return {
    startIndex,
    endIndex,
    topSpacerHeight,
    bottomSpacerHeight,
  };
}

function runPractice() {
  console.log("Virtualization layout math simulation\n");

  const testScrollPositions = [0, 150, 5000];

  for (const scrollTop of testScrollPositions) {
    const layout = calculateVirtualLayout(scrollTop);
    console.log(`ScrollTop: ${scrollTop}`);
    console.table(layout);
  }
}

runPractice();
