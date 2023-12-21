{
  import type {
    Meta,
    StoryObj
  } from '@storybook/react';
  import Logic, {
    LogicProps
  } from './Logic';
  const meta: Meta < LogicProps > = {
    title: 'Logic',
    component: Logic,
  };
  export default meta;
  const excludedProps = [];
  const excludeRegexp = new RegExp(`(${excludedProps.join('|')})`, 'g');
  type Story = StoryObj < LogicProps > ;
  const StoryTemplate: Story = {
    render: (args) => <Logic {...args} />,
  };
  export const Primary = {
    ...StoryTemplate,
    args: {},
  };
}