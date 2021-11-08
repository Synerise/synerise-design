import { boolean, select } from '@storybook/addon-knobs';
import {
  DEFAULT_CONDITION_ROW,
  DEFAULT_STEP,
  PARAMETER_GROUPS,
  PARAMETER_ITEMS,
} from '../../Condition/data/index.data';
import { CONTEXT_GROUPS, CONTEXT_ITEMS, CONTEXT_TEXTS } from '../../ContextSelector/data/index.data';
import { VarTypeStringM } from '@synerise/ds-icon';
import { FACTORS_TEXTS } from '../../Factors/data/index.data';
import { OPERATORS_GROUPS, OPERATORS_ITEMS, OPERATORS_TEXTS } from '../../Operators/data/index.data';
import * as React from 'react';
import Condition from '@synerise/ds-condition';
import { v4 as uuid } from 'uuid';
import { ConditionStep } from '@synerise/ds-condition/dist/Condition.types';

type ConditionExampleProps = {
  steps: ConditionStep[];
  onChange: (steps: ConditionStep[]) => void;
};

export const ConditionExample: React.FC<ConditionExampleProps> = ({ steps, onChange }) => {
  const setStepContext = React.useCallback(
    (stepId, item) => {
      onChange(
        steps.map(s => {
          if (s.id === stepId) {
            return {
              ...s,
              context: {
                ...s.context,
                selectedItem: item,
              },
            };
          }
          return s;
        })
      );
    },
    [onChange, steps]
  );
  const setStepConditionParameter = React.useCallback(
    (stepId, conditionId, value) => {
      onChange(
        steps.map(s => {
          if (s.id === stepId) {
            return {
              ...s,
              conditions: s.conditions.map(c => {
                if (conditionId === c.id) {
                  return {
                    ...c,
                    parameter: {
                      ...c.parameter,
                      value: value,
                    },
                  };
                }
                return c;
              }),
            };
          }
          return s;
        })
      );
    },
    [onChange, steps]
  );

  const setStepConditionFactorValue = React.useCallback(
    (stepId, conditionId, value) => {
      onChange(
        steps.map(s => {
          if (s.id === stepId) {
            return {
              ...s,
              conditions: s.conditions.map(c => {
                if (conditionId === c.id) {
                  return {
                    ...c,
                    factor: {
                      ...c.factor,
                      value: value,
                    },
                  };
                }
                return c;
              }),
            };
          }
          return s;
        })
      );
    },
    [onChange, steps]
  );

  const setStepConditionFactorType = React.useCallback(
    (stepId, conditionId, value) => {
      onChange(
        steps.map(s => {
          if (s.id === stepId) {
            return {
              ...s,
              conditions: s.conditions.map(c => {
                if (c.id === conditionId) {
                  return {
                    ...c,
                    factor: {
                      ...c.factor,
                      value: '',
                      selectedFactorType: value,
                    },
                  };
                }
                return c;
              }),
            };
          }
          return s;
        })
      );
    },
    [onChange, steps]
  );

  const setOperatorValue = React.useCallback(
    (stepId, conditionId, value) => {
      onChange(
        steps.map(s => {
          if (s.id === stepId) {
            return {
              ...s,
              conditions: s.conditions.map(c => {
                if (conditionId === c.id) {
                  return {
                    ...c,
                    operator: {
                      ...c.operator,
                      value: value,
                    },
                  };
                }
                return c;
              }),
            };
          }
          return s;
        })
      );
    },
    [onChange, steps]
  );

  const addStepCondition = React.useCallback(
    (stepId: React.ReactText) => {
      const newCondition = { ...DEFAULT_CONDITION_ROW(), id: uuid() };
      onChange(
        // @ts-ignore
        steps.map(step => {
          if (step.id === stepId) {
            return {
              ...step,
              conditions: [...step.conditions, newCondition],
            };
          }
          return step;
        })
      );
    },
    [onChange, steps]
  );

  const removeStepCondition = React.useCallback(
    (stepId: React.ReactText, conditionId: React.ReactText) => {
      onChange(
        steps.map(step => {
          if (step.id === stepId) {
            return {
              ...step,
              conditions: step.conditions.filter(c => c.id !== conditionId),
            };
          }
          return step;
        })
      );
    },
    [onChange, steps]
  );

  const updateStepName = React.useCallback(
    (stepId, name) => {
      onChange(
        steps.map(step => {
          if (step.id === stepId) {
            return {
              ...step,
              stepName: name,
            };
          }
          return step;
        })
      );
    },
    [onChange, steps]
  );

  const removeStep = React.useCallback(
    stepId => {
      onChange(steps.filter(step => step.id !== stepId));
    },
    [onChange, steps]
  );

  const duplicateStep = React.useCallback(
    stepId => {
      const duplicatedStep = { ...steps.find(step => step.id === stepId) };
      duplicatedStep.id = uuid();
      onChange([...steps, duplicatedStep]);
    },
    [onChange, steps]
  );

  const addStep = React.useCallback(() => {
    onChange([...steps, DEFAULT_STEP()]);
  }, [onChange, steps]);

  const onChangeOrder = newOrder => {
    onChange(newOrder);
  };

  return (
    <Condition
      texts={{
        stepNamePlaceholder: 'Unnamed step',
        removeConditionRowTooltip: 'Remove',
        addFirstConditionRowButton: 'where',
        addConditionRowButton: 'and where',
        dropLabel: 'Drop me here',
        addStep: 'Add funnel step',
        duplicateTooltip: 'Duplicate',
        removeTooltip: 'Remove',
        moveTooltip: 'Move',
      }}
      minConditionsLength={1}
      maxConditionsLength={10}
      autoClearCondition
      addCondition={addStepCondition}
      removeCondition={removeStepCondition}
      onUpdateStepName={updateStepName}
      removeStep={removeStep}
      duplicateStep={duplicateStep}
      addStep={addStep}
      onChangeOrder={boolean('Enable change order', true) && onChangeOrder}
      onChangeContext={setStepContext}
      onChangeSubject={setStepContext}
      onChangeParameter={setStepConditionParameter}
      onChangeOperator={setOperatorValue}
      onChangeFactorValue={setStepConditionFactorValue}
      onChangeFactorType={setStepConditionFactorType}
      steps={steps.map(step => ({
        id: step.id,
        stepName: boolean('Show step name', true) && step.stepName,
        context: {
          texts: CONTEXT_TEXTS,
          // onSelectItem: item => setStepSubject(step.id, item),
          selectedItem: step.context.selectedItem,
          items: CONTEXT_ITEMS,
          groups: CONTEXT_GROUPS,
        },
        conditions: step.conditions.map(condition => ({
          id: condition.id,
          parameter: {
            availableFactorTypes: ['parameter'],
            selectedFactorType: 'parameter',
            defaultFactorType: 'parameter',
            // setSelectedFactorType: () => {},
            // onChangeValue: value => setStepConditionParameter(step.id, condition.id, value),
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
            // onChange: value => setOperatorValue(step.id, condition.id, value),
            value: condition.operator.value,
            items: OPERATORS_ITEMS,
            groups: OPERATORS_GROUPS,
            texts: OPERATORS_TEXTS,
          },
          factor: {
            selectedFactorType: condition.factor.selectedFactorType,
            defaultFactorType: 'text',
            // setSelectedFactorType: factorType => setStepConditionFactorType(step.id, condition.id, factorType),
            // onChangeValue: value => setStepConditionFactorValue(step.id, condition.id, value),
            textType: select('Select type of text input', ['autocomplete', 'expansible', 'default'], 'default'),
            autocompleteText: {
              options: ['First name', 'Last name', 'City', 'Age', 'Points'],
            },
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
        })),
      }))}
    />
  );
};
