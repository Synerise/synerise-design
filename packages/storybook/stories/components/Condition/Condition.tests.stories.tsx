import { within, userEvent, expect, waitFor, fn, fireEvent } from '@storybook/test';

import type { ConditionMeta, ConditionStory } from './Condition.types';
import StoriesMeta from './Condition.stories';
import {
  STEPS_POPULATED,
  STEPS_POPULATED_ACTION_ATTRIBUTE,
  STEPS_POPULATED_CONTEXT_ERROR,
  STEPS_POPULATED_FACTOR_ERRORS,
  STEPS_POPULATED_OPERATOR_ERRORS,
  STEPS_POPULATED_PARAMETER_ERRORS,
  SUBJECT_ITEMS,
} from './Condition.data';
import { FACTORS_ITEMS as PARAMETER_ITEMS } from '../Factors/Factors.data';
import { sleep } from '../../utils';

export default {
  ...StoriesMeta,
  title: 'Components/Filter/Condition/Tests',
  tags: ['visualtests'],
  parameters: {
    chromatic: { diffThreshold: 0.15 },
  },
} as ConditionMeta;

export const Populated: ConditionStory = {
  args: {
    maxConditionsLength: undefined,
    steps: STEPS_POPULATED,
  },
};

export const WithParameterErrors: ConditionStory = {
  args: {
    maxConditionsLength: undefined,
    steps: STEPS_POPULATED_PARAMETER_ERRORS,
  },
};

export const WithOperatorErrors: ConditionStory = {
  args: {
    maxConditionsLength: undefined,
    steps: STEPS_POPULATED_OPERATOR_ERRORS,
  },
};

export const WithFactorErrors: ConditionStory = {
  args: {
    maxConditionsLength: undefined,
    steps: STEPS_POPULATED_FACTOR_ERRORS,
  },
};

export const WithActionAttribute: ConditionStory = {
  args: {
    maxConditionsLength: undefined,
    steps: STEPS_POPULATED_ACTION_ATTRIBUTE,
    showActionAttribute: true,
  },
};

export const ContextErrorMessage: ConditionStory = {
  args: {
    maxConditionsLength: undefined,
    steps: STEPS_POPULATED_CONTEXT_ERROR,
    showActionAttribute: false,
  },
};

export const PopulateStep: ConditionStory = {
  parameters: {
    test: { dangerouslyIgnoreUnhandledErrors: true }
  },
  args: {
    onChangeContext: fn(),
    onChangeParameter: fn(),
    onChangeFactorType: fn(),
    onChangeFactorValue: fn(),
    onChangeOperator: fn(),
    onChangeActionAttribute: fn(),
    onChangeOrder: fn(),
    onChangeSubject: fn(),
    onDeactivate: fn(),
    onUpdateStepName: fn(),
    maxConditionsLength: undefined,
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement.parentElement!);
    const contextWrapper = within(canvas.getByTestId('condition-subject-or-context'));
    await userEvent.click(contextWrapper.getByRole('button'));
    await sleep(1500)
    await canvas.findByText(SUBJECT_ITEMS[3].name);
    await waitFor(() => expect(canvas.getByText(SUBJECT_ITEMS[3].name)).not.toHaveStyle({ pointerEvents: 'none' }))
    await userEvent.click(canvas.getByText(SUBJECT_ITEMS[3].name));
    await sleep(1500)
    await waitFor(() => expect(args.onChangeContext).toHaveBeenCalled());
    await canvas.findAllByText(PARAMETER_ITEMS[5].name);
    await waitFor(() => expect(canvas.getAllByText(PARAMETER_ITEMS[5].name)[0]).not.toHaveStyle({ pointerEvents: 'none' }))
    await userEvent.click(canvas.getAllByText(PARAMETER_ITEMS[5].name)[0]);
    await sleep(1500)
    await waitFor(() => expect(args.onChangeParameter).toHaveBeenCalled());
    const operatorsDropdown = await canvas.findByTestId('ds-operators-dropdown-wrapper');
    const operatorsTabs = await within(operatorsDropdown).findAllByTestId('tab-container');

    expect(operatorsTabs).toHaveLength(5);
    await waitFor(() => expect(within(operatorsDropdown).getAllByTestId('tab-container')[2]).not.toHaveStyle({ pointerEvents: 'none' }))
    await userEvent.click(within(operatorsDropdown).getAllByTestId('tab-container')[2]);

    await within(operatorsDropdown).findByText('Starts with');

    await waitFor(() => expect(within(operatorsDropdown).getByText('Starts with')).not.toHaveStyle({ pointerEvents: 'none' }))
    await userEvent.click(within(operatorsDropdown).getByText('Starts with'));
    await waitFor(() => expect(args.onChangeOperator).toHaveBeenCalled());

    await canvas.findByTestId('autocomplete-autosize-input');
    await userEvent.click(within(canvas.getByTestId('autocomplete-autosize-input')).getByRole('combobox'));
    fireEvent.focus(within(canvas.getByTestId('autocomplete-autosize-input')).getByRole('combobox'));
    await userEvent.keyboard('Autosize text input parameter value');
    await sleep(500);
  },
};
