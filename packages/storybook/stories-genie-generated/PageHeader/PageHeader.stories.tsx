{
  import type {
    Meta,
    StoryObj
  } from '@storybook/react';
  import React from 'react';
  import PageHeader from './PageHeader';
  const meta: Meta = {
    title: 'Components/PageHeader',
    component: PageHeader,
  };
  export default meta;
  const excludedProps = ['className', 'onGoBack', 'onClose', 'children', 'rightSide', 'title', 'description', 'bar', 'tabs', 'isolated', 'inlineEdit', 'more', 'avatar', 'goBackIcon', 'tooltip', 'tooltipIcon', 'handleTooltipClick'];
  const excludeRegexp = new RegExp(`(${excludedProps.join('|')})`, 'g');
  type Story = StoryObj < React.ReactNode > ;
  const StoryTemplate: Story = {
    render: (args) => (<PageHeader {...args} />),
  };
  export const Primary = {
    ...StoryTemplate,
    args: {
      className: '',
      onGoBack: undefined,
      onClose: undefined,
      children: undefined,
      rightSide: undefined,
      title: 'Page Header',
      description: '',
      bar: undefined,
      tabs: undefined,
      isolated: false,
      inlineEdit: undefined,
      more: undefined,
      avatar: undefined,
      goBackIcon: undefined,
      tooltip: undefined,
      tooltipIcon: undefined,
      handleTooltipClick: undefined,
    },
  };
}