/**
 * Practical soft-delete simulation.
 * Demonstrates active filtering, logical delete, and restore behavior.
 */

const students = [
  { id: 1, name: "Asha", course: "MERN", deletedAt: null },
  { id: 2, name: "Ravi", course: "Node.js", deletedAt: null },
  { id: 3, name: "Meena", course: "MongoDB", deletedAt: null },
];

function listActive(records) {
  return records.filter((record) => record.deletedAt === null);
}

function softDelete(records, id) {
  const record = records.find((item) => item.id === id);
  if (!record || record.deletedAt !== null) {
    return {
      success: false,
      message: "Record not available for delete",
    };
  }

  record.deletedAt = "2026-03-19T10:00:00Z";

  return {
    success: true,
    message: "Record marked as deleted",
    record,
  };
}

function restore(records, id) {
  const record = records.find((item) => item.id === id);
  if (!record || record.deletedAt === null) {
    return {
      success: false,
      message: "Record not available for restore",
    };
  }

  record.deletedAt = null;

  return {
    success: true,
    message: "Record restored",
    record,
  };
}

console.log("Active before delete:", listActive(students));
console.log("Delete record:", softDelete(students, 2));
console.log("Active after delete:", listActive(students));
console.log("Restore record:", restore(students, 2));
console.log("Active after restore:", listActive(students));
