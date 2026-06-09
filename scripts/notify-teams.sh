#!/usr/bin/env bash
#
# notify-teams.sh — post an Adaptive Card to an MS Teams channel (Power Automate
# "Workflows" incoming webhook). Best-effort: never fails the calling pipeline, and
# no-ops if no webhook is configured.
#
# Webhook resolution (first non-empty wins):
#   1. --webhook <url>
#   2. --webhook-env <ENV_NAME>   (reads that env var, e.g. TEAMS_RELEASES_WEBHOOK)
#   3. $TEAMS_TOKENS_WEBHOOK      (default, kept for backward compatibility)
#
# Two card-building modes:
#   * Simple (default) — assembled from --title/--text/--status/--fact/--section.
#   * Rich   — pass a fully-formed Adaptive Card body (a JSON array) via --card-file.
#              The file is used verbatim as content.body; --title/--text/--fact/--section
#              are ignored. --button/--diagnostics still append to the card actions.
#
# A container in a --card-file body tagged {"_truncatable": true, ...} is droppable: if
# the payload exceeds the Teams size budget it is removed (bottom-up) and a "notes
# truncated" line linking to the first Jira button is appended.
#
# Usage:
#   bash scripts/notify-teams.sh \
#     --title "Token preview ready" \
#     --status Good \
#     --text "Optional body line" \
#     --fact "Branch=feature/x" --fact "Source=design-tokens" \
#     --section 'Heading|- **bullet one**\n- bullet two' \  # body is one arg; use \n for breaks
#     --button "Open Chromatic=https://..." --button "Storybook=https://..."
#
#   bash scripts/notify-teams.sh \
#     --webhook-env TEAMS_RELEASES_WEBHOOK \
#     --card-file /tmp/ds-release-card.json \
#     --button "Jira release task=https://..."
#
#   bash scripts/notify-teams.sh --card-file card.json --dry-run   # print payload, no POST
set -euo pipefail

WEBHOOK_EXPLICIT=""   # --webhook
WEBHOOK_ENV_NAME=""   # --webhook-env
TITLE=""
TEXT=""
STATUS="Accent"   # Good | Warning | Attention | Accent | Dark | Light
DIAG=""           # optional chromatic-diagnostics.json → auto Chromatic + Storybook buttons
CARD_FILE=""      # optional path to a JSON array used verbatim as the card body
DRYRUN=""         # --dry-run → print payload + byte size instead of POSTing
FACTS=()
SECTIONS=()
BUTTONS=()

while [[ $# -gt 0 ]]; do
  case "$1" in
    --webhook)     WEBHOOK_EXPLICIT="$2"; shift 2 ;;
    --webhook-env) WEBHOOK_ENV_NAME="$2"; shift 2 ;;
    --title)       TITLE="$2";   shift 2 ;;
    --text)        TEXT="$2";    shift 2 ;;
    --status)      STATUS="$2";  shift 2 ;;
    --diagnostics) DIAG="$2";    shift 2 ;;
    --card-file)   CARD_FILE="$2"; shift 2 ;;
    --dry-run)     DRYRUN=1;     shift ;;
    --fact)        FACTS+=("$2");    shift 2 ;;   # "Label=Value"
    --section)     SECTIONS+=("$2"); shift 2 ;;   # "Heading|markdown body"
    --button)      BUTTONS+=("$2");  shift 2 ;;   # "Label=URL"
    *) echo "notify-teams: unknown option '$1'" >&2; exit 1 ;;
  esac
done

# Resolve the webhook by precedence.
if [[ -n "$WEBHOOK_EXPLICIT" ]]; then
  WEBHOOK="$WEBHOOK_EXPLICIT"
elif [[ -n "$WEBHOOK_ENV_NAME" ]]; then
  WEBHOOK="${!WEBHOOK_ENV_NAME:-}"
else
  WEBHOOK="${TEAMS_TOKENS_WEBHOOK:-}"
fi

# From a chromatic diagnostics file, append "Open Chromatic" + "Published Storybook" buttons.
if [[ -n "$DIAG" && -f "$DIAG" ]]; then
  CHROMATIC_URL="$(DIAG_FILE="$DIAG" node -e 'const d=JSON.parse(require("fs").readFileSync(process.env.DIAG_FILE,"utf8"));process.stdout.write((d.build&&d.build.webUrl)||d.url||d.buildUrl||"")' 2>/dev/null || true)"
  STORYBOOK_URL="$(DIAG_FILE="$DIAG" node -e 'const d=JSON.parse(require("fs").readFileSync(process.env.DIAG_FILE,"utf8"));process.stdout.write((d.build&&d.build.storybookUrl)||d.storybookUrl||"")' 2>/dev/null || true)"
  [[ -n "$CHROMATIC_URL" ]] && BUTTONS+=("Open Chromatic=${CHROMATIC_URL}")
  [[ -n "$STORYBOOK_URL" ]] && BUTTONS+=("Published Storybook=${STORYBOOK_URL}")
fi

# A dry-run prints the payload regardless of webhook; a real run no-ops without one.
if [[ -z "$WEBHOOK" && -z "$DRYRUN" ]]; then
  echo "notify-teams: no webhook configured (--webhook / --webhook-env / TEAMS_TOKENS_WEBHOOK) — skipping notification."
  exit 0
fi

# Newline-join the arrays safely (works with `set -u` even when empty).
FACTS_STR=""
[[ ${#FACTS[@]} -gt 0 ]] && FACTS_STR="$(printf '%s\n' "${FACTS[@]}")"
SECTIONS_STR=""
[[ ${#SECTIONS[@]} -gt 0 ]] && SECTIONS_STR="$(printf '%s\n' "${SECTIONS[@]}")"
BUTTONS_STR=""
[[ ${#BUTTONS[@]} -gt 0 ]] && BUTTONS_STR="$(printf '%s\n' "${BUTTONS[@]}")"

# Build the Adaptive Card and POST it via Node fetch (safe JSON escaping; no curl/jq).
NT_WEBHOOK="$WEBHOOK" NT_TITLE="$TITLE" NT_TEXT="$TEXT" NT_STATUS="$STATUS" \
NT_FACTS="$FACTS_STR" NT_SECTIONS="$SECTIONS_STR" NT_BUTTONS="$BUTTONS_STR" \
NT_CARD_FILE="$CARD_FILE" NT_DRYRUN="${DRYRUN:-}" node <<'NODE'
const fs = require('fs');

// "Label=Value" → [Label, Value] (splits on the first '=').
const splitEq = (s) => (s || '').split('\n').filter(Boolean).map((line) => {
  const i = line.indexOf('=');
  return [line.slice(0, i), line.slice(i + 1)];
});
// "Heading|markdown" → [Heading, markdown] (splits on the first '|').
const splitPipe = (s) => (s || '').split('\n').filter(Boolean).map((line) => {
  const i = line.indexOf('|');
  return i === -1 ? [line, ''] : [line.slice(0, i), line.slice(i + 1)];
});

const buttons = splitEq(process.env.NT_BUTTONS).map(([title, url]) => ({
  type: 'Action.OpenUrl', title, url,
}));

let body;
const cardFile = process.env.NT_CARD_FILE;
if (cardFile) {
  // Rich mode: use the provided JSON array verbatim as the card body.
  const parsed = JSON.parse(fs.readFileSync(cardFile, 'utf8'));
  if (!Array.isArray(parsed)) throw new Error('--card-file must contain a JSON array (the card body)');
  if (process.env.NT_SECTIONS) console.error('notify-teams: --section ignored because --card-file was provided.');
  body = parsed;
} else {
  // Simple mode: assemble from --title/--fact/--text/--section.
  const facts = splitEq(process.env.NT_FACTS).map(([title, value]) => ({ title, value }));
  body = [
    { type: 'TextBlock', size: 'Large', weight: 'Bolder',
      color: process.env.NT_STATUS || 'Accent', text: process.env.NT_TITLE, wrap: true },
  ];
  if (facts.length) body.push({ type: 'FactSet', facts });
  if (process.env.NT_TEXT) body.push({ type: 'TextBlock', text: process.env.NT_TEXT, wrap: true });
  for (const [heading, markdown] of splitPipe(process.env.NT_SECTIONS)) {
    // --section bodies are single-line args; use literal "\n" for line breaks (Teams renders
    // a real newline as a break, so convert the escape here).
    body.push({
      type: 'Container', spacing: 'Medium', items: [
        { type: 'TextBlock', weight: 'Bolder', size: 'Medium', text: heading, wrap: true },
        { type: 'TextBlock', text: markdown.replace(/\\n/g, '\n'), wrap: true },
      ],
    });
  }
}

const payload = {
  type: 'message',
  attachments: [{
    contentType: 'application/vnd.microsoft.card.adaptive',
    contentUrl: null,
    content: {
      type: 'AdaptiveCard',
      $schema: 'http://adaptivecards.io/schemas/adaptive-card.json',
      version: '1.4',
      msteams: { width: 'Full' },
      body,
      actions: buttons,
    },
  }],
};

// Teams rejects oversized cards (~28KB). Stay under budget by dropping containers the
// caller marked `_truncatable` (bottom-up), then add a "notes truncated" link-out.
const MAX_BYTES = 24000;
const size = () => Buffer.byteLength(JSON.stringify(payload), 'utf8');
if (size() > MAX_BYTES) {
  const jiraBtn = buttons.find((b) => /jira/i.test(b.title)) || buttons[0];
  for (let i = body.length - 1; i >= 0 && size() > MAX_BYTES; i--) {
    if (body[i] && body[i]._truncatable) body.splice(i, 1);
  }
  body.push({
    type: 'TextBlock', wrap: true, isSubtle: true,
    text: jiraBtn && jiraBtn.url
      ? `**Notes truncated for Teams.** Full release notes: [${jiraBtn.title}](${jiraBtn.url})`
      : '**Notes truncated for Teams.** See the linked Jira task for the full release notes.',
  });
}
// Strip the internal marker before sending (Adaptive Cards would otherwise carry it).
for (const item of body) { if (item && typeof item === 'object') delete item._truncatable; }

if (process.env.NT_DRYRUN) {
  console.log(JSON.stringify(payload, null, 2));
  console.log(`\n[dry-run] payload bytes: ${size()} (budget ${MAX_BYTES})`);
  process.exit(0);
}

fetch(process.env.NT_WEBHOOK, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(payload),
})
  .then(async (res) => {
    if (res.ok) console.log(`Teams notification sent (${res.status})`);
    else console.log(`Warning: Teams notification failed (${res.status}): ${(await res.text()).slice(0, 200)}`);
  })
  .catch((e) => console.log(`Warning: Teams notification error: ${String(e)}`)); // never fail the pipeline
NODE
