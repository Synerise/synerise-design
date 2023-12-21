{
  import type {
    Meta,
    StoryObj
  } from '@storybook/react';
  import React from 'react';
  import Search from './Search';
  const meta: Meta < Props > = {
    title: 'Search',
    component: Search,
  };
  const excludedProps = ['value', 'parameterValue', 'recent', 'parameters', 'suggestions', 'textLookupConfig'];
  const excludeRegexp = new RegExp(`(${excludedProps.join('|')})`, 'g');
  type Story = StoryObj < Props > ;
  const StoryTemplate: Story = (args) => <Search {...args} />;
  export default meta;
  export const Primary = {
    ...StoryTemplate,
    args: {
      value: '',
      parameterValue: '',
      recent: [],
      parameters: [],
      suggestions: [],
      textLookupConfig: {},
    },
  };
}