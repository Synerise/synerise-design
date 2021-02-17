import * as React from 'react';
import { v4 as uuid } from 'uuid';
import { NotificationsM, VarTypeStringM } from '@synerise/ds-icon/dist/icons';
import renderWithProvider from '@synerise/ds-utils/dist/testing/renderWithProvider/renderWithProvider';
import {
  FACTORS_TEXTS,
  OPERATORS_GROUPS,
  OPERATORS_ITEMS,
  OPERATORS_TEXTS,
  PARAMETER_GROUPS,
  PARAMETER_ITEMS,
  SUBJECT_ITEMS,
} from './data/index.data';
import Condition from '../Condition';
import { fireEvent } from '@testing-library/react';
import { ConditionProps, ConditionStep, StepConditions } from '../Condition.types';

const DEFAULT_CONDITION_ROW = {
  id: uuid(),
  parameter: {
    value: '',
  },
  operator: {
    value: undefined,
  },
  factor: {
    selectedFactorType: '',
    defaultFactorType: 'text',
    value: '',
  },
};
const DEFAULT_STEP = {
  id: 0,
  stepName: 'Step name',
  subject: {
    showPreview: undefined,
    type: 'event',
    placeholder: 'Choose event',
    iconPlaceholder: <NotificationsM />,
    selectedItem: undefined,
    items: SUBJECT_ITEMS,
  },
};

const DEFAULT_STATE = {
  selected: undefined,
  selectedFactorType: undefined,
  factorValue: undefined,
  steps: [
    {
      ...DEFAULT_STEP,
      conditions: [DEFAULT_CONDITION_ROW],
    },
  ],
};

const getConditions = (conditionsNumber: number): StepConditions[] => {
  return new Array(conditionsNumber).fill(DEFAULT_CONDITION_ROW).map(condition => ({
    id: condition.id,
    parameter: {
      availableFactorTypes: ['parameter'],
      selectedFactorType: 'parameter',
      defaultFactorType: 'parameter',
      setSelectedFactorType: () => {},
      onChangeValue: () => {},
      value: condition.parameter.value,
      parameters: {
        buttonLabel: 'Parameter',
        buttonIcon: <VarTypeStringM />,
        groups: PARAMETER_GROUPS,
        items: PARAMETER_ITEMS,
      },
      withoutTypeSelector: true,
      texts: FACTORS_TEXTS,
    },
    operator: {
      onChange: () => {},
      value: condition.operator.value,
      items: OPERATORS_ITEMS,
      groups: OPERATORS_GROUPS,
      texts: OPERATORS_TEXTS,
    },
    factor: {
      selectedFactorType: condition.factor.selectedFactorType,
      defaultFactorType: 'text',
      setSelectedFactorType: () => {},
      onChangeValue: () => {},
      textType: 'default',
      value: condition.factor.value,
      formulaEditor: <div>Formula editor</div>,
      parameters: {
        buttonLabel: 'Parameter',
        buttonIcon: <VarTypeStringM />,
        groups: PARAMETER_GROUPS,
        items: PARAMETER_ITEMS,
      },
      texts: FACTORS_TEXTS,
    },
  }));
};

const getSteps = (stepsNumber: number, conditionsNumber: number): StepConditions[] => {
  return [...new Array(stepsNumber)].map((_, index) => {
    return {
      ...DEFAULT_STEP,
      id: index,
      stepName: `Step name #${index}`,
      conditions: getConditions(conditionsNumber),
    };
  });
};

const DEFAULT_TEXTS = {
  stepNamePlaceholder: 'Step name',
  removeConditionRowTooltip: 'Remove',
  addFirstConditionRowButton: 'where',
  addConditionRowButton: 'and where',
  duplicateTooltip: 'Duplicate',
  removeTooltip: 'Remove',
  moveTooltip: 'Move',
  addStep: 'Add step',
  dropLabel: 'Drag me here',
};

const DEFAULT_PROPS = (): ConditionProps => ({
  texts: DEFAULT_TEXTS,
  addCondition: () => {},
  removeCondition: () => {},
  updateStepName: () => {},
  removeStep: () => {},
  duplicateStep: () => {},
  addStep: () => {},
  steps: getSteps(1, 1) as ConditionStep[],
});

const RENDER_CONDITIONS = (props?: {}) => {
  return <Condition {...DEFAULT_PROPS()} {...props} />;
};

describe('Condition component', () => {
  test('Should render', () => {
    // ARRANGE
    const { container } = renderWithProvider(RENDER_CONDITIONS());

    // ASSERT
    expect(container.querySelector('.ds-conditions')).toBeTruthy();
  });
  test('Should update step name', () => {
    // ARRANGE
    const NEW_STEP_NAME = 'First step';
    const STEP_ID = DEFAULT_STATE.steps[0].id;
    const updateStepName = jest.fn();
    const { container } = renderWithProvider(RENDER_CONDITIONS({ updateStepName }));
    const input = container.querySelector(`#conditionStepName${STEP_ID}`);

    // ACT
    input && fireEvent.change(input, { target: { value: NEW_STEP_NAME } });

    // ASSERT
    expect(updateStepName).toBeCalledWith(STEP_ID, NEW_STEP_NAME);
  });

  test('Should not render add condition row button', () => {
    // ARRANGE
    const { queryByText } = renderWithProvider(RENDER_CONDITIONS({ addCondition: false }));
    const addConditionButton = queryByText(DEFAULT_TEXTS.addConditionRowButton);

    // ASSERT
    expect(addConditionButton).toBeFalsy();
  });

  test('Should not render remove condition row button for single condition row', () => {
    // ARRANGE
    const { container } = renderWithProvider(RENDER_CONDITIONS());
    const removeButton = container.querySelector('.ds-conditions-remove-row');

    // ASSERT
    expect(removeButton).toBeFalsy();
  });

  test('Should call addCondition callback', () => {
    // ARRANGE
    const addCondition = jest.fn();
    const { getByText } = renderWithProvider(RENDER_CONDITIONS({ addCondition }));
    const addConditionButton = getByText(DEFAULT_TEXTS.addConditionRowButton);

    // ACT
    fireEvent.click(addConditionButton);

    // ASSERT
    expect(addCondition).toBeCalled();
  });

  test('Should call removeCondition callback', () => {
    // ARRANGE
    const removeCondition = jest.fn();
    const { container } = renderWithProvider(RENDER_CONDITIONS({ removeCondition, steps: getSteps(1, 2) }));
    const removeButton = container.querySelector('.ds-conditions-remove-row');

    // ACT
    removeButton && fireEvent.click(removeButton);

    // ASSERT
    expect(removeCondition).toBeCalled();
  });

  test('Should render add step button and call addStep callback', () => {
    // ARRANGE
    const addStep = jest.fn();
    const { getByText } = renderWithProvider(RENDER_CONDITIONS({ addStep }));

    // ACT
    fireEvent.click(getByText(DEFAULT_TEXTS.addStep));
    // ASSERT
    expect(addStep).toBeCalled();
  });

  test('Should render without add step button', () => {
    // ARRANGE
    const { queryByText } = renderWithProvider(RENDER_CONDITIONS({ addStep: undefined }));

    // ASSERT
    expect(queryByText(DEFAULT_TEXTS.addStep)).toBeFalsy();
  });

  test('Should render with drag handle icon', () => {
    // ARRANGE
    const onChangeOrder = jest.fn();
    const { container } = renderWithProvider(RENDER_CONDITIONS({ steps: getSteps(2, 1), onChangeOrder }));
    const dragIcons = container.querySelectorAll('.drag-handle-m');

    // ASSERT
    expect(dragIcons.length).toBe(2);
  });

  test('Should render without drag icon', () => {
    // ARRANGE
    const { container } = renderWithProvider(RENDER_CONDITIONS({ steps: getSteps(2, 1), onChangeOrder: undefined }));
    const dragIcons = container.querySelectorAll('.drag-handle-m');

    // ASSERT
    expect(dragIcons.length).toBe(0);
  });

  test('Should call remove step callback', () => {
    // ARRANGE
    const removeStep = jest.fn();
    const { container } = renderWithProvider(RENDER_CONDITIONS({ removeStep }));
    const removeIcon = container.querySelector('.ds-cruds .delete');

    // ACT
    fireEvent.click(removeIcon as HTMLElement);

    // ASSERT
    expect(removeStep).toBeCalledWith(0);
  });

  test('Should call duplicate step callback', () => {
    // ARRANGE
    const duplicateStep = jest.fn();
    const { container } = renderWithProvider(RENDER_CONDITIONS({ duplicateStep }));
    const duplicateIcon = container.querySelector('.ds-cruds .duplicate');

    // ACT
    fireEvent.click(duplicateIcon as HTMLElement);

    // ASSERT
    expect(duplicateStep).toBeCalledWith(0);
  });
});
