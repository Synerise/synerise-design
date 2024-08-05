import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';

import TimePicker, { TimePickerProps } from '@synerise/ds-time-picker';

import {
  BOOLEAN_CONTROL,
  centeredPaddedWrapper,
  CLASSNAME_ARG_CONTROL,
  fixedWrapper300,
  reactNodeAsSelect,
  REACT_NODE_AS_STRING,
  STRING_CONTROL,
} from '../../utils';

type Story = StoryObj<TimePickerProps>;

export default {
  component: TimePicker,
  title: 'Components/Pickers/TimePicker',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [fixedWrapper300, centeredPaddedWrapper],
  render: args => {
    const [{ value }, updateArgs] = useArgs();
    const handleChange = (newValue: Date | undefined, timestring: string) => {
      updateArgs({ value: newValue });
      args.onChange?.(newValue, timestring);
    };
    return <TimePicker {...args} value={value} onChange={handleChange} />;
  },
  argTypes: {
    alwaysOpen: BOOLEAN_CONTROL,
    className: CLASSNAME_ARG_CONTROL,
    clearTooltip: REACT_NODE_AS_STRING,
    containerStyle: {
      control: false,
    },
    defaultOpen: BOOLEAN_CONTROL,
    disabled: BOOLEAN_CONTROL,
    dropdownProps: { control: false },
    inputProps: { control: false },
    onChange: {
      action: 'onChange',
    },
    onClockModeChange: {
      action: 'onClockModeChange',
    },
    overlayClassName: STRING_CONTROL,
    placeholder: STRING_CONTROL,
    raw: BOOLEAN_CONTROL,
    placement: {
      ...reactNodeAsSelect('select', ['topLeft', 'topCenter', 'topRight', 'bottomLeft', 'bottomCenter', 'bottomRight']),
    },
    trigger: reactNodeAsSelect('inline-radio', ['click', 'hover', 'contextMenu']),
    use12HourClock: BOOLEAN_CONTROL,
      valueFormatOptions: { control: false }, // DateToFormatOptions;
    
      errorText: REACT_NODE_AS_STRING
  },
  args: {},
} as Meta<TimePickerProps>;

export const Default: Story = {};

export const WithProviderTimezone: StoryObj<TimePickerProps<string>> = {
  argTypes: {
    includeTimezoneOffset: BOOLEAN_CONTROL,
  },
  args: {
    includeTimezoneOffset: true,
  },
};

export const WithProviderTimezonePopulated: StoryObj<TimePickerProps<string>> = {
  argTypes: {
    value: STRING_CONTROL,
    includeTimezoneOffset: BOOLEAN_CONTROL,
  },
  args: {
    includeTimezoneOffset: true,
    value: '2024-02-02T14:20:00Z',
  },
};

export const WithSpecificTimezone: StoryObj<TimePickerProps<string>> = {
  argTypes: {
    value: STRING_CONTROL,
    includeTimezoneOffset: STRING_CONTROL,
  },
  args: {
    includeTimezoneOffset: 'Asia/Tokyo',
  },
};

export const Raw: Story = {
  args: {
    raw: true,
  },
};

export const OpenByDefault: Story = {
  args: {
    alwaysOpen: true,
  },
};
