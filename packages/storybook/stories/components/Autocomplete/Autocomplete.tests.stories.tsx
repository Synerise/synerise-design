
import type { Meta } from '@storybook/react';
import Autocomplete from '@synerise/ds-autocomplete';
import type { AutocompleteProps } from '@synerise/ds-autocomplete';

import { within, userEvent, expect, fn } from '@storybook/test';

import { default as DefaultMeta, Primary } from './Autocomplete.stories';
import { fixedWrapper400, fixedWrapper200 } from '../../utils';

const excludedProps = ['animation'];
const excludeRegexp = new RegExp(`(${excludedProps.join('|')})`, 'g');
const meta: Meta<AutocompleteProps> = {
  ...DefaultMeta,
  title: "Components/InputElements/Tests",
  component: Autocomplete,
  parameters: {
    controls: {
      exclude: excludeRegexp
    }
  },
  tags: ['visualtests'],
  argTypes: {
    allowClear: {
      control: 'boolean'
    },
    autoClearSearchValue: {
      control: 'boolean'
    },
    autoResize: {
      control: 'select',
      options: ['false', 'min & max width', 'stretch to fit'],
      mapping: {
        'false': false,
        'min & max width': { minWidth: '150px', maxWidth:'300px' },
        'stretch to fit': { minWidth: '150px', stretchToFit: true }
      }
    }
  }
};

export default meta;

const LONG_VALUE = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vehicula.';
const SHORT_VALUE = 'Test';

const runAutocompleteTest = async (canvasElement, value) => {
  const canvas = within(canvasElement);
  const input = canvas.getByRole('combobox');
  const inputWrapper = canvas.getByTestId('autocomplete-autosize-input');
  await userEvent.click(input);
  await userEvent.type(input, value);
  return {
    input, inputWrapper
  }
}

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
}

export const AutoResizeMinAndMax = {
  ...Primary,
  decorators: [fixedWrapper400],
  args: {
    ...eventArgs,
    autoResize: {
      minWidth: '150px',
      maxWidth: '300px'
    }
  },
  play: async ({ canvasElement }) => {
    const { inputWrapper } = await runAutocompleteTest(canvasElement, LONG_VALUE);
    expect(inputWrapper.clientWidth).toBe(300);
  }
};

export const AutoResizeWithinParent = {
  ...Primary,
  args: {
    ...eventArgs,
    autoResize: {
      minWidth: '150px',
      stretchToFit: true
    }
  },
  decorators: [fixedWrapper200],
  play: async ({ canvasElement }) => {
    const { inputWrapper } = await runAutocompleteTest(canvasElement, LONG_VALUE);
    // TODO - fix the component! should be 200 ....
    expect(inputWrapper.clientWidth).toBe(201);
  }
};

export const AutoResizeMinWidth = {
  ...Primary,
  args: {
    ...eventArgs,
    autoResize: {
      minWidth: '150px'
    }
  },
  decorators: [fixedWrapper200],
  play: async ({ canvasElement }) => {
    const { inputWrapper } = await runAutocompleteTest(canvasElement, SHORT_VALUE);
    expect(inputWrapper.clientWidth).toBe(150);
  }
};
