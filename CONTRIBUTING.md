# Contributing to Pixel Pantry

## Before You Start

- Read the README.
- Browse the actual GitHub Issues tab.
- Choose an unassigned or otherwise available issue.
- Comment on the issue or follow the event organizer's instructions before starting, to avoid duplicate work.

## Set Up the Project

Fork the repository, then clone your fork:

```bash
git clone <your-fork-url>
cd pixel-pantry
git checkout -b fix/issue-number-short-description
```

Use GitHub's fork workflow rather than granting participants direct write access to the event repository.

Open `index.html` in a browser to run the project locally.

## Make Your Fix

- Reproduce the bug before editing.
- Make the smallest appropriate change.
- Keep the code in HTML, CSS, and vanilla JavaScript.
- Avoid unrelated refactoring or adding dependencies.
- Test the affected feature and ensure other features still work.

## Submit a Pull Request

Explain how to commit and push changes:

```bash
git add .
git commit -m "Fix #<issue-number>: short description"
git push origin fix/issue-number-short-description
```

Then instruct contributors to open a pull request against the event repository's default branch.

Require the PR description to include:
- The issue being fixed.
- A short explanation of the change.
- Steps taken to test the fix.

Tell contributors to use `Closes #<issue-number>` when appropriate so GitHub can automatically close the issue after the PR is merged into the default branch.

## Event Rules

- One issue per PR unless organizers explicitly permit otherwise.
- Do not submit unrelated changes.
- Do not copy another participant's solution.
- Keep PRs small, readable, and focused.
- Follow the issue's acceptance criteria.
- Organizers award points after reviewing and verifying the fix.
- The organizer's decision on scoring and duplicate submissions is final.

## Code of Conduct

Ask participants to communicate respectfully, provide constructive reviews, and report problems honestly.
