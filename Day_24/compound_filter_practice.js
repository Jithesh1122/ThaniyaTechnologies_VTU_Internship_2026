/**
 * Practical compound-filter simulation.
 * Demonstrates multi-condition retrieval over structured records.
 */

const tasks = [
  { id: 1, title: "Build auth flow", status: "open", priority: "high", estimate: 8 },
  { id: 2, title: "Write API docs", status: "done", priority: "medium", estimate: 3 },
  { id: 3, title: "Add caching layer", status: "open", priority: "high", estimate: 5 },
  { id: 4, title: "Review Mongo schema", status: "open", priority: "low", estimate: 2 },
];

function filterTasks(records, query = {}) {
  return records.filter((task) => {
    if (query.status && task.status !== query.status) {
      return false;
    }

    if (query.priority && task.priority !== query.priority) {
      return false;
    }

    if (query.minEstimate !== undefined && task.estimate < query.minEstimate) {
      return false;
    }

    return true;
  });
}

console.log(
  "Open high-priority tasks with estimate >= 5:",
  filterTasks(tasks, {
    status: "open",
    priority: "high",
    minEstimate: 5,
  })
);
