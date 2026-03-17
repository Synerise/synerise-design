---
name: push-mr
description: Push current branch to origin, create a GitLab MR if one doesn't exist, and monitor the pipeline until completion
---

## Prerequisites

- The GitLab API token and project details are stored in the user's memory at `~/.claude/projects/-Users-biedronne-Documents-Work-DS2-synerise-design/memory/gitlab-credentials.md`
- **GitLab URL**: https://gitlab.synerise.com
- **Project ID**: 1171
- **API Token**: Read from the credentials file above (use `PRIVATE-TOKEN` header)

## Workflow

### Step 1 — Push to origin

Push the current branch to origin:

```bash
git push -u origin HEAD
```

If the push fails (e.g., rejected), inform the user and stop.

### Step 2 — Check for existing MR

Check if an MR already exists for the current branch:

```bash
BRANCH=$(git branch --show-current)
```

```
GET https://gitlab.synerise.com/api/v4/projects/1171/merge_requests?source_branch={BRANCH}&state=opened
```

If an MR already exists, skip to Step 4 (pipeline monitoring). Print the existing MR URL for the user.

### Step 3 — Create the MR

If no MR exists, ask the user for a Jira task reference (e.g., `STOR-1884`). Use the AskUserQuestion tool — suggest a task reference extracted from the branch name if one is present.

Then analyze the changes on the branch to generate a summary of main changes. Use:

```bash
git log origin/master..HEAD --oneline
git diff origin/master..HEAD --stat
```

Create the MR via the GitLab API:

```
POST https://gitlab.synerise.com/api/v4/projects/1171/merge_requests
```

Body:
- `source_branch`: current branch name
- `target_branch`: `master`
- `title`: Use the conventional commit format from the latest commit message (or branch name)
- `description`: Use this template, filling in the changes and task reference:

```
Changes:
- <list main changes based on commits and diff>

Resolves task:
- <TASK_REFERENCE>
```

- `squash`: `true`
- `remove_source_branch`: `true`

Print the created MR URL for the user.

### Step 4 — Monitor the pipeline

After push (whether MR was created or already existed), find the pipeline for the latest commit on the branch:

```
GET https://gitlab.synerise.com/api/v4/projects/1171/pipelines?ref={BRANCH}&order_by=id&sort=desc&per_page=1
```

Then poll the pipeline status every 60 seconds:

```
GET https://gitlab.synerise.com/api/v4/projects/1171/pipelines/{pipeline_id}
```

Use the Bash tool with `run_in_background` and a monitoring script that:
1. Checks pipeline status every 60 seconds
2. Stops when status is `success`, `failed`, `canceled`, or `skipped`
3. Outputs the final status

While waiting, inform the user that monitoring is in progress and they'll be notified when done.

When the pipeline finishes, fetch the jobs to give a summary:

```
GET https://gitlab.synerise.com/api/v4/projects/1171/pipelines/{pipeline_id}/jobs
```

Notify the user with:
- Pipeline status (success/failed)
- Duration
- If failed: which job(s) failed and a link to the job log
