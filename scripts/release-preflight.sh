#!/usr/bin/env bash
#
# release-preflight.sh — interactive reminder shown before `pnpm lerna:version`.
#
# The /ds-release skill (Claude Code) is the preferred way to cut a release: around
# the version bump it builds the two-audience changelog, creates the Jira release
# task, and posts the release card to the Teams releases channel. Running
# `lerna version` directly skips all of that. This guard nudges toward the skill
# while letting you accept and proceed with the direct publish.
#
# Bypass non-interactively (CI, scripts):  SKIP_RELEASE_GUARD=1 pnpm lerna:version
set -euo pipefail

# Never block automation: proceed silently-ish when bypassed, in CI, or with no TTY.
if [[ "${SKIP_RELEASE_GUARD:-}" == "1" || -n "${CI:-}" || ! -t 0 ]]; then
  echo "release-preflight: non-interactive or bypass set — proceeding with direct 'lerna version'."
  exit 0
fi

cat <<'MSG'

────────────────────────────────────────────────────────────────────────
  💡 Tip: the /ds-release skill (Claude Code) is the recommended way to
     cut a release — it's much more robust than this script alone.
────────────────────────────────────────────────────────────────────────
  `lerna version` only bumps versions and writes the publish commit.
  /ds-release does the whole release: changelog (PO summary + dev detail),
  the Jira release task, the Teams release-channel post, and links to the
  changed Storybook docs.

  To use it, cancel here and run  /ds-release  in Claude Code.
────────────────────────────────────────────────────────────────────────

MSG

printf "Or continue with a direct 'lerna version' now? [y/N] "
read -r reply || reply=""
case "$reply" in
  [yY] | [yY][eE][sS])
    echo "Proceeding with direct 'lerna version'…"
    exit 0
    ;;
  *)
    echo "Aborted. Run /ds-release in Claude Code, or re-run with SKIP_RELEASE_GUARD=1 to bypass this guard."
    exit 1
    ;;
esac
