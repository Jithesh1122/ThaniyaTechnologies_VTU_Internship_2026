# Learning Notes: GitHub Actions CI Basics

## Why CI Matters
Continuous Integration helps developers verify that code changes are safe before they are merged or deployed. Instead of depending only on manual testing, CI runs automated checks every time important repository events happen.

Common CI goals:
- Install dependencies consistently
- Run syntax or lint checks
- Run tests
- Verify build commands
- Catch simple issues early

## Manual Checks vs Automated Checks
Manual checks are useful during development, but they can be forgotten or performed differently each time. CI makes validation repeatable by defining the process as code.

Benefits:
- Same checks run for every change
- Errors are easier to catch early
- Team workflows become more consistent
- Deployment confidence improves

## GitHub Actions Workflow Structure
A GitHub Actions workflow is usually defined in a YAML file under:

`.github/workflows/`

Important parts:
- `name`: workflow name
- `on`: event triggers
- `jobs`: group of work to run
- `steps`: individual commands or actions inside a job

## Triggers
Common triggers include:
- `push`
- `pull_request`

These allow CI to run automatically when code is pushed or reviewed.

## Jobs and Steps
A job is a complete unit of pipeline work. A step is one action inside the job.

Typical Node.js CI steps:
- Checkout repository code
- Set up Node.js
- Install dependencies
- Run validation commands

## Reproducibility
Using lockfiles and predictable install commands helps CI produce consistent results. This is important because the pipeline should reflect a reliable project setup, not a random local environment.

## Design Lessons
- CI is a safety net for code changes
- Workflow files should stay simple and readable
- Each step should have a clear purpose
- Automated validation improves team confidence
- CI is the foundation for later deployment automation

## Practical Reflection
The practical exercises helped connect the idea of CI with the actual sequence of work a pipeline performs. Even a small Node.js backend benefits from automated install and validation steps because they make project health easier to confirm.
