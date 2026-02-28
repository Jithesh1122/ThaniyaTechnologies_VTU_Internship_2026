# Learning Notes

## Topic Focus
MongoDB performance patterns for production-oriented MERN backend development.

## Concepts Learned
1. Index strategy basics:
- Indexes improve read performance but add write overhead.
- Compound indexes are useful when queries commonly filter/sort by multiple fields.
- Index order matters for query efficiency.

2. Query shape consistency:
- Keep frequently used filters predictable so index usage remains effective.
- Avoid unbounded queries for large collections.

3. Aggregation pipeline usage:
- Use `$match` early to reduce dataset size.
- Use `$group` for analytics metrics.
- Use `$project` to return only required fields.
- Use `$sort`, `$skip`, and `$limit` for controlled result delivery.

4. Pagination tradeoff understanding:
- `skip/limit` is simple but can be expensive at high offsets.
- Cursor-based pagination is better for very large datasets and continuous feeds.

5. API optimization mindset:
- Whitelist sortable fields.
- Restrict requested fields to reduce payload size.
- Design stable query contracts between frontend and backend.

## Practical Completion
- Implemented reusable helpers for:
  - pagination parsing with limits
  - sort construction with allow-list validation
  - safe projection selection
  - dynamic filter construction
  - pipeline assembly simulation

## Outcome
Strengthened ability to design database query logic that scales better and integrates cleanly into Express + MongoDB service layers.
