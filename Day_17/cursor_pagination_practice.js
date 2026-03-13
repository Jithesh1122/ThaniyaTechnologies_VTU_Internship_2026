/**
 * Practical cursor-pagination simulation.
 * Demonstrates ordered retrieval using nextCursor with a MongoDB-style filter mindset.
 */

const students = [
  { id: 101, name: "Asha" },
  { id: 102, name: "Ravi" },
  { id: 103, name: "Meena" },
  { id: 104, name: "Vikram" },
  { id: 105, name: "Kiran" },
  { id: 106, name: "Nisha" },
];

function getStudentsByCursor(records, cursor = null, limit = 2, minId = null) {
  const filtered = minId === null
    ? records
    : records.filter((record) => record.id >= minId);

  const sorted = [...filtered].sort((a, b) => a.id - b.id);
  const startIndex =
    cursor === null ? 0 : sorted.findIndex((record) => record.id > cursor);

  if (startIndex === -1) {
    return {
      items: [],
      nextCursor: null,
      hasMore: false,
    };
  }

  const items = sorted.slice(startIndex, startIndex + limit);
  const lastItem = items[items.length - 1] || null;
  const nextCursor =
    items.length === limit && lastItem ? lastItem.id : null;

  return {
    items,
    nextCursor,
    hasMore: nextCursor !== null,
  };
}

const pageOne = getStudentsByCursor(students, null, 2, 102);
const pageTwo = getStudentsByCursor(students, pageOne.nextCursor, 2, 102);
const pageThree = getStudentsByCursor(students, pageTwo.nextCursor, 2, 102);

console.log("Page 1:", pageOne);
console.log("Page 2:", pageTwo);
console.log("Page 3:", pageThree);
