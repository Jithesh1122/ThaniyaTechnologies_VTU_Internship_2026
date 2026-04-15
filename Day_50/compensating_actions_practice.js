const orderState = {
  inventoryReserved: false,
  paymentCaptured: false,
  orderCreated: false,
};

function reserveInventory() {
  orderState.inventoryReserved = true;
  console.log("Inventory reserved");
}

function capturePayment() {
  orderState.paymentCaptured = true;
  console.log("Payment captured");
}

function createOrderRecord() {
  throw new Error("Order record creation failed");
}

function releaseInventory() {
  if (orderState.inventoryReserved) {
    orderState.inventoryReserved = false;
    console.log("Inventory released");
  }
}

function refundPayment() {
  if (orderState.paymentCaptured) {
    orderState.paymentCaptured = false;
    console.log("Payment refunded");
  }
}

function runWorkflow() {
  console.log("Compensating action workflow simulation\n");

  try {
    reserveInventory();
    capturePayment();
    createOrderRecord();
    orderState.orderCreated = true;
    console.log("Workflow completed successfully");
  } catch (error) {
    console.log(`Workflow failed: ${error.message}`);
    console.log("Starting compensating actions...");
    refundPayment();
    releaseInventory();
  }

  console.log("\nFinal state:");
  console.table(orderState);
}

runWorkflow();
