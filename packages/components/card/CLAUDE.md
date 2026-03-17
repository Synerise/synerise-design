# Card (`@synerise/ds-card`)

> A content container with an optional header, collapsible body, and summary section; companion components handle badge icons and grouped layouts.

## Package structure

```
src/
  Card/
    Card.tsx          — main component
    Card.types.ts     — CardProps, Backgrounds type
    Card.styles.ts    — styled-components for Card
  CardGroup/
    CardGroup.tsx     — CSS grid wrapper for multiple cards
    CardGroup.types.ts
    CardGroup.styles.ts
  CardBadge/
    CardBadge.tsx     — circular icon badge used in card header
    CardBadge.types.ts
    CardBadge.styles.tsx
  CardSummary/
    CardSummary.tsx        — bulleted summary list (used in staticContent)
    CardSummaryItem.tsx    — single summary row with optional collapsible objects
    CardSummary.types.ts
    CardSummary.styles.tsx
  constants.ts        — ANIMATION_DURATION = 300 (ms)
  index.ts            — public exports
```

## Public exports

### `Card` (default export)

Props (`CardProps` = `WithHTMLAttributes<HTMLDivElement, …>`):

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | `undefined` | Main body content (animated, hidden when `hideContent=true`). |
| `background` | `'white' \| 'white-shadow' \| 'grey' \| 'grey-shadow' \| 'outline'` | `'white-shadow'` | Controls background colour and box-shadow. |
| `raised` | `boolean` | `undefined` | Forces active box-shadow regardless of hover. |
| `lively` | `boolean` | `undefined` | Adds hover box-shadow. |
| `disabled` | `boolean` | `undefined` | `pointer-events: none` + 40% opacity. |
| `withHeader` | `boolean` | `undefined` | Renders the header section (title, icon, description, side actions). |
| `title` | `ReactNode` | `undefined` | Card header title (`<Title level={4}>`). |
| `titleTag` | `ReactNode` | `undefined` | Element rendered inline next to the title (e.g. a status tag). |
| `description` | `ReactNode` | `undefined` | Subtitle text below (or beside, if `compactHeader`) the title. |
| `compactHeader` | `boolean` | `undefined` | Renders title + description side by side on one line. |
| `icon` | `ReactNode` | `undefined` | Icon shown in the header slot. Takes precedence over `avatar` and `renderBadge`. |
| `iconColor` | `string` | `undefined` | CSS colour passed to `<Icon color>`. |
| `avatar` | `ReactNode` | `undefined` | Avatar shown in the header slot when `icon` is absent. |
| `renderBadge` | `() => ReactNode` | `undefined` | Render-prop for a custom badge; used when neither `icon` nor `avatar` is set. |
| `headerSideChildren` | `ReactNode` | `undefined` | Actions area on the right side of the header. Wrapped in `VisibilitySensor`. |
| `onHeaderClick` | `(e: SyntheticEvent) => void` | `undefined` | Click handler on the header; adds `cursor: pointer` when set. |
| `headerBorderBottom` | `boolean` | `undefined` | Renders a 1px bottom border under the header. |
| `defaultHeaderBackgroundColor` | `boolean` | `undefined` | Forces white background on the header. |
| `withoutPadding` | `boolean` | `undefined` | Removes 24px padding from the content wrapper. |
| `hideContent` | `boolean` | `undefined` | Collapses the main `children` area (animated via `react-animate-height`). |
| `staticContent` | `ReactNode` | `undefined` | Content that animates in the *opposite* direction of `children` — visible when `hideContent=true`, hidden otherwise. |
| `showSideChildrenWhenHeaderHidden` | `boolean` | `undefined` | Re-renders `headerSideChildren` in a sticky footer when the header scrolls out of view (tracked via `VisibilitySensor`). |
| `className` | `string` | `undefined` | Additional class; `ds-card` is always added. |
| `style` | `CSSProperties` | `undefined` | Inline styles on the root container. |

### `CardGroup`

CSS grid wrapper for laying out multiple `Card`s side by side.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `columns` | `number` | — | **Required.** Number of equal-width columns (`1fr` each, 24px gap). |
| `children` | `ReactNode` | — | **Required.** `Card` elements. |

### `CardBadge`

Circular 24×24 icon badge for use as `renderBadge` content or standalone.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `icon` | `ReactNode` | — | **Required.** Icon element rendered inside the badge. |
| `status` | `'success' \| 'checked' \| 'warning' \| 'error' \| 'default'` | `'default'` | Controls background (`green/yellow/red-600` or transparent) and icon colour. |

### `CardSummary`

Bulleted summary list intended for use in `Card`'s `staticContent` prop.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `CardSummaryItemProps[]` | — | **Required.** List of summary rows. |
| `title` | `ReactNode` | `undefined` | Optional heading above the list. |

Each item in `items` (`CardSummaryItemProps`):

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `key` | `Key` | — | **Required.** React key. |
| `value` | `ReactNode` | — | **Required.** Primary value displayed. |
| `label` | `ReactNode` | `undefined` | Optional label shown before `value` with a colon. |
| `valueButton` | `ReactNode` | `undefined` | Action button placed to the right of the value. |
| `summaryObjects` | `ReactElement[]` | `undefined` | Collapsible list of child elements (toggled with an angle icon). |
| `summaryObjectsDirection` | `'row' \| 'column'` | `'row'` | Flex direction of the `summaryObjects` container. |

### `CardStyles`

Named export containing all styled-component maps (`CardStyles.Card`, `CardStyles.CardGroup`, `CardStyles.CardBadge`) for targeted overrides in consuming apps.

### Type exports

`CardProps`, `Backgrounds`, `CardGroupProps`, `CardBadgeProps`, `BadgeStatus`, `CardSummaryProps`

## Usage patterns

```tsx
import Card, { CardGroup, CardBadge, CardSummary } from '@synerise/ds-card';

// Basic card with header
<Card withHeader title="Title" description="Subtitle" icon={<MyIcon />} iconColor="#54cb0b" lively>
  Content goes here
</Card>

// Collapsible card — body hidden, static content shown
<Card
  withHeader
  title="Summary"
  hideContent
  staticContent={
    <CardSummary
      items={[
        { key: '1', label: 'Status', value: 'Active' },
        { key: '2', value: 'Details', summaryObjects: [<span>Item</span>] },
      ]}
    />
  }
/>

// Grid of cards
<CardGroup columns={3}>
  <Card>A</Card>
  <Card>B</Card>
  <Card>C</Card>
</CardGroup>

// CardBadge as renderBadge
<Card withHeader renderBadge={() => <CardBadge icon={<CheckS />} status="success" />} title="Done" />
```

## Key dependencies

- `react-animate-height` — animates `children` and `staticContent` show/hide (300ms). The `children` area fades in via a `.card-animation` CSS class that targets `.rah-static--height-auto`.
- `react-visibility-sensor` — wraps `headerSideChildren` to detect when the header leaves the viewport; powers `showSideChildrenWhenHeaderHidden`.
- `uuid` — used in `CardSummaryItem` to key `summaryObjects` elements that lack a `.key`.

## Implementation notes

- **`icon` > `avatar` > `renderBadge`**: all three occupy the same header slot. Rendering order is `(icon && …) || avatar || (renderBadge && renderBadge())` — `icon` wins if set.
- **`staticContent` is inverted**: it uses `height={hideContent ? 'auto' : 0}` while `children` uses `height={hideContent ? 0 : 'auto'}`. Pass `staticContent` when you want content that stays visible when the main body is collapsed.
- **`headerSideChildren` click propagation**: the element is wrapped in a `div` with `onClick={(e) => e.stopPropagation()}` to prevent triggering `onHeaderClick`.
- **`background` default** is `'white-shadow'`, not `'white'` — the README incorrectly listed `'white'`.
- **`size` prop does not exist** in the current source — the README mentions it but it is not in `Card.types.ts` and is not used anywhere in the component.
- **`CardSummary` placement**: `PaddingWrapper` in `Card.styles.ts` applies `margin: 0 48px` specifically to `CardSummaryWrapper` children, so `CardSummary` inside `staticContent` gets extra horizontal margin automatically.
- **`compactHeader`**: when `true`, title and description appear side by side (flex row) with a vertical divider between them. Title height is fixed at 32px.
- **`titleTag`**: rendered in a flex row next to the title text, not below — useful for a status `<Tag>`.
