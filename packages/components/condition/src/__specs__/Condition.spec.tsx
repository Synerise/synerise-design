import * as React from 'react';
import { v4 as uuid } from 'uuid';
import { NotificationsM, VarTypeStringM } from '@synerise/ds-icon';
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

const lodash = require('lodash');
lodash.debounce = jest.fn(fn => fn);

const DEFAULT_CONDITION_ROW: { [P in keyof StepConditions]: Partial<StepConditions[P]> } = {
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
const DEFAULT_STEP: Partial<ConditionStep> = {
  id: 0,
  stepName: 'Step name',
  subject: {
    type: 'event',
    placeholder: 'Choose event',
    iconPlaceholder: <NotificationsM />,
    selectedItem: SUBJECT_ITEMS[0],
    items: SUBJECT_ITEMS,
    texts: undefined,
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
    setSelectedFactorType: () => {},
    onChangeValue: () => {},
    onChangeContext: () => {},
    onChangeParameter: () => {},
    onChangeOperator: () => {},
    parameter: {
      availableFactorTypes: ['parameter'],
      selectedFactorType: 'parameter',
      defaultFactorType: 'parameter',
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
      value: condition.operator.value,
      items: OPERATORS_ITEMS,
      groups: OPERATORS_GROUPS,
      texts: OPERATORS_TEXTS,
    },
    factor: {
      selectedFactorType: condition.factor.selectedFactorType,
      defaultFactorType: 'text',
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

const getSteps = (stepsNumber: number, conditionsNumber: number): ConditionStep[] => {
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
  minConditionsLength: 1,
  maxConditionsLength: 10,
  addCondition: () => {},
  removeCondition: () => {},
  onUpdateStepName: () => {},
  removeStep: () => {},
  duplicateStep: () => {},
  addStep: () => {},
  onChangeContext: () => {},
  onChangeParameter: () => {},
  onChangeOperator: () => {},
  onChangeFactorValue: () => {},
  onChangeFactorType: () => {},
  onChangeSubject: () => {},
  steps: getSteps(1, 1) as ConditionStep[],
});

const RENDER_CONDITIONS = (props?: Partial<ConditionProps>) => {
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
    const onUpdateStepName = jest.fn();
    const { container } = renderWithProvider(RENDER_CONDITIONS({ onUpdateStepName }));
    const input = container.querySelector(`#conditionStepName${STEP_ID}`);

    // ACT
    input && fireEvent.change(input, { target: { value: NEW_STEP_NAME } });

    // ASSERT
    expect(onUpdateStepName).toBeCalledWith(STEP_ID, NEW_STEP_NAME);
  });

  test('Should not render add condition row button', () => {
    // ARRANGE
    const { queryByText } = renderWithProvider(RENDER_CONDITIONS({ addCondition: undefined }));
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

  test('rendering only parameter if there are no operator and factor provided', () => {
    const { getByText } = renderWithProvider(
      RENDER_CONDITIONS({
        steps: [
          {
            ...DEFAULT_STEP,
            id: 'test-id',
            conditions: [
              {
                id: 'test-id',
                parameter: {
                  availableFactorTypes: ['parameter'],
                  selectedFactorType: 'parameter',
                  defaultFactorType: 'parameter',
                  value: 'parameter value',
                  parameters: {
                    buttonLabel: 'Parameter label',
                    buttonIcon: <VarTypeStringM />,
                    groups: PARAMETER_GROUPS,
                    items: PARAMETER_ITEMS,
                  },
                  withoutTypeSelector: true,
                  texts: FACTORS_TEXTS,
                },
                operator: undefined,
                factor: undefined,
              },
            ],
          },
        ],
      })
    );

    expect(getByText('Parameter label')).toBeTruthy();
  });

  test('rendering only operator if there are no parameter and factor provided', () => {
    const { getByText } = renderWithProvider(
      RENDER_CONDITIONS({
        steps: [
          {
            ...DEFAULT_STEP,
            id: 'test-id',
            conditions: [
              {
                id: 'test-id',
                parameter: undefined,
                operator: {
                  items: [],
                  groups: [],
                  value: {
                    group: 'groupId',
                    groupId: 'groupId',
                    icon: <span>i</span>,
                    id: 'id',
                    logic: 'logic',
                    name: 'Operator name',
                    value: 'operator value',
                  },
                },
                factor: undefined,
              },
            ],
          },
        ],
      })
    );

    expect(getByText('Operator name')).toBeTruthy();
  });

  test('not rendering operator if there is also parameter provided but without value', () => {
    const { getByText, queryByText } = renderWithProvider(
      RENDER_CONDITIONS({
        steps: [
          {
            ...DEFAULT_STEP,
            id: 'test-id',
            conditions: [
              {
                id: 'test-id',
                parameter: {
                  availableFactorTypes: ['parameter'],
                  selectedFactorType: 'parameter',
                  defaultFactorType: 'parameter',
                  value: undefined,
                  parameters: {
                    buttonLabel: 'Parameter label',
                    buttonIcon: <VarTypeStringM />,
                    groups: PARAMETER_GROUPS,
                    items: PARAMETER_ITEMS,
                  },
                  withoutTypeSelector: true,
                  texts: FACTORS_TEXTS,
                },
                operator: {
                  items: [],
                  groups: [],
                  value: {
                    group: 'groupId',
                    groupId: 'groupId',
                    icon: <span>i</span>,
                    id: 'id',
                    logic: 'logic',
                    name: 'Operator name',
                    value: 'operator value',
                  },
                },
                factor: undefined,
              },
            ],
          },
        ],
      })
    );

    expect(getByText('Parameter label')).toBeTruthy();
    expect(queryByText('Operator name')).toBeFalsy();
  });

  test('rendering operator and parameter if there is parameter value set', () => {
    const { getByText } = renderWithProvider(
      RENDER_CONDITIONS({
        steps: [
          {
            ...DEFAULT_STEP,
            id: 'test-id',
            conditions: [
              {
                id: 'test-id',
                parameter: {
                  availableFactorTypes: ['parameter'],
                  selectedFactorType: 'parameter',
                  defaultFactorType: 'parameter',
                  value: 'parameter value',
                  parameters: {
                    buttonLabel: 'Parameter label',
                    buttonIcon: <VarTypeStringM />,
                    groups: PARAMETER_GROUPS,
                    items: PARAMETER_ITEMS,
                  },
                  withoutTypeSelector: true,
                  texts: FACTORS_TEXTS,
                },
                operator: {
                  items: [],
                  groups: [],
                  value: {
                    group: 'groupId',
                    groupId: 'groupId',
                    icon: <span>i</span>,
                    id: 'id',
                    logic: 'logic',
                    name: 'Operator name',
                    value: 'operator value',
                  },
                },
                factor: undefined,
              },
            ],
          },
        ],
      })
    );

    expect(getByText('Parameter label')).toBeTruthy();
    expect(getByText('Operator name')).toBeTruthy();
  });

  test('not rendering factor if there is operator but without value', () => {
    const { getByText, queryByDisplayValue } = renderWithProvider(
      RENDER_CONDITIONS({
        steps: [
          {
            ...DEFAULT_STEP,
            id: 'test-id',
            conditions: [
              {
                id: 'test-id',
                parameter: {
                  availableFactorTypes: ['parameter'],
                  selectedFactorType: 'parameter',
                  defaultFactorType: 'parameter',
                  value: 'parameter value',
                  parameters: {
                    buttonLabel: 'Parameter label',
                    buttonIcon: <VarTypeStringM />,
                    groups: PARAMETER_GROUPS,
                    items: PARAMETER_ITEMS,
                  },
                  withoutTypeSelector: true,
                  texts: FACTORS_TEXTS,
                },
                operator: {
                  items: [],
                  groups: [],
                  value: undefined,
                },
                factor: {
                  selectedFactorType: 'text',
                  defaultFactorType: 'text',
                  textType: 'default',
                  autocompleteText: {
                    options: ['option'],
                  },
                  value: 'factor value',
                  parameters: {
                    buttonLabel: 'Factor label',
                    buttonIcon: <span>i</span>,
                    groups: [],
                    items: [],
                  },
                  texts: undefined,
                },
              },
            ],
          },
        ],
      })
    );

    expect(getByText('Parameter label')).toBeTruthy();
    expect(queryByDisplayValue('factor value')).toBeFalsy();
  });

  test('rendering factor if there is operator with value set', () => {
    const { getByText, queryByDisplayValue } = renderWithProvider(
      RENDER_CONDITIONS({
        steps: [
          {
            ...DEFAULT_STEP,
            id: 'test-id',
            conditions: [
              {
                id: 'test-id',
                parameter: {
                  availableFactorTypes: ['parameter'],
                  selectedFactorType: 'parameter',
                  defaultFactorType: 'parameter',
                  value: 'parameter value',
                  parameters: {
                    buttonLabel: 'Parameter label',
                    buttonIcon: <VarTypeStringM />,
                    groups: PARAMETER_GROUPS,
                    items: PARAMETER_ITEMS,
                  },
                  withoutTypeSelector: true,
                  texts: FACTORS_TEXTS,
                },
                operator: {
                  items: [],
                  groups: [],
                  value: {
                    group: 'groupId',
                    groupId: 'groupId',
                    icon: <span>i</span>,
                    id: 'id',
                    logic: 'logic',
                    name: 'Operator name',
                    value: 'operator value',
                  },
                },
                factor: {
                  selectedFactorType: 'text',
                  defaultFactorType: 'text',
                  textType: 'default',
                  autocompleteText: {
                    options: ['option'],
                  },
                  value: 'factor value',
                  parameters: {
                    buttonLabel: 'Factor label',
                    buttonIcon: <span>i</span>,
                    groups: [],
                    items: [],
                  },
                  texts: undefined,
                },
              },
            ],
          },
        ],
      })
    );

    expect(getByText('Parameter label')).toBeTruthy();
    expect(queryByDisplayValue('factor value')).toBeTruthy();
  });

  test('rendering custom factor component', () => {
    const { getByText, queryByDisplayValue, debug } = renderWithProvider(
      RENDER_CONDITIONS({
        steps: [
          {
            ...DEFAULT_STEP,
            id: 'test-id',
            conditions: [
              {
                id: 'test-id',
                parameter: {
                  availableFactorTypes: ['parameter'],
                  selectedFactorType: 'parameter',
                  defaultFactorType: 'parameter',
                  value: 'parameter value',
                  parameters: {
                    buttonLabel: 'Parameter label',
                    buttonIcon: <VarTypeStringM />,
                    groups: PARAMETER_GROUPS,
                    items: PARAMETER_ITEMS,
                  },
                  withoutTypeSelector: true,
                  texts: FACTORS_TEXTS,
                },
                operator: {
                  items: [],
                  groups: [],
                  value: {
                    group: 'groupId',
                    groupId: 'groupId',
                    icon: <span>i</span>,
                    id: 'id',
                    logic: 'logic',
                    name: 'Operator name',
                    value: 'operator value',
                  },
                },
                factor: {
                  selectedFactorType: 'text',
                  defaultFactorType: 'text',
                  textType: 'default',
                  withCustomFactor: <span>With custom factor</span>,
                  autocompleteText: {
                    options: ['option'],
                  },
                  value: 'factor value',
                  parameters: {
                    buttonLabel: 'Factor label',
                    buttonIcon: <span>i</span>,
                    groups: [],
                    items: [],
                  },
                  texts: undefined,
                },
              },
            ],
          },
        ],
      })
    );

    expect(getByText('With custom factor')).toBeTruthy();
    expect(queryByDisplayValue('Factor label')).toBeFalsy();
    expect(queryByDisplayValue('factor value')).toBeFalsy();
  });
});
