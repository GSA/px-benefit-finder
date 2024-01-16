# See below for the purpose of each workflow

1. add-to-project-board: This workflow automatically adds it to the project repository when a user creates or opens an issue from the code repository.
2. release-action: This custom workflow creates a release. See the main [README](https://github.com/GSA/px-benefit-finder?tab=readme-ov-file#release-candidate) for detailed steps.
3. stale-branch-maintenance: This custom workflow runs on a cron and checks the stale branches that are older than 90 days. If it detects any stale branches, it creates a PR and tags the tech lead.
4. cypress: This testing workflow runs on each pull request creation.
5. uswds-version-sync: This custom workflow checks the USDWS version of the USAGov project and if there is a difference, creates a PR to update the benefit-finder repo as well.
6. codeql: This workflow This method identifies security vulnerabilities, logical errors, and complex code patterns.
7. snyk-security: This workflow does snyk scanning.
8. test-frontend: This workflow runs the front end tests.
9. dependabot: This workflow checks for dependencies and opens PRs to the latest versions.