import * as React from 'react';

import Condition from '@synerise/ds-condition';
import Subject from '@synerise/ds-subject';
import { withState } from '@dump247/storybook-state';
import { NotificationsM, VarTypeStringM } from '@synerise/ds-icon/dist/icons';
import Factors from '@synerise/ds-factors';
import { PARAMETER_GROUPS, PARAMETER_ITEMS, SUBJECT_ITEMS } from './data/index.data';
import { boolean } from '@storybook/addon-knobs';
import { v4 as uuid } from 'uuid';
import { OPERATORS_GROUPS, OPERATORS_ITEMS, OPERATORS_TEXTS } from '../Operators/data/index.data';
import Operators from '@synerise/ds-operators';
import { FACTORS_TEXTS } from '../Factors/data/index.data';

const DEFAULT_CONDITION_ROW = {
  id: uuid(),
  parameter: {
    value: '',
  },
  operator: {
    value: '',
  },
  factor: {
    selectedFactorType: '',
    defaultFactorType: 'text',
    value: ''
  }
}

const DEFAULT_STATE = {
  selected: undefined,
  selectedFactorType: undefined,
  factorValue: undefined,
  steps: [
    {
      id: 0,
      stepName: 'Step name',
      subject: {
        showPreview: undefined,
        type: 'event' as const,
        placeholder: 'Choose event',
        iconPlaceholder: <NotificationsM />,
        selectedItem: undefined,
        items: SUBJECT_ITEMS,
      },
      conditions: [
        DEFAULT_CONDITION_ROW
      ]
    }
  ]
}

const stories = {
  default: withState(DEFAULT_STATE)(({ store }) => {
    const setStepSubject = (stepId, item) => {
      store.set({
        steps: store.state.steps.map(s => {
          if(s.id === stepId) {
            return {
              ...s,
              subject: {
                ...s.subject,
                selectedItem: item,
              }
            }
          }
          return s;
        })
      })
    }
    const setStepConditionParameter = (stepId, conditionId, value) => {
      store.set({
        steps: store.state.steps.map(s => {
          if(s.id === stepId) {
            return {
              ...s,
              conditions: s.conditions.map((c) => {
                if(conditionId === c.id) {
                  return {
                    ...c,
                    parameter: {
                      ...c.parameter,
                      value: value
                    }
                  }
                }
                return c;
              })
            }
          }
          return s;
        })
      })
    }

    const setStepConditionFactorValue = (stepId, conditionId, value) => {
      store.set({
        steps: store.state.steps.map(s => {
          if(s.id === stepId) {
            return {
              ...s,
              conditions: s.conditions.map((c) => {
                if(conditionId === c.id) {
                  return {
                    ...c,
                    factor: {
                      ...c.factor,
                      value: value
                    }
                  }
                }
                return c;
              })
            }
          }
          return s;
        })
      })
    }

    const setStepConditionFactorType = (stepId, conditionId, value) => {
      store.set({
        steps: store.state.steps.map(s => {
          if(s.id === stepId) {
            return {
              ...s,
              conditions: s.conditions.map((c) => {
                if(c.id === conditionId) {
                  return {
                    ...c,
                    factor: {
                      ...c.factor,
                      value: '',
                      selectedFactorType: value
                    }
                  }
                }
                return c;
              })
            }
          }
          return s;
        })
      })
    }

    const setOperatorValue = (stepId, conditionId, value) => {
      store.set({
        steps: store.state.steps.map(s => {
          if(s.id === stepId) {
            return {
              ...s,
              conditions: s.conditions.map((c) => {
                if(conditionId === c.id) {
                  return {
                    ...c,
                    operator: {
                      ...c.operator,
                      value: value
                    }
                  }
                }
                return c;
              })
            }
          }
          return s;
        })
      })
    }

    const addStepCondition = (stepId: React.ReactText) => {
      const newCondition = { ...DEFAULT_CONDITION_ROW, id: uuid() };
      store.set({
        steps: store.state.steps.map((step) => {
          if(step.id === stepId) {
            return {
              ...step,
              conditions: [...step.conditions, newCondition],
            }
          }
          return step;
        })
      })
    };

    const removeStepCondition = (stepId: React.ReactText, conditionId: React.ReactText) => {
      console.log(stepId, conditionId);
      store.set({
        steps: store.state.steps.map((step) => {
          if(step.id === stepId) {
            return {
              ...step,
              conditions: step.conditions.filter((c) => c.id !== conditionId),
            }
          }
          return step;
        })
      })
    };

    const updateStepName = (stepId, name) => {
      store.set({
        steps: store.state.steps.map((step) => {
          if(step.id === stepId) {
            return {
              ...step,
              stepName: name
            }
          }
          return step;
        })
      })
    };

    return (
      <Condition
        texts={{
          stepNamePlaceholder: 'Step name',
          removeConditionRowTooltip: 'Remove',
          addConditionRowButton: 'and where',
        }}
        addCondition={boolean('Enable add new condition row', true) && addStepCondition}
        removeCondition={removeStepCondition}
        updateStepName={updateStepName}
        steps={
          store.state.steps.map(step => ({
            id: step.id,
            stepName: boolean('Show step name', true) && step.stepName,
            subject: (
              <Subject
                selectItem={(item) => setStepSubject(step.id, item)}
                showPreview={step.subject.showPreview}
                type={step.subject.type}
                placeholder={step.subject.placeholder}
                iconPlaceholder={step.subject.iconPlaceholder}
                selectedItem={step.subject.selectedItem}
                items={SUBJECT_ITEMS}
              />
            ),
            conditions: step.conditions.map((condition, index) => ({
              id: condition.id,
              parameter: <Factors
                availableFactorTypes={['parameter']}
                selectedFactorType={'parameter'}
                defaultFactorType={'parameter'}
                setSelectedFactorType={() => {}}
                onChangeValue={(value) => setStepConditionParameter(step.id, condition.id, value)}
                value={condition.parameter.value}
                parameters={{
                  buttonLabel: 'Parameter',
                  buttonIcon: <VarTypeStringM />,
                  groups: PARAMETER_GROUPS,
                  items: PARAMETER_ITEMS
                }}
                withoutTypeSelector={true}
                texts={FACTORS_TEXTS}
              />,
              operator: <Operators
                onChange={(value) => setOperatorValue(step.id, condition.id, value)}
                value={condition.operator.value}
                items={OPERATORS_ITEMS}
                groups={OPERATORS_GROUPS}
                texts={OPERATORS_TEXTS}
              />,
              factor: <Factors
                selectedFactorType={condition.factor.selectedFactorType}
                defaultFactorType={'text'}
                setSelectedFactorType={(factorType) => setStepConditionFactorType(step.id, condition.id, factorType)}
                onChangeValue={(value) => setStepConditionFactorValue(step.id, condition.id, value)}
                value={condition.factor.value}
                parameters={{
                  buttonLabel: 'Parameter',
                  buttonIcon: <VarTypeStringM />,
                  groups: PARAMETER_GROUPS,
                  items: PARAMETER_ITEMS
                }}
                texts={FACTORS_TEXTS}
              />,
            }))
          }))
        } />
    );
  }
)};

export default {
name: 'Components/Condition',
  config: {},
  stories,
  Component: Condition,
}
