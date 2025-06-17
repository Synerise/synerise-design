import React from 'react';
import { Meta, StoryObj } from '@storybook/react-webpack5';
import { useArgs } from 'storybook/preview-api';

import Checkbox from '@synerise/ds-checkbox';
import type { CheckboxProps } from '@synerise/ds-checkbox';

import { CheckboxSkeleton as CheckboxSkeletonComponent } from '@synerise/ds-skeleton';
import type { CheckboxSkeletonProps } from '@synerise/ds-skeleton';


import { BOOLEAN_CONTROL, STRING_CONTROL, CLASSNAME_ARG_CONTROL, REACT_NODE_AS_STRING, STYLE_ARG_CONTROL, PREFIXCLS_ARG_CONTROL } from '../../utils';

export default {
  title: 'Components/Checkbox/Checkbox',
  tags: ['autodocs'],
  component: Checkbox,
  parameters: {
    controls: {
      exclude: ['autoFocus', 'defaultChecked', 'type', 'tabIndex']
    }
  },
  argTypes: {
    checked: BOOLEAN_CONTROL,
    disabled: BOOLEAN_CONTROL,
    withoutPadding: BOOLEAN_CONTROL,
    hasError: BOOLEAN_CONTROL,
    indeterminate: BOOLEAN_CONTROL,
    children: REACT_NODE_AS_STRING,
    prefixCls: PREFIXCLS_ARG_CONTROL,
    className: CLASSNAME_ARG_CONTROL,
    style: STYLE_ARG_CONTROL,
    description: STRING_CONTROL,
    errorText: STRING_CONTROL,
    name: STRING_CONTROL,
    id: STRING_CONTROL,
    value: STRING_CONTROL,
  },
  subcomponents: { CheckboxGroup: Checkbox.Group }
} as Meta<CheckboxProps>;

export const Default: StoryObj<CheckboxProps> = {
  render: (args) => {
    const [{ checked }, updateArgs] = useArgs();
    function onChange() {
      updateArgs({ checked: !checked });
    }
    return <Checkbox
      {...args}
      onChange={onChange}
    />
  },
  args: {
    children: 'Label',
  }
};

export const Solo = {
  ...Default,
  args: {}
}

export const CheckboxSkeleton: StoryObj<CheckboxSkeletonProps> = {
  render: () => <CheckboxSkeletonComponent size="M" />,
}