import { ReactText, useCallback, useState } from 'react';
import { v4 as uuid } from 'uuid';

import { ConditionStep } from '@synerise/ds-condition';
import { ContextGroup, ContextItem } from '@synerise/ds-context-selector';

import {
  DEFAULT_CONDITION_ROW,
  DEFAULT_CONTEXT_VALUE,
  DEFAULT_FACTOR_VALUE,
  DEFAULT_OPERATOR_VALUE,
  DEFAULT_PARAMETER_VALUE,
  DEFAULT_STEP,
} from '../../Condition/Condition.data';

export const useConditionHandlers = (
  steps: ConditionStep[],
  onChange: (steps: ConditionStep[]) => void,
) => {
  const [openedAddStep, setOpenedAddStep] = useState(false);

  const setStepContext = useCallback(
    (stepId, item) => {
      onChange(
        steps.map((step) => {
          if (step.id === stepId) {
            return {
              ...step,
              context: {
                ...DEFAULT_CONTEXT_VALUE,
                ...step.context,
                selectedItem: item,
              },
              conditions:
                step.conditions.length === 0
                  ? [DEFAULT_CONDITION_ROW()]
                  : step.conditions,
            };
          }
          return step;
        }),
      );
    },
    [onChange, steps],
  );

  const setStepActionAttribute = useCallback(
    (stepId, item) => {
      onChange(
        steps.map((step) => {
          if (step.id === stepId) {
            return {
              ...step,
              actionAttribute: {
                ...step.actionAttribute,
                value: item,
              },
              conditions:
                step.conditions.length === 0
                  ? [DEFAULT_CONDITION_ROW()]
                  : step.conditions,
            };
          }
          return step;
        }),
      );
    },
    [onChange, steps],
  );

  const setStepConditionParameter = useCallback(
    (stepId, conditionId, value) => {
      onChange(
        steps.map((step) => {
          if (step.id === stepId) {
            return {
              ...step,
              conditions: step.conditions.map((condition) => {
                if (conditionId === condition.id) {
                  return {
                    ...condition,
                    parameter: {
                      ...DEFAULT_PARAMETER_VALUE,
                      ...condition.parameter,
                      value: value,
                    },
                  };
                }
                return condition;
              }),
            };
          }
          return step;
        }),
      );
    },
    [onChange, steps],
  );

  const setStepConditionFactorValue = useCallback(
    (stepId, conditionId, value) => {
      onChange(
        steps.map((step) => {
          if (step.id === stepId) {
            return {
              ...step,
              conditions: step.conditions.map((condition) => {
                if (conditionId === condition.id) {
                  return {
                    ...condition,
                    factor: {
                      ...DEFAULT_FACTOR_VALUE,
                      ...condition.factor,
                      value: value,
                    },
                  };
                }
                return condition;
              }),
            };
          }
          return step;
        }),
      );
    },
    [onChange, steps],
  );

  const setStepConditionFactorType = useCallback(
    (stepId, conditionId, value) => {
      onChange(
        steps.map((step) => {
          if (step.id === stepId) {
            return {
              ...step,
              conditions: step.conditions.map((condition) => {
                if (condition.id === conditionId) {
                  return {
                    ...condition,
                    factor: {
                      ...DEFAULT_FACTOR_VALUE,
                      ...condition.factor,
                      value: '',
                      selectedFactorType: value,
                    },
                  };
                }
                return condition;
              }),
            };
          }
          return step;
        }),
      );
    },
    [onChange, steps],
  );

  const setOperatorValue = useCallback(
    (stepId, conditionId, value) => {
      onChange(
        steps.map((step) => {
          if (step.id === stepId) {
            return {
              ...step,
              conditions: step.conditions.map((condition) => {
                if (conditionId === condition.id) {
                  return {
                    ...condition,
                    operator: {
                      ...DEFAULT_OPERATOR_VALUE,
                      ...condition.operator,
                      value: value,
                    },
                  };
                }
                return condition;
              }),
            };
          }
          return step;
        }),
      );
    },
    [onChange, steps],
  );

  const addStepCondition = useCallback(
    (stepId: ReactText) => {
      const newCondition = { ...DEFAULT_CONDITION_ROW(), id: uuid() };
      onChange(
        steps.map((step) => {
          if (step.id === stepId) {
            return {
              ...step,
              conditions: [...step.conditions, newCondition],
            };
          }
          return step;
        }),
      );
      return newCondition.id;
    },
    [onChange, steps],
  );

  const removeStepCondition = useCallback(
    (stepId: ReactText, conditionId: ReactText) => {
      onChange(
        steps.map((step) => {
          if (step.id === stepId) {
            return {
              ...step,
              conditions: step.conditions.filter((c) => c.id !== conditionId),
            };
          }
          return step;
        }),
      );
    },
    [onChange, steps],
  );

  const updateStepName = useCallback(
    (stepId, name) => {
      onChange(
        steps.map((step) => {
          if (step.id === stepId) {
            return {
              ...step,
              stepName: name,
            };
          }
          return step;
        }),
      );
    },
    [onChange, steps],
  );

  const removeStep = useCallback(
    (stepId) => {
      onChange(steps.filter((step) => step.id !== stepId));
    },
    [onChange, steps],
  );

  const duplicateStep = useCallback(
    (stepId) => {
      const duplicatedStep = steps.find((step) => step.id === stepId);
      duplicatedStep && onChange([...steps, { ...duplicatedStep, id: uuid() }]);
    },
    [onChange, steps],
  );

  const addStep = useCallback(() => {
    const newStep = DEFAULT_STEP();
    onChange([...steps, newStep]);
    return newStep.id;
  }, [onChange, steps]);

  const addCustomStep = (selectedItem?: ContextItem | ContextGroup) => {
    const newStep = DEFAULT_STEP();
    onChange([
      ...steps,
      {
        ...newStep,
        context: { ...DEFAULT_CONTEXT_VALUE, ...newStep.context, selectedItem },
      },
    ]);
    setOpenedAddStep(false);
  };

  const onChangeOrder = (newOrder: ConditionStep[]) => {
    onChange(newOrder);
  };

  const handleClick = () => setOpenedAddStep(true);

  return {
    addStep,
    setOperatorValue,
    setStepConditionFactorType,
    setStepConditionFactorValue,
    setStepConditionParameter,
    setStepActionAttribute,
    setStepContext,
    removeStep,
    duplicateStep,
    updateStepName,
    addStepCondition,
    removeStepCondition,
    addCustomStep,
    onChangeOrder,
    handleClick,
    openedAddStep,
    setOpenedAddStep,
  };
};
