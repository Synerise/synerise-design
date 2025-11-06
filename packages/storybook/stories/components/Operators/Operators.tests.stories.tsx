import { expect, fn, userEvent, waitFor, within } from 'storybook/test';

import { Meta, StoryObj } from '@storybook/react-webpack5';
import type { OperatorsProps } from '@synerise/ds-operators';

import OperatorsMeta from './Operators.stories';
import { OPERATORS_ITEMS, OPERATORS_TEXTS } from './data/index.data';

export default {
  ...OperatorsMeta,
  title: 'Components/Filter/Operators/Tests',
  tags: ['visualtests'],
  parameters: {
    chromatic: { diffThreshold: 0.15 },
  },
} as Meta<OperatorsProps>;

type Story = StoryObj<OperatorsProps>;

export const Opened: Story = {
  args: {
    opened: true,
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    expect(
      await canvas.findByPlaceholderText(
        args.texts?.searchPlaceholder || OPERATORS_TEXTS.searchPlaceholder,
      ),
    ).toBeInTheDocument();
  },
};

export const SwitchTabs: Story = {
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);

    await userEvent.click(
      canvas.getByText(args.texts?.buttonLabel || OPERATORS_TEXTS.buttonLabel),
    );
    expect(args.onActivate).toHaveBeenCalled();

    expect(
      await canvas.findByPlaceholderText(
        args.texts?.searchPlaceholder || OPERATORS_TEXTS.searchPlaceholder,
      ),
    ).toBeInTheDocument();

    await step('Switch tab', async () => {
      const tabs = within(canvas.getByTestId('tabs-container'));
      await waitFor(async () =>
        expect(await tabs.findAllByRole('button')).toHaveLength(5),
      );
      await userEvent.click(tabs.getAllByRole('button')[1], {
        pointerEventsCheck: 0,
      });
    });
  },
};

export const SelectOperator: Story = {
  args: {
    onChange: fn(),
  },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);

    await userEvent.click(
      canvas.getByText(args.texts?.buttonLabel || OPERATORS_TEXTS.buttonLabel),
    );

    expect(
      await canvas.findByPlaceholderText(
        args.texts?.searchPlaceholder || OPERATORS_TEXTS.searchPlaceholder,
      ),
    ).toBeInTheDocument();

    expect(args.onActivate).toHaveBeenCalled();

    await step('Switch tab', async () => {
      const tabs = within(canvas.getByTestId('tabs-container'));
      await waitFor(async () =>
        expect(await tabs.findAllByRole('button')).toHaveLength(5),
      );
      await userEvent.click(tabs.getAllByRole('button')[1], {
        pointerEventsCheck: 0,
      });
    });

    await step('Select operator', async () => {
      await waitFor(() =>
        expect(canvas.getAllByRole('menuitem')[3]).not.toHaveStyle({
          pointerEvents: 'none',
        }),
      );
      await userEvent.click(canvas.getAllByRole('menuitem')[3]);
    });
    await waitFor(() =>
      expect(args.onChange).toHaveBeenCalledWith(OPERATORS_ITEMS[12]),
    );
  },
};

export const SearchForOperator: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(
      canvas.getByText(args.texts?.buttonLabel || OPERATORS_TEXTS.buttonLabel),
    );

    await canvas.findByPlaceholderText(
      args.texts?.searchPlaceholder || OPERATORS_TEXTS.searchPlaceholder,
    );
    expect(args.onActivate).toHaveBeenCalled();

    const searchInput = canvas.getByPlaceholderText(
      args.texts?.searchPlaceholder || OPERATORS_TEXTS.searchPlaceholder,
    );
    await waitFor(() => {
      expect(searchInput).not.toHaveStyle({ pointerEvents: 'none' });
    });
    userEvent.type(searchInput, 'Conta');
    await waitFor(() =>
      expect(canvas.getAllByRole('menuitem')).toHaveLength(4),
    );
  },
};

export const Deactivate: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(
      canvas.getByText(args.texts?.buttonLabel || OPERATORS_TEXTS.buttonLabel),
    );
    await waitFor(() => expect(args.onActivate).toHaveBeenCalled());
    await userEvent.click(document.body);
    await waitFor(() => expect(args.onDeactivate).toHaveBeenCalled());
  },
};
