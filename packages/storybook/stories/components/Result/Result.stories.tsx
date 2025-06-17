import React from 'react';
import { Meta, StoryObj } from '@storybook/react-webpack5';

import Result, { ResultProps } from '@synerise/ds-result';
import Icon, { AngleDownS, CheckS } from '@synerise/ds-icon';

import {
  BOOLEAN_CONTROL,
  CLASSNAME_ARG_CONTROL,
  controlFromOptionsArray,
  fixedWrapper300,
  reactNodeAsSelect,
  REACT_NODE_AS_STRING,
} from '../../utils';

type Story = StoryObj<ResultProps>;

const RESULT_TYPES = ['info', 'warning', 'error', 'success', 'progress', 'no-results'];

export default {
  component: Result,
  title: 'Components/Result',
  tags: ['autodocs'],
  decorators: [fixedWrapper300],
  render: args => {
    return <Result {...args} />;
  },
  argTypes: {
    buttons: { control: false },
    className: CLASSNAME_ARG_CONTROL,
    customIcon: {
      ...reactNodeAsSelect(['AngleDownS', 'CheckS'], {
        AngleDownS: <Icon component={<AngleDownS />} />,
        CheckS: <Icon component={<CheckS />} />,
      }),
    },
    title: REACT_NODE_AS_STRING,
    panel: {},
    description: REACT_NODE_AS_STRING,
    type: controlFromOptionsArray('select', RESULT_TYPES),
    noSearchResults: BOOLEAN_CONTROL,
  },
  args: {
    type: 'info',
    title: 'Result',
    description: 'Description',
  },
} as Meta<ResultProps>;

export const Default: Story = {};
export const AllTypes: Story = {
  parameters: {
    controls: {
      include: ['title', 'description'],
    },
  },
  render: args => {
    return (
      <>
        {RESULT_TYPES.map(type => (
          <Result {...args} type={type} />
        ))}
      </>
    );
  },
};
