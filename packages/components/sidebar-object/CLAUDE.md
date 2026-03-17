# SidebarObject (`@synerise/ds-sidebar-object`)

> A drawer-style object detail sidebar combining a header (editable/readonly title, navigation/action buttons, dropdown menu), tab navigation, scrollable tab content, and an optional footer.

## Package structure

```
src/
  SidebarObject.tsx             — main component; assembles Header + Scrollbar + tabs content + footer
  SidebarObject.types.ts        — SidebarObjectProps, FolderItem
  SidebarObject.style.ts        — FooterContainer, SidebarObjectWrapper, ContentContainer
  Elements/
    Header/
      Header.tsx                — title (readonly/editable), action buttons, dropdown menu
      Header.types.ts           — HeaderProps, HeaderTexts, HeaderType enum, ButtonVariant enum
      Header.style.ts           — DrawerHeaderBar, StyledInlineEdit, ButtonWrapper, etc.
    Content/
      Content.tsx               — Drawer.DrawerBody with folder selection, tags, description
      Content.types.ts          — ContentProps (uses deep import for SubtleTextAreaProps)
      Content.style.ts          — ContentWrapper, TagsWrapper, InlineEditWrapper
    Overview/
      Overview.tsx              — folder dropdown + Content + ObjectSummary composition
      Overview.types.tsx        — OverviewObjectProps, OverviewTexts
    ObjectSummary/
      ObjectSummary.tsx         — renders inputObject as Description key-value rows
      ObjectSummary.types.ts    — ObjectSummaryProps
  __specs__/SidebarObject.spec.tsx
  index.ts                      — default export only
```

## Public exports

### `SidebarObject` (default export)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `headerTabs` | `(TabItem & { content?: ReactNode })[]` | — | **Required.** Tab definitions; `content` is the tab body rendered in the scrollable area |
| `inputObject` | `{ [key: string]: string \| ReactNode } & object` | — | **Required.** Object whose keys are displayed in `ObjectSummary` |
| `texts` | `Partial<HeaderTexts>` | — | **Required.** Header labels (button texts, icon tooltips, etc.) |
| `name` | `string` | — | Object name shown in the title |
| `activeTab` | `number` | `0` | Index of the active tab |
| `headerType` | `'readonly' \| 'editable'` | `'readonly'` | Editable renders an `InlineEdit` for the title; readonly renders a plain text title |
| `typeButtons` | `'twoButtons' \| 'withNavigation'` | — | `'withNavigation'`: up/down arrows + options menu + close. `'twoButtons'`: cancel + apply buttons |
| `avatar` | `ReactNode` | — | Avatar element in the header |
| `headerPreffix` | `ReactNode` | — | Element to the left of the avatar in the header |
| `additionalNode` | `ReactNode` | — | Extra content rendered below the title bar but above tabs |
| `inlineEditInputProps` | `Partial<InputProps>` | — | Extra props for the `InlineEdit` input (only when `headerType='editable'`) |
| `inputObjectIdKey` | `string` | `'id'` | Key in `inputObject` used as the "Copy ID" value |
| `onEdit` | `(inputObject: object) => void` | — | Shows "Edit" in the options dropdown menu |
| `onDuplicate` | `(inputObject: object) => void` | — | Shows "Duplicate" in the options dropdown menu |
| `onMove` | `(inputObject: object) => void` | — | Shows "Move" in the options dropdown menu |
| `onDelete` | `(inputObject: object) => void` | — | Shows "Delete" in the options dropdown menu |
| `onId` | `(inputObject: object) => void` | — | Shows "Copy ID" in the options dropdown menu |
| `onRename` | `(name: string) => void` | — | Called when inline edit value changes (only when `headerType='editable'`) |
| `onCloseClick` | `() => void` | — | Close button handler (shown in `withNavigation` mode) |
| `onCancelClick` | `() => void` | — | Cancel button handler (shown in `twoButtons` mode) |
| `onApplyClick` | `() => void` | — | Apply button handler (shown in `twoButtons` mode) |
| `onArrowUp` | `() => void` | — | Up navigation button handler (shown in `withNavigation` mode when provided) |
| `onArrowDown` | `() => void` | — | Down navigation button handler (shown in `withNavigation` mode when provided) |
| `withScrollbar` | `boolean` | — | Enables vertical scroll on content area |
| `handleTabClick` | `(index: number) => void` | — | Called when a tab is clicked |
| `footer` | `ReactNode` | — | Footer rendered at the bottom outside the scroll area |

**Note:** `texts` is `Partial<HeaderTexts>` — all fields are optional. `HeaderTexts` has: `name`, `inlineEditPlaceholder`, `deleteIcon`, `duplicateIcon`, `moveIcon`, `editIcon`, `singleTitle`, `cancelButton`, `applyButton`, `addFolder`.

#### `ButtonVariant` enum values

| Enum value | Prop string | Description |
|-----------|-------------|-------------|
| `ButtonVariant.TWO_BUTTONS` | `'twoButtons'` | Cancel + Apply buttons |
| `ButtonVariant.WITH_NAVIGATION` | `'withNavigation'` | Arrow up/down + options menu + close |

#### `HeaderType` enum values

| Enum value | Prop string |
|-----------|-------------|
| `HeaderType.READONLY` | `'readonly'` |
| `HeaderType.EDITABLE` | `'editable'` |

## Usage patterns

```tsx
import SidebarObject from '@synerise/ds-sidebar-object';
import { ButtonVariant } from '@synerise/ds-sidebar-object/dist/Elements/Header/Header.types'; // deep import

<SidebarObject
  name="My Object"
  headerType="editable"
  typeButtons="withNavigation"
  headerTabs={[
    { label: 'Overview', content: <OverviewContent /> },
    { label: 'Settings', content: <SettingsContent /> },
  ]}
  inputObject={{ id: '123', Status: 'active' }}
  texts={{ editIcon: 'Edit', deleteIcon: 'Delete' }}
  onEdit={(obj) => console.log(obj)}
  onCloseClick={() => setOpen(false)}
/>
```

## Styling

Styles in `SidebarObject.style.ts`. Uses `theme.palette` tokens for footer background (`grey-050`), border (`grey-100`). Component assumes `height: 100vh` for full-height layout. The `Scrollbar` component is configured with `absolute` and `maxHeight: 100vh`.

## Key dependencies

- `@synerise/ds-drawer` — `Drawer.DrawerHeaderWithoutPadding`, `Drawer.DrawerHeader`, `Drawer.DrawerBody`
- `@synerise/ds-tabs` — `Tabs` component for header tabs
- `@synerise/ds-scrollbar` — scrollable content area
- `@synerise/ds-inline-edit` — editable title (`headerType='editable'`)
- `@synerise/ds-dropdown` — options dropdown in the header
- `@synerise/ds-description` — `ObjectSummary` key-value display

## Implementation notes

- **`ButtonVariant` and `HeaderType` enums are not exported from `index.ts`**: consumers must pass string literals (`'twoButtons'`, `'withNavigation'`, `'readonly'`, `'editable'`) or use a deep import.
- **Deep imports for types**: `@synerise/ds-tabs/dist/Tabs.types` (for `TabItem`), `@synerise/ds-inline-edit/dist/InlineEdit.types` (for `InputProps`), `@synerise/ds-subtle-form/dist/Elements/TextArea/TextArea.types` (for `SubtleTextAreaProps`) — all fragile dist paths.
- **`@ts-expect-error`** in `SidebarObject.tsx` for Scrollbar `options.suppressScrollY` — the type doesn't expose this prop.
- **`// TODO: fix handler type`** with `any` cast in `Content.tsx` for `SubtleForm.TextArea onChange` handler.
- **Options dropdown visibility**: the dropdown menu only renders if at least one of `onEdit`, `onDuplicate`, `onMove`, `onDelete`, `onId` is provided.
- **`onScrollbar` in README** is wrong — the actual prop is `withScrollbar: boolean`.
- **Uses Jest** (`jest.config.js`) — not yet migrated to Vitest.
