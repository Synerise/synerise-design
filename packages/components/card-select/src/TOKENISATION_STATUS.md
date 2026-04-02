# CardSelect — Tokenisation Status

## Token availability

12 component-level color tokens defined in `packages/tokens/tokens/modules/base.json` under `card-select`.
Added to `modules/colors-only.json` and built — CSS vars generated in `dist/css/light.css`.

### Generated CSS custom properties

| Token | References |
|---|---|
| `--ds-card-select-bg-default` | `var(--ds-color-background-base-default)` |
| `--ds-card-select-bg-disabled` | `var(--ds-color-background-base-subtle)` |
| `--ds-card-select-border-default` | `var(--ds-color-border-base-strong)` |
| `--ds-card-select-border-hover` | `var(--ds-color-border-base-strongHover)` |
| `--ds-card-select-border-selected` | `var(--ds-color-border-brand-default)` |
| `--ds-card-select-border-focus` | `var(--ds-color-border-brand-default)` |
| `--ds-card-select-border-error` | `var(--ds-color-border-danger-default)` |
| `--ds-card-select-border-disabled` | `var(--ds-color-border-base-disabled)` |
| `--ds-card-select-text-title` | `var(--ds-color-text-base-default)` |
| `--ds-card-select-icon-selected` | `var(--ds-color-icon-success-default)` |
| `--ds-card-select-icon-unselected` | `var(--ds-color-icon-base-muted)` |
| `--ds-card-select-icon-info` | `var(--ds-color-icon-base-muted)` |

## Color mapping

| Usage | Current palette key | Current hex | Token | Token resolves to | Match? |
|---|---|---|---|---|---|
| background | `white` | `#ffffff` | `--ds-card-select-bg-default` | `#ffffff` | Yes |
| disabled radio bg | `grey-050` | `#f7f8f9` | `--ds-card-select-bg-disabled` | `#f7f8f9` | Yes |
| default border | `grey-300` | `#c2c9cf` | `--ds-card-select-border-default` | `#c2c9cf` | Yes |
| hover border | `grey-400` | `#b5bdc3` | `--ds-card-select-border-hover` | `#b5bdc3` | Yes |
| selected/focus border | `blue-600` | `#0b68ff` | `--ds-card-select-border-selected` | `#0b68ff` | Yes |
| error border | `red-500` | `#ff5a4d` | `--ds-card-select-border-error` | `#f52922` | **No — darker** |
| disabled border | `grey-200` | `#dde0e4` | `--ds-card-select-border-disabled` | `#dde0e4` | Yes |
| title text | `grey-800` | `#384350` | `--ds-card-select-text-title` | `#384350` | Yes |
| tick selected | `green-600` | `#54cb0b` | `--ds-card-select-icon-selected` | `#54cb0b` | Yes |
| tick unselected | `grey-400` | `#b5bdc3` | `--ds-card-select-icon-unselected` | `#b5bdc3` | Yes |
| info icon | `grey-400` | `#b5bdc3` | `--ds-card-select-icon-info` | `#b5bdc3` | Yes |

## Visual diffs

1. **Error border**: `red-500` (`#ff5a4d`) → token uses `red-600` (`#f52922`) — darker, more saturated red. This is the design team's intended value.

## Non-color tokens (deferred)

- `theme.variable('@border-radius-base')` — border radius (no primitive token yet)
- `theme.variable('@box-shadow-base')` — raised card shadow (no shadow primitives yet)
- `theme.variable('@box-shadow-active')` — raised card active shadow (no shadow primitives yet)

## Migration status

- [x] Tokens defined in `modules/base.json`
- [x] Tokens added to `modules/colors-only.json`
- [x] Tokens built — CSS vars in `dist/css/light.css` and `dist/css/dark.css`
- [ ] Visual diffs confirmed by design team
- [ ] `CardSelect.styles.ts` migrated to CSS custom properties
- [ ] `CardSelect.tsx` icon colors migrated
- [ ] Tests updated
- [ ] Build verified

## Files to modify

- `packages/components/card-select/src/CardSelect.styles.ts` — replace `theme.palette` lookups with `var(--ds-card-select-*)` tokens
- `packages/components/card-select/src/CardSelect.tsx` — replace inline `theme.palette` icon color props with token values
