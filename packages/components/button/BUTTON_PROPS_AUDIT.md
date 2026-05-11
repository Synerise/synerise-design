# Button Props Audit — Cross-Repo Analysis

> Audit date: 2026-04-02
> Repos analysed: portal-ui-bridge1, portal-ui-bridge2, synerise-design2 (excluding button package itself and storybook stories)

## Critical Props (must keep)

| Prop | portal-ui-bridge1 | portal-ui-bridge2 | synerise-design2 | Total |
|---|---|---|---|---|
| `type` | 1182 | 606 | 145 | ~1933 |
| `onClick` | 1000+ | 703 | 144 | ~1847 |
| `mode` | 575 | 381 | 101 | ~1057 |
| `size` | 598 | 38 | 50 | ~686 |
| `icon` (as children) | 14 (prop) | 333 | 248 | ~595 |
| `disabled` | 174 | 158 | 123 | ~455 |
| `color` | 62 | 52 | — | ~114 |
| `customColor` | 5 | 0 | 86 | ~91 |

## Used Props (keep)

| Prop | Approx total | Notes |
|---|---|---|
| `loading` | ~150 | Async operations |
| `data-*` | ~148 | Test IDs (`data-testid`) |
| `className` | ~114 | Styling overrides |
| `style` | ~86 | Inline styles |
| `htmlType` | ~85 | Mostly `"button"` and `"submit"` |
| `error` | ~61 | DS-specific, used in ds-* components |
| `block` | ~23 | Full-width buttons |
| `ButtonProps` type | ~538 | Heavily imported for composition/prop drilling |
| Spread `{...props}` | ~58 | Prop forwarding patterns |

## Dead or Near-Dead Props (safe to drop from antd inheritance)

| Prop | Total usage | Verdict |
|---|---|---|
| `shape` | 18 | Near-dead — only `"circle"` used |
| `prefixCls` | 0 | Dead |
| `ghost` (boolean) | 0 | Dead — `type="ghost"` used instead |
| `danger` (boolean) | 1 | Dead — `type="danger"` used instead |
| `target` | 0 | Dead |
| `href` | 6 | Near-dead — 4 in bridge1, 2 in bridge2 |
| `groupVariant` | 0 | Dead |
| `pressed` | 7 | Near-dead |
| `justifyContent` | 4 | Near-dead |
| `leftIconSize` | 0 | Dead |
| `rightIconSize` | 0 | Dead |
| `ref` | 0 | Not forwarded by consumers (still needed internally) |
| `role` | 0 | Dead |
| `aria-*` | 0 | Dead |
| `tabIndex` | 1 | Dead |
| `onMouseDown/Up/Enter/Leave` | 0 | Dead |

## Type Values

| Value | Frequency | Keep? |
|---|---|---|
| `ghost` | ~732 | Yes — most popular |
| `primary` | ~433 | Yes |
| `secondary` | ~246 | Yes |
| `ghost-primary` | ~217 | Yes |
| `custom-color` | ~98 | Yes |
| `custom-color-ghost` | ~63 | Yes |
| `default` | ~62 | Yes |
| `ghost-white` | ~39 | Yes |
| `danger` | ~28 | Yes |
| `success` | ~27 | Yes |
| `tertiary` | ~20 | Yes |
| `warning` | ~18 | Yes |
| `flat` | ~6 | Keep (low use) |
| `ghost-secondary` | ~4 | Keep (low use) |
| `tertiary-white` | ~2 | Consider dropping |
| `primary-on-blue` | ~1 | Consider dropping |

## Mode Values

| Value | Frequency | Keep? |
|---|---|---|
| `icon-label` | ~494 | Yes — most popular |
| `single-icon` | ~361 | Yes |
| `label` | ~112 | Yes |
| `label-icon` | ~110 | Yes |
| `simple` | ~25 | Yes |
| `two-icons` | ~20 | Yes |
| `split` | 0 | Dead |

## Size Values

| Value | Frequency | Notes |
|---|---|---|
| `small` / `S` | ~272 | Inconsistent API — both string forms used |
| `large` / `L` | ~255 | Inconsistent API |
| `medium` / `M` | ~174 | Inconsistent API |
| `auto` | ~2 | Near-dead |

## Sub-components

| Sub-component | Total usage | Verdict |
|---|---|---|
| `Button.Expander` | ~34 | Keep |
| `Button.Creator` | ~10 | Keep (low use) |
| `Button.Checkbox` | ~2 | Near-dead |
| `Button.Star` | 0 | Dead — remove |

## Key Findings

1. **`shape` is effectively dead** — 18 usages of `"circle"` across 3 repos. Could be absorbed into `mode` or kept as a minimal prop.
2. **`href`/`target` are near-dead** — 6 total `href`, 0 `target`. Could be dropped or kept trivially.
3. **`ghost`/`danger` boolean props are dead** — DS uses string `type` values instead.
4. **`ButtonProps` type is load-bearing** — 538+ imports for prop drilling (`Partial<ButtonProps>`). New type must be compatible.
5. **Size API is inconsistent** — both `"small"/"medium"/"large"` and `"S"/"M"/"L"` used. Should unify.
6. **Several DS-specific props are dead** — `groupVariant`, `leftIconSize`, `rightIconSize`, `pressed`, `justifyContent` have 0-7 usages.
7. **`Button.Star` is unused** — remove entirely.
8. **`mode="split"` is unused** — remove.
9. **Spread patterns** — 58 instances of `{...buttonProps}` mean the type must remain a compatible superset.
10. **`aria-*` and `role` are unused** — concerning for a11y but reflects current state.
