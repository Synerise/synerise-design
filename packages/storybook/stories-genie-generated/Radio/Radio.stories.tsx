{
  import type {
    Meta,
    StoryObj
  } from '@storybook/react';
  import React from 'react';
  //import component
  import Radio, {
    Props
  } from './Radio';
  const meta: Meta < Props > = {
    title: 'Radio',
    component: Radio,
  };
  export default meta;
  const excludedProps = ['description'];
  const excludeRegexp = new RegExp(`(${excludedProps.join('|')})`, 'g');
  type Story = StoryObj < Props > ;
  const StoryTemplate: Story = {
    render: (args) => <Radio {...args} />,
  };
  export const Primary = {
    ...StoryTemplate,
    args: {
      //add component's props
    },
  };
}