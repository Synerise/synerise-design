import { expect, fn, userEvent, waitFor, within } from 'storybook/test';

import { Meta, StoryObj } from '@storybook/react-webpack5';
import { ALL_FACTOR_TYPES } from '@synerise/ds-factors';
import type { FactorsProps } from '@synerise/ds-factors';

import { centeredPaddedWrapper, fixedWrapper300, sleep } from '../../utils';
import {
  ARRAY_VALUE,
  ARRAY_VALUE_NUMERIC,
  COLLECTOR_ADD,
  COLLECTOR_PLACEHOLDER,
  COLLECTOR_VALIDATION_ERROR,
} from './Factors.data';
import FactorsMeta, {
  AllTypes,
  Default,
  RelativeDate,
} from './Factors.stories';

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

      return await waitFor(() =>
        expect(canvas.getAllByRole('menuitem')).toHaveLength(
          ALL_FACTOR_TYPES.length,
        ),
      );
    });
    await step('select new factor type', async () => {
      await waitFor(() =>
        expect(canvas.getByText('Context parameter')).not.toHaveStyle({
          pointerEvents: 'none',
        }),
      );
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
    await waitFor(() =>
      expect(canvas.getAllByRole('menuitem')).toHaveLength(
        ALL_FACTOR_TYPES.length,
      ),
    );
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

      return await waitFor(() =>
        expect(canvas.getByPlaceholderText('Search')).toBeInTheDocument(),
      );
    });
    await step('select new parameter', async () => {
      await waitFor(() =>
        expect(canvas.getByText('Points')).not.toHaveStyle({
          pointerEvents: 'none',
        }),
      );
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
        currentDatetime: NOW,
      },
    },
  },
  play: async ({ canvasElement, args, step }) => {
    const canvas = within(canvasElement.parentElement!);
    await step('open relative date dropdown', async () => {
      const dropdownTrigger = canvas.getByTestId(
        'popover-factors-relative-date-trigger',
      );
      await userEvent.click(dropdownTrigger);
      return await waitFor(() =>
        expect(
          canvas.getByTestId('popover-factors-relative-date-content'),
        ).toBeInTheDocument(),
      );
    });
    console.log(canvas.getByTestId('popover-factors-relative-date-content'));
    await waitFor(() =>
      expect(
        within(
          canvas.getByTestId('popover-factors-relative-date-content'),
        ).getByText(NOW),
      ).not.toHaveStyle({ pointerEvents: 'none' }),
    );

    await waitFor(() => expect(args.onActivate).toHaveBeenCalled());
    await sleep(200);
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
        currentDatetime: NOW,
      },
    },
  },
  play: async ({ canvasElement, args, step }) => {
    const canvas = within(canvasElement.parentElement!);
    await step('open relative date dropdown', async () => {
      const dropdownTrigger = canvas.getByTestId(
        'popover-factors-relative-date-trigger',
      );
      await userEvent.click(dropdownTrigger);
      await waitFor(() =>
        expect(
          canvas.getByTestId('popover-factors-relative-date-content'),
        ).toBeInTheDocument(),
      );
      await waitFor(() => expect(args.onActivate).toHaveBeenCalled());
    });
    const dropdownWrapper = within(
      canvas.getByTestId('popover-factors-relative-date-content'),
    );
    await step('update relative date value', async () => {
      await userEvent.click(dropdownWrapper.getByText('Hours'));
      const weeksOption = await canvas.findByText('Weeks');
      await userEvent.click(weeksOption);
      await sleep(100);
      await userEvent.type(
        dropdownWrapper.getByTestId('ds-factors-relative-date-modifier'),
        '{backspace}7',
      );
      await sleep(100);
      await userEvent.click(dropdownWrapper.getByText('Before'));
      const afterOption = await canvas.findByText('After');
      await userEvent.click(afterOption);
    });

    await userEvent.click(canvas.getByText('Apply'));
    await waitFor(() => {
      expect(args.onChangeValue).toHaveBeenCalledWith({
        temporalModifier: 17,
        temporalUnit: 'WEEKS',
      });
      expect(args.onDeactivate).toHaveBeenCalled();
    });
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
      return await waitFor(() =>
        expect(canvas.getByPlaceholderText('Search')).toBeInTheDocument(),
      );
    });
    await waitFor(() =>
      expect(canvas.getByText('Points')).not.toHaveStyle({
        pointerEvents: 'none',
      }),
    );
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
      await waitFor(() =>
        expect(canvas.getByRole('dialog')).toBeInTheDocument(),
      );
    });
    expect(canvas.getByText(args.formulaEditor as string)).toBeInTheDocument();
  },
};

export const ArrayEditorOpen: StoryObj<FactorsProps> = {
  ...SwitchFactorType,
  args: {
    ...SwitchFactorType.args,
    selectedFactorType: 'array',
    value: ARRAY_VALUE,
  },
  play: async ({ canvasElement, step, args }) => {
    const canvas = within(canvasElement.parentElement!);

    await step('open array modal', async () => {
      await userEvent.click(canvas.getByTestId('ds-factors-array'));
      await waitFor(() =>
        expect(canvas.getByRole('dialog')).toBeInTheDocument(),
      );
    });
    await waitFor(() => {
      ARRAY_VALUE.forEach((item) =>
        expect(canvas.getByDisplayValue(item)).toBeInTheDocument(),
      );
    });

    await waitFor(() => expect(args.onActivate).toHaveBeenCalled());
  },
};

export const ArrayEditorOpenRawMode: StoryObj<FactorsProps> = {
  ...SwitchFactorType,
  args: {
    ...SwitchFactorType.args,
    selectedFactorType: 'array',
    value: ARRAY_VALUE,
  },
  play: async ({ canvasElement, step, args }) => {
    const canvas = within(canvasElement.parentElement!);

    await step('open array modal', async () => {
      await userEvent.click(canvas.getByTestId('ds-factors-array'));
      await waitFor(() =>
        expect(canvas.getByRole('dialog')).toBeInTheDocument(),
      );
    });
    await waitFor(() => {
      ARRAY_VALUE.forEach((item) =>
        expect(canvas.getByDisplayValue(item)).toBeInTheDocument(),
      );
    });

    await userEvent.click(canvas.getByText('Raw'));
  },
};

export const ArrayEditorModifyValues: StoryObj<FactorsProps> = {
  ...SwitchFactorType,
  args: {
    ...SwitchFactorType.args,
    selectedFactorType: 'array',
    value: ARRAY_VALUE,
    texts: {
      array: {
        collectorPlaceholder: COLLECTOR_PLACEHOLDER,
        collectorAdd: COLLECTOR_ADD,
      },
    },
    onChangeValue: fn(),
  },
  play: async ({ canvasElement, step, args }) => {
    const canvas = within(canvasElement.parentElement!);

    await step('open array modal', async () => {
      await userEvent.click(canvas.getByTestId('ds-factors-array'));
      await waitFor(() =>
        expect(canvas.getByRole('dialog')).toBeInTheDocument(),
      );
    });
    await waitFor(() => {
      ARRAY_VALUE.forEach((item) =>
        expect(canvas.getByDisplayValue(item)).toBeInTheDocument(),
      );
    });
    await step('remove item', async () => {
      await userEvent.click(
        canvas.getAllByTestId('ds-factors-array-remove-item')[0],
      );
      await waitFor(() =>
        expect(canvas.getAllByTestId('ds-factors-array-item')).toHaveLength(2),
      );
    });
    await step('add items by typing', async () => {
      await userEvent.type(canvas.getByTestId('ds-collector-input'), 'item1,', {
        delay: 100,
      });
      await waitFor(() =>
        expect(canvas.getByTestId('ds-collector-input')).toHaveValue(''),
      );
      await sleep(100);

      await userEvent.type(canvas.getByTestId('ds-collector-input'), 'item2,', {
        delay: 100,
      });
      await waitFor(() =>
        expect(canvas.getByTestId('ds-collector-input')).toHaveValue(''),
      );
      await sleep(100);

      await userEvent.type(
        canvas.getByTestId('ds-collector-input'),
        'item3{enter}',
        { delay: 100 },
      );
      await sleep(100);

      await userEvent.click(canvas.getByText(COLLECTOR_ADD));
      await waitFor(() =>
        expect(canvas.getAllByTestId('ds-factors-array-item')).toHaveLength(5),
      );
    });

    await step('add items by pasting', async () => {
      await userEvent.click(canvas.getByTestId('ds-collector-input'));
      await waitFor(() =>
        expect(canvas.getByTestId('ds-collector-input')).toBe(
          document.activeElement,
        ),
      );
      await userEvent.paste('paste1,paste2,paste3');
      await userEvent.click(canvas.getByText(COLLECTOR_ADD));
      await waitFor(() =>
        expect(canvas.getAllByTestId('ds-factors-array-item')).toHaveLength(8),
      );
    });

    await step('update item manually', async () => {
      await userEvent.click(canvas.getByDisplayValue('paste2'));
      await userEvent.type(
        canvas.getByDisplayValue('paste2'),
        ' edited value',
        { delay: 100 },
      );
      await userEvent.click(canvas.getByText('Apply'));
    });

    await waitFor(() =>
      expect(args.onChangeValue).toHaveBeenCalledWith([
        'TEST VALUE',
        'TEST VALUE 2',
        'item1',
        'item2',
        'item3',
        'paste1',
        'paste2 edited value',
        'paste3',
      ]),
    );
  },
};

export const ArrayEditorInvalidValues: StoryObj<FactorsProps> = {
  ...SwitchFactorType,
  args: {
    ...SwitchFactorType.args,
    selectedFactorType: 'array',
    arrayProps: {
      itemType: 'number',
    },
    value: ARRAY_VALUE_NUMERIC,
    texts: {
      array: {
        collectorPlaceholder: COLLECTOR_PLACEHOLDER,
        collectorAdd: COLLECTOR_ADD,
        numericValidationError: COLLECTOR_VALIDATION_ERROR,
      },
    },
    onChangeValue: fn(),
  },
  play: async ({ canvasElement, step, args }) => {
    const canvas = within(canvasElement.parentElement!);

    await step('open array modal', async () => {
      await userEvent.click(canvas.getByTestId('ds-factors-array'));
      await waitFor(() =>
        expect(canvas.getByRole('dialog')).toBeInTheDocument(),
      );
    });

    await step('add items by typing', async () => {
      await userEvent.type(canvas.getByTestId('ds-collector-input'), '2344,', {
        delay: 100,
      });
      await waitFor(() =>
        expect(canvas.getByTestId('ds-collector-input')).toHaveValue(''),
      );
      await sleep(100);

      await userEvent.type(canvas.getByTestId('ds-collector-input'), ' 112 ,', {
        delay: 100,
      });
      await waitFor(() =>
        expect(canvas.getByTestId('ds-collector-input')).toHaveValue(''),
      );
      await sleep(100);

      await userEvent.type(
        canvas.getByTestId('ds-collector-input'),
        ' 111s {enter}',
        { delay: 100 },
      );
      await waitFor(() =>
        expect(canvas.getByTestId('ds-collector-input')).toHaveValue(''),
      );
      await sleep(100);

      await userEvent.type(
        canvas.getByTestId('ds-collector-input'),
        '12{enter}',
        { delay: 100 },
      );
      await sleep(100);

      await waitFor(() => {
        expect(
          canvas.getByText(COLLECTOR_ADD).closest('button'),
        ).toBeDisabled();
        expect(
          canvas.getByText(COLLECTOR_VALIDATION_ERROR),
        ).toBeInTheDocument();
      });
    });

    await step('remove collector item manually', async () => {
      const invalidValue = canvas
        .getByText('111s')
        .closest('[data-testid="ds-input-value-wrapper"]');
      expect(invalidValue).toBeInTheDocument();
      await userEvent.click(
        within(invalidValue as HTMLElement).getByTestId('ds-icon-close-s'),
      );

      await waitFor(() => {
        expect(
          canvas.getByText(COLLECTOR_ADD).closest('button'),
        ).not.toBeDisabled();
        expect(
          canvas.queryByText(COLLECTOR_VALIDATION_ERROR),
        ).not.toBeInTheDocument();
      });
    });

    await step('add items by pasting', async () => {
      await userEvent.click(canvas.getByTestId('ds-collector-input'));
      await waitFor(() =>
        expect(canvas.getByTestId('ds-collector-input')).toBe(
          document.activeElement,
        ),
      );
      await userEvent.paste('7584,234234.234,34d5345');

      await waitFor(() => {
        expect(
          canvas.getByText(COLLECTOR_ADD).closest('button'),
        ).toBeDisabled();
        expect(
          canvas.getByText(COLLECTOR_VALIDATION_ERROR),
        ).toBeInTheDocument();
      });
    });
  },
};

export const DateRangePickerOpen: StoryObj<FactorsProps> = {
  ...SwitchFactorType,
  args: {
    ...SwitchFactorType.args,
    selectedFactorType: 'dateRange',
  },
  parameters: {
    date: new Date('March 10, 2021 10:00:00'),
    layout: 'centered',
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement.parentElement!);
    await userEvent.click(await canvas.findByText('Start date'));
    await waitFor(() => expect(canvas.getByRole('dialog')).toBeInTheDocument());
  },
};

export const AllTypesError: StoryObj<FactorsProps> = {
  ...AllTypes,
  args: {
    error: true,
  },
};

export const AllTypesReadOnly: StoryObj<FactorsProps> = {
  ...AllTypes,
  args: {
    readOnly: true,
  },
};

export const ParameterDeactivate: StoryObj<FactorsProps> = {
  ...SelectParameterFactorValue,
  play: async ({ canvasElement, args, step }) => {
    const canvas = within(canvasElement);
    await step('open parameter dropdown', async () => {
      const parameterDropdownTrigger = canvas.getByText('Parameter');
      await sleep(1000);
      await userEvent.click(parameterDropdownTrigger);

      await waitFor(() => expect(args.onActivate).toHaveBeenCalled());
      return await waitFor(() =>
        expect(canvas.getByPlaceholderText('Search')).toBeInTheDocument(),
      );
    });

    await userEvent.click(document.body);
    await waitFor(() => expect(args.onDeactivate).toHaveBeenCalled());
  },
};

export const TextAutocompleteDeactivate: StoryObj<FactorsProps> = {
  ...Default,
  decorators: [fixedWrapper300],
  args: {
    selectedFactorType: 'text',
    textType: 'autocomplete',
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole('combobox'));

    await waitFor(() => expect(args.onActivate).toHaveBeenCalled());

    await userEvent.click(document.body);
    await waitFor(() => expect(args.onDeactivate).toHaveBeenCalled());
  },
};
