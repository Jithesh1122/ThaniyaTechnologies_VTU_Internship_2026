
function createAlertEngine(config = {}) {
  const thresholds = {
    errorRateWarn: config.errorRateWarn ?? 0.15,
    errorRateCritical: config.errorRateCritical ?? 0.3,
    latencyWarnMs: config.latencyWarnMs ?? 300,
    latencyCriticalMs: config.latencyCriticalMs ?? 600,
    cooldownCycles: config.cooldownCycles ?? 2,
  };

  const state = {
    lastAlertCycleByKey: new Map(),
  };

  function severityFromMetrics(snapshot) {
    const { errorRate, avgLatencyMs } = snapshot;

    if (errorRate >= thresholds.errorRateCritical || avgLatencyMs >= thresholds.latencyCriticalMs) {
      return "critical";
    }

    if (errorRate >= thresholds.errorRateWarn || avgLatencyMs >= thresholds.latencyWarnMs) {
      return "warning";
    }

    return "normal";
  }

  function shouldAlert(cycle, key) {
    const previous = state.lastAlertCycleByKey.get(key);
    if (previous === undefined) return true;
    return cycle - previous > thresholds.cooldownCycles;
  }

  function evaluate(cycle, snapshot) {
    const severity = severityFromMetrics(snapshot);
    if (severity === "normal") {
      return { emitted: false, reason: "no_anomaly" };
    }

    const key = `${snapshot.route}|${severity}`;
    if (!shouldAlert(cycle, key)) {
      return { emitted: false, reason: "cooldown_active" };
    }

    state.lastAlertCycleByKey.set(key, cycle);

    const incident = {
      incidentKey: key,
      severity,
      route: snapshot.route,
      errorRate: snapshot.errorRate,
      avgLatencyMs: snapshot.avgLatencyMs,
      requestCount: snapshot.requestCount,
      note: severity === "critical" ? "Immediate investigation required" : "Monitor closely",
    };

    return { emitted: true, incident };
  }

  return { evaluate };
}

const engine = createAlertEngine({
  errorRateWarn: 0.2,
  errorRateCritical: 0.4,
  latencyWarnMs: 350,
  latencyCriticalMs: 700,
  cooldownCycles: 1,
});

const metricCycles = [
  { cycle: 1, route: "/students", requestCount: 120, errorRate: 0.08, avgLatencyMs: 180 },
  { cycle: 2, route: "/students", requestCount: 140, errorRate: 0.26, avgLatencyMs: 390 },
  { cycle: 3, route: "/students", requestCount: 130, errorRate: 0.29, avgLatencyMs: 410 },
  { cycle: 4, route: "/students", requestCount: 160, errorRate: 0.46, avgLatencyMs: 760 },
  { cycle: 5, route: "/students", requestCount: 155, errorRate: 0.45, avgLatencyMs: 730 },
];

for (const snapshot of metricCycles) {
  const result = engine.evaluate(snapshot.cycle, snapshot);
  if (result.emitted) {
    console.log("ALERT", result.incident);
  } else {
    console.log("NO_ALERT", { cycle: snapshot.cycle, reason: result.reason });
  }
}
