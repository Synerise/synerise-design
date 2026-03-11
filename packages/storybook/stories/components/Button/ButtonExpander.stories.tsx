import React from 'react';
import { useArgs } from 'storybook/preview-api';

import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Expander as ExpanderButton } from '@synerise/ds-button';
import type { ExpanderProps } from '@synerise/ds-button';

import { BOOLEAN_CONTROL, controlFromOptionsArray } from '../../utils';

const meta: Meta<ExpanderProps> = {
  title: 'Components/Button/Expander',
  tags: ['autodocs'],
  component: ExpanderButton,
  argTypes: {
    disabled: BOOLEAN_CONTROL,
    expanded: BOOLEAN_CONTROL,
    size: {
      ...controlFromOptionsArray('inline-radio', ['S', 'M']),
    },
  },
};

export default meta;

export const Expander: StoryObj<ExpanderProps> = {
  render: (args) => {
    const [{ expanded }, updateArgs] = useArgs();

    function onClick() {
      updateArgs({ expanded: !expanded });
    }

    return <ExpanderButton {...args} onClick={onClick} />;
  },
  parameters: {
    docs: {
      source: {
        code: `<Expander onClick={() => {}} />`,
      },
    },
    controls: {
      include: ['expanded', 'disabled', 'size'],
    },
  },
  args: {
    expanded: false,
  },
};
