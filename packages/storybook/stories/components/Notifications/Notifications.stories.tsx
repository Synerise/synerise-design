import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { notificationsApi, Notification, notificationOpen } from "@synerise/ds-alert";
import Button from '@synerise/ds-button';
import Icon, { Add3M, AddM, UserAddM, ShowM } from '@synerise/ds-icon';
import {
  BOOLEAN_CONTROL,
  centeredPaddedWrapper,
  CLASSNAME_ARG_CONTROL,
  REACT_NODE_AS_STRING, reactNodeAsSelect,
} from '../../utils';

export default {
  title: "Components/Alert/Notification",
  tags: ['autodocs'],
  component: Notification,
  decorators: [centeredPaddedWrapper],
  argTypes: {
    className: CLASSNAME_ARG_CONTROL,
    buttonText: REACT_NODE_AS_STRING,
    children: REACT_NODE_AS_STRING,
    onClose: BOOLEAN_CONTROL,
    icon: {
      ...reactNodeAsSelect(['ShowM', 'User', 'Add', 'Add3M', 'None'], {
        ShowM: <Icon component={<ShowM />} />,
        User: <Icon component={<UserAddM />} />,
        Add: <Icon component={<AddM />} />,
        Add3M: <Icon component={<Add3M/>} />,
        None: undefined,
      }),
    },

  },
} as Meta<typeof Notification>;

type Story = StoryObj<typeof Notification>;

export const Default: Story = {
  args: {
    children: 'You have changed conditions',
  },
};

export const onClickNotification: Story = {
  render: (args) => {
    const [api, contextHolder] = notificationsApi.useNotification();
    return (
    <div>
      {contextHolder}
      <Button type="primary" onClick={() => notificationOpen({
        message: <Notification {...args}/>,
        duration: 3,
      }, api, contextHolder)}>
        Notification
      </Button>
    </div>

  )},
  args: {
    children: 'You have changed conditions',
    onClose: false,
  },
};

export const withButton: Story = {
  ...onClickNotification,
  args: {
    ...onClickNotification.args,
    buttonText: 'Show preview',
    icon: 'None'
  },
};
export const withButtonAndIcon: Story = {
    ...withButton,
  args: {
    ...withButton.args,
    icon: 'Add3M',
    onClose: false,
  },
};

export const withClose: Story = {
  ...onClickNotification,
  args: {
    ...onClickNotification.args,
    onClose: true,

  },
};



