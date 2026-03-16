/**
 * Practical webhook deduplication simulation.
 * Demonstrates retry-safe event handling with event-id tracking.
 */

const processedEventIds = new Set();
const paymentLedger = [];

function processWebhookEvent(event) {
  if (!event || !event.id || !event.type) {
    return {
      success: false,
      message: "Invalid event payload",
    };
  }

  if (processedEventIds.has(event.id)) {
    return {
      success: true,
      source: "duplicate_skip",
      message: "Event already processed",
    };
  }

  if (event.type === "payment.completed") {
    paymentLedger.push({
      eventId: event.id,
      orderId: event.orderId,
      amount: event.amount,
    });
  }

  processedEventIds.add(event.id);

  return {
    success: true,
    source: "new_process",
    message: "Event processed",
  };
}

const eventOne = {
  id: "evt_1001",
  type: "payment.completed",
  orderId: "ORD-501",
  amount: 499,
};

const eventDuplicate = {
  id: "evt_1001",
  type: "payment.completed",
  orderId: "ORD-501",
  amount: 499,
};

const eventTwo = {
  id: "evt_1002",
  type: "payment.completed",
  orderId: "ORD-502",
  amount: 799,
};

console.log("Event #1:", processWebhookEvent(eventOne));
console.log("Duplicate event:", processWebhookEvent(eventDuplicate));
console.log("Event #2:", processWebhookEvent(eventTwo));
console.log("Ledger:", paymentLedger);
