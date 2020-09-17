import * as React from 'react';
import { v4 as uuid } from 'uuid';
import { NotificationsM, VarTypeStringM } from '@synerise/ds-icon/dist/icons';
import renderWithProvider from '@synerise/ds-utils/dist/testing/renderWithProvider/renderWithProvider';
import {
  FACTORS_TEXTS, OPERATORS_GROUPS,
  OPERATORS_ITEMS, OPERATORS_TEXTS,
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
    value: ''
  }
}
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
}

const DEFAULT_STATE = {
  selected: undefined,
  selectedFactorType: undefined,
  factorValue: undefined,
  steps: [
    {
      ...DEFAULT_STEP,
      conditions: [
        DEFAULT_CONDITION_ROW
      ]
    }
  ]
}

const getConditions = (conditionsNumber: number): StepConditions[] => {
  return new Array(conditionsNumber).fill(DEFAULT_CONDITION_ROW).map((condition) => ({
      id: condition.id,
      parameter: {
        availableFactorTypes: ['parameter'],
        selectedFactorType: 'parameter',
        defaultFactorType: 'parameter',
        setSelectedFactorType: () => {
        },
        onChangeValue: (value) => {
        },
        value: condition.parameter.value,
        parameters: {
          buttonLabel: 'Parameter',
          buttonIcon: <VarTypeStringM/>,
          groups: PARAMETER_GROUPS,
          items: PARAMETER_ITEMS
        },
        withoutTypeSelector: true,
        texts: FACTORS_TEXTS,
      },
      operator: {
        onChange: (value) => {
        },
        value: condition.operator.value,
        items: OPERATORS_ITEMS,
        groups: OPERATORS_GROUPS,
        texts: OPERATORS_TEXTS,
      },
      factor: {
        selectedFactorType: condition.factor.selectedFactorType,
        defaultFactorType: 'text',
        setSelectedFactorType: (factorType) => {
        },
        onChangeValue: (value) => {
        },
        textType: 'default',
        value: condition.factor.value,
        formulaEditor: <div>Formula editor</div>,
        parameters: {
          buttonLabel: 'Parameter',
          buttonIcon: <VarTypeStringM/>,
          groups: PARAMETER_GROUPS,
          items: PARAMETER_ITEMS
        },
        texts: FACTORS_TEXTS,
      }
  }));
};

const getSteps = (stepsNumber: number, conditionsNumber: number): StepConditions[] => {
  return [...new Array(stepsNumber)].map((_, index) => {
    return {
      ...DEFAULT_STEP,
      id: index,
      stepName: `Step name #${index}`,
      conditions: getConditions(conditionsNumber),
    }
  });
};

const DEFAULT_PROPS = (): ConditionProps => ({
  texts:{
    stepNamePlaceholder: 'Step name',
    removeConditionRowTooltip: 'Remove',
    addConditionRowButton: 'and where',
  },
  addCondition: () => {},
  removeCondition: () => {},
  updateStepName: () => {},
  steps: getSteps(1, 1) as ConditionStep[]
});

const RENDER_CONDITIONS = (props?: {}) => {
  return <Condition {...DEFAULT_PROPS()} {...props} />
}

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
    input && fireEvent.change(input, {target: { value: NEW_STEP_NAME}});

    // ASSERT
    expect(updateStepName).toBeCalledWith(STEP_ID, NEW_STEP_NAME);
  });

  test('Should not render add condition row button', () => {
    // ARRANGE
    const { queryByText } = renderWithProvider(RENDER_CONDITIONS({addCondition: false} ));
    const addConditionButton = queryByText(DEFAULT_PROPS().texts.addConditionRowButton);

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
    const addConditionButton = getByText(DEFAULT_PROPS().texts.addConditionRowButton);

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

});
