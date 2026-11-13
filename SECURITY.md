# Security policy

## Reporting a vulnerability

Email [hire.joel.abraham@gmail.com](mailto:hire.joel.abraham@gmail.com), the contact
published on the portfolio, with the subject "Portfolio security report".
Please do not put vulnerability details in a public issue, discussion, or pull
request. Email is the private reporting channel for this repository.

Include the affected URL or commit, browser and platform, steps to reproduce,
and what an attacker could do. Use a minimal reproduction with synthetic data,
and redact credentials, session information, and other people's information from
screenshots or logs.

The repository maintainer, @JoelA510, handles reports. There is no guaranteed
security-response or fix deadline. The maintainer will reply by email, discuss
whether the issue can be reproduced, and coordinate a fix and public disclosure.
Researcher credit is included only with your consent.

## What's in scope

- The portfolio at [secureyour.tech](https://secureyour.tech/), including the
  React client, browser storage, links, and handling of untrusted content.
- This repository's source code, dependencies as used by the site, GitHub Actions
  workflows, and build and deployment configuration.
- Unintended exposure of private information or credentials through site content,
  published assets, or build output.

The portfolio links to separate projects. Vulnerabilities in those apps belong to
their own reporting channels: for example,
[FormWaypoint](https://github.com/JoelA510/FormWaypoint/security/policy),
[SquadLogic](https://github.com/JoelA510/SquadLogic/security/policy), and
[AIAdvocate](https://github.com/JoelA510/AIAdvocate/security/policy).
The portfolio's policy does not authorize testing those apps.

Third-party platforms themselves, including Vercel and GitHub, are outside this
policy's scope; flaws in this site's use or configuration of them remain in scope.
Ordinary content corrections, broken links, and feature requests can use GitHub
issues when they contain no security details or private information.

## Testing boundaries

Prefer a local copy and synthetic data. Do not access, change, or collect other
people's information, disrupt the live site, run load tests, exhaust service
quotas, or use social engineering. If you encounter private data or credentials,
stop and report the location privately without copying or using them.
This policy does not authorize testing third-party systems.

## Supported versions

Security fixes target `main` and the current production deployment. Historical
commits, old previews, and forks do not receive separate patches. Reports about
older copies are welcome when they expose information that is still sensitive
or identify a problem that also affects the current site.
