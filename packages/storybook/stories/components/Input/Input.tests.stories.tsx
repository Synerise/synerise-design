import { Meta, StoryObj } from '@storybook/react-webpack5';

import type { InputProps } from '@synerise/ds-input';
import { fixedWrapper200 } from '../../utils';

import InputMeta from './Input.stories';

export default {
  ...InputMeta,
  title: 'Components/InputElements/Tests',
  tags: ['visualtests'],
} as Meta<InputProps>;

type Story = StoryObj<InputProps>;
const PLACEHOLDER_TEXT = 'input';

export const AutoresizeWithinParent: Story = {
  decorators: [fixedWrapper200],
  args: {
    value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    autoResize: {
      minWidth: '100px',
      stretchToFit: true,
    },
    placeholder: PLACEHOLDER_TEXT,
  },
};

export const AutoresizeWithinParentEmpty: Story = {
  decorators: [fixedWrapper200],
  args: {
    value: '',
    autoResize: {
      minWidth: '100px',
      stretchToFit: true,
    },
    placeholder: PLACEHOLDER_TEXT,
  },
};
