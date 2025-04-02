import { within, userEvent, expect, waitFor, fn, fireEvent } from '@storybook/test';

import type { FilterMeta, FilterStory } from './Filter.types';
import StoriesMeta from './Filter.stories';

import { EXPRESSIONS, EXPRESSIONS_WITH_ERRORS, FILTER_TEXTS } from './Filter.data';
import { CONTEXT_CLIENT_ITEMS } from '../ContextSelector/data/client.data';
import { FACTORS_ITEMS } from '../Factors/Factors.data';
import { CONDITION_TEXTS } from '../Condition/Condition.data';
import { OPERATORS_ITEMS } from '../Operators/data/index.data';

import { sleep } from '../../utils';

const SLEEP_TIME = 100;

export default {
  ...StoriesMeta,
  title: 'Components/Filter/Filter/Tests',
  tags: ['visualtests'],
  parameters: {
    chromatic: { diffThreshold: 0.15 },
  },
} as FilterMeta;

export const Populated: FilterStory = {
  args: {
    expressions: EXPRESSIONS,
  },
};

export const WithErrors: FilterStory = {
  args: {
    expressions: EXPRESSIONS_WITH_ERRORS,
  },
};

const CONTEXT_ITEM = { ...CONTEXT_CLIENT_ITEMS[2] };
const FACTOR_ITEM = { ...FACTORS_ITEMS[4] };
const PARAMETER_ITEM = { ...FACTORS_ITEMS[7] };
const OPERATOR_ITEM = { ...OPERATORS_ITEMS[3] };

export const PopulateFilter: FilterStory = {
  args: {
    onChangeLogic: fn(),
    onChangeOrder: fn(),
    onChangeStepMatching: fn(),
    onChangeStepName: fn(),
    onDeleteStep: fn(),
    onDuplicateStep: fn(),
    onAddStep: fn(),
    onExpressionStepChange: fn(),
    expressions: [],
    texts: FILTER_TEXTS,
  },
  play: async ({ canvasElement, args, step }) => {
    const canvas = within(canvasElement.parentElement!);

    await step('Select context', async () => {
      await userEvent.click(canvas.getByText(FILTER_TEXTS.addFilter));
      await waitFor(() => expect(canvas.findAllByText(CONTEXT_ITEM.name)));
      await waitFor(() => expect(canvas.getAllByText(CONTEXT_ITEM.name)[0]).not.toHaveStyle({ pointerEvents: 'none' }));
      await sleep(SLEEP_TIME);
      await userEvent.click(canvas.getAllByText(CONTEXT_ITEM.name)[0]);
    });
    
    await waitFor(() => expect(args.onAddStep).toHaveBeenCalled());
    await waitFor(() => expect(args.onExpressionStepChange).toHaveBeenCalledTimes(1));

    await step('Select parameter', async () => {
      await userEvent.click(await canvas.findByText(CONDITION_TEXTS.addFirstConditionRowButton));

      await waitFor(() => expect(canvas.findAllByText(PARAMETER_ITEM.name)));
      await waitFor(() =>
        expect(canvas.getAllByText(PARAMETER_ITEM.name)[0]).not.toHaveStyle({ pointerEvents: 'none' })
      );
      await userEvent.click(canvas.getAllByText(PARAMETER_ITEM.name)[0]);
    });

    await waitFor(() => expect(args.onExpressionStepChange).toHaveBeenCalledTimes(5));

    const operatorsDropdown = await canvas.findByTestId('ds-operators-dropdown-wrapper');

    await step('Select operator tab', async () => {
      const operatorsTabs = await within(operatorsDropdown).findAllByTestId('tab-container');

      expect(operatorsTabs).toHaveLength(5);
      await waitFor(() =>
        expect(within(operatorsDropdown).getAllByTestId('tab-container')[2]).not.toHaveStyle({ pointerEvents: 'none' })
      );
      await userEvent.click(within(operatorsDropdown).getAllByTestId('tab-container')[2]);
    });

    await step('Select operator', async () => {
      await waitFor(() => expect(canvas.findAllByText(OPERATOR_ITEM.name)));
      await waitFor(() =>
        expect(within(operatorsDropdown).getAllByText(OPERATOR_ITEM.name)[0]).not.toHaveStyle({ pointerEvents: 'none' })
      );
      await userEvent.click(canvas.getAllByText(OPERATOR_ITEM.name)[0]);
    });

    // await sleep(SLEEP_TIME);
    await waitFor(() => expect(args.onExpressionStepChange).toHaveBeenCalledTimes(7));

    await step('Select factor type', async () => {
      await userEvent.click(canvas.getByTestId('ds-factors-type-selector'));

      await waitFor(() => expect(canvas.findAllByText('Parameter')));
      await waitFor(() => expect(canvas.getAllByText('Parameter')[0]).not.toHaveStyle({ pointerEvents: 'none' }));
      await userEvent.click(canvas.getAllByText('Parameter')[0]);
    });

    // await sleep(SLEEP_TIME);
    await waitFor(() => expect(args.onExpressionStepChange).toHaveBeenCalledTimes(8));

    await step('Select factor parameter', async () => {
      await waitFor(() => expect(canvas.findAllByText(FACTOR_ITEM.name)));
      await waitFor(() => expect(canvas.getAllByTestId('ds-factors-parameter-dropdown-wrapper')).toHaveLength(2));

      await waitFor(() =>
        expect(
          within(canvas.getAllByTestId('ds-factors-parameter-dropdown-wrapper')[1]).getAllByText(FACTOR_ITEM.name)[0]
        ).not.toHaveStyle({ pointerEvents: 'none' })
      );

      await userEvent.click(
        within(canvas.getAllByTestId('ds-factors-parameter-dropdown-wrapper')[1]).getAllByText(FACTOR_ITEM.name)[0]
      );
    });
    
    await waitFor(() => expect(args.onExpressionStepChange).toHaveBeenCalledTimes(9));
    
    await step('Duplicate filter step', async () => {
      await fireEvent.click(canvas.getAllByTestId('ds-cruds-duplicate')[0]);
    });

    await waitFor(() => expect(args.onDuplicateStep).toHaveBeenCalledOnce());

    await step('Change step matching', async () => {
      await fireEvent.click(canvas.getAllByText('Performed')[0]);
    });
    await waitFor(() => expect(args.onChangeStepMatching).toHaveBeenCalledOnce());

    await step('Change step logic', async () => {
      await fireEvent.click(canvas.getByText('And'));
    });
    await waitFor(() => expect(args.onChangeLogic).toHaveBeenCalledOnce());
  },
};
