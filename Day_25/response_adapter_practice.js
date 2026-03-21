/**
 * Practical response adapter simulation.
 * Demonstrates converting internal data into legacy and modern client formats.
 */

const internalOrder = {
  id: "ORD-1001",
  customerName: "Ravi Kumar",
  totalAmount: 1499,
  paymentState: "paid",
};

function toLegacyOrder(order) {
  return {
    orderId: order.id,
    customer: order.customerName,
    total: order.totalAmount,
    status: order.paymentState,
  };
}

function toModernOrder(order) {
  return {
    id: order.id,
    customerName: order.customerName,
    totalAmount: order.totalAmount,
    paymentState: order.paymentState,
  };
}

console.log("Legacy client response:", toLegacyOrder(internalOrder));
console.log("Modern client response:", toModernOrder(internalOrder));
