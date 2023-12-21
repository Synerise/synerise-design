{
  import type {
    Meta,
    StoryObj
  } from '@storybook/react';
  import InlineEdit, {
    InlineEditProps
  } from './InlineEdit';
  const meta: Meta < InlineEditProps > = {
    title: 'InlineEdit',
    component: InlineEdit,
  };
  export default meta;
  const excludedProps = [];
  const excludeRegexp = new RegExp(`(${excludedProps.join('|')})`, 'g');
  type Story = StoryObj < InlineEditProps > ;
  const StoryTemplate: Story = {
    render: (args) => <InlineEdit {...args} />,
  };
  export const Primary = {
    ...StoryTemplate,
    args: {
      className: '',
      style: {},
      size: 'normal',
      disabled: false,
      autoFocus: false,
      hideIcon: false,
      tooltipTitle: 'Edit',
      error: false,
      input: {
        onChange: () => {},
        onBlur: () => {},
        onEnterPress: () => {},
        name: '',
        placeholder: '',
        maxLength: undefined,
        value: '',
        autoComplete: '',
      },
    },
  };
}