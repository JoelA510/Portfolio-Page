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
- `PORTFOLIO.contentUpdated` is the footer's "Content last updated" date, set by
  hand. Change it in the same PR as any visible content change, and only then.
- Architecture diagrams are data (`architecture` on each project), drawn by
  `ProjectRow`; change the data, not the markup.
- The software projects were built by directing AI agents under written rules. Keep
  that stated; never present them as unaided coding. AI tooling lines name only
  tools actually used on that project.
- Do not copy private career records or unpublished material into this public
  repository without the owner's explicit authorization for that content.
- Preserve keyboard navigation, tab behavior, theme behavior, and responsive
  layouts. Check existing tests before changing those interactions.
- Keep changes focused; do not add analytics, forms that transmit data, or a backend
  as an incidental part of a copy or layout task.

## Updating content

The career facts shown here come from the owner's private record, which is not
in this repository. That record is the authority when the two differ, and it is
updated before this site is.

1. Confirm the fact at its source first. Without access to the owner's record,
   change only what the request states, and do not extend, round, or rephrase a
   claim beyond it. For a project fact (release, test count, stack, tooling),
   re-check the project's repository and say which commit was read.
2. Find every place the claim appears before editing; search the whole checkout
   for the old wording:
   - `src/data/portfolio.ts` and `src/data/domains.ts` (a job shown on several
     tabs is written once per tab);
   - copy still written in components: the contact notes
     (`ContactSection.tsx`), the footer availability line (`Footer.tsx`), and
     the software tab's hero (`SoftwareSection.tsx`);
   - `index.html` (title, description, keywords, social-card text);
   - `public/og-image.svg`, `public/sitemap.xml`, `public/robots.txt`;
   - `README.md`, `metadata.json`, and tests that quote content.
3. Set `PORTFOLIO.contentUpdated` in the same change.
4. For every number and date on a changed line, state where it was confirmed.
   Remove a number that cannot be confirmed; do not soften it into a vaguer
   claim.
5. Run the gates below, then look at each changed tab in light and dark at a
   narrow and a wide width.
6. Commit and pull-request text describe the change itself. They never quote
   the private record or give a private reason for the change.

## Reusing this site for another person

The site can serve as the starting point for someone else's portfolio. Do this
only at the owner's request, and keep the new site unpublished until the person
it describes has reviewed it.

- Create a new repository from this one as a template rather than a fork, so
  no commit history carries over, and keep it private until launch.
- Replace all content: both files in `src/data/`, the component copy listed
  above, `index.html`, everything in `public/`, `README.md`, `SECURITY.md`
  (contact and linked policies), `metadata.json`, the `name` in `package.json`,
  and the tests that assert a specific email, link, or certification.
- The tab set is typed (`TabId`, `TABS`, and `DOMAINS` in `src/data/domains.ts`,
  plus the software tab's own section in `src/App.tsx`). A different set of
  tabs means changing those together and updating the tests.
- Before the first commit, search the new checkout for the previous person's
  name, email, handles, domain, employers, and project names. Nothing may
  remain.
- Every claim on the new site needs the same confirmation as in "Updating
  content". Do not carry over a sentence because it reads well.

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
