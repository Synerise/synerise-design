{
  import type {
    Meta,
    StoryObj
  } from '@storybook/react';
  import DSFlag, {
    FlagProps
  } from './DSFlag'; //import component
  const meta: Meta < FlagProps > = {
    title: 'DSFlag', //title of component
    component: DSFlag //component
  };
  export default meta;
  const excludedProps = [];
  const excludeRegexp = new RegExp(`(${excludedProps.join('|')})`, 'g');
  type Story = StoryObj < FlagProps > ;
  const StoryTemplate: Story = {
    render: (args) => <DSFlag {...args} /> //render component
  };
  export const Primary = {
    ...StoryTemplate,
    args: {
      country: 'us', //add component's props
      size: 24
    }
  }
}