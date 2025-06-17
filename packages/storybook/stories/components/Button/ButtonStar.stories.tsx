import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import Button from '@synerise/ds-button';
import type { StarButtonProps } from '@synerise/ds-button';
import { useArgs } from 'storybook/preview-api';
import { BOOLEAN_CONTROL, CLASSNAME_ARG_CONTROL, buttonDecorator } from '../../utils';

const meta: Meta<StarButtonProps> = {
  title: 'Components/Button/WithStar',
  tags: ['autodocs'],
  decorators: [buttonDecorator],
  render: (args) => {

    const [{ active }, updateArgs] = useArgs();

    function onClick() {
      args.onClick && args.onClick();
      updateArgs({ active: !active });
    }

    return (
      <Button.Star
        {...args}
        active={active}
        onClick={onClick}
      />
    )
  },
  component: Button.Star,
  argTypes: {
    active: BOOLEAN_CONTROL,
    hasError: BOOLEAN_CONTROL,
    className: CLASSNAME_ARG_CONTROL
  },
};

export default meta;

export const Star: StoryObj<StarButtonProps> = {}
