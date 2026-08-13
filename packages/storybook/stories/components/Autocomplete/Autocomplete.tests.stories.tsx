import React from 'react';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';

import type { Meta, StoryObj } from '@storybook/react-vite';
import Autocomplete from '@synerise/ds-autocomplete';
import type { AutocompleteProps } from '@synerise/ds-autocomplete';

import { fixedWrapper200, fixedWrapper400 } from '../../utils';
import {
  AutocompleteWithAsyncState,
  AutocompleteWithRichOptions,
} from './Autocomplete.data';
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

// Regression: with a server-side search, every keystroke empties the option list until
// the response lands. That empty window closed the panel and — because ds-dropdown echoes
// the controlled `open` back through onOpenChange — also latched Autocomplete's own open
// state shut, so the arriving suggestions could never reopen it. Each keystroke here must
// end with the panel open again.
export const AsyncSuggestions: StoryObj<AutocompleteProps> = {
  ...Primary,
  render: (args) => <AutocompleteWithAsyncState {...args} />,
  args: { ...eventArgs },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('combobox');
    await userEvent.click(input);

    // Type one character at a time; the panel must come back after every one, not just
    // the first — the production failure only appeared from the second keystroke on.
    for (const character of ['p', 'o', 's']) {
      await userEvent.type(input, character);
      await waitFor(() =>
        expect(
          canvas.getAllByTestId('autocomplete-option').length,
        ).toBeGreaterThan(0),
      );
    }
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

// Escape must still dismiss the panel. Autocomplete filters out the open-state change
// ds-dropdown echoes back at it, and that filter must not swallow a real dismissal.
// Only assertable here: jsdom does not deliver floating-ui's escape handling, so the
// unit spec covers the outside-press path instead.
export const EscapeDismissesThePanel: StoryObj<AutocompleteProps> = {
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
    await userEvent.keyboard('{Escape}');
    await waitFor(() =>
      expect(canvas.queryAllByTestId('autocomplete-option')).toHaveLength(0),
    );
  },
};

// A bounding rect is not shrunk by an ancestor's overflow, so clipping only shows up as
// an ancestor whose content overflows the box it renders in.
const clippingAncestorOf = (node: HTMLElement): HTMLElement | null => {
  let current = node.parentElement;
  while (current) {
    if (current.scrollHeight > current.clientHeight + 1) {
      return current;
    }
    if (current.classList.contains('ds-autocomplete-dropdown')) {
      break;
    }
    current = current.parentElement;
  }
  return null;
};

// Regression: the overlay capped its height at an assumed 32px per row, so options with a
// taller custom label were clipped — a single match rendered as a sliced row. The cap now
// comes from measured rows, so a lone tall option must not be clipped by anything.
export const RichOptionsAreNotClipped: StoryObj<AutocompleteProps> = {
  ...Primary,
  render: (args) => <AutocompleteWithRichOptions {...args} />,
  args: { ...eventArgs },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('combobox');
    await userEvent.click(input);
    await userEvent.type(input, 'Sixteenth');

    const [only] = await canvas.findAllByTestId('autocomplete-option');
    // Guard the premise: this label really is taller than the old fixed row height.
    await waitFor(() =>
      expect(only.getBoundingClientRect().height).toBeGreaterThan(32),
    );
    await waitFor(() => expect(clippingAncestorOf(only)).toBeNull());
  },
};
