/**
 * Practical search-style retrieval simulation.
 * Demonstrates lightweight matching across multiple fields.
 */

const resources = [
  { id: 1, title: "MongoDB Basics", category: "database" },
  { id: 2, title: "Express Routing", category: "backend" },
  { id: 3, title: "Webhook Security", category: "integration" },
  { id: 4, title: "MongoDB Schema Design", category: "database" },
];

function searchResources(records, keyword) {
  const term = String(keyword || "").trim().toLowerCase();

  if (!term) {
    return records;
  }

  return records.filter((record) => {
    return (
      record.title.toLowerCase().includes(term) ||
      record.category.toLowerCase().includes(term)
    );
  });
}

console.log("Search for 'mongo':", searchResources(resources, "mongo"));
console.log("Search for 'backend':", searchResources(resources, "backend"));
