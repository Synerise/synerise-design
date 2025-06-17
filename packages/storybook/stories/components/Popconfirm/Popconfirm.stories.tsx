import React from 'react';
import { Meta, StoryObj } from '@storybook/react-webpack5';
import { fn } from 'storybook/test';
import isChromatic from "chromatic/isChromatic";

import Popconfirm, { PopconfirmProps } from '@synerise/ds-popconfirm';

import { BOOLEAN_CONTROL, centeredPaddedWrapper, fixedWrapper300 } from '../../utils';
import Button from '@synerise/ds-button';
import Icon, { CloseM, WarningFillM } from '@synerise/ds-icon';

type Story = StoryObj<PopconfirmProps>;

export default {
  component: Popconfirm,
  title: 'Components/Popconfirm',
  tags: ['autodocs'],
  decorators: [fixedWrapper300, centeredPaddedWrapper],
  render: args => {
    return <Popconfirm {...args} />;
  },
  argTypes: {
    disabled: BOOLEAN_CONTROL,
    onCancel: {
      action: 'onCancel',
    },
    onConfirm: {
      action: 'onConfirm',
    },
  },
  args: {
    children: <Button>Click me</Button>,
    cancelText: 'No',
    okText: 'Yes',
    okType: 'primary',
    title: 'Are you sure to delete this item and move to the next category',
    onCancel: fn(),
    onConfirm: fn(),
    closeIcon: <Icon component={<CloseM />} />,
    placement: 'top',
    mouseEnterDelay: 0,
    mouseLeaveDelay: 0,
    trigger: 'click',
  },
} as Meta<PopconfirmProps>;

export const Default: Story = {};

export const withDescription: Story = {
  args: {
    description: 'This is popconfirm modal example with simple body text here',
  }
};

export const Open: Story = {
  args: {
    visible: true,
    description: 'This is popconfirm modal example with simple body text here',
    imagesAutoplay: !isChromatic(),
    imagesAutoplaySpeed: 1000,
    images: [
      'https://cdn.pixabay.com/photo/2013/11/28/10/36/road-220058_960_720.jpg',
      'https://cdn.pixabay.com/photo/2015/07/09/22/45/tree-838667_960_720.jpg',
      'https://cdn.pixabay.com/photo/2015/07/05/10/18/tree-832079_960_720.jpg',
    ],
    icon: <Icon component={<WarningFillM />} color="#ffc300" />,
  }
};
