import React from 'react';
import { Meta, StoryObj } from '@storybook/react-webpack5';
import { useArgs } from 'storybook/preview-api';
import { fn } from 'storybook/test';

import Checkbox, { CheckboxTristateProps } from '@synerise/ds-checkbox';
import { BOOLEAN_CONTROL, CLASSNAME_ARG_CONTROL, PREFIXCLS_ARG_CONTROL, controlFromOptionsArray, REACT_NODE_AS_STRING, STRING_CONTROL, STYLE_ARG_CONTROL } from '../../utils';

export default {
  title: 'Components/Checkbox/CheckboxTristate',
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
  args: {
    onChange: fn()
  }
} as Meta<CheckboxTristateProps>;

export const Default: StoryObj<CheckboxTristateProps> = {
  render: (args) => <Checkbox {...args} tristate />
}

export const Controlled: StoryObj<CheckboxTristateProps> = {
  render: (args) => {
    const [{ checked }, updateArgs] = useArgs();
    function onChange(event) {
      args.onChange?.(event)
      updateArgs({ checked: !checked });
    }

    return <Checkbox
      checked={undefined}
      {...args}
      onChange={onChange}
      tristate
    />
  },
  parameters: {
    controls: {
      include: ['checked']
    }
  },
  argTypes: {
    checked: {
      ...controlFromOptionsArray('radio', [true, false, undefined])
    }
  }
}

export const DefaultChecked: StoryObj<CheckboxTristateProps> = {
  ...Default,
  args: {
    defaultChecked: true,
  },
  parameters: {
    controls: {
      include: []
    }
  },
}