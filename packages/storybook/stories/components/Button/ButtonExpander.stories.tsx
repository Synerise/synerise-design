import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { useArgs } from 'storybook/preview-api';

import Button from '@synerise/ds-button';
import type { ExpanderProps } from '@synerise/ds-button';
import { BOOLEAN_CONTROL, controlFromOptionsArray } from '../../utils';

const meta: Meta<ExpanderProps> = {
  title: 'Components/Button/Expander',
  tags: ['autodocs'],
  component: Button.Expander,
  argTypes: {
    disabled: BOOLEAN_CONTROL,
    expanded: BOOLEAN_CONTROL,
    size: {
      ...controlFromOptionsArray('inline-radio', ['S', 'M'])
    }
  },
};

export default meta;

export const Expander: StoryObj<typeof Button.Expander> = {
  render: (args) => {
    const [{ expanded }, updateArgs] = useArgs();

    function onClick() {
      updateArgs({ expanded: !expanded });
    }

    return (
      <Button.Expander {...args} onClick={onClick} />
    )
  },
  parameters: {
    controls: {
      include: ['expanded', 'disabled', 'size']
    }
  },
  args: {
    expanded: false
  },
}
