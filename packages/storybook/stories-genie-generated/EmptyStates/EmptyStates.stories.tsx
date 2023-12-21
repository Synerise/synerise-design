{
  import type {
    Meta,
    StoryObj
  } from '@storybook/react';
  import Icon from '@synerise/ds-icon';
  import * as S from './EmptyStates.styles';
  import {
    EmptyStatesProps,
    EmptyStatesSize
  } from './EmptyStates.types';
  const mapSizeToPx = {
    [EmptyStatesSize.SMALL]: 48,
    [EmptyStatesSize.MEDIUM]: 96,
  };
  const meta: Meta < EmptyStatesProps > = {
    title: 'Empty States',
    component: EmptyStates,
  };
  export default meta;
  const excludedProps = [];
  const excludeRegexp = new RegExp(`(${excludedProps.join('|')})`, 'g');
  type Story = StoryObj < EmptyStatesProps > ;
  const StoryTemplate: Story = {
    render: (args) => (<EmptyStates {...args} />),
  };
  export const Primary = {
    ...StoryTemplate,
    args: {
      size: EmptyStatesSize.SMALL,
      label: 'No Data Available',
      text: 'There is no data to display',
      button: null,
      fontSize: 14,
      customIcon: IconAlertCircle,
      mode: 'light',
    },
  };
}