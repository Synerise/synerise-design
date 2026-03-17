# Confirmation (`@synerise/ds-confirmation`)

> A modal-based confirmation dialog with icon, type-coloured actions, and optional batch/decision/related-objects views.

## Package structure

```
src/
  Confirmation.tsx        — main component (generic over ListItemProps)
  Confirmation.types.ts   — all prop interfaces and shared types
  Confirmation.styles.ts  — styled-components (no hardcoded tokens — uses ds-core palette via useTheme)
  Confirmation.const.ts   — BUTTON_COLOR_MAPPING, ICON_COLOR_MAPPING, ITEM_SIZE, MAX_ITEMS
  Confirmation.utils.ts   — getIconColor(type, theme) helper
  index.ts                — public exports
  components/
    Prompt.tsx            — simpler modal variant with free-form content
    BatchItemsList.tsx    — scrollable list of affected items (batch actions)
    DecisionSection.tsx   — radio group for action choice
  hooks/
    useDefaultTexts.tsx   — merges caller-supplied texts with react-intl defaults
  __specs__/
    Confirmation.spec.tsx
    Prompt.spec.tsx
    testData.ts
```

## Public exports

### `Confirmation` (default export)

Generic component: `Confirmation<ItemType extends ListItemProps>`. No `forwardRef`.

**Inherited from `SharedProps` (via `ModalProps` pick):**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | — | Controls modal visibility |
| `title` | `ReactNode` | — | Modal title (overridden internally when `mode === 'related-objects'`) |
| `zIndex` | `number` | — | CSS z-index of the modal |
| `onCancel` | `(e) => void` | — | Cancel / close handler |
| `onOk` | `(e) => void` | — | Confirm handler |
| `type` | `ConfirmationType` | — | **Required.** Controls button and icon colour |
| `texts` | `Partial<ConfirmationTexts>` | — | Override any default label strings |
| `mainButtonProps` | `ConfirmationButtonProps` | — | Extra props for the confirm button |
| `secondaryButtonProps` | `ConfirmationButtonProps` | — | Extra props for the cancel button |

**Own props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `icon` | `ReactNode` | — | **Required.** Icon rendered at size 96 above the title |
| `description` | `ReactNode` | — | Paragraph below the title |
| `relatedObjects` | `ReactNode` | — | If provided, adds a "Show related objects" footer button that switches the modal to a full-content view |
| `batchActionItems` | `ItemType[]` | — | Renders `BatchItemsList` — a scrollable panel of affected items |
| `decisionOptions` | `RadioProps[]` | — | Renders `DecisionSection` — a radio group for choosing an action |
| `additionalInfo` | `ReactNode` | — | Extra content in a rounded `Panel` frame, shown below description |
| `customFooterComponent` | `ReactNode` | — | Additional footer content placed in the left slot |

### `Prompt`

Simpler variant — a small modal with free-form `content` and the same typed buttons. Uses the same `SharedProps` base.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | — | Controls modal visibility |
| `title` | `ReactNode` | — | Modal title |
| `zIndex` | `number` | — | CSS z-index |
| `onCancel` | `(e) => void` | — | Cancel handler |
| `onOk` | `(e) => void` | — | Confirm handler |
| `type` | `ConfirmationType` | — | **Required.** Controls button colour |
| `texts` | `Partial<ConfirmationTexts>` | — | Override default labels |
| `mainButtonProps` | `ConfirmationButtonProps` | — | Extra props for the confirm button |
| `secondaryButtonProps` | `ConfirmationButtonProps` | — | Extra props for the cancel button |
| `content` | `ReactNode` | — | Modal body content |

### `ConfirmationTexts` (type)

| Key | Default (react-intl) |
|-----|----------------------|
| `mainButtonLabel` | `"Ok"` |
| `secondaryButtonLabel` | `"Cancel"` |
| `relatedObjectsButtonLabel` | `"Show related objects"` |
| `relatedObjectsTitle` | `"Related objects"` |
| `batchActionItemsTitle` | `"Objects to delete"` |
| `decisionTitle` | `"What do you want to do?"` |

### `ConfirmationType` (type)

`'success' | 'warning' | 'negative' | 'informative'`

### `ConfirmationProps`, `PromptProps` (types)

Also exported for consumer typing.

## Usage patterns

```tsx
import Confirmation, { Prompt } from '@synerise/ds-confirmation';
import { TrashM } from '@synerise/ds-icon';

// Basic confirmation
<Confirmation
  open={isOpen}
  type="negative"
  icon={<TrashM />}
  title="Delete item?"
  description="This action cannot be undone."
  onOk={handleDelete}
  onCancel={() => setOpen(false)}
/>

// With batch items and custom labels
<Confirmation
  open={isOpen}
  type="warning"
  icon={<TrashM />}
  title="Delete 3 items?"
  batchActionItems={selectedItems}
  texts={{ mainButtonLabel: 'Delete all' }}
  onOk={handleDelete}
  onCancel={handleClose}
/>

// Prompt variant
<Prompt
  open={isOpen}
  type="informative"
  title="Rename segment"
  content={<Input value={name} onChange={setName} />}
  onOk={handleSave}
  onCancel={handleClose}
/>
```

## Internal display modes

`Confirmation` tracks a `DisplayMode` state (`'default' | 'related-objects'`). When `relatedObjects` is provided:
- The footer renders a "Show related objects" ghost button (left slot).
- Clicking it switches to `'related-objects'` mode, replacing the modal body with the `relatedObjects` ReactNode and the modal title with a back-arrow + `relatedObjectsTitle`.
- The footer is hidden in `'related-objects'` mode.

The title prop is **ignored** in `'related-objects'` mode — the internal back-navigation title is used instead.

## Styling

Styles live in `Confirmation.styles.ts`. Colours are resolved at runtime via `useTheme()` from `@synerise/ds-core` — icon colour is looked up from `theme.palette[colorToken]`, not hardcoded. The modal always renders at `size="small"` with `blank={true}` (no default modal padding) in default mode.

`BatchItemsList` is capped at `MAX_ITEMS × ITEM_SIZE` (6 × 32 = 192px) height via `@synerise/ds-scrollbar`.

`DecisionSection` overrides internal Radio styles directly by targeting `RadioWrapper` and `AdditionalData` from `@synerise/ds-radio/dist/Radio.styles` — this is a private import and may break on radio package updates.

## Custom hooks

### `useDefaultTexts`

Merges `Partial<ConfirmationTexts>` supplied by the caller with `react-intl` `<FormattedMessage>` defaults. All six text keys always resolve to a value. Requires `react-intl`'s `IntlProvider` to be present in the tree for i18n to work; falls back to the `defaultMessage` strings otherwise.

## Key dependencies

- `@synerise/ds-modal` — wraps `Modal` as the base dialog
- `@synerise/ds-button` — confirm and cancel actions
- `@synerise/ds-radio` — `DecisionSection` radio group (also imports private `.styles` path)
- `@synerise/ds-list-item` — `BatchItemsList` items; generic `ItemType extends ListItemProps`
- `@synerise/ds-scrollbar` — caps `BatchItemsList` height
- `@synerise/ds-panel` — `AdditionalInfo` and `DecisionSection` frames
- `@synerise/ds-core` — `useTheme` for palette-based icon colour resolution
- `react-intl` — default label strings (peer dependency, `^6.8.7`)

## Implementation notes

- The component is **generic** (`Confirmation<ItemType extends ListItemProps>`). TypeScript inference works without an explicit type parameter when `batchActionItems` is passed.
- All modal content and footer are wrapped in `useMemo` — dependencies must be kept in sync to avoid stale renders.
- `bodyStyle={{ padding: 0 }}` is hardcoded — content components own their own padding via styled-components.
- `onOk` and `onCancel` are **optional**; the footer renders conditionally only when at least one is provided (or `relatedObjects` is set).
- `ConfirmationButtonProps` is a limited subset of `ButtonProps` (`mode`, `loading`, `readOnly`, `disabled`, `tagProps`) plus `DataAttributes` — arbitrary button props cannot be passed through.