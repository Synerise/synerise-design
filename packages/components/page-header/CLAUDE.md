# PageHeader (`@synerise/ds-page-header`)
> A full-width page-level header component providing title, navigation (back/close), inline editing, tooltip, avatar, tabs, and right-side action slots.

## Package structure
```
src/
  PageHeader.tsx          — root component, composes all sub-components
  PageHeader.types.ts     — PageHeaderProps type definition
  PageHeader.styles.ts    — MainContainer, PageHeaderContainer, and other styled primitives; re-exports sub-component styles for backwards compatibility
  PageHeaderBack/
    PageHeaderBack.tsx    — ghost button with ArrowLeftM icon (or custom goBackIcon)
    PageHeaderBack.styles.ts
    index.ts
  PageHeaderClamp/
    PageHeaderClamp.tsx   — title area with ellipsis clamping and optional Tooltip + icon
    PageHeaderClamp.styles.ts
    index.ts
  PageHeaderInlineEdit/
    PageHeaderInlineEdit.tsx  — wraps @synerise/ds-inline-edit with the inlineEdit config object
    PageHeaderInlineEdit.styles.ts
    index.ts
  PageHeaderRightSide/
    PageHeaderRightSide.tsx   — flex right slot for rightSide content + optional close (CloseM) button
    PageHeaderRightSide.styles.ts
    index.ts
  __specs__/
    PageHeader.spec.tsx   — Jest/React Testing Library unit tests
  modules.d.ts            — module declaration shim
  index.ts                — public exports
```

## Public exports
`index.ts` exports:
- `default` — `PageHeader` component (default export)
- `PageHeaderProps` — TypeScript type

### `PageHeader`
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | — | Additional CSS class on the root element |
| `title` | `ReactNode \| string` | — | Header title; rendered inside PageHeaderClamp with ellipsis overflow |
| `children` | `ReactNode` | — | Replaces `title` inside PageHeaderClamp when provided |
| `description` | `ReactNode \| string` | — | Secondary text rendered below the main row |
| `avatar` | `ReactNode` | — | Avatar slot rendered before the inline edit / clamp area |
| `more` | `ReactNode` | — | Slot rendered after the title clamp area (e.g. a dropdown trigger) |
| `rightSide` | `ReactNode` | — | Content rendered on the far right, before the optional close button |
| `tabs` | `ReactNode` | — | Rendered in a padded wrapper below the main row |
| `bar` | `ReactNode` | — | Rendered in a bordered section at the very bottom of the header |
| `onGoBack` | `() => void` | — | When provided, shows a back button (ArrowLeftM) at the left edge |
| `goBackIcon` | `ReactNode` | — | Custom icon component to replace the default ArrowLeftM in the back button |
| `onClose` | `() => void` | — | When provided, shows a close button (CloseM) at the right edge |
| `isolated` | `boolean` | — | Adds a `grey-100` bottom border overlay (visually separates content below) |
| `tooltip` | `TooltipProps` | — | Tooltip props spread onto `<Tooltip>` wrapping the `tooltipIcon` |
| `tooltipIcon` | `ReactNode` | — | Icon rendered inside the Tooltip; tooltip is only shown when **both** `tooltip` and `tooltipIcon` are provided |
| `handleTooltipClick` | `() => void` | — | Click handler wired to the tooltip icon |
| `inlineEdit` | `object` | — | When provided, renders an InlineEdit field; see sub-props below |

#### `inlineEdit` object shape
| Sub-prop | Type | Required | Description |
|----------|------|----------|-------------|
| `value` | `string \| number` | yes | Controlled input value |
| `size` | `'small' \| 'normal'` | yes | InlineEdit size |
| `handleOnChange` | `(event: ChangeEvent<HTMLInputElement>) => void` | yes | Change handler |
| `name` | `string` | no | Input name attribute |
| `maxLength` | `number` | no | Maximum character length |
| `handleOnBlur` | `FocusEventHandler<HTMLInputElement>` | no | Blur handler |
| `handleOnEnterPress` | `KeyboardEventHandler<HTMLInputElement>` | no | Enter key handler |
| `placeholder` | `string` | no | Placeholder text |
| `error` | `boolean` | no | Error state |
| `disabled` | `boolean` | no | Disabled state |
| `hideIcon` | `boolean` | no | Hide the edit icon |
| `customIcon` | `ReactNode` | no | Replace the default edit icon |
| `style` | `{ [key: string]: string \| number }` | no | Inline styles on the InlineEdit wrapper |

## Usage patterns
```tsx
import PageHeader from '@synerise/ds-page-header';

// Basic
<PageHeader title="My Page" />

// With back and close navigation
<PageHeader
  title="My Page"
  onGoBack={() => history.back()}
  onClose={() => setOpen(false)}
/>

// With inline editable title
<PageHeader
  avatar={<ObjectAvatar ... />}
  inlineEdit={{
    value: name,
    size: 'normal',
    handleOnChange: (e) => setName(e.target.value),
    placeholder: 'Enter name',
  }}
  rightSide={<Button type="primary">Save</Button>}
/>

// With tooltip on title
<PageHeader
  title="My Page"
  tooltip={{ trigger: 'hover', title: 'Help text' }}
  tooltipIcon={<HelpM />}
  handleTooltipClick={() => {}}
/>

// With tabs and bottom bar
<PageHeader
  title="My Page"
  tabs={<Tabs tabs={tabs} activeTab={0} handleTabClick={() => {}} />}
  bar={<Button type="tertiary">Action</Button>}
/>
```

## Styling
- Uses styled-components with theme tokens (`palette`, `variables`)
- `MainContainer` has a hardcoded `background-color: #fff` (not a token)
- Min height of the main row is `80px`; padding is `24px`
- `PageHeaderBack` renders a vertical divider via `::after` pseudo-element (`grey-300`, 40px tall)
- `PageHeaderRightSide` is `flex: 1 auto; justify-content: flex-end` — it grows to fill remaining horizontal space
- `PageHeaderClamp` uses `ds-typography`'s `macro.h600` mixin and truncates title text with `text-overflow: ellipsis`
- `PageHeader.styles.ts` re-exports styled components from sub-packages under their legacy names for backwards compatibility

## Key dependencies
- `@synerise/ds-button` — back and close ghost buttons
- `@synerise/ds-icon` — ArrowLeftM (back), CloseM (close), and tooltip icon rendering
- `@synerise/ds-inline-edit` — inline editable title field
- `@synerise/ds-tooltip` — tooltip wrapping the tooltipIcon
- `@synerise/ds-typography` — `macro.h600` applied to the title clamp area
- `@synerise/ds-core` — `theme` palette constants used directly in sub-components

## Implementation notes
- `children` takes precedence over `title` inside PageHeaderClamp — both target the same slot (`children || title`)
- `onGoBack` is rendered conditionally only when truthy; the back button is not shown at all otherwise
- The tooltip is **only rendered** when both `tooltip !== undefined` AND `tooltipIcon` is provided — passing only one has no visual effect
- `PageHeaderRightSide` picks `title`, `tooltipIcon`, and `handleTooltipClick` from `PageHeaderProps` in its type but does not actually use them in the render — they are vestigial in the type
- `isolated` affects a `::before` pseudo-element on `MainContainer`; it does not change the existing `border-bottom` or `box-shadow`
- Tests use Jest (not Vitest) — see `jest.config.js`
