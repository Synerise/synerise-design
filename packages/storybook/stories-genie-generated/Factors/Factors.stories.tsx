{
  import type {
    Meta,
    StoryObj
  } from '@storybook/react';
  import * as React from 'react';
  import Factors, {
    FactorsProps,
    factorTypes
  } from './Factors';
  const meta: Meta < FactorsProps > = {
    title: 'Components/Factors',
    component: Factors,
  };
  export default meta;
  const excludedProps = [];
  const excludeRegexp = new RegExp(`(${excludedProps.join('|')})`, 'g');
  type Story = StoryObj < FactorsProps > ;
  const StoryTemplate: Story = {
    render: (args) => <Factors {...args} />,
  };
  export const Primary = {
    ...StoryTemplate,
    args: {
      selectedFactorType: 'text',
      setSelectedFactorType: () => {},
      onChangeValue: () => {},
      onParamsClick: () => {},
      value: '',
      defaultFactorType: 'text',
      textType: 'Default',
      unavailableFactorTypes: [],
      availableFactorTypes: Object.keys(factorTypes),
      parameters: [],
      autocompleteText: [],
      withoutTypeSelector: false,
      texts: {},
      formulaEditor: null,
      opened: false,
      loading: false,
      factorKey: null,
      preventAutoloadData: false,
      onActivate: null,
      onDeactivate: null,
      getPopupContainerOverride: null,
      error: null,
      inputProps: {},
      readOnly: false,
      getMenuEntryProps: null,
    },
  };
}