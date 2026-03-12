/**
 * Practical idempotency simulation.
 * Demonstrates safe response reuse for duplicate create requests.
 */

const processedRequests = new Map();
const orders = [];

function createResponse(success, payload) {
  return {
    success,
    payload,
  };
}

function createOrder(request) {
  const { idempotencyKey, userId, item, amount } = request;

  if (!idempotencyKey) {
    return createResponse(false, { message: "Missing idempotency key" });
  }

  const scopedKey = `${userId}:${idempotencyKey}`;

  if (processedRequests.has(scopedKey)) {
    return createResponse(true, {
      source: "replay",
      order: processedRequests.get(scopedKey),
    });
  }

  if (!item || !Number.isFinite(amount) || amount <= 0) {
    return createResponse(false, { message: "Invalid order payload" });
  }

  const order = {
    id: orders.length + 1,
    userId,
    item,
    amount,
  };

  orders.push(order);
  processedRequests.set(scopedKey, order);

  return createResponse(true, {
    source: "created",
    order,
  });
}

const requestA = {
  idempotencyKey: "req-1001",
  userId: "u1",
  item: "Course Subscription",
  amount: 499,
};

const requestB = {
  idempotencyKey: "req-1001",
  userId: "u1",
  item: "Course Subscription",
  amount: 499,
};

const requestC = {
  idempotencyKey: "req-2001",
  userId: "u1",
  item: "Mentorship Session",
  amount: 999,
};

console.log("First create:", createOrder(requestA));
console.log("Duplicate retry:", createOrder(requestB));
console.log("New logical request:", createOrder(requestC));
console.log("Stored orders:", orders);
