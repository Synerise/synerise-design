import { expect, fn, userEvent, waitFor, within } from 'storybook/test';

import type { Meta, StoryObj } from '@storybook/react-vite';
import Autocomplete from '@synerise/ds-autocomplete';
import type { AutocompleteProps } from '@synerise/ds-autocomplete';

import { fixedWrapper200, fixedWrapper400 } from '../../utils';
import { default as DefaultMeta, Primary } from './Autocomplete.stories';

const meta: Meta<AutocompleteProps> = {
  ...DefaultMeta,
  title: 'Components/InputElements/Tests',
  component: Autocomplete,
  tags: ['visualtests'],
};

export default meta;

const LONG_VALUE =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vehicula.';
const SHORT_VALUE = 'Test';

const runAutocompleteTest = async (canvasElement, value) => {
  const canvas = within(canvasElement);
  const input = canvas.getByRole('combobox');
  const inputWrapper = canvas.getByTestId('autocomplete-autosize-input');
  await userEvent.click(input);
  await userEvent.type(input, value);
  return {
    input,
    inputWrapper,
  };
};

const eventArgs = {
  onKeyUp: fn(),
  onKeyDown: fn(),
  onInputKeyDown: fn(),
  onDropdownVisibleChange: fn(),
  onBlur: fn(),
  onFocus: fn(),
  onChange: fn(),
  onClick: fn(),
  onSearch: fn(),
  onMouseEnter: fn(),
};

export const AutoResizeMinAndMax = {
  ...Primary,
  decorators: [fixedWrapper400],
  args: {
    ...eventArgs,
    autoResize: {
      minWidth: '150px',
      maxWidth: '300px',
    },
  },
  play: async ({ canvasElement }) => {
    const { inputWrapper } = await runAutocompleteTest(
      canvasElement,
      LONG_VALUE,
    );
    // Long value clamps at the max width (300) — it far exceeds the min, so assert it
    // reached the upper clamp and does not exceed it. The exact sub-pixel is guarded by
    // the Chromatic snapshot.
    expect(inputWrapper.clientWidth).toBeGreaterThan(250);
    expect(inputWrapper.clientWidth).toBeLessThanOrEqual(300);
  },
};

export const AutoResizeWithinParent = {
  ...Primary,
  args: {
    ...eventArgs,
    autoResize: {
      minWidth: '150px',
      stretchToFit: true,
    },
  },
  decorators: [fixedWrapper200],
  play: async ({ canvasElement }) => {
    const { inputWrapper } = await runAutocompleteTest(
      canvasElement,
      LONG_VALUE,
    );
    // stretchToFit grows the input to fill its 200px parent; assert it stretched past
    // the min and is clamped to the parent (no meaningful overflow). The exact
    // sub-pixel is guarded by the Chromatic snapshot.
    expect(inputWrapper.clientWidth).toBeGreaterThan(150);
    expect(inputWrapper.clientWidth).toBeLessThanOrEqual(202);
  },
};

export const AutoResizeMinWidth = {
  ...Primary,
  args: {
    ...eventArgs,
    autoResize: {
      minWidth: '150px',
    },
  },
  decorators: [fixedWrapper200],
  play: async ({ canvasElement }) => {
    const { inputWrapper } = await runAutocompleteTest(
      canvasElement,
      SHORT_VALUE,
    );
    // Short value falls back to the min width; assert the lower bound holds
    // (the Chromatic snapshot guards the exact pixels).
    expect(inputWrapper.clientWidth).toBeGreaterThanOrEqual(140);
    expect(inputWrapper.clientWidth).toBeLessThan(200);
  },
};

const TOOLTIP = 'Tooltip text';
export const AutocompleteWithTooltip: StoryObj<AutocompleteProps> = {
  args: {
    label: 'Select option',
    description: 'Description',
    placeholder: 'Placeholder',
    tooltip: TOOLTIP,
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement.parentElement!);
    await userEvent.hover(canvas.getByTestId('label-tooltip-trigger'));
    await waitFor(() => expect(canvas.getByText(TOOLTIP)).toBeVisible());
  },
};

// --- Interactive behaviour tests (Interactions addon runs the play fns) ---

// Typing opens the dropdown and renders the matching options.
export const OpensAndFiltersOnType: StoryObj<AutocompleteProps> = {
  ...Primary,
  args: { ...eventArgs },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('combobox');
    await userEvent.click(input);
    await userEvent.type(input, 'pos');
    await waitFor(() =>
      expect(
        canvas.getAllByTestId('autocomplete-option').length,
      ).toBeGreaterThan(0),
    );
    await waitFor(() =>
      expect(args.onDropdownVisibleChange).toHaveBeenCalledWith(true),
    );
  },
};

// Clicking an option fires onSelect/onChange with its value and closes the panel.
// (Option labels are highlight-split into multiple nodes, so match by testid.)
export const SelectsOption: StoryObj<AutocompleteProps> = {
  ...Primary,
  args: { ...eventArgs },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('combobox');
    await userEvent.click(input);
    await userEvent.type(input, 'First');
    const options = await canvas.findAllByTestId('autocomplete-option');
    await userEvent.click(options[0]);
    await waitFor(() =>
      expect(args.onSelect).toHaveBeenCalledWith('First position'),
    );
    await waitFor(() =>
      expect(canvas.queryByTestId('autocomplete-option')).toBeNull(),
    );
  },
};

// Keyboard: ArrowDown moves the highlight into the list (ds-dropdown floating-ui
// navigation focuses the ListItem), Enter selects the highlighted option and closes
// the panel — the accessible-keyboard-selection path.
export const SelectsWithKeyboard: StoryObj<AutocompleteProps> = {
  ...Primary,
  args: { ...eventArgs },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('combobox');
    await userEvent.click(input);
    await userEvent.type(input, 'First');
    await canvas.findAllByTestId('autocomplete-option');
    await userEvent.keyboard('{ArrowDown}{Enter}');
    await waitFor(() =>
      expect(args.onSelect).toHaveBeenCalledWith('First position'),
    );
    await waitFor(() =>
      expect(canvas.queryByTestId('autocomplete-option')).toBeNull(),
    );
  },
};

// Regression: clicking the input while the panel is already open must NOT toggle
// it shut. Previously ds-dropdown's trigger-click toggled the (focus-/type-)opened
// panel closed, which produced the open→close flicker on (re)click.
export const ClickingOpenInputKeepsItOpen: StoryObj<AutocompleteProps> = {
  ...Primary,
  args: { ...eventArgs },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('combobox');
    await userEvent.click(input);
    await userEvent.type(input, 'pos');
    await waitFor(() =>
      expect(
        canvas.getAllByTestId('autocomplete-option').length,
      ).toBeGreaterThan(0),
    );
    // Click the already-open input — it must stay open (old code toggled shut).
    await userEvent.click(input);
    await waitFor(() =>
      expect(
        canvas.getAllByTestId('autocomplete-option').length,
      ).toBeGreaterThan(0),
    );
    // Give any stray toggle a chance to land, then re-assert it is still open.
    await userEvent.click(input);
    expect(canvas.getAllByTestId('autocomplete-option').length).toBeGreaterThan(
      0,
    );
  },
};
