/**
 * Practical webhook verification simulation.
 * Demonstrates signature generation and validation.
 */

const crypto = require("crypto");

const SHARED_SECRET = "internship-webhook-secret";

function createSignature(payload, secret) {
  return crypto
    .createHmac("sha256", secret)
    .update(payload)
    .digest("hex");
}

function verifyWebhook(payload, receivedSignature, secret) {
  const expectedSignature = createSignature(payload, secret);
  const valid = crypto.timingSafeEqual(
    Buffer.from(expectedSignature),
    Buffer.from(receivedSignature)
  );

  return {
    valid,
    expectedSignature,
  };
}

function processWebhookEvent(rawPayload, signature) {
  const verification = verifyWebhook(rawPayload, signature, SHARED_SECRET);

  if (!verification.valid) {
    return {
      success: false,
      message: "Webhook verification failed",
    };
  }

  const event = JSON.parse(rawPayload);

  return {
    success: true,
    message: "Webhook processed",
    eventType: event.type,
  };
}

const validPayload = JSON.stringify({
  type: "payment.completed",
  orderId: "ORD-1001",
  amount: 499,
});

const validSignature = createSignature(validPayload, SHARED_SECRET);

const tamperedPayload = JSON.stringify({
  type: "payment.completed",
  orderId: "ORD-1001",
  amount: 999,
});

console.log("Valid webhook:", processWebhookEvent(validPayload, validSignature));
console.log("Tampered webhook:", processWebhookEvent(tamperedPayload, validSignature));
