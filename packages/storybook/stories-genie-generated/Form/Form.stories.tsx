{
  import type {
    Meta,
    StoryObj
  } from '@storybook/react';
  import Form from './Form';
  const meta: Meta < Form > = {
    title: 'Form',
    component: Form
  };
  export default meta;
  const excludedProps = [];
  const excludeRegexp = new RegExp(`(${excludedProps.join('|')})`, 'g');
  type Story = StoryObj < Form > ;
  const StoryTemplate: Story = {
    render: (args) => <Form {...args} />
  };
  export const Primary = {
    ...StoryTemplate,
    args: {
      // add component's props
    }
  }
}