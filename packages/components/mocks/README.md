---
id: mocks
title: Mocks
---

# @synerise/ds-mocks

Testing utilities and mock components for the Synerise Design System. Provides standardized Vitest and Jest mocks for all `@synerise/ds-*` component packages.

## Installation

```bash
pnpm add -D @synerise/ds-mocks
```

## Vitest Usage

Use factory functions with `vi.mock()` and dynamic import to avoid hoisting issues:

```typescript
vi.mock('@synerise/ds-button', async () => {
  const { buttonMockFactory } = await import('@synerise/ds-mocks');
  return { ...buttonMockFactory() };
});

vi.mock('@synerise/ds-modal', async () => {
  const { modalMockFactory } = await import('@synerise/ds-mocks');
  return { ...modalMockFactory() };
});

describe('MyComponent', () => {
  it('renders button', () => {
    render(<MyComponent />);
    expect(screen.getByTestId('ds-button')).toBeInTheDocument();
  });

  it('opens modal on click', () => {
    render(<MyComponent />);
    fireEvent.click(screen.getByTestId('ds-button'));
    expect(screen.getByTestId('ds-modal')).toBeInTheDocument();
    expect(screen.getByTestId('ds-modal-title')).toHaveTextContent('My Modal');
  });
});
```

## Jest Usage

```typescript
import { jest as dsMocks } from '@synerise/ds-mocks';

describe('MyComponent', () => {
  dsMocks.mockButton();
  dsMocks.mockModal();

  it('renders button', () => {
    render(<MyComponent />);
    expect(screen.getByTestId('ds-button')).toBeInTheDocument();
  });
});
```

## Mock Variants

Each component provides two factory variants:

| Variant | Description | Use case |
|---------|------------|----------|
| `{component}MockFactory` | Full mock with props, data-testid, sub-components | Most tests |
| `{component}MinimalMockFactory` | Returns `null` | When you need the component out of the way |

### Minimal Mock Example

```typescript
vi.mock('@synerise/ds-tooltip', async () => {
  const { tooltipMinimalMockFactory } = await import('@synerise/ds-mocks');
  return { ...tooltipMinimalMockFactory() };
});
// Tooltip renders nothing — useful when testing content without wrapper noise
```

## Custom data-testid

All mocks accept `data-testid` via props. If the component under test passes a custom `data-testid`, the mock will use it; otherwise it falls back to the default `ds-{component}` pattern:

```tsx
// Component passes custom testid:
<Button data-testid="submit-btn">Submit</Button>

// Test queries by custom testid:
screen.getByTestId('submit-btn')
```

## Available Mocks (111 components)

### Simple Components

| Component | Package | Factory | Default test ID |
|-----------|---------|---------|----------------|
| ActionArea | `ds-action-area` | `actionAreaMockFactory` | `ds-action-area` |
| AvatarGroup | `ds-avatar-group` | `avatarGroupMockFactory` | `ds-avatar-group` |
| Badge | `ds-badge` | `badgeMockFactory` | `ds-badge` |
| Banner | `ds-banner` | `bannerMockFactory` | `ds-banner` |
| BroadcastBar | `ds-broadcast-bar` | `broadcastBarMockFactory` | `ds-broadcast-bar` |
| CodeSnippet | `ds-code-snippet` | `codeSnippetMockFactory` | `ds-code-snippet` |
| ColorPicker | `ds-color-picker` | `colorPickerMockFactory` | `ds-color-picker` |
| CompletedWithin | `ds-completed-within` | `completedWithinMockFactory` | `ds-completed-within` |
| Condition | `ds-condition` | `conditionMockFactory` | `ds-condition` |
| ContextSelector | `ds-context-selector` | `contextSelectorMockFactory` | `ds-context-selector` |
| CopyIcon | `ds-copy-icon` | `copyIconMockFactory` | `ds-copy-icon` |
| Divider | `ds-divider` | `dividerMockFactory` | `ds-divider` |
| EditableItemsList | `ds-editable-items-list` | `editableItemsListMockFactory` | `ds-editable-items-list` |
| EmojiPicker | `ds-emoji-picker` | `emojiPickerMockFactory` | `ds-emoji-picker` |
| EmptyStates | `ds-empty-states` | `emptyStatesMockFactory` | `ds-empty-states` |
| Estimation | `ds-estimation` | `estimationMockFactory` | `ds-estimation` |
| FieldSet | `ds-field-set` | `fieldSetMockFactory` | `ds-field-set` |
| Filter | `ds-filter` | `filterMockFactory` | `ds-filter` |
| Flag | `ds-flag` | `flagMockFactory` | `ds-flag` |
| Footer | `ds-footer` | `footerMockFactory` | `ds-footer` |
| FormatPicker | `ds-format-picker` | `formatPickerMockFactory` | `ds-format-picker` |
| IconPicker | `ds-icon-picker` | `iconPickerMockFactory` | `ds-icon-picker` |
| InlineAlert | `ds-inline-alert` | `inlineAlertMockFactory` | `ds-inline-alert` |
| InputNumber | `ds-input-number` | `inputNumberMockFactory` | `ds-input-number` |
| Insight | `ds-insight` | `insightMockFactory` | `ds-insight` |
| ItemFilter | `ds-item-filter` | `itemFilterMockFactory` | `ds-item-filter` |
| ItemsRoll | `ds-items-roll` | `itemsRollMockFactory` | `ds-items-roll` |
| Loader | `ds-loader` | `loaderMockFactory` | `ds-loader` |
| Mapping | `ds-mapping` | `mappingMockFactory` | `ds-mapping` |
| MetricCard | `ds-metric-card` | `metricCardMockFactory` | `ds-metric-card` |
| OrderedList | `ds-ordered-list` | `orderedListMockFactory` | `ds-ordered-list` |
| PageHeader | `ds-page-header` | `pageHeaderMockFactory` | `ds-page-header` |
| Pagination | `ds-pagination` | `paginationMockFactory` | `ds-pagination` |
| Panel | `ds-panel` | `panelMockFactory` | `ds-panel` |
| PanelsResizer | `ds-panels-resizer` | `panelsResizerMockFactory` | `ds-panels-resizer` |
| Result | `ds-result` | `resultMockFactory` | `ds-result` |
| SectionMessage | `ds-section-message` | `sectionMessageMockFactory` | `ds-section-message` |
| ShortCuts | `ds-short-cuts` | `shortCutsMockFactory` | `ds-short-cuts` |
| SidebarObject | `ds-sidebar-object` | `sidebarObjectMockFactory` | `ds-sidebar-object` |
| Status | `ds-status` | `statusMockFactory` | `ds-status` |
| StepCard | `ds-step-card` | `stepCardMockFactory` | `ds-step-card` |
| Subject | `ds-subject` | `subjectMockFactory` | `ds-subject` |
| UnorderedList | `ds-unordered-list` | `unorderedListMockFactory` | `ds-unordered-list` |

### Components with Sub-components

| Component | Package | Factory | Sub-components |
|-----------|---------|---------|---------------|
| Alert | `ds-alert` | `alertMockFactory` | Toast, SectionMessage, BroadcastBar, IconAlert, InlineAlert, AlertInfo |
| AppMenu | `ds-app-menu` | `appMenuMockFactory` | + `useMenu`, `useSubMenu` hooks |
| Avatar | `ds-avatar` | `avatarMockFactory` | UserAvatar, ObjectAvatar, DefaultAvatarIcon |
| Button | `ds-button` | `buttonMockFactory` | |
| ButtonGroup | `ds-button-group` | `buttonGroupMockFactory` | ButtonDivider |
| Card | `ds-card` | `cardMockFactory` | CardGroup, CardBadge, CardSummary |
| CardSelect | `ds-card-select` | `cardSelectMockFactory` | CardSelectGroup |
| CardTabs | `ds-card-tabs` | `cardTabsMockFactory` | CardTab |
| Cascader | `ds-cascader` | `cascaderMockFactory` | Breadcrumb |
| Checkbox | `ds-checkbox` | `checkboxMockFactory` | Checkbox.Group |
| Collector | `ds-collector` | `collectorMockFactory` | .Values, .ButtonPanel, .OptionsDropdown, .NavigationHint |
| Confirmation | `ds-confirmation` | `confirmationMockFactory` | Prompt |
| Cruds | `ds-cruds` | `crudsMockFactory` | |
| Description | `ds-description` | `descriptionMockFactory` | DescriptionRow, DescriptionCopyable |
| Drawer | `ds-drawer` | `drawerMockFactory` | .DrawerHeader, .DrawerHeaderBar, .DrawerBody, .DrawerContent, etc. |
| Dropdown | `ds-dropdown` | `dropdownMockFactory` | |
| FileUploader | `ds-file-uploader` | `fileUploaderMockFactory` | AvatarUploader, ItemUploader |
| FlexBox | `ds-flex-box` | `flexBoxMockFactory` | Flex, Box (named exports, no default) |
| Form | `ds-form` | `formMockFactory` | Form.FieldSet, EditableList |
| FormField | `ds-form-field` | `formFieldMockFactory` | FormFieldLabel, ContentAboveElement, ContentBelowElement |
| Grid | `ds-grid` | `gridMockFactory` | Grid.Item |
| Icon | `ds-icon` | `iconMockFactory` | |
| InformationCard | `ds-information-card` | `informationCardMockFactory` | InformationCardPropertyList, InformationCardTooltip |
| InlineEdit | `ds-inline-edit` | `inlineEditMockFactory` | InlineSelect |
| Input | `ds-input` | `inputMockFactory` | TextArea |
| ItemPicker | `ds-item-picker` | `itemPickerMockFactory` | ItemPickerNew, ItemPickerLegacy, ItemPickerList, ItemPickerTrigger |
| Layout | `ds-layout` | `layoutMockFactory` | Page |
| List | `ds-list` | `listMockFactory` | List.Item, List.ItemWrapper, List.Divider |
| ListItem | `ds-list-item` | `listItemMockFactory` | HoverTooltip, GroupItem, ListWrapper, ListContextProvider |
| Logic | `ds-logic` | `logicMockFactory` | Logic.Matching, Placeholder |
| ManageableList | `ds-manageable-list` | `manageableListMockFactory` | ContentItem, FilterItem, SimpleItem, AddItem |
| Menu | `ds-menu` | `menuMockFactory` | Menu.Item, .Breadcrumb, .Header, .Divider, .SubMenu, .ItemGroup |
| Modal | `ds-modal` | `modalMockFactory` | |
| Navbar | `ds-navbar` | `navbarMockFactory` | Navbar.Divider |
| Popconfirm | `ds-popconfirm` | `popconfirmMockFactory` | ConfirmMessage |
| Popover | `ds-popover` | `popoverMockFactory` | PopoverTrigger, PopoverContent, PopoverArrow, PopoverClose |
| ProgressBar | `ds-progress-bar` | `progressBarMockFactory` | Multivalue, ProgressTiles |
| Radio | `ds-radio` | `radioMockFactory` | Radio.Group, Radio.Button |
| Scrollbar | `ds-scrollbar` | `scrollbarMockFactory` | |
| Search | `ds-search` | `searchMockFactory` | SearchInput, SearchHeader, SearchItems, SearchButton |
| Select | `ds-select` | `selectMockFactory` | Option |
| Sidebar | `ds-sidebar` | `sidebarMockFactory` | Sidebar.Panel, SidebarWithButton |
| Skeleton | `ds-skeleton` | `skeletonMockFactory` | CheckboxSkeleton, DropdownSkeleton, OrderedListSkeleton, SkeletonAvatar |
| Sortable | `ds-sortable` | `sortableMockFactory` | SortableContainer, useSortable, arrayMove |
| Stepper | `ds-stepper` | `stepperMockFactory` | Stepper.Step |
| SubtleForm | `ds-subtle-form` | `subtleFormMockFactory` | .TextArea, .Input, .Select, .DatePicker, .Field |
| Switch | `ds-switch` | `switchMockFactory` | RawSwitch |
| Table | `ds-table` | `tableMockFactory` | |
| TableNew | `ds-table-new` | `tableNewMockFactory` | VirtualTable |
| Tabs | `ds-tabs` | `tabsMockFactory` | |
| Tag | `ds-tag` | `tagMockFactory` | TagShape, useDefaultTexts |
| Tags | `ds-tags` | `tagsMockFactory` | AddTags |
| Toolbar | `ds-toolbar` | `toolbarMockFactory` | ToolbarGroup, ToolbarButton, ToolbarLabel, ToolbarDivider |
| Tooltip | `ds-tooltip` | `tooltipMockFactory` | |
| Tray | `ds-tray` | `trayMockFactory` | TrayProvider, useTray |
| Typography | `ds-typography` | `typographyMockFactory` | Title, Text, Paragraph, Description, ErrorText, Label, macro |
| Wizard | `ds-wizard` | `wizardMockFactory` | Wizard.OnModal |

### Complex Components (imperative APIs)

| Component | Package | Factory | API mocked |
|-----------|---------|---------|-----------|
| CodeArea | `ds-code-area` | `codeAreaMockFactory` | Monaco Editor replaced with textarea |
| DatePicker | `ds-date-picker` | `datePickerMockFactory` | + RawDatePicker, DayPicker, MonthPicker, YearPicker, TimePicker |
| DateRangePicker | `ds-date-range-picker` | `dateRangePickerMockFactory` | + 4 filter types, TimeWindow, utils, CONST, fnsFormat |
| Factors | `ds-factors` | `factorsMockFactory` | + factorTypes, ALL_FACTOR_TYPES |
| Slider | `ds-slider` | `sliderMockFactory` | Handles single value + range mode |
| TimePicker | `ds-time-picker` | `timePickerMockFactory` | + AM, PM, HOUR_12, HOUR, CLOCK_MODES constants |
| Toast | `ds-toast` | `toastMockFactory` | showToast, dismissToast, removeToast + Toast.success/error/info/warning |

## Component-specific Features

### Modal

Test IDs: `{testId}-header`, `{testId}-title`, `{testId}-close`, `{testId}-body`, `{testId}-footer`, `{testId}-ok`, `{testId}-cancel`

### Table

Test IDs: `{testId}-header`, `{testId}-row-{index}`, `{testId}-cell-{rowIndex}-{colIndex}`, `{testId}-checkbox-{index}`

### Form

Mocks `Form`, `Form.FieldSet`, and `EditableList`. Test IDs: `ds-fieldset`, `ds-editable-list`, `ds-editable-list-row-{index}`, `ds-editable-list-add`

### Toast (imperative API)

```typescript
vi.mock('@synerise/ds-toast', async () => {
  const { toastMockFactory } = await import('@synerise/ds-mocks');
  return { ...toastMockFactory() };
});

// Test imperative calls
import { showToast, dismissToast } from '@synerise/ds-toast';
showToast('success', { message: 'Saved' }); // returns 'mock-toast-id'
Toast.success({ message: 'Saved' }); // static method
dismissToast('mock-toast-id');
```

### Tooltip (with content)

```typescript
vi.mock('@synerise/ds-tooltip', async () => {
  const { tooltipMockFactory } = await import('@synerise/ds-mocks');
  return { ...tooltipMockFactory({ showContent: true })() };
});
```

### Icon (custom render)

```typescript
vi.mock('@synerise/ds-icon', async () => {
  const { iconWithRenderMockFactory } = await import('@synerise/ds-mocks');
  return { ...iconWithRenderMockFactory(({ icon }) => <span>{icon}</span>)() };
});
```

## TypeScript Support

All mocks export their prop types:

```typescript
import type { MockButtonProps, MockModalProps, MockTableProps } from '@synerise/ds-mocks';
```

## Requirements

- **Vitest**: `globals: true` in config
- **Jest**: 27+
- **React**: 16.8+ / 17+ / 18+
- **@testing-library/react** (recommended)

## License

ISC
