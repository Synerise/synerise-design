import React from 'react';
import { Meta, StoryObj } from '@storybook/react-webpack5';

import Insight, { InsightProps } from '@synerise/ds-insight';
import { fn } from 'storybook/test';
import Avatar from '@synerise/ds-avatar';
import Icon, {AngleDownS, EditM, NotificationsM, RefreshM } from '@synerise/ds-icon';
import Button from '@synerise/ds-button';
import { theme } from '@synerise/ds-core';


import { fixedWrapper400, REACT_NODE_AS_STRING } from '../../utils';
import { Placeholder } from '../../constants';


export default {
  component: Insight,
  title: 'Components/Insight',
  tags: ['autodocs'],
  decorators: [fixedWrapper400],
  parameters: {
    layout: 'padded',
  },
  argsTypes: {
    title: REACT_NODE_AS_STRING,
    subTitle: REACT_NODE_AS_STRING,
    avatar: REACT_NODE_AS_STRING,
    headerRightSide: REACT_NODE_AS_STRING,
    footer: REACT_NODE_AS_STRING,
    content: REACT_NODE_AS_STRING,
    onClick: { control: false },
  },
} as Meta<InsightProps>;

type Story = StoryObj<InsightProps>;

export const Default: Story = {
  args: {
    title: 'Get File SFTP',
    content: <Placeholder $height={50} />,
    headerRightSide: <Button type='ghost' mode='icon-label'><Icon component={<EditM/>}/> Edit</Button>,
    onClick: undefined
  }
};

export const InsightWithOnClick: Story = {
  ...Default,
  args: {
    ...Default.args,
    onClick: fn(),
  }
};

export const WithInlineAlert: Story = {
  args: {
    title: 'Get File SFTP',
    content: [
      { message: 'New email campaign template version is ready to update', type: 'warning' },
      { message: 'Info message', type: 'info' },
    ],
    headerRightSide: <Button type='ghost' mode='icon-label'><Icon component={<EditM/>}/> Edit</Button>,
    onClick: undefined
  }
};

export const withAvatar: Story = {
  ...WithInlineAlert,
  args: {
    ...WithInlineAlert.args,
    avatar: <Avatar backgroundColor='grey' backgroundColorHue='100' iconComponent={<Icon component={<NotificationsM/>} color={theme.palette['orange-500']} />} size="medium" shape="square" />,
  }
};

export const withSubTitle: Story = {
  ...withAvatar,
  args: {
    ...withAvatar.args,
    subTitle: 'Custom mode name',
  }
};

export const withFooter: Story = {
  ...withSubTitle,
  args: {
    ...withSubTitle.args,
    footer: <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <Button mode="label-icon">
        More
        <Icon component={<AngleDownS/>}/>
      </Button>
      <Button mode="icon-label" icon={<Icon component={<RefreshM/>}/>}>
        Update template
      </Button>
    </div>,
  }
};
