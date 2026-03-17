# InformationCard (`@synerise/ds-information-card`)

> Rich detail card for displaying entity/object information — title, subtitle, icon badge, description, property list, summary row, footer, and an optional slide-in actions menu. Ships with `InformationCardTooltip` to render it on hover over any trigger element.

## Package structure

```
src/
  InformationCard.tsx                           — main component (forwardRef)
  InformationCard.types.tsx                     — InformationCardProps, BadgeData
  InformationCard.styles.tsx                    — INFOCARD_WIDTH, all card styled-components
  InformationCard.utils.tsx                     — buildInitialsBadge, buildIconBadge, buildExtraInfo
  index.ts                                      — public exports
  InformationCardActions/                       — slide-in quick-actions menu panel
  InformationCardDescription/                   — editable or static description area
  InformationCardFooter/                        — footer text + action button
  InformationCardPropertyList/                  — label/value property rows + dividers
  InformationCardSummary/                       — icon + label summary items row
  InformationCardTooltip/                       — hover popover wrapper (forwardRef)
```

## Public exports

### `InformationCard` (default export)

`forwardRef<HTMLDivElement, InformationCardProps>`. Fixed width of **350 px**.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `ReactNode` | — | **Required.** Card title; string values get a copy-on-click button |
| `subtitle` | `ReactNode` | `undefined` | Second line; string values get a copy-on-click button |
| `icon` | `ReactNode` | `undefined` | Avatar icon (raw SVG); use with `buildIconBadge` or `buildInitialsBadge` helpers |
| `iconColor` | `string` | `undefined` | Color applied to `icon` element |
| `renderBadge` | `Function \| null` | `undefined` | Custom badge render prop; `null` hides the badge entirely |
| `avatarTooltipText` | `string` | `undefined` | Tooltip on the avatar badge (requires `renderBadge`) |
| `copyTooltip` | `string` | `undefined` | Tooltip shown before copying subtitle |
| `copiedTooltip` | `string` | `undefined` | Tooltip shown after copying subtitle |
| `notice` | `ReactNode` | `undefined` | Warning/error/notice shown between subtitle and description |
| `descriptionConfig` | `SubtleTextAreaProps \| string \| null` | `undefined` | Editable textarea config or static string for description; `null` or omit to hide |
| `renderAdditionalDescription` | `() => ReactNode` | `undefined` | Render prop for extra content above the footer |
| `renderFooter` | `() => JSX.Element` | `undefined` | Fully custom footer renderer; replaces default footer |
| `footerText` | `ReactNode \| null` | `undefined` | Footer label text; `null` hides footer entirely |
| `actionButton` | `boolean \| (() => ReactNode)` | `undefined` | Bottom-right action button: `true` uses default icon, function renders custom element |
| `actionButtonCallback` | `() => void` | `undefined` | Click handler for default action button |
| `actionButtonTooltipText` | `string` | `undefined` | Tooltip for default action button |
| `actionsMenu` | `Omit<InformationCardActionsProps, 'onHeaderClick' \| 'maxHeight'>` | `undefined` | Quick-actions config; shows a "Quick actions" footer button that slides in a menu |
| `propertyListItems` | `InformationCardPropertyItem[]` | `undefined` | Label/value property rows; may include `{ type: 'divider' }` entries |
| `summaryItems` | `InformationCardSummaryItem[]` | `undefined` | Icon+label summary row items with optional tooltip |
| `asTooltip` | `boolean` | `undefined` | Adjusts internal styles for tooltip rendering (used by `InformationCardTooltip`) |
| `className` | `string` | `undefined` | Additional CSS class |
| + all `HTMLDivElement` attributes | | | |

---

### `InformationCardTooltip`

`forwardRef<HTMLDivElement, InformationCardTooltipProps>`. Wraps `InformationCard` in a hover popover (floating-ui).

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | **Required.** Trigger element |
| `informationCardProps` | `InformationCardProps` | `undefined` | Props forwarded to `<InformationCard>` (alternative to `content`) |
| `content` | `ReactNode` | `undefined` | Custom content alternative to `informationCardProps` |
| `popoverProps` | `Omit<PopoverOptions, 'listNavigationConfig' \| 'arrowConfig' \| 'returnFocus' \| 'modal'>` | `undefined` | Pass-through to `@synerise/ds-popover` (floating-ui) |
| `asChild` | `boolean` | `undefined` | Forward trigger props to first child (Radix-style) |
| + all `HTMLDivElement` attributes | | | |

Default popover config: hover trigger, 100 ms open delay, 400 ms close delay, 8 px main-axis offset.

---

### `InformationCardPropertyList`

Standalone property list component. Props: `items?: InformationCardPropertyItem[]`.

---

### Utility functions

| Function | Signature | Description |
|----------|-----------|-------------|
| `buildInitialsBadge` | `(name: string) => ReactNode` | Creates an avatar badge with initials extracted from `name` |
| `buildIconBadge` | `(data: BadgeData) => ReactNode` | Creates an `ObjectAvatar` badge from `BadgeData` config |
| `buildExtraInfo` | `(message: ReactNode, level: string) => ReactNode` | Wraps message in a styled alert wrapper for the `notice` prop |

---

### Type exports

`InformationCardProps`, `BadgeData`, `InformationCardTooltipProps`, `LegacyInformationCardPlacement`, `StyledInformationCardTooltip`, `InformationCardPropertyItem`, `InformationCardPropertyDivider`, `InformationCardPropertyItemTypes`, `InformationCardPropertyListProps`.

## Usage patterns

```tsx
import InformationCard, {
  InformationCardTooltip,
  buildIconBadge,
  buildInitialsBadge,
} from '@synerise/ds-information-card';

// As a standalone card
<InformationCard
  title="Customer segment"
  subtitle="ID: 12345"
  icon={<SegmentM />}
  iconColor="mars"
  renderBadge={() => buildIconBadge({ iconElement: <SegmentM />, iconColor: 'mars' })}
  propertyListItems={[
    { label: 'Created', value: '2024-01-01' },
    { type: 'divider' },
    { label: 'Members', value: '1,200' },
  ]}
/>

// As a tooltip on hover
<InformationCardTooltip
  informationCardProps={{
    title: 'Customer segment',
    subtitle: 'ID: 12345',
  }}
  popoverProps={{ placement: 'top' }}
>
  <button>Hover me</button>
</InformationCardTooltip>
```

## Key dependencies

- `@synerise/ds-popover` (floating-ui) — `InformationCardTooltip` hover popover
- `@synerise/ds-subtle-form` — `SubtleTextAreaProps` used for editable description; imported via **deep path** `dist/Elements/TextArea/TextArea.types`
- `@synerise/ds-avatar` — `Color` and `Size` types imported via **deep path** `dist/Avatar.types`
- `@floating-ui/react` — `FloatingDelayGroup` wrapping for nested popover delay isolation
- `react-resize-detector` — `useResizeObserver` used to track card height for the actions-menu slide animation

## Implementation notes

- The actions-menu panel **slides in over the main card content** (`InfoCardSlide`). Height is tracked via `useResizeObserver` so the slide container matches card height exactly — do not set a fixed height on the card wrapper.
- `InformationCardTooltip` wraps the trigger in a `display: contents` div — this preserves parent layout but means the wrapper itself takes no space. Use `asChild` if you need the trigger to receive ref/event props directly.
- `subtitle` and `title` accept `ReactNode` (not just `string`) — copy-on-click only activates when the value is a plain string.
- `actionsMenu` omits `onHeaderClick` and `maxHeight` from `InformationCardActionsProps` — these are managed internally.
- `renderBadge={null}` explicitly hides the badge; omitting `renderBadge` uses the default icon rendering via `icon` + `buildIconBadge`.
- Two deep imports are fragile: `@synerise/ds-avatar/dist/Avatar.types` and `@synerise/ds-subtle-form/dist/Elements/TextArea/TextArea.types` — changes to those packages' dist layout will break the build.
- Uses Jest (not Vitest) — `jest.config.js` is present; several tests are skipped with `xit`/`it.todo`.
