{
  import type {
    Meta,
    StoryObj
  } from '@storybook/react';
  import {
    Paragraph,
    TextProps
  } from './Paragraph';
  const meta: Meta < TextProps > = {
    title: 'Paragraph',
    component: Paragraph,
  };
  export default meta;
  const excludedProps = [];
  const excludeRegexp = new RegExp(`(${excludedProps.join('|')})`, 'g');
  type Story = StoryObj < TextProps > ;
  const StoryTemplate: Story = {
    render: (args) => <Paragraph {...args} />,
  };
  export const Primary = {
    ...StoryTemplate,
    args: {
      children: 'This is a medium-sized paragraph.'
    },
  };
  export const Small = {
    ...StoryTemplate,
    args: {
      size: 'small',
      children: 'This is a small-sized paragraph.'
    },
  };
  export const XSmall = {
    ...StoryTemplate,
    args: {
      size: 'xsmall',
      children: 'This is an extra small-sized paragraph.'
    },
  };
}