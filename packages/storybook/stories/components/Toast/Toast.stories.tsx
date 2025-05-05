import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Toast, { ToastProps } from '@synerise/ds-toast';

import Button from '@synerise/ds-button';
import { FirstButtonWrapper, Wrapper } from '@synerise/ds-toast/dist/Toast.styles';
import UnorderedList from '@synerise/ds-unordered-list';
import {
  BOOLEAN_CONTROL,
  controlFromOptionsArray,
  fixedWrapper400,
  gappedColumnDecorator,
  REACT_NODE_AS_STRING,
} from '../../utils';
import { ButtonShowingToast, data } from './Toast.data';

export default {
  title: 'Components/Toast',
  tags: ['autodocs'],
  component: Toast,
  decorators: [gappedColumnDecorator, fixedWrapper400],
  render: args => {
    return <Toast {...args} />;
  },
  argTypes: {
    message: REACT_NODE_AS_STRING,
    description: REACT_NODE_AS_STRING,
    type: controlFromOptionsArray('select', ['success', 'warning', 'negative', 'informative']),
    withClose: BOOLEAN_CONTROL,
    expander: BOOLEAN_CONTROL,
    expanded: BOOLEAN_CONTROL,
    button: {
      control: false,
    },
    expandedContent: {
      control: false,
    },
  },
} as Meta<ToastProps>;

type Story = StoryObj<ToastProps>;

export const Default: Story = {
  args: {
    message: 'Campaign saved!',
    type: 'success',
    description: 'No response from server, try again later',
    withClose: false,
  },
};
const TYPES = ['success', 'warning', 'negative', 'informative'] as const;
export const AllTypes: Story = {
  render: args => {
    return (
      <>
        {TYPES.map(type => (
          <Toast {...args} message={`Toast type: ${type}`} type={type} />
        ))}
      </>
    );
  },
  args: {
    ...Default.args,
  },
};

export const WithCloseIcon: Story = {
  ...Default,
  args: {
    ...Default.args,
    withClose: true,
  },
};
export const WithExpander: Story = {
  ...Default,
  args: {
    ...Default.args,
    expander: true,
  },
};
export const WithButton: Story = {
  ...Default,
  args: {
    ...Default.args,
    expanded: true,
    button: (
      <FirstButtonWrapper>
        <Button type="tertiary-white" mode="label">
          Button
        </Button>
      </FirstButtonWrapper>
    ),
  },
};


export const ShowToast: Story = {
  ...Default,
  render: ({ type, ...args }) => {
    return <ButtonShowingToast type={type} {...args} />;
  },
};

export const WithList: Story = {
  ...Default,
  args: {
    ...Default.args,
    expanded: true,
    expandedContent: (
      <Wrapper>
        <UnorderedList data={data} indexFormatter={undefined} />
      </Wrapper>
    ),
  },
};
