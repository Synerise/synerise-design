# Tabs (`@synerise/ds-tabs`)

> A responsive tab bar that automatically overflows excess tabs into a dropdown menu, with optional block (full-width) layout and a configurable action button.

## Package structure

```
src/
  Tabs.tsx        — main container; measures widths, splits tabs into visible/hidden lists, renders overflow dropdown
  Tabs.types.ts   — TabsProps, TabItem, Configuration (re-exported as TabsConfiguration), TabWithRef
  Tabs.styles.ts  — TabsContainer, HiddenTabs (off-screen width-measurement clone), ShowHiddenTabsTrigger, DropdownMenu
  Tab/
    Tab.tsx        — individual tab button; wraps content in Tooltip when tooltip prop is present
    Tab.types.ts   — TabProps (extends TabItem + internal props)
    Tab.styles.ts  — TabContainer, TabLabel, TabContent, BlockContentWrapper, SuffixWrapper, DefaultSuffixWrapper
  index.ts         — public exports (see below)
  __specs__/
    Tabs.spec.tsx  — Jest / React Testing Library unit tests
  modules.d.ts     — ambient type declarations for static asset imports
```

## Public exports

```ts
export { default } from './Tabs';           // default: Tabs component
export type { TabItem, TabsConfiguration, TabsProps } from './Tabs.types';
```

`TabsConfiguration` is the public alias for the internal `Configuration` type.

### `Tabs` (default export)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `activeTab` | `number` | — | Index of the currently active tab (controlled). Passing `undefined` renders no tab as active. |
| `tabs` | `TabItem[]` | — | Required. Array of tab descriptors. |
| `handleTabClick` | `(index: number) => void` | — | Required. Called with the clicked tab's index. |
| `configuration` | `TabsConfiguration` | — | When provided, appends a configurable action item to the overflow dropdown. If no tabs are hidden it renders a standalone dropdown trigger. |
| `underscore` | `boolean` | `true` | Shows the blue active-indicator line below the active tab. |
| `block` | `boolean` | — | Stretches tabs to fill the container width (flex: 1 per tab). Disables the overflow/hidden-tabs mechanism. |
| `visible` | `boolean` | — | **Deprecated.** Has no effect in current implementation. |

### `TabItem`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `ReactNode` | — | Tab label content. |
| `icon` | `ReactNode` | — | Icon rendered before the label, sized at 24 px. |
| `disabled` | `boolean` | — | Disables pointer events and reduces opacity to 0.4. |
| `tooltip` | `ReactNode` | — | When set, wraps the tab content in `ds-tooltip`. |
| `tooltipProps` | `TooltipProps` | — | Additional props forwarded to `@synerise/ds-tooltip`. Only used when `tooltip` is set. |
| `suffixel` | `ReactNode` | — | Element rendered after the label. Strings/numbers get `SuffixWrapper`; other nodes get `DefaultSuffixWrapper` (13 px font, supports `ant-badge-count`). |

### `TabsConfiguration`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `action` | `() => void` | — | Required. Callback invoked when the configuration item is clicked. |
| `label` | `string` | — | Required. Display text of the configuration item. |
| `disabled` | `boolean` | — | Disables the entire dropdown trigger when no tabs are hidden. |

## Usage patterns

```tsx
import Tabs, { type TabsProps, type TabItem, type TabsConfiguration } from '@synerise/ds-tabs';

const [activeTab, setActiveTab] = React.useState(0);

const tabs: TabItem[] = [
  { label: 'Overview' },
  { label: 'Settings', icon: <SettingsM /> },
  { label: 'Disabled', disabled: true },
];

<Tabs
  tabs={tabs}
  activeTab={activeTab}
  handleTabClick={setActiveTab}
/>
```

**Icon-only tabs with tooltip (block layout):**

```tsx
const iconTabs: TabItem[] = [
  { icon: <CalendarM />, tooltip: 'Date' },
  { icon: <TextM />,     tooltip: 'Text' },
];

<Tabs tabs={iconTabs} activeTab={active} handleTabClick={setActive} block />
```

**With configuration action and counter suffix:**

```tsx
const config: TabsConfiguration = {
  label: 'Manage tabs',
  action: () => openTabManager(),
};

<Tabs tabs={tabs} activeTab={active} handleTabClick={setActive} configuration={config} />
```

## Styling

- `TabContainer` (`<button>`) uses a CSS `::after` pseudo-element for the active indicator line (1 px solid blue-600).
- The `underscore` class is added to `TabContainer` via `classNames`; the active indicator is only visible when both `.active` and `.underscore` are applied.
- `block` mode applies `applyBlockStyles` which uses `flex: 1` and repositions `BlockContentWrapper` absolutely so content stays centered regardless of tab width.
- Typography uses the `macro.h300` mixin from `@synerise/ds-typography`.

## Key dependencies

| Package | Role |
|---------|------|
| `@synerise/ds-dropdown` | `DropdownMenu` for overflow and configuration items |
| `@synerise/ds-icon` | `Icon` wrapper + `OptionHorizontalM` trigger icon |
| `@synerise/ds-tooltip` | Wraps tab content when `tooltip` is set |
| `@synerise/ds-utils` | `useResizeObserver`, `NOOP` |
| `lodash.debounce` | Debounces container-width updates (200 ms) |
| `classnames` | Applies `underscore`, `active`, `pressed` classes to `TabContainer` |

## Implementation notes

- **Overflow mechanism:** On every resize, a hidden clone (`HiddenTabs`) renders all tabs off-screen to measure their natural widths. The visible list is then computed by fitting as many tabs as possible within `containerWidth - DROPDOWN_TRIGGER_SIZE (32 px) - MARGIN_BETWEEN_TABS (24 px)`. Disabled in `block` mode.
- **`visible` prop is deprecated** and ignored — it is accepted in the type signature but not destructured in the component body.
- **`activeTab` accepts `undefined`** (storybook `NoActiveTab` story) even though the TypeScript type declares `number`. No tab receives the `active` class in that case.
- Tests use Jest (not Vitest) — `jest.config.js` is present at the package root.
- The `Tab` sub-component is internal and not exported from `index.ts`.
