import React from 'react';

import type { StoryObj, Meta } from '@storybook/react';

import { InputMultivalue, InputMultivalueProps } from '@synerise/ds-input';


import {
  BOOLEAN_CONTROL,
  CLASSNAME_ARG_CONTROL, fixedWrapper300, NUMBER_CONTROL,
  REACT_NODE_AS_STRING,
} from '../../utils';


export default {
  title: "Components/InputElements/InputMultivalue",
  tags: ['autodocs'],
  component: InputMultivalue,
  decorators: [fixedWrapper300],
  argTypes: {
    className: CLASSNAME_ARG_CONTROL,
    label: REACT_NODE_AS_STRING,
    description: REACT_NODE_AS_STRING,
    values: REACT_NODE_AS_STRING,
    error: BOOLEAN_CONTROL,
    errorText: REACT_NODE_AS_STRING,
    maxLength: NUMBER_CONTROL,
    disabled: BOOLEAN_CONTROL,
  },
} as Meta<typeof InputMultivalue>;

type Story = StoryObj<typeof InputMultivalue>;

export const Default: Story = {
  render: (args: InputMultivalueProps) => {
    const values = ['Option A', 'Option B', 'Option C'];
    return <InputMultivalue {...args} values={values} onChange={(values) => {JSON.stringify({type: 'onChange', values})}} />;
  },
  args: {
    label: 'Label',
    description: 'Description',
    maxLength: 10,
    disabled: false,
    error: false,
    errorText: '',
  },
};