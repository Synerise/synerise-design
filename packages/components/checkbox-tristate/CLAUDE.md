# CheckboxTristate (`@synerise/ds-checkbox-tristate`)

> **DEPRECATED.** Thin wrapper that forwards all props to `<Checkbox tristate />` from `@synerise/ds-checkbox`. Do not use in new code.

## Migration

Replace all uses of this package with `@synerise/ds-checkbox`:

```tsx
// ❌ deprecated
import CheckboxTristate from '@synerise/ds-checkbox-tristate';
<CheckboxTristate checked={value} onChange={handler} />

// ✅ use instead
import Checkbox from '@synerise/ds-checkbox';
<Checkbox tristate checked={value} onChange={handler} />
```

Types are also re-exported from `@synerise/ds-checkbox`:

```tsx
// ❌ deprecated
import type { CheckboxTristateChangeEvent } from '@synerise/ds-checkbox-tristate';

// ✅ use instead
import type { CheckboxTristateChangeEvent } from '@synerise/ds-checkbox';
```

## Package structure

```
src/
  CheckboxTristate.tsx       — @deprecated wrapper: renders <Checkbox tristate {...props} />
  CheckboxTristate.types.ts  — @deprecated re-exports of ds-checkbox types
  index.ts                   — @deprecated public exports (all marked @deprecated in JSDoc)
```

## Public exports (all deprecated)

### `CheckboxTristate` (default)

`@deprecated` — wraps `<Checkbox tristate />`. Accepts `Omit<CheckboxTristateProps, 'tristate'>` — same props as `<Checkbox tristate />` without the `tristate` flag itself. See `@synerise/ds-checkbox` CLAUDE.md for the full prop reference.

### Types (deprecated re-exports)

| Export | Description |
|--------|-------------|
| `CheckboxTristateProps` | `@deprecated` — re-export of `Omit<BaseCheckboxTristateProps, 'tristate'>` from `ds-checkbox` |
| `CheckboxTristateChangeEvent` | `@deprecated` — re-export of the same type from `ds-checkbox` |
| `CheckboxTristateChangeEventTarget` | `@deprecated` — re-export of the same type from `ds-checkbox` |

## Key dependencies

- `@synerise/ds-checkbox` — the actual implementation; this package is purely a compatibility shim
