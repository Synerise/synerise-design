---
id: mocks
title: Mocks
---

# @synerise/ds-mocks

Testing utilities and mock components for Synerise Design System.

## Installation

```bash
npm i @synerise/ds-mocks
# or
yarn add @synerise/ds-mocks
# or
pnpm add @synerise/ds-mocks
```

## Vitest Mocks

This package provides ready-to-use mocks for Synerise DS components in Vitest tests.

### Usage

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

vi.mock('@synerise/ds-icon', async () => {
  const { iconMockFactory } = await import('@synerise/ds-mocks');
  return { ...iconMockFactory() };
});

describe('MyComponent', () => {
  it('renders button with custom testid', () => {
    render(<MyComponent />);

    // Default testid
    expect(screen.getByTestId('ds-button')).toBeInTheDocument();

    // Or custom testid if passed via props
    expect(screen.getByTestId('submit-button')).toBeInTheDocument();
  });

  it('opens modal on click', () => {
    render(<MyComponent />);

    fireEvent.click(screen.getByTestId('ds-button'));

    expect(screen.getByTestId('ds-modal')).toBeInTheDocument();
    expect(screen.getByTestId('ds-modal-title')).toHaveTextContent('My Modal');
  });
});
```

### Available Mocks

| Component | Factory Functions                                                        |
| --------- | ------------------------------------------------------------------------ |
| Button    | `buttonMockFactory`, `buttonMinimalMockFactory`                          |
| Cruds     | `crudsMockFactory`, `crudsMinimalMockFactory`                            |
| Dropdown  | `dropdownMockFactory`, `dropdownMinimalMockFactory`                      |
| Form      | `formMockFactory`, `formMinimalMockFactory`                              |
| Icon      | `iconMockFactory`, `iconMinimalMockFactory`, `iconWithRenderMockFactory` |
| Input     | `inputMockFactory`, `inputMinimalMockFactory`                            |
| Modal     | `modalMockFactory`, `modalMinimalMockFactory`                            |
| Select    | `selectMockFactory`, `selectMinimalMockFactory`                          |
| Table     | `tableMockFactory`, `tableMinimalMockFactory`                            |
| Tabs      | `tabsMockFactory`, `tabsMinimalMockFactory`                              |
| Tooltip   | `tooltipMockFactory`, `tooltipMinimalMockFactory`                        |

### Mock Variants

Each component has two factory variants:

#### Standard Mock Factory

Full-featured mock with all props and data-testid support.

```typescript
vi.mock('@synerise/ds-button', async () => {
  const { buttonMockFactory } = await import('@synerise/ds-mocks');
  return { ...buttonMockFactory() };
});

// Renders actual button element with:
// - data-testid (default: 'ds-button' or custom)
// - data-type, data-mode, data-loading attributes
// - onClick handler
// - disabled state
```

#### Minimal Mock Factory

Returns `null` - useful when you don't need the component rendered.

```typescript
vi.mock('@synerise/ds-button', async () => {
  const { buttonMinimalMockFactory } = await import('@synerise/ds-mocks');
  return { ...buttonMinimalMockFactory() };
});

// Component renders nothing
```

### Custom data-testid

All mocks support custom `data-testid` via props:

```tsx
// In your component:
<Button data-testid="submit-btn">Submit</Button>
<Modal data-testid="confirm-modal" open>...</Modal>
<Icon data-testid="close-icon" icon="CloseM" />

// In tests:
screen.getByTestId('submit-btn')
screen.getByTestId('confirm-modal')
screen.getByTestId('close-icon')
```

### Component-specific Features

#### Modal

Provides additional test ids for internal elements:

- `{testId}-header`
- `{testId}-title`
- `{testId}-close`
- `{testId}-body`
- `{testId}-footer`
- `{testId}-ok`
- `{testId}-cancel`

#### Table

Provides test ids for rows and cells:

- `{testId}-header`
- `{testId}-row-{index}`
- `{testId}-cell-{rowIndex}-{colIndex}`
- `{testId}-checkbox-{index}` (when rowSelection enabled)

#### Form

Mocks the entire `@synerise/ds-form` package including:

- `Form` (default export)
- `Form.FieldSet`
- `EditableList`

```typescript
vi.mock('@synerise/ds-form', async () => {
  const { formMockFactory } = await import('@synerise/ds-mocks');
  return { ...formMockFactory() };
});

// Test ids:
// - ds-fieldset, ds-fieldset-heading, ds-fieldset-description
// - ds-editable-list, ds-editable-list-header, ds-editable-list-rows
// - ds-editable-list-row-{index}, ds-editable-list-delete-{index}, ds-editable-list-add
```

#### Tooltip

Factory accepts options parameter:

```typescript
vi.mock('@synerise/ds-tooltip', async () => {
  const { tooltipMockFactory } = await import('@synerise/ds-mocks');
  return { ...tooltipMockFactory({ showContent: true })() };
});

// Now you can test tooltip content
screen.getByTestId('ds-tooltip-content');
screen.getByTestId('ds-tooltip-title');
```

#### Icon

Additional factory for custom render:

```typescript
// Standard mock
vi.mock('@synerise/ds-icon', async () => {
  const { iconMockFactory } = await import('@synerise/ds-mocks');
  return { ...iconMockFactory() };
});

// Custom render function
vi.mock('@synerise/ds-icon', async () => {
  const { iconWithRenderMockFactory } = await import('@synerise/ds-mocks');
  return { ...iconWithRenderMockFactory(({ icon }) => <span>{icon}</span>)() };
});
```

### TypeScript Support

All mocks export their prop types:

```typescript
import type {
  MockButtonProps,
  MockIconProps,
  MockModalProps,
  MockTableProps,
  // ... etc
} from '@synerise/ds-mocks';
```

## Jest Mocks

This package also provides mocks for Jest test framework.

### Usage

```typescript
import { jest as dsMocks } from '@synerise/ds-mocks';
import { render, screen, fireEvent } from '@testing-library/react';

describe('MyComponent', () => {
  // Call mocks at the top level of describe block
  dsMocks.mockButton();
  dsMocks.mockModal();
  dsMocks.mockIcon();

  it('renders button with custom testid', () => {
    render(<MyComponent />);

    // Default testid
    expect(screen.getByTestId('ds-button')).toBeInTheDocument();

    // Or custom testid if passed via props
    expect(screen.getByTestId('submit-button')).toBeInTheDocument();
  });

  it('opens modal on click', () => {
    render(<MyComponent />);

    fireEvent.click(screen.getByTestId('ds-button'));

    expect(screen.getByTestId('ds-modal')).toBeInTheDocument();
    expect(screen.getByTestId('ds-modal-title')).toHaveTextContent('My Modal');
  });
});
```

### Available Jest Mocks

| Component | Mock Functions                                      |
| --------- | --------------------------------------------------- |
| Button    | `mockButton`, `mockButtonMinimal`                   |
| Cruds     | `mockCruds`, `mockCrudsMinimal`                     |
| Dropdown  | `mockDropdown`, `mockDropdownMinimal`               |
| Form      | `mockForm`, `mockFormMinimal`                       |
| Icon      | `mockIcon`, `mockIconMinimal`, `mockIconWithRender` |
| Input     | `mockInput`, `mockInputMinimal`                     |
| Modal     | `mockModal`, `mockModalMinimal`                     |
| Select    | `mockSelect`, `mockSelectMinimal`                   |
| Table     | `mockTable`, `mockTableMinimal`                     |
| Tabs      | `mockTabs`, `mockTabsMinimal`                       |
| Tooltip   | `mockTooltip`, `mockTooltipMinimal`                 |

### Jest TypeScript Support

All Jest mocks export their prop types:

```typescript
import type {
  MockButtonProps,
  MockIconProps,
  MockModalProps,
  MockTableProps,
  // ... etc
} from '@synerise/ds-mocks/jest';
```

## DS Components Coverage

### Available Mocks

- [x] Button (`@synerise/ds-button`)
- [x] Cruds (`@synerise/ds-cruds`)
- [x] Dropdown (`@synerise/ds-dropdown`)
- [x] Form (`@synerise/ds-form`) - includes Form.FieldSet and EditableList
- [x] Icon (`@synerise/ds-icon`)
- [x] Input (`@synerise/ds-input`) - includes TextArea
- [x] Modal (`@synerise/ds-modal`)
- [x] Select (`@synerise/ds-select`) - includes Option
- [x] Table (`@synerise/ds-table`)
- [x] Tabs (`@synerise/ds-tabs`)
- [x] Tooltip (`@synerise/ds-tooltip`)

### Pending Mocks (TODO)

- [ ] ActionArea (`@synerise/ds-action-area`)
- [ ] Alert (`@synerise/ds-alert`)
- [ ] AppMenu (`@synerise/ds-app-menu`)
- [ ] Autocomplete (`@synerise/ds-autocomplete`)
- [ ] Avatar (`@synerise/ds-avatar`)
- [ ] AvatarGroup (`@synerise/ds-avatar-group`)
- [ ] Badge (`@synerise/ds-badge`)
- [ ] Banner (`@synerise/ds-banner`)
- [ ] Block (`@synerise/ds-block`)
- [ ] BroadcastBar (`@synerise/ds-broadcast-bar`)
- [ ] ButtonGroup (`@synerise/ds-button-group`)
- [ ] Card (`@synerise/ds-card`)
- [ ] CardSelect (`@synerise/ds-card-select`)
- [ ] CardTabs (`@synerise/ds-card-tabs`)
- [ ] Cascader (`@synerise/ds-cascader`)
- [ ] Checkbox (`@synerise/ds-checkbox`)
- [ ] CheckboxTristate (`@synerise/ds-checkbox-tristate`)
- [ ] CodeArea (`@synerise/ds-code-area`)
- [ ] CodeSnippet (`@synerise/ds-code-snippet`)
- [ ] Collector (`@synerise/ds-collector`)
- [ ] ColorPicker (`@synerise/ds-color-picker`)
- [ ] ColumnManager (`@synerise/ds-column-manager`)
- [ ] CompletedWithin (`@synerise/ds-completed-within`)
- [ ] Condition (`@synerise/ds-condition`)
- [ ] Confirmation (`@synerise/ds-confirmation`)
- [ ] ContextSelector (`@synerise/ds-context-selector`)
- [ ] CopyIcon (`@synerise/ds-copy-icon`)
- [ ] DataFormat (`@synerise/ds-data-format`)
- [ ] DatePicker (`@synerise/ds-date-picker`)
- [ ] DateRangePicker (`@synerise/ds-date-range-picker`)
- [ ] Description (`@synerise/ds-description`)
- [ ] Divider (`@synerise/ds-divider`)
- [ ] Drawer (`@synerise/ds-drawer`)
- [ ] EditableItemsList (`@synerise/ds-editable-items-list`)
- [ ] EmojiPicker (`@synerise/ds-emoji-picker`)
- [ ] EmptyStates (`@synerise/ds-empty-states`)
- [ ] Estimation (`@synerise/ds-estimation`)
- [ ] Factors (`@synerise/ds-factors`)
- [ ] FieldSet (`@synerise/ds-field-set`)
- [ ] FileUploader (`@synerise/ds-file-uploader`)
- [ ] Filter (`@synerise/ds-filter`)
- [ ] Flag (`@synerise/ds-flag`)
- [ ] FlexBox (`@synerise/ds-flex-box`)
- [ ] Footer (`@synerise/ds-footer`)
- [ ] FormField (`@synerise/ds-form-field`)
- [ ] FormatPicker (`@synerise/ds-format-picker`)
- [ ] Grid (`@synerise/ds-grid`)
- [ ] IconPicker (`@synerise/ds-icon-picker`)
- [ ] InformationCard (`@synerise/ds-information-card`)
- [ ] InlineAlert (`@synerise/ds-inline-alert`)
- [ ] InlineEdit (`@synerise/ds-inline-edit`)
- [ ] InputNumber (`@synerise/ds-input-number`)
- [ ] Insight (`@synerise/ds-insight`)
- [ ] ItemFilter (`@synerise/ds-item-filter`)
- [ ] ItemPicker (`@synerise/ds-item-picker`)
- [ ] ItemsRoll (`@synerise/ds-items-roll`)
- [ ] Layout (`@synerise/ds-layout`)
- [ ] List (`@synerise/ds-list`)
- [ ] ListItem (`@synerise/ds-list-item`)
- [ ] Loader (`@synerise/ds-loader`)
- [ ] Logic (`@synerise/ds-logic`)
- [ ] ManageableList (`@synerise/ds-manageable-list`)
- [ ] Mapping (`@synerise/ds-mapping`)
- [ ] Menu (`@synerise/ds-menu`)
- [ ] MetricCard (`@synerise/ds-metric-card`)
- [ ] Navbar (`@synerise/ds-navbar`)
- [ ] Operators (`@synerise/ds-operators`)
- [ ] OrderedList (`@synerise/ds-ordered-list`)
- [ ] PageHeader (`@synerise/ds-page-header`)
- [ ] Pagination (`@synerise/ds-pagination`)
- [ ] Panel (`@synerise/ds-panel`)
- [ ] PanelsResizer (`@synerise/ds-panels-resizer`)
- [ ] Popconfirm (`@synerise/ds-popconfirm`)
- [ ] Popover (`@synerise/ds-popover`)
- [ ] ProgressBar (`@synerise/ds-progress-bar`)
- [ ] Radio (`@synerise/ds-radio`)
- [ ] Result (`@synerise/ds-result`)
- [ ] Scrollbar (`@synerise/ds-scrollbar`)
- [ ] Search (`@synerise/ds-search`)
- [ ] SearchBar (`@synerise/ds-search-bar`)
- [ ] SectionMessage (`@synerise/ds-section-message`)
- [ ] ShortCuts (`@synerise/ds-short-cuts`)
- [ ] Sidebar (`@synerise/ds-sidebar`)
- [ ] SidebarObject (`@synerise/ds-sidebar-object`)
- [ ] Skeleton (`@synerise/ds-skeleton`)
- [ ] Slider (`@synerise/ds-slider`)
- [ ] Sortable (`@synerise/ds-sortable`)
- [ ] Status (`@synerise/ds-status`)
- [ ] StepCard (`@synerise/ds-step-card`)
- [ ] Stepper (`@synerise/ds-stepper`)
- [ ] Subject (`@synerise/ds-subject`)
- [ ] SubtleForm (`@synerise/ds-subtle-form`)
- [ ] Switch (`@synerise/ds-switch`)
- [ ] Tag (`@synerise/ds-tag`)
- [ ] Tags (`@synerise/ds-tags`)
- [ ] TimePicker (`@synerise/ds-time-picker`)
- [ ] Toast (`@synerise/ds-toast`)
- [ ] Toolbar (`@synerise/ds-toolbar`)
- [ ] Tray (`@synerise/ds-tray`)
- [ ] Typography (`@synerise/ds-typography`)
- [ ] UnorderedList (`@synerise/ds-unordered-list`)
- [ ] Wizard (`@synerise/ds-wizard`)

## Requirements

### Vitest

- Vitest with `globals: true` in config
- React 16.8+ or 17+ or 18+
- `@testing-library/react` (recommended)

### Jest

- Jest 27+ or 28+ or 29+
- React 16.8+ or 17+ or 18+
- `@testing-library/react` (recommended)

## License

MIT
