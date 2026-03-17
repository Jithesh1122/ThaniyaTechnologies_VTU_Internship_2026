/**
 * Practical MongoDB schema-design simulation.
 * Compares embedded and referenced retrieval styles.
 */

const embeddedOrders = [
  {
    orderId: "ORD-1",
    userId: "U1",
    items: [
      { productId: "P1", name: "Keyboard", price: 1200 },
      { productId: "P2", name: "Mouse", price: 600 },
    ],
  },
];

const referencedOrders = [
  {
    orderId: "ORD-1",
    userId: "U1",
    itemIds: ["OI-1", "OI-2"],
  },
];

const orderItems = [
  { id: "OI-1", productId: "P1", name: "Keyboard", price: 1200 },
  { id: "OI-2", productId: "P2", name: "Mouse", price: 600 },
];

function getEmbeddedOrder(orderId) {
  return embeddedOrders.find((order) => order.orderId === orderId) || null;
}

function getReferencedOrder(orderId) {
  const order = referencedOrders.find((entry) => entry.orderId === orderId);
  if (!order) return null;

  const items = order.itemIds
    .map((itemId) => orderItems.find((item) => item.id === itemId))
    .filter(Boolean);

  return {
    ...order,
    items,
  };
}

function summarizeOrder(order) {
  if (!order) return null;

  const total = order.items.reduce((sum, item) => sum + item.price, 0);

  return {
    orderId: order.orderId,
    itemCount: order.items.length,
    total,
  };
}

const embeddedResult = getEmbeddedOrder("ORD-1");
const referencedResult = getReferencedOrder("ORD-1");

console.log("Embedded order:", embeddedResult);
console.log("Embedded summary:", summarizeOrder(embeddedResult));
console.log("Referenced order:", referencedResult);
console.log("Referenced summary:", summarizeOrder(referencedResult));
