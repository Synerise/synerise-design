# AvatarGroup (`@synerise/ds-avatar-group`)

> A horizontal row of overlapping circle avatars that fans out on hover, truncates overflow with a `+N` counter, and optionally opens a modal listing all members.

## Package structure

```
src/
  AvatarGroup.tsx           — main component; owns modal visibility state
  AvatarGroup.types.ts      — AvatarGroupProps, DataSource, GroupModalSettings, Size
  AvatarGroup.styles.ts     — Group (hover fan-out), MoreInfo (styled Avatar for +N)
  Modal/
    GroupModal.tsx           — modal with VirtualTable listing all DataSource entries
    GroupModal.types.ts      — GroupModalProps
    GroupModal.styles.tsx    — ModalFooter, FooterSettings, FooterActions
  index.ts                  — public exports (default + types)
  __specs__/
    AvatarGroup.spec.tsx     — Vitest tests
```

## Public exports

### `AvatarGroup` (default export)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `dataSource` | `DataSource[]` | **required** | Array of avatar records to render |
| `numberOfVisibleUsers` | `number` | `3` | How many avatars to show before truncating |
| `moreInfoTooltip` | `string` | `undefined` | Suffix text for the `+N` tooltip, e.g. `"more users"` → tooltip reads `"7 more users"` |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Size passed to each Avatar |
| `hasStatus` | `boolean` | `undefined` | Passes `hasStatus` to each Avatar (shows badge dot on hover) |
| `groupModal` | `GroupModalSettings` | `undefined` | If provided, clicking the `+N` counter opens a modal; if omitted the counter is not clickable |

Both `numberOfVisibleUsers` and `moreInfoTooltip` are optional in the TypeScript interface.

### `DataSource` type

Each item in the `dataSource` array. Extends `Omit<BadgeProps, 'children'>`:

| Field | Type | Description |
|-------|------|-------------|
| `id` | `React.ReactText` | Unique key; used as `rowKey` in the modal table |
| `initials` | `string` | Text rendered inside the avatar |
| `avatarProps` | `AvatarProps` | Passed as spread props to the `Avatar` component (controls color, tooltip, etc.) |
| `firstname` | `string` | Shown in the modal table row label |
| `lastname` | `string` | Shown in the modal table row label |
| `email` | `string` | Shown in the modal table row sublabel |
| `status` *(from BadgeProps)* | `BadgeStatus` | Controls the `Badge` wrapper status (e.g. `'active'`, `'inactive'`, `'blocked'`) |

### `GroupModalSettings` type

| Field | Type | Description |
|-------|------|-------------|
| `title` | `string \| ReactNode` | Modal header title |
| `listTitle` | `string \| ReactNode` | Title shown above the VirtualTable |
| `renderRowMenu` | `(record: DataSource) => JSX.Element` | Returns a `Menu` for the row actions dropdown |
| `handleOk` | `() => void` | Primary action button handler |
| `handleInvite` | `() => void` | Invite button handler |
| `okText` | `string \| ReactNode` | Primary button label |
| `cancelText` | `string \| ReactNode` | Cancel button label |
| `inviteText` | `string \| ReactNode` | Invite button label |

## Usage patterns

```tsx
import AvatarGroup, { type DataSource, type GroupModalSettings } from '@synerise/ds-avatar-group';
import Menu from '@synerise/ds-menu';

const data = [
  {
    id: 0,
    initials: 'KK',
    firstname: 'Kamil',
    lastname: 'Kowalski',
    email: 'k.kowalski@example.com',
    status: 'active',
    avatarProps: {
      backgroundColor: 'blue',
      backgroundColorHue: '600',
      tooltip: { name: 'Kamil Kowalski', email: 'k.kowalski@example.com' },
    },
  },
  // more entries…
];

// Basic — no modal
<AvatarGroup
  dataSource={data}
  numberOfVisibleUsers={3}
  moreInfoTooltip="more users"
  hasStatus
/>

// With modal
<AvatarGroup
  dataSource={data}
  numberOfVisibleUsers={3}
  moreInfoTooltip="more users"
  groupModal={{
    title: 'All users',
    listTitle: `${data.length} users`,
    okText: 'Apply',
    cancelText: 'Cancel',
    inviteText: 'Invite user',
    handleOk: () => {},
    handleInvite: () => {},
    renderRowMenu: (record) => (
      <Menu>
        <Menu.Item onClick={() => {}}>Remove</Menu.Item>
      </Menu>
    ),
  }}
/>
```

## Styling

Styles in `AvatarGroup.styles.ts`. Key behaviors:

- **Collapsed state**: avatars overlap with negative `margin-left` (`-8px` small, `-12px` medium, `-16px` large); badge dots are invisible (`opacity: 0`); avatars have a `2px white` ring (`box-shadow`).
- **Hover state**: gap switches to `8px` for all avatars, badge dots fade in (`opacity: 1`), white ring disappears.
- `MoreInfo` is a styled `Avatar` with white background and `grey-300` border — always appears after the overlapping group with `margin-left: 8px`.

## Key dependencies

- `@synerise/ds-avatar` — renders each avatar in the row and the `MoreInfo` +N element
- `@synerise/ds-badge` — wraps each avatar to display status dots
- `@synerise/ds-modal` — base for the `GroupModal`
- `@synerise/ds-table` (`VirtualTable`, `TableCell`) — powers the member list inside the modal
- `@synerise/ds-dropdown` — row action menu trigger in the modal table
- `@synerise/ds-tooltip` — wraps the `+N` counter to show the overflow count text

## Implementation notes

- `groupModal` is entirely optional. If not passed, the `+N` counter is still shown (when there is overflow) but clicking it does nothing — `showModal` is a no-op.
- The `MoreInfo` styled component extends `Avatar` directly and accepts an `onClick` prop. It is always `size={size}` matching the other avatars.
- Each `DataSource` item gets a synthetic `key` of `${initials}-${index}` inside `dataSourceWithKeys` — it does **not** use `id` as the React list key (though `id` is used as `rowKey` in the modal table).
- All heavy render work (`renderMoreInfo`, `renderGroupModal`) is memoized with `useMemo`; `showModal`/`hideModal` are `useCallback`.
- The `GroupModal` is not exported — it is an internal sub-component only rendered by `AvatarGroup`.
- `size` accepts `'small' | 'medium' | 'large'` only (not `'extraLarge'` unlike the base `Avatar`).
