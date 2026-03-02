/**
 * Caching and queue practice
 * Focus: cache lifecycle and background retry flow
 */

class SimpleCache {
  constructor() {
    this.store = new Map();
  }

  set(key, value, ttlMs = 60000) {
    const expiresAt = Date.now() + ttlMs;
    this.store.set(key, { value, expiresAt });
  }

  get(key) {
    const entry = this.store.get(key);
    if (!entry) return { hit: false, value: null };

    if (Date.now() >= entry.expiresAt) {
      this.store.delete(key);
      return { hit: false, value: null };
    }

    return { hit: true, value: entry.value };
  }

  invalidate(key) {
    this.store.delete(key);
  }
}

class JobQueue {
  constructor() {
    this.jobs = [];
  }

  enqueue(job) {
    this.jobs.push({ ...job, attempts: 0 });
  }

  process(processor, maxRetries = 2) {
    const results = [];

    for (const job of this.jobs) {
      let done = false;

      while (!done) {
        job.attempts += 1;

        try {
          const output = processor(job);
          results.push({ id: job.id, status: "success", attempts: job.attempts, output });
          done = true;
        } catch (err) {
          if (job.attempts > maxRetries) {
            results.push({ id: job.id, status: "failed", attempts: job.attempts, error: err.message });
            done = true;
          }
        }
      }
    }

    return results;
  }
}

const cache = new SimpleCache();
cache.set("tasks:user:101", [{ id: 1, title: "Review cache flow" }], 3000);

console.log("Cache first read:", cache.get("tasks:user:101"));
cache.invalidate("tasks:user:101");
console.log("Cache after invalidate:", cache.get("tasks:user:101"));

const queue = new JobQueue();
queue.enqueue({ id: "job-1", shouldFail: false });
queue.enqueue({ id: "job-2", shouldFail: true });

const results = queue.process((job) => {
  if (job.shouldFail) {
    throw new Error("Temporary delivery error");
  }
  return "sent";
}, 2);

console.log("Job results:", results);
