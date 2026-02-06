import React from 'react';

import { NotificationsM, VarTypeStringM } from '@synerise/ds-icon';
import { renderWithProvider } from '@synerise/ds-core';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Condition from '../Condition';
import {
  type ConditionProps,
  type ConditionStep,
  type StepConditions,
} from '../Condition.types';
import {
  FACTORS_TEXTS,
  OPERATORS_GROUPS,
  OPERATORS_ITEMS,
  OPERATORS_TEXTS,
  PARAMETER_GROUPS,
  PARAMETER_ITEMS,
  SUBJECT_ITEMS,
} from './data/index.data';

const DEFAULT_CONDITION_ROW: {
  [P in keyof StepConditions]: Partial<StepConditions[P]>;
} = {
  id: 'e5b71a06-0eb2-434f-9411-0259b1804862',
  parameter: {
    value: '',
  },
  operator: {
    value: undefined,
  },
  factor: {
    selectedFactorType: undefined,
    defaultFactorType: 'text',
    value: `text-6e35703c-7d60-4662-8803-4b346dccafed`,
  },
};
const DEFAULT_STEP: ConditionStep = {
  id: 0,
  stepName: 'Step name',
  subject: {
    type: 'event',
    placeholder: 'Choose event',
    iconPlaceholder: <NotificationsM />,
    selectedItem: SUBJECT_ITEMS[0],
    items: SUBJECT_ITEMS,
    /** @fixme */
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
  return new Array(conditionsNumber)
    .fill(DEFAULT_CONDITION_ROW)
    .map((condition) => ({
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

const getSteps = (
  stepsNumber: number,
  conditionsNumber: number,
): ConditionStep[] => {
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
  renderAddStep: () => undefined,
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
  steps: getSteps(1, 1),
});

const RENDER_CONDITIONS = (props?: Partial<ConditionProps>) => {
  return <Condition {...DEFAULT_PROPS()} {...props} />;
};

describe('Condition component', () => {
  beforeAll(() => {
    jest.mock('lodash.debounce', () => jest.fn((fn) => fn));
  });
  test('Should render', () => {
    const { container } = renderWithProvider(RENDER_CONDITIONS());

    expect(container.querySelector('.ds-conditions')).toBeTruthy();
  });
  test('Should update step name', async () => {
    const NEW_STEP_NAME = 'First step';
    const STEP_ID = DEFAULT_STATE.steps[0].id;
    const onUpdateStepName = jest.fn();
    const { container } = renderWithProvider(
      RENDER_CONDITIONS({ onUpdateStepName }),
    );
    const input = container.querySelector(`#conditionStepName${STEP_ID}`);

    input && fireEvent.change(input, { target: { value: NEW_STEP_NAME } });

    await waitFor(() =>
      expect(onUpdateStepName).toBeCalledWith(STEP_ID, NEW_STEP_NAME),
    );
  });

  test('Should not render add condition row button', () => {
    renderWithProvider(RENDER_CONDITIONS({ addCondition: undefined }));
    const addConditionButton = screen.queryByText(
      DEFAULT_TEXTS.addConditionRowButton,
    );

    expect(addConditionButton).not.toBeInTheDocument();
  });

  test('Should not render remove condition row button for single condition row', () => {
    const { queryByTestId } = renderWithProvider(RENDER_CONDITIONS());
    const removeButton = queryByTestId('ds-conditions-remove-row');

    expect(removeButton).toBeFalsy();
  });

  test('Should call addCondition callback', () => {
    const addCondition = jest.fn();
    renderWithProvider(RENDER_CONDITIONS({ addCondition }));

    const addConditionButton = screen.getByText(
      DEFAULT_TEXTS.addConditionRowButton,
    );

    fireEvent.click(addConditionButton);

    expect(addCondition).toBeCalled();
  });

  test('Should call removeCondition callback', () => {
    const removeCondition = jest.fn();
    const { getAllByTestId } = renderWithProvider(
      RENDER_CONDITIONS({ removeCondition, steps: getSteps(1, 2) }),
    );
    const removeButton = getAllByTestId('ds-conditions-remove-row')[0];

    removeButton && fireEvent.click(removeButton);

    expect(removeCondition).toBeCalled();
  });

  test('Should render add step button and call addStep callback', () => {
    const addStep = jest.fn();
    renderWithProvider(RENDER_CONDITIONS({ addStep }));

    fireEvent.click(screen.getByText(DEFAULT_TEXTS.addStep));
    expect(addStep).toBeCalled();
  });

  test('Should render without add step button', () => {
    renderWithProvider(RENDER_CONDITIONS({ addStep: undefined }));

    expect(screen.queryByText(DEFAULT_TEXTS.addStep)).toBeFalsy();
  });

  test('Should render with drag handle icon', () => {
    const onChangeOrder = jest.fn();
    const { container } = renderWithProvider(
      RENDER_CONDITIONS({ steps: getSteps(2, 1), onChangeOrder }),
    );
    const dragIcons = container.querySelectorAll('.drag-handle-m');

    expect(dragIcons.length).toBe(2);
  });

  test('Should render without drag icon', () => {
    const { container } = renderWithProvider(
      RENDER_CONDITIONS({ steps: getSteps(2, 1), onChangeOrder: undefined }),
    );
    const dragIcons = container.querySelectorAll('.drag-handle-m');

    expect(dragIcons.length).toBe(0);
  });

  test('Should call remove step callback', () => {
    const removeStep = jest.fn();
    const { container } = renderWithProvider(RENDER_CONDITIONS({ removeStep }));
    const removeIcon = container.querySelector('.ds-cruds .delete');

    fireEvent.click(removeIcon as HTMLElement);

    expect(removeStep).toBeCalledWith(0);
  });

  test('Should call duplicate step callback', () => {
    const duplicateStep = jest.fn();
    const { container } = renderWithProvider(
      RENDER_CONDITIONS({ duplicateStep }),
    );
    const duplicateIcon = container.querySelector('.ds-cruds .duplicate');

    fireEvent.click(duplicateIcon as HTMLElement);

    expect(duplicateStep).toBeCalledWith(0);
  });

  test('rendering only parameter if there are no operator and factor provided', () => {
    renderWithProvider(
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
      }),
    );

    expect(screen.getByText('Parameter label')).toBeTruthy();
  });

  test('rendering only operator if there are no parameter and factor provided', () => {
    renderWithProvider(
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
      }),
    );

    expect(screen.getByText('Operator name')).toBeTruthy();
  });

  test('not rendering operator if there is also parameter provided but without value', () => {
    renderWithProvider(
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
      }),
    );

    expect(screen.getByText('Parameter label')).toBeTruthy();
    expect(screen.queryByText('Operator name')).toBeFalsy();
  });

  test('rendering operator and parameter if there is parameter value set', () => {
    renderWithProvider(
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
      }),
    );

    expect(screen.getByText('Parameter label')).toBeTruthy();
    expect(screen.getByText('Operator name')).toBeTruthy();
  });

  test('not rendering factor if there is operator but without value', () => {
    renderWithProvider(
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
      }),
    );

    expect(screen.getByText('Parameter label')).toBeTruthy();
    expect(screen.queryByDisplayValue('factor value')).toBeFalsy();
  });

  test('rendering factor if there is operator with value set', () => {
    renderWithProvider(
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
      }),
    );

    expect(screen.getByText('Parameter label')).toBeTruthy();
    expect(screen.queryByDisplayValue('factor value')).toBeTruthy();
  });

  test('rendering custom factor component', () => {
    renderWithProvider(
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
      }),
    );

    expect(screen.getByText('With custom factor')).toBeTruthy();
    expect(screen.queryByDisplayValue('Factor label')).toBeFalsy();
    expect(screen.queryByDisplayValue('factor value')).toBeFalsy();
  });
  it('should not render step name', () => {
    const { container } = renderWithProvider(
      RENDER_CONDITIONS({ onUpdateStepName: undefined }),
    );

    expect(container.querySelector('.ds-condition-step-header')).toBeNull();
  });
  it('should render custom add step component', () => {
    renderWithProvider(
      RENDER_CONDITIONS({
        renderAddStep: () => <span>CUSTOM ADD STEP BUTTON</span>,
      }),
    );

    expect(screen.getByText('CUSTOM ADD STEP BUTTON')).toBeTruthy();
  });

  it('should render tooltip on selectedItem mouseOver', async () => {
    renderWithProvider(
      RENDER_CONDITIONS({
        steps: [
          {
            ...DEFAULT_STEP,
            conditions: getConditions(1),
            context: {
              texts: {
                buttonLabel: 'Choose',
                searchPlaceholder: 'Search',
                noResults: 'No results',
                loadingResults: 'Loading results',
              },
              selectedItem: {
                id: 'a',
                name: 'TEST_SELECTED_ITEM',
                subtitle: 'TEST_SELECTED_ITEM_SUBTITLE',
                icon: <VarTypeStringM />,
              },
              groups: [],
              items: [
                {
                  id: 'a',
                  name: 'TEST_SELECTED_ITEM',
                  subtitle: 'TEST_SELECTED_ITEM_SUBTITLE',
                  icon: <VarTypeStringM />,
                },
              ],
            },
          },
        ],
      }),
    );
    await userEvent.hover(screen.getByText('TEST_SELECTED_ITEM'));
    expect(
      await screen.findByText('TEST_SELECTED_ITEM_SUBTITLE'),
    ).toBeInTheDocument();
  });
});
