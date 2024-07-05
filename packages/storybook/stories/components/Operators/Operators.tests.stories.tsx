import { Meta, StoryObj } from '@storybook/react';

import { within, userEvent, fn, expect, waitFor } from '@storybook/test';
import type { OperatorsProps } from '@synerise/ds-operators';

import OperatorsMeta from './Operators.stories';
import { OPERATORS_TEXTS, OPERATORS_ITEMS } from './data/index.data';

export default {
  ...OperatorsMeta,
  title: 'Components/Filter/Operators/Tests',
  tags: ['visualtests'],
  parameters: {
    chromatic: { diffThreshold: 0.15 }
  }
} as Meta<OperatorsProps>;

type Story = StoryObj<OperatorsProps>;

export const Opened: Story = {
  args: {
    opened: true,
  },
  play: async ({ canvasElement }) => {
    // wait to capture screenshot after dropdown renders open
    const canvas = within(canvasElement);
    await waitFor(() => canvas.findByPlaceholderText(OPERATORS_TEXTS.searchPlaceholder));
  },
};


export const SwitchTabs: Story = {
  
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByText(args.texts?.buttonLabel || OPERATORS_TEXTS.buttonLabel));
    expect(args.onActivate).toHaveBeenCalled();

    await canvas.findByPlaceholderText(args.texts?.searchPlaceholder || OPERATORS_TEXTS.searchPlaceholder);

    await step('Switch tab', async () => {
      const tabs = within(canvas.getByTestId('tabs-container'));
      await userEvent.click(tabs.getAllByRole('button')[1]);
    })
  },
};



export const SelectOperator: Story = {
  args: {
    onChange: fn()
  },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByText(args.texts?.buttonLabel || OPERATORS_TEXTS.buttonLabel));

    await canvas.findByPlaceholderText(args.texts?.searchPlaceholder || OPERATORS_TEXTS.searchPlaceholder);

    expect(args.onActivate).toHaveBeenCalled();
    await step('Switch tab', async () => {
      const tabs = within(canvas.getByTestId('tabs-container'));
      await userEvent.click(tabs.getAllByRole('button')[2]);
    })
    
    await step('Select operator', async () => {
      await waitFor(() => expect(canvas.getAllByRole('menuitem')[3]).not.toHaveStyle({ pointerEvents: 'none' }));
      await userEvent.click(canvas.getAllByRole('menuitem')[3]);
    })
    expect(args.onChange).toHaveBeenCalledWith(OPERATORS_ITEMS[3]);
  },
};


export const SearchForOperator: Story = {
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByText(args.texts?.buttonLabel || OPERATORS_TEXTS.buttonLabel));

    await canvas.findByPlaceholderText(args.texts?.searchPlaceholder || OPERATORS_TEXTS.searchPlaceholder);
    expect(args.onActivate).toHaveBeenCalled();
    
    const searchInput = canvas.getByPlaceholderText(args.texts?.searchPlaceholder || OPERATORS_TEXTS.searchPlaceholder);
    await waitFor(() => {
      expect(searchInput).not.toHaveStyle({ pointerEvents: 'none' });
    });
    userEvent.type(searchInput, 'Conta');
    
  }
};
