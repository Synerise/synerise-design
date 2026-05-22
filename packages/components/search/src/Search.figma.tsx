// @ts-nocheck
import figma from '@figma/code-connect';

import Search from './Search';

const FIGMA_URL =
  'https://www.figma.com/design/fsSZONXpVvtrDsCgtu01Jb/Synerise-Design-System?node-id=2600-7952&m=dev';

const baseProps = {
  state: figma.enum('State', {
    Default: 'default',
    'Default expanded': 'default-expanded',
    Active: 'active',
    'Active filled': 'active-filled',
  }),
};

figma.connect(Search, FIGMA_URL, {
  variant: { State: 'Default' },
  props: baseProps,
  example: () => (
    <Search
      clearTooltip="Clear"
      placeholder="Search"
      dropdownMaxHeight={400}
      value=""
      parameterValue=""
      parameters={[]}
      recent={[]}
      textLookupConfig={{
        parameters: 'text',
        recent: 'text',
        suggestions: 'text',
      }}
      onValueChange={() => {}}
      onParameterValueChange={() => {}}
      onClear={() => {}}
      recentDisplayProps={{
        title: 'Recent',
        rowHeight: 32,
        itemRender: (item) => <span>{item.text}</span>,
      }}
      parametersDisplayProps={{
        title: 'Parameters',
        rowHeight: 32,
        itemRender: (item) => <span>{item.text}</span>,
      }}
    />
  ),
});

figma.connect(Search, FIGMA_URL, {
  variant: { State: 'Default expanded' },
  props: baseProps,
  example: () => (
    <Search
      alwaysExpanded
      clearTooltip="Clear"
      placeholder="Search"
      dropdownMaxHeight={400}
      value=""
      parameterValue=""
      parameters={[]}
      recent={[]}
      textLookupConfig={{
        parameters: 'text',
        recent: 'text',
        suggestions: 'text',
      }}
      onValueChange={() => {}}
      onParameterValueChange={() => {}}
      onClear={() => {}}
      recentDisplayProps={{
        title: 'Recent',
        rowHeight: 32,
        itemRender: (item) => <span>{item.text}</span>,
      }}
      parametersDisplayProps={{
        title: 'Parameters',
        rowHeight: 32,
        itemRender: (item) => <span>{item.text}</span>,
      }}
    />
  ),
});

figma.connect(Search, FIGMA_URL, {
  variant: { State: 'Active' },
  props: baseProps,
  example: () => (
    <Search
      alwaysExpanded
      clearTooltip="Clear"
      placeholder="Search"
      dropdownMaxHeight={400}
      value=""
      parameterValue=""
      parameters={[{ text: 'City' }]}
      recent={[{ text: 'Bangkok' }]}
      textLookupConfig={{
        parameters: 'text',
        recent: 'text',
        suggestions: 'text',
      }}
      onValueChange={() => {}}
      onParameterValueChange={() => {}}
      onClear={() => {}}
      recentDisplayProps={{
        title: 'Recent',
        rowHeight: 32,
        itemRender: (item) => <span>{item.text}</span>,
      }}
      parametersDisplayProps={{
        title: 'Parameters',
        rowHeight: 32,
        itemRender: (item) => <span>{item.text}</span>,
      }}
    />
  ),
});

figma.connect(Search, FIGMA_URL, {
  variant: { State: 'Active filled' },
  props: baseProps,
  example: () => (
    <Search
      alwaysExpanded
      clearTooltip="Clear"
      placeholder="Search"
      dropdownMaxHeight={400}
      value="Bangkok"
      parameterValue=""
      parameters={[{ text: 'City' }]}
      recent={[{ text: 'Bangkok' }]}
      textLookupConfig={{
        parameters: 'text',
        recent: 'text',
        suggestions: 'text',
      }}
      onValueChange={() => {}}
      onParameterValueChange={() => {}}
      onClear={() => {}}
      recentDisplayProps={{
        title: 'Recent',
        rowHeight: 32,
        itemRender: (item) => <span>{item.text}</span>,
      }}
      parametersDisplayProps={{
        title: 'Parameters',
        rowHeight: 32,
        itemRender: (item) => <span>{item.text}</span>,
      }}
    />
  ),
});
