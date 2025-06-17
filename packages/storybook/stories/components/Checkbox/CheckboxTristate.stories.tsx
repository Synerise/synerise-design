import React from 'react';
import { Meta, StoryObj } from '@storybook/react-webpack5';
import { useArgs } from 'storybook/preview-api';

import CheckboxTristate, { CheckboxTristateProps } from '@synerise/ds-checkbox-tristate';
import { BOOLEAN_CONTROL, CLASSNAME_ARG_CONTROL, PREFIXCLS_ARG_CONTROL, controlFromOptionsArray, REACT_NODE_AS_STRING, STRING_CONTROL, STYLE_ARG_CONTROL } from '../../utils';

export default {
  title: 'Components/Checkbox/CheckboxTristate',
  tags: ['autodocs'],
  component: CheckboxTristate,

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
  }
} as Meta<CheckboxTristateProps>;

export const Default: StoryObj<CheckboxTristateProps> = {
  render: (args) => <CheckboxTristate {...args} />
}

export const Controlled: StoryObj<CheckboxTristateProps> = {
  render: (args) => {
    const [{ checked }, updateArgs] = useArgs();
    function onChange() {
      updateArgs({ checked: !checked });
    }

    return <CheckboxTristate
      {...args}
      onChange={onChange}
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