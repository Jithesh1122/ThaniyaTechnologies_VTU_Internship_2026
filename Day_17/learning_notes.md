# Learning Notes

## Topic Focus
Efficient data retrieval with pagination patterns and introductory MongoDB query concepts.

## Concepts Learned
1. Offset pagination:
- Uses page number and limit values.
- Simple to understand but can become inefficient for deep pages.

2. Cursor pagination:
- Uses a stable reference point such as id or timestamp.
- Better suited for large datasets and continuous data loading.

3. Ordering guarantees:
- Pagination must rely on a consistent sort order.
- Unstable ordering can produce missing or duplicated records across pages.

4. API design impact:
- The response should include clear pagination metadata.
- Cursor-based APIs usually return `nextCursor` instead of page number.

5. Practical architecture value:
- Improves performance for large collections.
- Reduces problems caused by shifting datasets during navigation.

6. MongoDB foundations introduced:
- Data is stored as documents inside collections.
- Query filtering narrows result sets before pagination is applied.
- Stable fields such as `_id` help support cursor-based traversal.
- Retrieval design should consider sort order before applying cursor logic.

## Practical Completion
- Simulated ordered record retrieval using cursor progression.
- Implemented `limit` and `nextCursor` response flow.
- Reinforced how pagination logic should be predictable and safe for client consumption.
- Connected pagination flow with MongoDB-style ordered querying mindset.

## Outcome
Improved ability to design scalable backend list endpoints with stronger performance and consistency characteristics, while also building a starting foundation in MongoDB retrieval logic.
