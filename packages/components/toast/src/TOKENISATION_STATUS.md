# Toast — Tokenisation Status

## Token availability

20 component-level color tokens defined in `packages/tokens/tokens/modules/base.json` under `toast`.
Added to `modules/colors-only.json` and built — CSS vars generated in `dist/css/light.css`.

### Generated CSS custom properties

| Token | References |
|---|---|
| `--ds-toast-variant-success-bg` | `var(--ds-color-background-base-default)` |
| `--ds-toast-variant-success-border` | `var(--ds-color-border-success-default)` |
| `--ds-toast-variant-success-text-label` | `var(--ds-color-text-base-default)` |
| `--ds-toast-variant-success-text-description` | `var(--ds-color-text-base-subtle)` |
| `--ds-toast-variant-success-icon` | `var(--ds-color-icon-success-default)` |
| `--ds-toast-variant-warning-bg` | `var(--ds-color-background-base-default)` |
| `--ds-toast-variant-warning-border` | `var(--ds-color-border-warning-default)` |
| `--ds-toast-variant-warning-text-label` | `var(--ds-color-text-base-default)` |
| `--ds-toast-variant-warning-text-description` | `var(--ds-color-text-base-muted)` |
| `--ds-toast-variant-warning-icon` | `var(--ds-color-icon-warning-default)` |
| `--ds-toast-variant-error-bg` | `var(--ds-color-background-base-default)` |
| `--ds-toast-variant-error-border` | `var(--ds-color-border-danger-default)` |
| `--ds-toast-variant-error-text-label` | `var(--ds-color-text-base-default)` |
| `--ds-toast-variant-error-text-description` | `var(--ds-color-text-base-muted)` |
| `--ds-toast-variant-error-icon` | `var(--ds-color-icon-danger-default)` |
| `--ds-toast-variant-informative-bg` | `var(--ds-color-background-base-default)` |
| `--ds-toast-variant-informative-border` | `var(--ds-color-border-neutral-default)` |
| `--ds-toast-variant-informative-text-label` | `var(--ds-color-text-base-default)` |
| `--ds-toast-variant-informative-text-description` | `var(--ds-color-text-base-muted)` |
| `--ds-toast-variant-informative-icon` | `var(--ds-color-icon-base-default)` |

## Color mapping

| Usage | Current palette key | Current hex | Token | Token resolves to | Match? |
|---|---|---|---|---|---|
| success icon | `green-600` | `#54cb0b` | `--ds-toast-variant-success-icon` | `#54cb0b` | Yes |
| success border | `green-600` | `#54cb0b` | `--ds-toast-variant-success-border` | `#54cb0b` | Yes |
| warning icon | `yellow-600` | `#fab700` | `--ds-toast-variant-warning-icon` | `#fab700` | Yes |
| warning border | `yellow-600` | `#fab700` | `--ds-toast-variant-warning-border` | `#fab700` | Yes |
| negative icon | `red-500` | `#ff5a4d` | `--ds-toast-variant-error-icon` | `#f52922` | **No — darker** |
| negative border | `red-500` | `#ff5a4d` | `--ds-toast-variant-error-border` | `#f52922` | **No — darker** |
| informative icon | `grey-600` | `#6a7580` | `--ds-toast-variant-informative-icon` | `#6a7580` | Yes |
| informative border | `grey-600` | `#6a7580` | `--ds-toast-variant-informative-border` | `#57616d` | **No — darker** |
| background | `white` | `#ffffff` | `--ds-toast-variant-*-bg` | `#ffffff` | Yes |
| body text/icons | `grey-600` | `#6a7580` | `--ds-color-text-base-muted` | `#6a7580` | Yes |

## Visual diffs

1. **Negative (error) type**: `red-500` (`#ff5a4d`) → token uses `red-600` (`#f52922`) — darker, more saturated red
2. **Informative border**: `grey-600` (`#6a7580`) → token uses `grey-700` (`#57616d`) via `--ds-color-border-neutral-default` — darker grey

These represent the design team's intended values from Token Studio.

## Unmapped colors (no component token)

| Usage | Palette key | Hex | Suggested semantic token |
|---|---|---|---|
| NumberWrapper hover underline | `grey-400` | `#b5bdc3` | Keep `theme.palette` — decorative gradient |
| IconOrderWrapper hover fill | `blue-600` | `#0b68ff` | `--ds-color-background-brand-solid` or keep `theme.palette` — interactive hover state |
| Container box-shadow | `rgba(35, 41, 54, 0.12)` | — | Keep hardcoded — shadow token exists but not yet in color-only build |
| Gradient transparent stops | `rgba(255, 255, 255, 0)` | — | Keep hardcoded — transparent white |

## Migration status

- [x] Tokens defined in `modules/base.json`
- [x] Tokens added to `modules/colors-only.json`
- [x] Tokens built — CSS vars in `dist/css/light.css` and `dist/css/dark.css`
- [ ] Visual diffs confirmed by design team
- [ ] `Toast.styles.ts` migrated to CSS custom properties
- [ ] Tests updated
- [ ] Build verified

## Files to modify

- `packages/components/toast/src/Toast.styles.ts` — replace `theme.palette` lookups with `var(--ds-toast-*)` and semantic tokens
