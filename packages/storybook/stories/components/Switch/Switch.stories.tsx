import React from 'react';

import { useArgs } from 'storybook/preview-api';
import type { StoryObj, Meta } from '@storybook/react-webpack5';

import Switch from '@synerise/ds-switch';
import type { SwitchProps } from '@synerise/ds-switch';

import { fixedWrapper400, BOOLEAN_CONTROL, CLASSNAME_ARG_CONTROL, STYLE_ARG_CONTROL, REACT_NODE_AS_STRING, PREFIXCLS_ARG_CONTROL } from '../../utils';

export default {
  title: "Components/Switch",
  tags: ['autodocs'],
  component: Switch,
  decorators: [fixedWrapper400],
  parameters: {
    controls: {
      exclude: ['tooltipIcon', 'unCheckedChildren', 'checkedChildren', 'autoFocus', 'defaultChecked', 'loading'],
    }
  },
  argTypes: {
    className: CLASSNAME_ARG_CONTROL,
    checked: BOOLEAN_CONTROL,
    disabled: BOOLEAN_CONTROL,
    description: REACT_NODE_AS_STRING,
    errorText: REACT_NODE_AS_STRING,
    label: REACT_NODE_AS_STRING,
    prefixCls: PREFIXCLS_ARG_CONTROL,
    style: STYLE_ARG_CONTROL,
    title: {
      description: 'Title attribute of the &lt;button&gt; html element',
      control: 'text'
    },
    tooltip: REACT_NODE_AS_STRING,
    withFormElementMargin: { description: 'Renders with bottom margin standard to all form elements (16px)', ...BOOLEAN_CONTROL },
  },
} as Meta<SwitchProps>;

export const Default: StoryObj<SwitchProps> = {
  render: (args: SwitchProps) => {
    const [{ checked }, updateArgs] = useArgs();

    function onChange() {
      updateArgs({ checked: !checked });
    }

    return (
      <Switch
        {...args}
        checked={checked}
        onChange={onChange}
      />
    );
  }
};

export const SwitchWithLabel: StoryObj<SwitchProps> = {
  ...Default,
  args: {
    ...Default.args,
    label: 'Option',
    tooltip: null
  },
}

export const SwitchWithError: StoryObj<SwitchProps> = {
  ...Default,
  args: {
    ...Default.args,
    label: 'Option',
    errorText: 'Error',
    tooltip: null
  },

}

export const SwitchWithDescription: StoryObj<SwitchProps> = {
  ...SwitchWithLabel,
  args: {
    ...SwitchWithLabel.args,
    description: 'Description',
  },
};


export const SwitchWithBottomMargin: StoryObj<SwitchProps> = {
  ...SwitchWithDescription,
  args: {
    ...SwitchWithDescription.args,
    withFormElementMargin: true
  },
};