# Learning Notes

## Topic Focus
Concurrency handling and stale-update prevention in backend applications.

## Concepts Learned
1. Race conditions:
- Two or more requests can read the same initial state and apply conflicting updates.
- The final stored value may be incorrect even when each request seems valid in isolation.

2. Lost update problem:
- One request can overwrite another request's change when no concurrency rule is enforced.
- This is common in edit flows, counters, balances, and inventory-like operations.

3. Optimistic locking mindset:
- Store a version value with the record.
- Accept an update only if the incoming version matches the current version.
- Reject stale writes and force the client to refresh current data.

4. Backend design impact:
- Concurrency checks belong close to the write boundary.
- Validation alone is not enough when multiple requests overlap.
- Safe update flows should detect state drift before commit.

5. Practical architecture value:
- Protects integrity in collaborative or multi-user systems.
- Reduces hidden data corruption caused by request timing.

## Practical Completion
- Simulated unsafe overlapping updates to show lost-write risk.
- Implemented version-aware safe update flow to block stale writes.
- Reinforced how concurrency protection complements transaction and consistency design.

## Outcome
Improved ability to reason about correctness under concurrent access and to design safer write flows for real backend systems.
