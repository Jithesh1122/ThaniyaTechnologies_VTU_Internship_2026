/**
 * Practical concurrency-control simulation.
 * Demonstrates lost updates and version-based safe updates.
 */

const record = {
  id: 1,
  title: "Prepare backend design",
  status: "draft",
  version: 1,
};

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function unsafeUpdate(sharedRecord, nextStatus) {
  const localCopy = clone(sharedRecord);
  localCopy.status = nextStatus;
  sharedRecord.status = localCopy.status;
  return clone(sharedRecord);
}

function safeUpdate(sharedRecord, nextStatus, expectedVersion) {
  if (expectedVersion !== sharedRecord.version) {
    return {
      success: false,
      message: "Version mismatch. Record has changed.",
      current: clone(sharedRecord),
    };
  }

  sharedRecord.status = nextStatus;
  sharedRecord.version += 1;

  return {
    success: true,
    current: clone(sharedRecord),
  };
}

const initialSnapshotA = clone(record);
const initialSnapshotB = clone(record);

console.log("Unsafe update A:", unsafeUpdate(record, "review"));
console.log("Unsafe update B overwriting A:", unsafeUpdate(record, "published"));

record.status = "draft";
record.version = 1;

const safeResultA = safeUpdate(record, "review", initialSnapshotA.version);
const safeResultB = safeUpdate(record, "published", initialSnapshotB.version);

console.log("Safe update A:", safeResultA);
console.log("Safe update B blocked:", safeResultB);
