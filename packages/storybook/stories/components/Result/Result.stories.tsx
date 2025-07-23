import React from 'react';

import { Meta, StoryObj } from '@storybook/react-webpack5';
import Button from '@synerise/ds-button';
import Icon, {
  AngleDownS,
  CheckS,
  FileM,
  RefreshM,
  UserM,
} from '@synerise/ds-icon';
import List from '@synerise/ds-list';
import Result, { ResultProps } from '@synerise/ds-result';

import {
  CLASSNAME_ARG_CONTROL,
  REACT_NODE_AS_STRING,
  controlFromOptionsArray,
  fixedWrapper588,
  reactNodeAsSelect,
} from '../../utils';
import { dataSingle } from '../List/List.data';

type Story = StoryObj<ResultProps>;

const RESULT_TYPES = [
  'info',
  'warning',
  'error',
  'success',
  'progress',
  'no-results',
];

export default {
  component: Result,
  title: 'Components/Result',
  tags: ['autodocs'],
  decorators: [fixedWrapper588],
  render: (args) => {
    return <Result {...args} />;
  },
  argTypes: {
    noSearchResults: { table: { disable: true } },
    buttons: REACT_NODE_AS_STRING,
    className: CLASSNAME_ARG_CONTROL,
    customIcon: {
      ...reactNodeAsSelect(['AngleDownS', 'CheckS'], {
        AngleDownS: <Icon component={<AngleDownS />} />,
        CheckS: <Icon component={<CheckS />} />,
      }),
    },
    title: REACT_NODE_AS_STRING,
    panel: REACT_NODE_AS_STRING,
    description: REACT_NODE_AS_STRING,
    type: controlFromOptionsArray('select', RESULT_TYPES),
  },
  args: {
    type: 'info',
    title: 'Result',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam scelerisque lectus nec erat posuere bibendum.',
  },
} as Meta<ResultProps>;

export const Default: Story = {};
export const WithButtonsAndPanel: Story = {
  args: {
    buttons: (
      <>
        <Button type="ghost" mode="icon-label">
          <Icon component={<RefreshM />} /> Button 1
        </Button>
        <Button type="ghost" mode="icon-label">
          <Icon component={<UserM />} /> Button 2
        </Button>
      </>
    ),
    panel: (
      <List
        size="large"
        dataSource={dataSingle}
        renderItem={(item: ItemProps) => <List.Item>{item.text}</List.Item>}
      />
    ),
  },
};
export const AllTypes: Story = {
  parameters: {
    controls: {
      include: ['title', 'description'],
    },
  },
  render: (args) => {
    return (
      <>
        {RESULT_TYPES.map((type) => (
          <Result {...args} type={type} />
        ))}
      </>
    );
  },
};
