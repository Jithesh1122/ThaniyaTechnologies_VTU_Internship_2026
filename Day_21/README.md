# Internship Progress Report

Date: 2026-03-17
Track: MERN Backend Engineering

## Concept Focus
MongoDB schema design with embedding and referencing strategies.

## Learning Scope
This learning cycle focused on how data should be modeled in MongoDB depending on access patterns and update behavior. The work covered embedded documents, referenced collections, tradeoffs between read efficiency and update flexibility, and how schema design decisions affect backend API structure in MERN applications.

## Work Completed
- Studied when to embed related data inside one document and when to keep it in separate collections.
- Learned how read-heavy flows can benefit from embedding while highly shared or frequently updated data often fits referencing better.
- Reviewed tradeoffs involving duplication, update frequency, and query simplicity.
- Practiced schema design thinking for examples such as user profiles, orders, blog posts, comments, and category-linked content.
- Implemented a practical simulation comparing embedded and referenced data retrieval patterns.
- Consolidated how MongoDB modeling decisions influence backend maintainability and API performance.

## Deliverables
- `learning_notes.md`: theory notes and outcomes
- `schema_design_practice.js`: practical schema design simulation

## Outcome
Built a stronger foundation in MongoDB data modeling and improved readiness to design collections based on real access patterns instead of only structural convenience.
