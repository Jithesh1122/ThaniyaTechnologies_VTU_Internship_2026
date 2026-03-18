/**
 * Practical MongoDB schema-evolution simulation.
 * Validates records and upgrades older document shapes.
 */

const users = [
  { id: 1, name: "Asha", email: "asha@example.com", schemaVersion: 1 },
  { id: 2, name: "Ravi", email: "ravi@example.com", role: "editor", schemaVersion: 2 },
  { id: 3, name: "Meena", email: "meena@example.com", schemaVersion: 1 },
];

function validateUser(user) {
  const errors = [];

  if (!user.name || typeof user.name !== "string") {
    errors.push("name is required");
  }

  if (!user.email || typeof user.email !== "string") {
    errors.push("email is required");
  }

  if (!user.role || typeof user.role !== "string") {
    errors.push("role is required in current schema");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

function upgradeUser(user) {
  if (user.schemaVersion === 1) {
    return {
      ...user,
      role: "viewer",
      schemaVersion: 2,
    };
  }

  return user;
}

const validationBeforeUpgrade = users.map((user) => ({
  id: user.id,
  result: validateUser(user),
}));

const upgradedUsers = users.map(upgradeUser);

const validationAfterUpgrade = upgradedUsers.map((user) => ({
  id: user.id,
  result: validateUser(user),
}));

console.log("Before upgrade:", validationBeforeUpgrade);
console.log("Upgraded users:", upgradedUsers);
console.log("After upgrade:", validationAfterUpgrade);
