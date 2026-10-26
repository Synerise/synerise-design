import { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { useArgs } from 'storybook/preview-api';
import { within } from 'storybook/test';

import TimePicker, { TimePickerProps } from '@synerise/ds-time-picker';

import {
  BOOLEAN_CONTROL,
  CLASSNAME_ARG_CONTROL,
  centeredPaddedWrapper,
  fixedWrapper300,
  REACT_NODE_AS_STRING,
  reactNodeAsSelect,
  STRING_CONTROL,
} from '../../utils';

type Story = StoryObj<TimePickerProps>;

export default {
  component: TimePicker,
  title: 'Components/Pickers/TimePicker',
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [fixedWrapper300, centeredPaddedWrapper],
  render: (args) => {
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
      ...reactNodeAsSelect('select', [
        'topLeft',
        'topCenter',
        'topRight',
        'bottomLeft',
        'bottomCenter',
        'bottomRight',
      ]),
    },
    trigger: reactNodeAsSelect('inline-radio', ['click', 'hover']),
    use12HourClock: BOOLEAN_CONTROL,
    valueFormatOptions: { control: false }, // DateToFormatOptions;

    errorText: REACT_NODE_AS_STRING,
    timeZone: {
      description:
        'Enables timezone-aware mode. `true` uses the provider timezone; a string (e.g. `"Asia/Tokyo"`) uses a specific IANA timezone. Only available when `ValueType = string`.',
      control: { type: 'text' },
    },
  },
  args: {},
} as Meta<TimePickerProps>;

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: `<TimePicker onChange={handleChange} />`,
      },
    },
  },
};

export const WithProviderTimezone: StoryObj<TimePickerProps<string>> = {
  argTypes: {
    timeZone: BOOLEAN_CONTROL,
  },
  args: {
    timeZone: true,
  },
  parameters: {
    docs: {
      source: {
        code: `<TimePicker onChange={handleChange} timeZone />`,
      },
    },
  },
};

export const WithProviderTimezonePopulated: StoryObj<TimePickerProps<string>> =
  {
    argTypes: {
      value: STRING_CONTROL,
      timeZone: BOOLEAN_CONTROL,
    },
    args: {
      timeZone: true,
      value: '2024-02-02T14:20:00Z',
    },
    parameters: {
      docs: {
        source: {
          code: `<TimePicker
  value="2024-02-02T14:20:00Z"
  onChange={handleChange}
  timeZone
/>`,
        },
      },
    },
  };

export const WithSpecificTimezone: StoryObj<TimePickerProps<string>> = {
  argTypes: {
    value: STRING_CONTROL,
    timeZone: STRING_CONTROL,
  },
  args: {
    timeZone: 'Asia/Tokyo',
  },
  parameters: {
    docs: {
      source: {
        code: `<TimePicker onChange={handleChange} timeZone="Asia/Tokyo" />`,
      },
    },
  },
};

export const Raw: Story = {
  args: {
    raw: true,
  },
  parameters: {
    docs: {
      source: {
        code: `<TimePicker onChange={handleChange} raw />`,
      },
    },
  },
};

export const OpenAlways: Story = {
  args: {
    alwaysOpen: true,
  },
  parameters: {
    docs: {
      source: {
        code: `<TimePicker onChange={handleChange} alwaysOpen />`,
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement.parentElement!);
    await canvas.findByTestId('tp-overlay-container');
  },
};
export const OpenByDefault: Story = {
  args: {
    defaultOpen: true,
  },
  parameters: {
    docs: {
      source: {
        code: `<TimePicker onChange={handleChange} defaultOpen />`,
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement.parentElement!);
    await canvas.findByTestId('tp-overlay-container');
  },
};
