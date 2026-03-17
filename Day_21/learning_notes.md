# Learning Notes

## Topic Focus
MongoDB schema design using embedding and referencing.

## Concepts Learned
1. Embedding model:
- Related data is stored inside the parent document.
- Useful when data is read together most of the time.
- Reduces the need for follow-up lookups.

2. Referencing model:
- Related data is stored in separate collections and linked by identifiers.
- Useful when related data is shared, large, or updated independently.
- Improves flexibility for scalable relationships.

3. Tradeoff thinking:
- Embedding improves read simplicity.
- Referencing improves separation and update control.
- The best choice depends on access pattern, not just structure preference.

4. Backend design impact:
- API responses often reflect schema choices.
- Validation, updates, and query flow become easier or harder depending on model design.
- Schema decisions influence performance and maintainability across the service layer.

5. Practical architecture value:
- Better schema design reduces unnecessary query complexity.
- It also helps avoid unstable models that become hard to evolve later.

## Practical Completion
- Modeled the same dataset using embedded and referenced approaches.
- Simulated retrieval flow for both models.
- Reinforced design reasoning based on read behavior and update independence.

## Outcome
Improved ability to choose MongoDB schema strategies more deliberately for real MERN backend systems.
