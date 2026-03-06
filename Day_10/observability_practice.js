
function createLogger() {
  return {
    log(level, message, context = {}) {
      const entry = {
        ts: new Date().toISOString(),
        level,
        message,
        ...context,
      };
      console.log(JSON.stringify(entry));
    },
    info(message, context) {
      this.log("info", message, context);
    },
    warn(message, context) {
      this.log("warn", message, context);
    },
    error(message, context) {
      this.log("error", message, context);
    },
  };
}

function createMetrics() {
  const state = {
    totalRequests: 0,
    successCount: 0,
    errorCount: 0,
    totalDurationMs: 0,
  };

  return {
    record(durationMs, ok) {
      state.totalRequests += 1;
      state.totalDurationMs += durationMs;
      if (ok) state.successCount += 1;
      else state.errorCount += 1;
    },
    summary() {
      const avg = state.totalRequests === 0 ? 0 : Number((state.totalDurationMs / state.totalRequests).toFixed(2));
      return {
        ...state,
        averageDurationMs: avg,
      };
    },
  };
}

function createRequestId(seed) {
  return `req_${seed}_${Math.floor(Math.random() * 10000)}`;
}

function simulateHandler(input) {
  if (!input || !input.action) {
    const err = new Error("Missing action");
    err.code = "VALIDATION_ERROR";
    throw err;
  }

  if (input.action === "compute") {
    return { status: 200, result: input.value * 2 };
  }

  if (input.action === "fail") {
    const err = new Error("Simulated processing failure");
    err.code = "PROCESSING_ERROR";
    throw err;
  }

  return { status: 200, result: "no-op" };
}

function processRequest(logger, metrics, seed, payload) {
  const requestId = createRequestId(seed);
  const started = Date.now();

  logger.info("request_received", { requestId, payload });

  try {
    const output = simulateHandler(payload);
    const duration = Date.now() - started;

    metrics.record(duration, true);
    logger.info("request_completed", { requestId, durationMs: duration, status: output.status });

    return output;
  } catch (error) {
    const duration = Date.now() - started;

    metrics.record(duration, false);
    logger.error("request_failed", {
      requestId,
      durationMs: duration,
      errorCode: error.code || "UNKNOWN_ERROR",
      errorMessage: error.message,
    });

    return { status: 500, error: error.message };
  }
}

const logger = createLogger();
const metrics = createMetrics();

processRequest(logger, metrics, 1, { action: "compute", value: 8 });
processRequest(logger, metrics, 2, { action: "fail" });
processRequest(logger, metrics, 3, { value: 10 });

logger.warn("metrics_summary", metrics.summary());
