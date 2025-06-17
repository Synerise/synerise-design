import { Meta, StoryObj } from '@storybook/react-webpack5';

import { within, userEvent, fn, expect, waitFor } from 'storybook/test';
import { ALL_FACTOR_TYPES } from '@synerise/ds-factors';
import type { FactorsProps } from '@synerise/ds-factors';

import FactorsMeta, { AllTypes, Default, RelativeDate } from './Factors.stories';
import { centeredPaddedWrapper, sleep } from '../../utils';

export default {
  ...FactorsMeta,
  title: 'Components/Filter/Factors/Tests',
  tags: ['visualtests'],
  decorators: [centeredPaddedWrapper],
  parameters: {
    layout: 'centered',
  },
} as Meta<typeof FactorsMeta>;

export const SwitchFactorType: StoryObj<FactorsProps> = {
  ...Default,
  args: {
    ...Default.args,
    setSelectedFactorType: fn(),
    selectedFactorType: 'text',
    textType: 'default',
  },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step('open factor type dropdown', async () => {
      const typeDropdownTrigger = canvas.getByRole('button');
      await userEvent.click(typeDropdownTrigger);

      return await waitFor(() => expect(canvas.getAllByRole('menuitem')).toHaveLength(ALL_FACTOR_TYPES.length));
    });
    await step('select new factor type', async () => {
      await waitFor(() => expect(canvas.getByText('Context parameter')).not.toHaveStyle({ pointerEvents: 'none' }));
      return await userEvent.click(canvas.getByText('Context parameter'));
    });
    expect(args.setSelectedFactorType).toHaveBeenCalledOnce();
  },
};

export const FactorTypeDropdownOpen: StoryObj<FactorsProps> = {
  ...SwitchFactorType,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const typeDropdownTrigger = canvas.getByRole('button');
    await userEvent.click(typeDropdownTrigger);
    await waitFor(() => expect(canvas.getAllByRole('menuitem')).toHaveLength(ALL_FACTOR_TYPES.length));
  },
};

export const SelectParameterFactorValue: StoryObj<FactorsProps> = {
  ...SwitchFactorType,
  args: {
    ...SwitchFactorType.args,
    selectedFactorType: 'parameter',
  },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step('open parameter dropdown', async () => {
      const parameterDropdownTrigger = canvas.getByText('Parameter');
      await sleep(1000);
      await userEvent.click(parameterDropdownTrigger);

      return await waitFor(() => expect(canvas.getByPlaceholderText('Search')).toBeInTheDocument());
    });
    await step('select new factor type', async () => {
      await waitFor(() => expect(canvas.getByText('Points')).not.toHaveStyle({ pointerEvents: 'none' }));
      await sleep(500);
      return await userEvent.click(canvas.getByText('Points'));
    });
    await sleep(500);
    await waitFor(() => expect(args.onChangeValue).toHaveBeenCalledOnce());
  },
};

const NOW = 'now';
export const RelativeDateOpen: StoryObj<FactorsProps> = {
  ...RelativeDate,
  args: {
    ...RelativeDate.args,
    texts: {
      relativeDate: {
        currentDatetime: NOW
      }
    }
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement.parentElement!);
    await step('open relative date dropdown', async () => {
      const dropdownTrigger = canvas.getByTestId('ds-factors-relative-date-trigger');
      await userEvent.click(dropdownTrigger);
      return await waitFor(() => expect(canvas.getByTestId('ds-factors-relative-date-dropdown')).toBeInTheDocument());
    });
    console.log(canvas.getByTestId('ds-factors-relative-date-dropdown'))
    await waitFor(() => expect(within(canvas.getByTestId('ds-factors-relative-date-dropdown')).getByText(NOW)).not.toHaveStyle({ pointerEvents: 'none' }));
  },
};

export const RelativeDateValueChange: StoryObj<FactorsProps> = {
  ...RelativeDate,
  args: {
    ...RelativeDate.args,
    onActivate: fn(),
    onDeactivate: fn(),
    onChangeValue: fn(),
    texts: {
      relativeDate: {
        currentDatetime: NOW
      }
    }
  },
  play: async ({ canvasElement, args, step }) => {
    const canvas = within(canvasElement.parentElement!);
    await step('open relative date dropdown', async () => {
      const dropdownTrigger = canvas.getByTestId('ds-factors-relative-date-trigger');
      await userEvent.click(dropdownTrigger);
      await waitFor(() => expect(canvas.getByTestId('ds-factors-relative-date-dropdown')).toBeInTheDocument());
      await waitFor(() => expect(args.onActivate).toHaveBeenCalled())
    });
    const dropdownWrapper = within(canvas.getByTestId('ds-factors-relative-date-dropdown'))
    await step('update relative date value', async () => {

      await userEvent.click(dropdownWrapper.getByText('Hours'));
      const weeksOption = await canvas.findByText('Weeks')
      await userEvent.click(weeksOption)
      await sleep(100)
      await userEvent.type(dropdownWrapper.getByTestId('ds-factors-relative-date-modifier'), '{backspace}7');
      await sleep(100)
      await userEvent.click(dropdownWrapper.getByText('Before'));
      const afterOption = await canvas.findByText('After')
      await userEvent.click(afterOption)
    })

    await userEvent.click(canvas.getByText('Apply'));
    await waitFor(() => {
      expect(args.onChangeValue).toHaveBeenCalledWith({
        temporalModifier: 17,
        temporalUnit: 'WEEKS'
      })
      expect(args.onDeactivate).toHaveBeenCalled()
    })
  },
};


export const ParameterDropdownOpen: StoryObj<FactorsProps> = {
  ...SwitchFactorType,
  args: {
    ...SwitchFactorType.args,
    selectedFactorType: 'parameter',
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step('open parameter dropdown', async () => {
      const parameterDropdownTrigger = canvas.getByText('Parameter');
      await userEvent.click(parameterDropdownTrigger);
      return await waitFor(() => expect(canvas.getByPlaceholderText('Search')).toBeInTheDocument());
    });
    await waitFor(() => expect(canvas.getByText('Points')).not.toHaveStyle({ pointerEvents: 'none' }));
  },
};

export const FormulaEditorOpen: StoryObj<FactorsProps> = {
  ...SwitchFactorType,
  args: {
    ...SwitchFactorType.args,
    selectedFactorType: 'formula',
    formulaEditor: 'TEST EDITOR',
  },
  play: async ({ canvasElement, step, args }) => {
    const canvas = within(canvasElement.parentElement!);

    await step('open formula modal', async () => {
      const trigger = within(canvas.getByTestId('ds-factors-formula'));
      await userEvent.click(trigger.getByRole('button'));
      await waitFor(() => expect(canvas.getByRole('dialog')).toBeInTheDocument());
    });
    expect(canvas.getByText(args.formulaEditor as string)).toBeInTheDocument();
  },
};

export const ArrayEditorOpen: StoryObj<FactorsProps> = {
  ...SwitchFactorType,
  args: {
    ...SwitchFactorType.args,
    selectedFactorType: 'array',
    value: 'TEST VALUE',
  },
  play: async ({ canvasElement, step, args }) => {
    const canvas = within(canvasElement.parentElement!);

    await step('open array modal', async () => {
      const trigger = within(canvas.getByTestId('ds-factors-array-default'));
      await userEvent.click(trigger.getByTestId('ds-factors-expansible-icon'));
      await waitFor(() => expect(canvas.getByRole('dialog')).toBeInTheDocument());
    });
    expect(canvas.getByText(args.value as string)).toBeInTheDocument();
  },
};

export const DateRangePickerOpen: StoryObj<FactorsProps> = {
  ...SwitchFactorType,
  args: {
    ...SwitchFactorType.args,
    selectedFactorType: 'dateRange',
  },
  parameters: {
    date: new Date("March 10, 2021 10:00:00"),
    layout: 'centered',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement.parentElement!);
    await userEvent.click(await canvas.findByText('Start date'));
    await waitFor(() => expect(canvas.getByRole('tooltip')).toBeInTheDocument());
  },
};

export const AllTypesError: StoryObj<FactorsProps> = {
  ...AllTypes,
  args: {
    error: true
  }
}

export const AllTypesReadOnly: StoryObj<FactorsProps> = {
  ...AllTypes,
  args: {
    readOnly: true
  }
}
