# AGENTS.md

This is the public portfolio site. Start with [README.md](README.md), then inspect
the files relevant to the requested change.

## Sources and scope

- Shared portfolio facts and project descriptions live in `src/data/portfolio.ts`;
  domain-specific content lives in `src/data/domains.ts`. Keep components using
  these sources rather than duplicating contact details or project facts.
- Preserve verified career claims. Do not invent metrics, credentials, job titles,
  production status, or test counts. Verify a changing project claim against its
  source repository, or ask for the missing fact.
- Do not copy private career records or unpublished material into this public
  repository without the owner's explicit authorization for that content.
- Preserve keyboard navigation, tab behavior, theme behavior, and responsive
  layouts. Check existing tests before changing those interactions.
- Keep changes focused; do not add analytics, forms that transmit data, or a backend
  as an incidental part of a copy or layout task.

## Verification

The CI workflow is [ci.yml](.github/workflows/ci.yml). It uses Node 22 and `npm ci`,
then `npm run lint`, `npm test`, and `npm run build`. Here, `lint` is TypeScript
checking (`tsc --noEmit`), not ESLint; there is no separate `typecheck` script.
Run those gates for code changes. For documentation-only changes, check the
changed links and formatting, and state which application checks were not run.
Do not claim visual behavior was tested without inspecting the rendered page.

## Reporting and review

Read [SECURITY.md](SECURITY.md) before sharing a suspected vulnerability. Public
issues, PRs (including drafts), logs, and artifacts are not private channels.
Use synthetic evidence and coordinate disclosure with the maintainer.

A request for a draft is not permission to merge or publish it. Keep draft work
on a branch, retain draft PR status, and report validation limits.

## Code review rules

Use these rules when a review is requested or required; they do not add review rounds.
Apply code and test checks to executable changes, not prose-only edits.

- Review the diff and affected callers for correctness, security, data loss, concurrency,
  and error-handling defects. Leave formatting and lint findings to CI.
- Order findings by severity. Each gives severity, `path:line`, the concrete trigger and
  consequence, and a fix. Mark it confirmed (reproduced or traced through code) or plausible
  (state the missing evidence); distinguish static review from executed checks.
- Trace validation of external input (users, files, network responses, environment) before
  use. Flag missing validation, swallowed errors, or blank values treated as zero when they
  hide a failure or violate the expected contract; respect documented best-effort cleanup.
- Flag new logic without meaningful test coverage, including an edge case. A test claiming
  to cover changed behavior must fail without that behavior; this does not apply to unrelated
  tests. State whether failure was demonstrated or only inferred.
- Flag new dependencies, network calls, or stored-data shape changes absent from the PR
  description. Disclosure does not replace any required approval.
- Flag changes outside the PR's stated purpose. If no defects are found, say so in one line
  and identify the review scope and unrun checks without implying runtime validation.
- Follow this repository's security-reporting rules for sensitive findings; keep exploit
  details and private data out of public review comments.
