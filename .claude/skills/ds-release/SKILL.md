---
name: ds-release
description: Generate a changelog from GitLab MRs since the last publish and create a Jira release task in the current sprint
disable-model-invocation: true
---

## Prerequisites

The following environment variables must be set:

- `GITLAB_TOKEN` — GitLab personal access token (scope: `read_api`) for `gitlab.synerise.com`
- `JIRA_EMAIL` — Atlassian account email
- `JIRA_TOKEN` — Atlassian API token

**Important:** These variables may not be available in Claude Code's shell by default. Before any API call, source the user's shell profile first: `source ~/.zshrc 2>/dev/null`. Prepend this to every Bash command that uses these variables.

The GitLab project ID for `Frontend/synerise-design` is **1171**.
The Jira project key is **STOR**.
The Jira base URL is `https://hgintelligence.atlassian.net`.

## Workflow

### Step 1 — Identify the commit range

Find the last two `build: publish` commits on the current branch:

```
git log --oneline --grep="build: publish" -2
```

The range is: `<older-publish>..<newer-publish>`. If HEAD equals the latest publish, use the two most recent. If HEAD is ahead of the latest publish, use `<latest-publish>..HEAD`.

### Step 2 — Collect merge requests

List merge commits in the range:

```
git log <older>..<newer> --merges --format="%H %s"
```

Extract the MR number from each merge commit message (pattern: `See merge request Frontend/synerise-design!NNNN` or from the `Merge branch '...' into 'master'` body which contains `!NNNN`).

For each merge commit, also get the full commit body to find the MR number:

```
git log <merge-sha> -1 --format="%B"
```

### Step 3 — Fetch MR details from GitLab

For each MR number, call (use `iids[]` query parameter — the path-based `/merge_requests/{iid}` endpoint returns 404):

```
GET https://gitlab.synerise.com/api/v4/projects/1171/merge_requests?iids[]={mr_iid}
```

Header: `PRIVATE-TOKEN: $GITLAB_TOKEN`

The response is an array — use the first element.

Extract from each MR:
- `title` — the MR title (follows conventional commits: `type(scope): description`)
- `description` — contains "Changes:" section and "Resolves task:" section with Jira IDs
- `author.name`

### Step 4 — Extract Jira task IDs and fetch details

From each MR description, extract Jira task IDs matching the pattern `STOR-\d+`. **Note:** Not all MRs have Jira IDs in their description — skip this step for MRs without them and proceed with just the MR title/description for the changelog.

For each unique Jira ID found, fetch task details:

```
GET https://hgintelligence.atlassian.net/rest/api/3/issue/{task_id}?fields=summary,description,status,issuetype
```

Auth: Basic auth with `$JIRA_EMAIL:$JIRA_TOKEN`.

### Step 5 — Build the changelog

Group changes by component (the `scope` from conventional commit titles). Categorize into:

1. **Bug Fixes** — commits with `fix(...)` type
2. **Features / Improvements** — commits with `feat(...)` type
3. **Vitest Migrations** — group all jest-to-vitest changes into a single table

For each non-migration entry, include:
- Bold summary of the change
- Description of what changed (from MR description, diff context, and Jira summary)
- MR reference and Jira task ID

**MR reference format:** Always prefix MR references with `synerise-design` so they resolve correctly when pasted in other GitLab projects. Use the format `synerise-design!NNNN` (e.g., `synerise-design!3635`) instead of bare `!NNNN`.

For vitest migrations, create a table with columns: Component, MR, Jira.

### Step 6 — Create the Jira release task

Create a new issue in the STOR project:

```
POST https://hgintelligence.atlassian.net/rest/api/3/issue
```

Fields:
- `project.key`: `STOR`
- `summary`: `DS Release DD-MM-YYYY` (use the date of the latest publish commit, or today's date)
- `issuetype.id`: `10496` (Maintenance)
- `description`: The changelog formatted in Atlassian Document Format (ADF)

The ADF structure should use:
- `heading` nodes (level 2 for categories, level 3 for component names)
- `bulletList` with `listItem` nodes for individual changes
- `table` node for vitest migrations
- `rule` node to separate sections
- Bold text via `marks: [{type: "strong"}]` for change summaries

### Step 7 — Add to the current sprint

Find the active sprint for the Storybook board (board ID **245**):

```
GET https://hgintelligence.atlassian.net/rest/agile/1.0/board/245/sprint?state=active
```

Then move the newly created issue to that sprint:

```
POST https://hgintelligence.atlassian.net/rest/agile/1.0/sprint/{sprint_id}/issue
Body: {"issues": ["STOR-XXXX"]}
```

### Step 8 — Report

Output:
- The Jira task key and URL
- The sprint it was added to
- A brief summary of the changelog (number of fixes, features, migrations)
