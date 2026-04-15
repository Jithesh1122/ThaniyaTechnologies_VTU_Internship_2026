# Learning Notes: Saga Pattern and Compensating Actions

## Why This Topic Matters
Not every backend workflow can rely on one database transaction. Real systems may involve:
- Inventory updates
- Payment processing
- Email or notification triggers
- External service calls
- Multiple databases or services

In such flows, one step can succeed while a later step fails. If nothing is done about that partial success, the system can be left in an inconsistent business state.

## Local Transactions vs Workflow Consistency
A local transaction works well when related changes happen in one transactional boundary. But in multi-step service workflows, that type of all-or-nothing protection may not exist across every participant.

This creates a different problem:
- Step 1 succeeds
- Step 2 succeeds
- Step 3 fails
- The system must decide how to recover

## Saga Pattern
A Saga breaks a workflow into smaller steps. Each step completes independently. If a later step fails, previously completed steps can be compensated through explicit undo-style actions.

This means consistency is restored through process logic rather than one large transaction.

## Compensating Actions
A compensating action is a business-level reversal of a completed step.

Examples:
- Release reserved inventory
- Refund or cancel payment authorization
- Mark an order as failed
- Revert a seat reservation

Important point:
- Compensation is not the same as database rollback
- It is a deliberate business recovery action

## Orchestration Thinking
One way to manage a saga is through an orchestrator that:
- Executes steps in sequence
- Tracks which steps succeeded
- Triggers compensations in reverse order if a failure occurs

This helps keep failure recovery explicit and easier to reason about.

## Design Lessons
- Partial success must be treated as a real risk in multi-step workflows
- Business consistency may need recovery logic instead of one transaction
- Compensations should be planned at design time, not incident time
- Clear workflow ownership improves debugging and recovery handling
- Saga logic adds complexity, so it should be used where it truly solves a consistency problem

## Practical Reflection
The practical simulations made it easier to see that a workflow is only reliable if failure handling is part of the design. The success path alone is not enough. A backend system also needs a controlled way to recover when later steps break after earlier steps have already succeeded.
