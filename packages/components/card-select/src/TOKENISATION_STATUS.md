# CardSelect — Tokenisation Status

✅ **Migrated** on `chore/tokenisation` (colors, shadow, opacity).

The canonical, up-to-date report — including the full value→token mapping, visual diffs, and the
`check-*` token-naming discrepancy flagged for UX — lives in the repo-root
[`TOKENISATION_STATUS.md`](../../../../TOKENISATION_STATUS.md#card-select).

## Summary

- **Layer:** module (`--ds-card-select-*`), with semantic fallback for the error ring and the disabled
  radio-circle background (no module token exists for those).
- **Code:** `CardSelect.styles.ts` (outline rings, radio borders, header, bg, opacity, raised shadow) +
  `CardSelect.tsx` (tick / info icon colours). The `getVar` (`theme.palette`) helper and `useTheme()`
  were removed.
- **Deferred:** `border-radius: @border-radius-base` (antd Less variable — no dimension token yet).

> ⚠️ The previous version of this file listed token names (`--ds-card-select-border-default`,
> `-error`, `-icon-selected`, …) that **no longer exist** — the upstream token set evolved (now
> `border-color-*`, `check-*`, `shadow-default/hover`, `disabled-opacity`). Always verify against
> `packages/tokens/dist/css/light.css`.
