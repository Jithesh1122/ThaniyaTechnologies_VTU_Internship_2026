const rolloutStages = [
  { percentage: 10, version: "v2" },
  { percentage: 30, version: "v2" },
  { percentage: 60, version: "v2" },
  { percentage: 100, version: "v2" },
];

function runRollout(stages) {
  console.log("Gradual deployment rollout simulation\n");

  let oldVersionTraffic = 100;

  for (const stage of stages) {
    const newVersionTraffic = stage.percentage;
    oldVersionTraffic = 100 - newVersionTraffic;

    console.log(
      `Traffic split -> ${stage.version}: ${newVersionTraffic}% | v1: ${oldVersionTraffic}%`
    );
  }

  console.log("\nRollout complete");
}

runRollout(rolloutStages);
