const entityState = {
  orderId: "ORD-501",
  status: "created",
  version: 1,
};

const events = [
  { id: "evt-a", status: "paid", version: 2 },
  { id: "evt-b", status: "shipped", version: 3 },
  { id: "evt-c", status: "paid", version: 2 },
  { id: "evt-d", status: "delivered", version: 4 },
];

function applyEvent(event) {
  if (event.version <= entityState.version) {
    console.log(
      `Ignored stale event ${event.id} with version ${event.version}`
    );
    return;
  }

  entityState.status = event.status;
  entityState.version = event.version;
  console.log(
    `Applied event ${event.id}: status -> ${event.status}, version -> ${event.version}`
  );
}

function runPractice() {
  console.log("Event ordering and stale-event handling simulation\n");
  console.log("Initial state:");
  console.table(entityState);
  console.log("");

  for (const event of events) {
    applyEvent(event);
  }

  console.log("\nFinal state:");
  console.table(entityState);
}

runPractice();
