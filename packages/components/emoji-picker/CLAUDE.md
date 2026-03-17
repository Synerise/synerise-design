# EmojiPicker (`@synerise/ds-emoji-picker`)

> A dropdown trigger + panel that renders a searchable, virtualised grid of Unicode emojis grouped by category. The caller supplies any element as the trigger via `children`.

## Package structure

```
src/
  EmojiPicker.tsx           — root component; manages open/focus state, renders ds-dropdown
  EmojiPicker.types.ts      — EmojiPickerProps, EmojiPickerTexts
  EmojiPicker.styles.ts     — minimal: just the Overlay wrapper div
  EmojiPicker.const.ts      — ITEMS_PER_ROW (6), ITEM_SIZE (32px)
  index.ts                  — public exports
  EmojiOverlay/
    EmojiOverlay.tsx        — search input (Dropdown.SearchInput) + EmojiList
    EmojiOverlay.types.ts   — EmojiOverlayType (internal)
  EmojiList/
    EmojiList.tsx           — virtualised list with Scrollbar wrapper
    EmojiList.types.ts      — all internal list types
    EmojiList.styles.tsx    — styled-components for list items, buttons, titles
    EmojiList.utils.tsx     — createItemData (memoized), getEmojisByGroup wrapper
    EmojiListItem.tsx       — memo'd row renderer for react-window
  hooks/
    useEmojiTranslations.tsx — merges custom texts with react-intl defaults
    useMultipleItemsPerRow.ts — flattens category groups into virtual list rows
```

## Public exports

### `EmojiPicker` (named + default)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactElement` | `undefined` | Trigger element. Single React element (not `ReactNode`). |
| `onSelect` | `(emoji: Emoji) => void` | `undefined` | Called when an emoji is clicked. `Emoji` is from `unicode-emoji-utils`. |
| `closeOnSelect` | `boolean` | `true` | Whether to close the dropdown after an emoji is selected. |
| `dropdownProps` | `Partial<Omit<DropdownSharedProps, 'children' \| 'size' \| 'overlay' \| 'onOpenChage' \| 'open'>>` | `undefined` | Passes through to `@synerise/ds-dropdown`. `size`, `overlay`, and `open` are controlled internally. |
| `texts` | `Partial<EmojiPickerTexts>` | `undefined` | Override any label/placeholder text (see `EmojiPickerTexts` below). |

### `EmojiPickerTexts`

All fields are `ReactNode`. All are optional when passed via `texts` prop.

| Key | Default (en) |
|-----|-------------|
| `placeholder` | `"Search"` |
| `empty` | `"No emojis found"` |
| `smileys-emotion` | `"Smileys"` |
| `people-body` | `"People & body"` |
| `animals-nature` | `"Animals & nature"` |
| `food-drink` | `"Food & drink"` |
| `travel-places` | `"Travel & places"` |
| `activities` | `"Activities"` |
| `objects` | `"Objects"` |
| `symbols` | `"Symbols"` |
| `flags` | `"Flags"` |

### `EmojiPickerProps`

Type exported from `index.ts`.

## Usage patterns

```tsx
import EmojiPicker from '@synerise/ds-emoji-picker';
import type { Emoji } from 'unicode-emoji-utils';

// Minimal — any element as trigger
<EmojiPicker onSelect={(emoji: Emoji) => console.log(emoji.emoji)}>
  <Button>Pick emoji</Button>
</EmojiPicker>

// With custom texts and keep-open-on-select
<EmojiPicker
  onSelect={handleSelect}
  closeOnSelect={false}
  texts={{ placeholder: 'Search emoji...', empty: 'Nothing found' }}
>
  <Icon component={<EmoticonsM />} />
</EmojiPicker>

// Append emoji to an input field
const [value, setValue] = useState('');
<Input
  value={value}
  icon1={
    <EmojiPicker closeOnSelect={false} onSelect={(e) => setValue(v => v + e.emoji)}>
      <Icon component={<EmoticonsM />} />
    </EmojiPicker>
  }
/>
```

## Architecture

```
EmojiPicker (manages isOpen + focus)
  └── ds-dropdown (open, placement="bottomRight", asChild)
        overlay:
          S.Overlay (stopPropagation on click)
            └── EmojiOverlay
                  ├── Dropdown.SearchInput (autofocus when opened)
                  └── EmojiList
                        └── ds-scrollbar (maxHeight=330)
                              └── VirtualList (react-window FixedSizeList)
                                    └── EmojiListItem (memo + areEqual)
```

## Custom hooks

### `useEmojiTranslations`

Merges the consumer's partial `texts` override with `react-intl` `FormattedMessage` defaults. **Requires an `IntlProvider` in the React tree.** Returns a complete `EmojiPickerTexts` object.

### `useMultipleItemsPerRow`

Takes `EmojiCategory[]` and `itemsPerRow` (6), returns a flat `EmojiVirtualListItem[]` array where each element is either a `[TitleItem]` (category header) or `Emoji[]` (one row of up to 6 emojis). This is the data shape consumed by react-window.

## Key dependencies

- `unicode-emoji-utils` — provides `getEmojisByGroup('group')` which returns a `Map<category, Emoji[]>` with keyword metadata used for search
- `react-window` (`FixedSizeList`) — virtual scroll for the emoji grid (item height = 32px, up to 330px visible)
- `@synerise/ds-dropdown` — the popover/dropdown shell
- `@synerise/ds-scrollbar` — wraps the virtual list to intercept scroll events and forward them to `listRef.current.scrollTo()`
- `memoize-one` — memoizes `createItemData` to prevent react-window item re-renders
- `react-intl` — **peer dependency** — `useEmojiTranslations` calls `useIntl()` and `FormattedMessage`; an `IntlProvider` must be present

## Implementation notes

- **`react-intl` is required** — there is no fallback if `IntlProvider` is absent. Tests use `renderWithProvider` from `@synerise/ds-core` which wraps the tree with `IntlProvider`.
- **Click-outside handling** — `useOnClickOutside` is used with a special guard: if the click target is inside `triggerRef`, the handler returns early to avoid fighting with the dropdown's own toggle logic.
- **Overlay stops propagation** — the `S.Overlay` div has `onClick={(event) => event.stopPropagation()}`, preventing emoji clicks from bubbling to parent handlers (e.g. form or modal click-outside listeners).
- **`children` must be a single `ReactElement`** (typed as `ReactElement`, not `ReactNode`) — the dropdown's `asChild` mode merges the open handler onto the child. Passing a fragment or string will break it.
- **`dropdownProps` typo** — the omit list includes `'onOpenChage'` (missing `n`). The actual Dropdown prop is `onOpenChange`. This means `onOpenChange` is not actually omitted from the type, though it is overridden internally.
- **All `FormattedMessage` category IDs are identical** (`DS.ICON-PICKER.SMILEYS`) — i18n overrides via message IDs will affect all categories at once. Use the `texts` prop to override categories individually.
- **Scrollbar scroll sync** — `Scrollbar` fires a `onScroll` event handler that manually calls `listRef.current.scrollTo(scrollTop)` because the virtual list's own scroll is disabled (`overflow: unset`) so that `ds-scrollbar`'s custom scrollbar renders correctly.
- **Uses Jest** (not Vitest) — `package.json` uses `"test": "jest"`. Not yet migrated.
