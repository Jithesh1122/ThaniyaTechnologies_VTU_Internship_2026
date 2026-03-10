/**
 * Practical transaction-flow simulation.
 * Demonstrates grouped writes and rollback on failure.
 */

const accounts = {
  alice: 500,
  bob: 300,
};

function cloneState(state) {
  return JSON.parse(JSON.stringify(state));
}

function transferFunds(state, from, to, amount, shouldFailAfterDebit = false) {
  if (!state[from] || !state[to]) {
    throw new Error("Account not found");
  }

  if (!Number.isFinite(amount) || amount <= 0) {
    throw new Error("Invalid transfer amount");
  }

  if (state[from] < amount) {
    throw new Error("Insufficient balance");
  }

  state[from] -= amount;

  if (shouldFailAfterDebit) {
    throw new Error("Simulated failure after debit");
  }

  state[to] += amount;
}

function runTransaction(operation) {
  const snapshot = cloneState(accounts);

  try {
    operation(accounts);
    return {
      success: true,
      balances: cloneState(accounts),
    };
  } catch (error) {
    accounts.alice = snapshot.alice;
    accounts.bob = snapshot.bob;

    return {
      success: false,
      message: error.message,
      balances: cloneState(accounts),
    };
  }
}

const successCase = runTransaction((state) => {
  transferFunds(state, "alice", "bob", 120, false);
});

const failureCase = runTransaction((state) => {
  transferFunds(state, "alice", "bob", 80, true);
});

console.log("Success case:", successCase);
console.log("Failure case with rollback:", failureCase);
