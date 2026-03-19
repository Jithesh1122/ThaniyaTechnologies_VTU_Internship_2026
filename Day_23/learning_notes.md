# Learning Notes

## Topic Focus
Soft deletes and recovery-aware data modeling in MongoDB systems.

## Concepts Learned
1. Soft delete idea:
- Records are marked as deleted instead of being removed permanently.
- This helps preserve data for recovery, audit, and delayed cleanup.

2. Query behavior impact:
- Normal read operations should exclude deleted records by default.
- Admin or recovery flows may need a broader query scope.

3. Restore capability:
- Soft-deleted records can often be restored if deletion was accidental.
- Recovery logic is easier when data is still available in the system.

4. Archival mindset:
- Some records may move from active use to archive-oriented storage rules.
- Deletion strategy should reflect compliance, recovery, and operational needs.

5. Practical architecture value:
- Reduces accidental permanent data loss.
- Improves control over lifecycle management in production systems.

## Practical Completion
- Simulated active-record filtering with soft delete flags.
- Implemented delete and restore behavior using logical state updates.
- Reinforced how backend queries should separate active and deleted data paths.

## Outcome
Improved ability to design safer data lifecycle handling for MongoDB-backed applications.
