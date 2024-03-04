import * as React from 'react';
import { useState, useCallback, ReactText, FC } from 'react';
import { boolean, number, select } from '@storybook/addon-knobs';
import { v4 as uuid } from 'uuid';
import Icon, { Add3M, VarTypeStringM } from '@synerise/ds-icon';
import Condition from '@synerise/ds-condition';
import { ConditionStep } from '@synerise/ds-condition/dist/Condition.types';
import ContextSelector from '@synerise/ds-context-selector';
import Button from '@synerise/ds-button';

import {
  DEFAULT_CONDITION_ROW,
  DEFAULT_STEP,
  PARAMETER_GROUPS,
  PARAMETER_ITEMS,
} from '../../Condition/data/index.data';
import { CONTEXT_GROUPS, CONTEXT_ITEMS, CONTEXT_TEXTS } from '../../ContextSelector/data/index.data';
import { FACTORS_TEXTS } from '../../Factors/data/index.data';
import { OPERATORS_GROUPS, OPERATORS_ITEMS, OPERATORS_TEXTS } from '../../Operators/data/index.data';
import { CONTEXT_CLIENT_GROUPS, CONTEXT_CLIENT_ITEMS } from '../../ContextSelector/data/client.data';
import type { AutoResizeProp } from '@synerise/ds-input';


type ConditionExampleProps = {
  steps: ConditionStep[];
  onChange: (steps: ConditionStep[]) => void;
  hoverDisabled?: boolean;
  readOnly?: boolean;
};

export const ConditionExample = React.forwardRef<HTMLDivElement, ConditionExampleProps>(
  (
    {
      steps,
      onChange,
      hoverDisabled,
      readOnly = false,
    },
    ref
  ) => {
  const [openedAddStep, setOpenedAddStep] = useState(false);
  const setStepContext = useCallback(
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
              conditions: s.conditions.length === 0 ? [DEFAULT_CONDITION_ROW()] : s.conditions,
            };
          }
          return s;
        })
      );
    },
    [onChange, steps]
  );
  const setStepConditionParameter = useCallback(
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

  const setStepConditionFactorValue = useCallback(
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

  const setStepConditionFactorType = useCallback(
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

  const setOperatorValue = useCallback(
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
    [onChange, steps, readOnly]
  );

  const addStepCondition = useCallback(
    (stepId: ReactText) => {
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
      return newCondition.id;
    },
    [onChange, steps]
  );

  const removeStepCondition = useCallback(
    (stepId: ReactText, conditionId: ReactText) => {
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

  const updateStepName = useCallback(
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

  const removeStep = useCallback(
    stepId => {
      onChange(steps.filter(step => step.id !== stepId));
    },
    [onChange, steps]
  );

  const duplicateStep = useCallback(
    stepId => {
      const duplicatedStep = { ...steps.find(step => step.id === stepId) };
      duplicatedStep.id = uuid();
      onChange([...steps, duplicatedStep]);
    },
    [onChange, steps]
  );

  const addStep = useCallback(() => {
    const newStep = DEFAULT_STEP();
    onChange([...steps, newStep]);
    return newStep.id;
  }, [onChange, steps]);

  const addCustomStep = selectedItem => {
    const newStep = DEFAULT_STEP();
    onChange([...steps, { ...newStep, context: { ...newStep.context, selectedItem } }]);
    setOpenedAddStep(false);
  };

  const onChangeOrder = newOrder => {
    onChange(newOrder);
  };

  const handleClick = () => setOpenedAddStep(true);

  const triggerButton = (
    <Button type="ghost" mode="icon-label" onClick={!readOnly ? handleClick : undefined}>
      {!readOnly && <Icon component={<Add3M />} />}
      and then...
    </Button>
  );

  const renderCustomAddStep = () => {
    return (
      <ContextSelector
        texts={{ ...CONTEXT_TEXTS, buttonLabel: 'Add filter' }}
        items={CONTEXT_CLIENT_ITEMS}
        groups={CONTEXT_CLIENT_GROUPS}
        addMode={true}
        onSelectItem={addCustomStep}
        selectedItem={undefined}
        loading={false}
        opened={openedAddStep}
        onClickOutside={() => setOpenedAddStep(false)}
        readOnly={readOnly}
        customTriggerComponent={triggerButton}
      />
    );
  };

  const autoResize = boolean('Set autoResize', true, 'autoresize');
  const autoResizeStretchToParent = boolean('Set autoResize max width to stretch to parent', true, 'autoresize');
  const autoResizeProp: AutoResizeProp = {
    minWidth: `${number('Set autoResize min width', 150, undefined, 'autoresize')}px`,
    stretchToFit: autoResizeStretchToParent
  }
  if (!autoResizeStretchToParent) {
    autoResizeProp.maxWidth = `${number('Set autoResize max width', 300, undefined, 'autoresize')}px`;
  }

  return (
    <div ref={ref}>
      <Condition
        texts={{
          stepNamePlaceholder: 'Unnamed step',
          removeConditionRowTooltip: 'Remove',
          addFirstConditionRowButton: 'where',
          addConditionRowButton: 'and where',
          dropLabel: 'Drop me here',
          addStep: 'And then...',
          duplicateTooltip: 'Duplicate',
          removeTooltip: 'Remove',
          moveTooltip: 'Move',
          conditionSuffix: 'and',
        }}
        minConditionsLength={1}
        maxConditionsLength={10}
        autoClearCondition
        inputProps={autoResize ? { autoResize: autoResizeProp } : undefined}
        addCondition={addStepCondition}
        removeCondition={removeStepCondition}
        onUpdateStepName={boolean('Show step name', true) ? updateStepName : undefined}
        removeStep={removeStep}
        duplicateStep={duplicateStep}
        addStep={boolean('Enable default add step', false) ? addStep : undefined}
        renderAddStep={boolean('Enable custom add step', true) ? renderCustomAddStep : undefined}
        onChangeOrder={boolean('Enable change order', true) && onChangeOrder}
        onChangeContext={setStepContext}
        onChangeSubject={setStepContext}
        onChangeParameter={setStepConditionParameter}
        onChangeOperator={setOperatorValue}
        onChangeFactorValue={setStepConditionFactorValue}
        onChangeFactorType={setStepConditionFactorType}
        showSuffix={boolean('Display and suffix', true)}
        hoverDisabled={hoverDisabled}
        readOnly={readOnly}
        steps={steps.map(step => ({
          id: step.id,
          stepName: step.stepName,
          context: {
            texts: CONTEXT_TEXTS,
            // onSelectItem: item => setStepSubject(step.id, item),
            selectedItem: step.context?.selectedItem,
            items: CONTEXT_ITEMS,
            groups: CONTEXT_GROUPS,
            type: step.context?.type,
          },
          conditions: step.conditions.map(condition => ({
            id: condition.id,
            parameter: {
              availableFactorTypes: ['parameter'],
              selectedFactorType: 'parameter',
              defaultFactorType: 'parameter',
              value: condition.parameter?.value,
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
              value: condition.operator?.value,
              items: OPERATORS_ITEMS,
              groups: OPERATORS_GROUPS,
              texts: OPERATORS_TEXTS,
            },
            factor: {
              // @ts-ignore availableFactors is just sample data
              availableFactorTypes: condition.operator?.value?.availableFactors || null,
              selectedFactorType: condition.factor?.selectedFactorType,
              defaultFactorType: 'text',
              textType: select('Select type of text input', ['autocomplete', 'expansible', 'default'], 'default'),
              autocompleteText: {
                options: ['First name', 'Last name', 'City', 'Age', 'Points'],
              },
              value: condition.factor?.value,
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
    </div>
  );
});