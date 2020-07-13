---
id: search
title: Search
---

Search UI Component

## Installation

```
npm i @synerise/ds-search
or
yarn add @synerise/ds-search
```

## Usage

```
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
        onParameterValueChange={value => {
          setParameterValue(value);
          const fakeApiResponse = getSuggestions(value);
          setSuggestions(fakeApiResponse);
        }}
        recentDisplayProps={{
          tooltip: "recentTooltip",
          title: "recentTitle",
          rowHeight: 32,
          visibleRows: 3,
          itemRender: (item: FilterElement) => <Menu.Item onItemHover={(): void => {}}>{item && item.text}</Menu.Item>,
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
              onItemHover={(): void => {}}
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
          itemRender: (item: FilterElement) => <Menu.Item onItemHover={(): void => {}}>{item && item.text}</Menu.Item>,
        }}
      />
)

```

## Demo

<iframe src="/storybook-static/iframe.html?id=components-search--default"></iframe>

## API

| Property                | Description                                                                           | Type            | Default |
| ----------------------- | ------------------------------------------------------------------------------------- | --------------- | ------- |
| placeholder             | Input placeholder                                                                     | string          | -       |
| clearTooltip            | Clear button tooltip text                                                             | string          | -       |
| parameters              | Parameters items data displayed in search dropdown                                     | object          | -       |
| recent                  | Recent items data displayed in search dropdown                                         | object          | -       |
| suggestions             | Suggestions items data displayed after picking particular parameter in search dropdown | object or undefined or null         | -       |
| onValueChange           | Callback when input changes                                                           | function        | -       |
| value                   | The input content value                                                               | string          | -       |
| parameterValue          | Chosen parameter type                                                                 | string          | -       |
| onParameterValueChange  | Callback when set parameter type                                                      | function        | -       |
| width                   | Width of the search input when expanded                                               | number          | -       |
| parametersDisplayProps  | An object containing the details of how parameters list should render                 | DataSetProps    | -       |
| recentDisplayProps      | An object containing the details of how recent items list should render               | DataSetProps    | -       |
| suggestionsDisplayProps | An object containing the details of how suggestions list should render                | DataSetProps or undefined or null    | -       |
| filterLookupKey         | key in parameter item object for displaying parameter label in input                  | string          | -       |
| textLookupConfig        | config of keys for lookup in different datasets                                       | { parameters: string; recent: string; suggestions: string}    | -       |

### DataSetProps

| Property    | Description                                                                     | Type         | Default |
| ----------- | ------------------------------------------------------------------------------- | ------------ | ------- |
| title       | Title of the item list                                                          | string       | -       |
| tooltip     | Tooltip of the item list, displayed when hovering on the icon next to the title | string       | -       |
| rowHeight   | Height of item in the list                                                      | number       | -       |
| visibleRows | Number of rows visible in the list                                              | string       | -       |
| itemRender  | Function rendering single item of the list                                      | (item: object) => JSX.Element     | -       |
| divider     | ReactElement displayed at the bottom of the list                                | ReactElement | -       |

## Search usage

```
import { SearchInput } from '@synerise/ds-search/dist/Elements';

    const [value, setValue] = React.useState<string>('');
      <SearchInput
        clearTooltip="Clear"
        placeholder="Search"
        onValueChange={value => {
          console.log(value);
          setValue(value);
        }}
        value={value}
        onClear={() => {
          console.log('Cleared!');
        }}
        closeOnClickOutside={true}
      />
```

### SearchInput

| Property            | Description                                                               | Type     | Default |
| ------------------- | ------------------------------------------------------------------------- | -------- | ------- |
| placeholder         | Input placeholder                                                         | string   | -       |
| clearTooltip        | Clear button tooltip text                                                 | string   | -       |
| onValueChange       | Callback when input changes                                               | function | -       |
| value               | The input content value                                                   | string   | -       |
| onClear             | Callback after clicking clear button                                      | function | -       |
| onKeyDown           | Callback executed when pressing a keyboard key.                           | function | -       |
| onClick             | Callback executed when clicking inside an input                           | function | -       |
| onButtonClick       | Callback executed when clicking search button                             | function | -       |
| filterLabel         | Label displayed on the left-hand side of the input caret                  | object   | -       |
| focusTrigger        | Boolean value for triggering focus on the input                           | boolean  | -       |
| toggleTrigger       | Boolean value for triggering expanding / narrowing the input              | boolean  | -       |
| onToggle            | Callback executed when expanding / narrowing the input wrapper            | function | -       |
| alwaysHighlight     | When set, the input always has blue border when expanded                  | boolean  | false   |
| alwaysExpanded      | Boolean value to force expanded state of the input                        | boolean  | false   |
| closeOnClickOutside | Boolean value to prevent / force toggling the input when clicking outside | boolean  | false   |

### SearchInput usage

```
import { SearchInput } from '@synerise/ds-search/dist/Elements';

const [value, setValue] = React.useState<string>('');
return (
      <SearchInput
        clearTooltip="Clear"
        placeholder="Search"
        onValueChange={value => {
          console.log(value);
          setValue(value);
        }}
        value={value}
        onClear={() => {
          console.log('Cleared!');
        }}
        closeOnClickOutside={true}
      />
)
```
