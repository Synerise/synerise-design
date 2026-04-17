---
id: search
title: Search
---

Search UI Component

## Installation

```
pnpm add @synerise/ds-search
```

## Usage

```tsx
import Search from '@synerise/ds-search';

const parameters = [
  { text: 'First Name', icon: <VarTypeStringM /> },
  { text: 'Last Name', icon: <VarTypeStringM /> },
  { text: 'Sex', icon: <VarTypeStringM /> },
  { text: 'City', icon: <VarTypeStringM /> },
  { text: 'Transactions', icon: <VarTypeNumberM /> }
];
const recent = [
  { text: 'Bangkok', filter: 'City', icon: <VarTypeStringM /> },
  { text: 'Frank', filter: 'Last Name', icon: <VarTypeStringM /> },
  { text: 'Basel', filter: 'City', icon: <VarTypeStringM /> },
];
const [value, setValue] = React.useState<string>('');
const [parameterValue, setParameterValue] = React.useState<string>('');
const [suggestions, setSuggestions] = React.useState([]);
return (
      <Search
        clearTooltip="Clear"
        placeholder="Search"
        parameters={parameters.slice(0, parametersCount)}
        recent={recent.slice(0, recentCount)}
        suggestions={suggestions}
        value={value}
        parameterValue={parameterValue}
        onValueChange={value => {
          setValue(value);
        }}
        onParameterValueChange={(value, parameter) => {
          setParameterValue(value);
          const fakeApiResponse = getSuggestions(value);
          setSuggestions(fakeApiResponse);
        }}
        recentDisplayProps={{
          tooltip: "recentTooltip",
          title: "recentTitle",
          rowHeight: 32,
          visibleRows: 3,
          itemRender: (item: FilterElement) => <Menu.Item>{item && item.text}</Menu.Item>,
          divider: (
            <div style={{ padding: '12px', paddingBottom: '0px' }}>
              <Divider dashed />{' '}
            </div>
          ),
        }}
        parametersDisplayProps={{
          tooltip: "parametersTooltip",
          title: "parametersTitle",
          rowHeight: 32,
          visibleRows: 6,
          itemRender: (item: FilterElement) => (
            <Menu.Item
              highlight={value}
              prefixel={item && <Icon component={item && item.icon} />}
            >
              {item && item.text}
            </Menu.Item>
          ),
        }}
        suggestionsDisplayProps={{
          tooltip: "suggestionsTooltip",
          title: "suggestionsTitle",
          rowHeight: 32,
          visibleRows: 6,
          itemRender: (item: FilterElement) => <Menu.Item>{item && item.text}</Menu.Item>,
        }}
      />
)

```

## Demo

<iframe src="/storybook-static/iframe.html?id=components-search-search--with-dropdown"></iframe>

## API

| Property                | Description                                                                            | Type                                                                     | Default |
| ----------------------- | -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ | ------- |
| clearTooltip            | Clear button tooltip text                                                              | string                                                                   | -       |
| filterLookupKey         | key in parameter item object for displaying parameter label in input                   | string                                                                   | -       |
| hideLabel               | Hide label in search input                                                             | boolean                                                                  | -       |
| disableInput            | Disable search input                                                                   | boolean                                                                  | -       |
| inputProps              | Props object passed to the SearchInput component                                       | [InputProps](https://design.synerise.com/docs/components/input/#input-1) | -       |
| onParameterValueChange  | Callback when set parameter type                                                       | function                                                                 | -       |
| onValueChange           | Callback when input changes                                                            | function                                                                 | -       |
| parameters              | Parameters items data displayed in search dropdown                                     | object                                                                   | -       |
| parametersDisplayProps  | An object containing the details of how parameters list should render                  | DataSetProps                                                             | -       |
| parameterValue          | Chosen parameter type                                                                  | string                                                                   | -       |
| placeholder             | Input placeholder                                                                      | string                                                                   | -       |
| recent                  | Recent items data displayed in search dropdown                                         | object                                                                   | -       |
| recentDisplayProps      | An object containing the details of how recent items list should render                | DataSetProps                                                             | -       |
| suggestions             | Suggestions items data displayed after picking particular parameter in search dropdown | object or undefined or null                                              | -       |
| suggestionsDisplayProps | An object containing the details of how suggestions list should render                 | DataSetProps or undefined or null                                        | -       |
| textLookupConfig        | config of keys for lookup in parameters, recent and suggestions datasets               | { parameters: string; recent: string; suggestions: string}               | -       |
| value                   | The input content value                                                                | string                                                                   | -       |
| searchWidth             | Width of the search input when expanded                                                | number                                                                   | -       |
| dropdownWidth           | Width of the suggestions dropdown. Will match search input if undefined                | number                                                                   | -       |
| alwaysExpanded          | Enable expanded input on Search component with dropdown                                | boolean / undefined                                                      | -       |
| searchTooltipProps      | Props forwarded to the Tooltip wrapping the search input                               | TooltipProps                                                             | -       |

### DataSetProps

| Property    | Description                                                                     | Type                          | Default |
| ----------- | ------------------------------------------------------------------------------- | ----------------------------- | ------- |
| divider     | ReactElement displayed at the bottom of the list                                | ReactElement                  | -       |
| itemRender  | Function rendering single item of the list                                      | (item: object) => JSX.Element | -       |
| rowHeight   | Height of item in the list                                                      | number                        | -       |
| title       | Title of the item list                                                          | string                        | -       |
| tooltip     | Tooltip of the item list, displayed when hovering on the icon next to the title | string                        | -       |
| visibleRows | Number of rows visible in the list                                              | number                        | -       |

## Search usage

```tsx
import { SearchInput } from '@synerise/ds-search';

const [value, setValue] = React.useState<string>('');
return (
  <SearchInput
    clearTooltip="Clear"
    placeholder="Search"
    onChange={value => {
      console.log(value);
      setValue(value);
    }}
    value={value}
    onClear={() => {
      console.log('Cleared!');
    }}
    closeOnClickOutside={true}
  />
);
```

### SearchInput

| Property            | Description                                                               | Type                                                                     | Default |
| ------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------ | ------- |
| alwaysHighlight     | When set, the input always has blue border when expanded                  | boolean                                                                  | `false` |
| alwaysExpanded      | Boolean value to force expanded state of the input                        | boolean                                                                  | `false` |
| clearTooltip        | Clear button tooltip text                                                 | ReactNode                                                                | -       |
| closeOnClickOutside | Collapses the input when clicking outside. The decision fires on `mousedown`/`touchstart`, but the collapse animation is deferred to the matching `mouseup`/`touchend` so clicks on adjacent layout-shifting content stay reliable | boolean                                                                  | `false` |
| disabled            | Disables the entire component including the search button                 | boolean                                                                  | -       |
| disableInput        | Disables only the text input; search button remains active                | boolean                                                                  | -       |
| filterLabel         | Label displayed on the left-hand side of the input caret                  | `{ icon?: ReactNode; [key: string]: any }` or null                       | -       |
| focusTrigger        | Toggle this boolean to imperatively focus the input                       | boolean                                                                  | -       |
| inputProps          | Props object passed to the input element of the component                 | [InputProps](https://design.synerise.com/docs/components/input/#input-1) | -       |
| moveCursorToEnd     | Moves caret to end of value when toggled                                  | boolean                                                                  | -       |
| onChange            | Callback when input changes                                               | `(value: string) => void`                                                | -       |
| onButtonClick       | Callback executed when clicking search button                             | function                                                                 | -       |
| onClear             | Callback after clicking clear button                                      | function                                                                 | -       |
| onClick             | Callback executed when clicking inside an input                           | function                                                                 | -       |
| onKeyDown           | Callback executed when pressing a keyboard key.                           | function                                                                 | -       |
| onToggle            | Callback executed when expanding / narrowing the input wrapper            | function                                                                 | -       |
| placeholder         | Input placeholder                                                         | string                                                                   | -       |
| searchTooltipProps  | Props forwarded to the Tooltip wrapping the input                         | Partial<TooltipProps>                                                    | `{}`    |
| toggleTrigger       | Toggle this boolean to imperatively expand / collapse the input           | boolean                                                                  | -       |
| value               | The input content value                                                   | string                                                                   | -       |

### SearchInput usage

```tsx
import { SearchInput } from '@synerise/ds-search';

const [value, setValue] = React.useState<string>('');
return (
  <SearchInput
    clearTooltip="Clear"
    placeholder="Search"
    onChange={value => {
      console.log(value);
      setValue(value);
    }}
    value={value}
    onClear={() => {
      console.log('Cleared!');
    }}
    closeOnClickOutside={true}
  />
);
```
