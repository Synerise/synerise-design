import * as React from 'react';
import Condition from '@synerise/ds-condition';
import { withState } from '@dump247/storybook-state';
import Icon, { Add3M, VarTypeStringM } from '@synerise/ds-icon';
import {
  DEFAULT_CONDITION_ROW,
  DEFAULT_STATE,
  DEFAULT_STEP,
  PARAMETER_GROUPS,
  PARAMETER_ITEMS,
} from './data/index.data';
import { boolean, number, select } from '@storybook/addon-knobs';
import { v4 as uuid } from 'uuid';
import { OPERATORS_GROUPS, OPERATORS_ITEMS, OPERATORS_TEXTS } from '../Operators/data/index.data';
import { FACTORS_TEXTS } from '../Factors/data/index.data';
import { CONTEXT_GROUPS, CONTEXT_ITEMS, CONTEXT_TEXTS } from '../ContextSelector/data/index.data';
import Button from '@synerise/ds-button';
import ContextSelector from '@synerise/ds-context-selector';
import { CONTEXT_CLIENT_GROUPS, CONTEXT_CLIENT_ITEMS } from '../ContextSelector/data/client.data';
import { ConditionStep } from '@synerise/ds-condition/dist/Condition.types';

export const defaultTransforms = {
  transformStep: (step: ConditionStep): ConditionStep => step,
  props: {
    defaultDropdownVisibility: false,
  },
};

export type Transform = typeof defaultTransforms;

const stories = {
  default: withState(DEFAULT_STATE)(({ store, ...context }) => {
    const {
      transformStep,
      props: { defaultDropdownVisibility },
    } = Object.assign({}, defaultTransforms, context) as Transform;
    const setStepContext = (stepId, item) => {
      store.set({
        steps: store.state.steps.map(s => {
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
        }),
      });
    };
    const setStepConditionParameter = (stepId, conditionId, value) => {
      store.set({
        steps: store.state.steps.map(s => {
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
        }),
      });
    };

    const setStepConditionFactorValue = (stepId, conditionId, value) => {
      store.set({
        steps: store.state.steps.map(s => {
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
        }),
      });
    };

    const setStepConditionFactorType = (stepId, conditionId, value) => {
      store.set({
        steps: store.state.steps.map(s => {
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
        }),
      });
    };

    const setOperatorValue = (stepId, conditionId, value) => {
      store.set({
        steps: store.state.steps.map(s => {
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
        }),
      });
    };

    const addStepCondition = (stepId: React.ReactText) => {
      const newCondition = { ...DEFAULT_CONDITION_ROW(), id: uuid() };
      store.set({
        steps: store.state.steps.map(step => {
          if (step.id === stepId) {
            return {
              ...step,
              conditions: [...step.conditions, newCondition],
            };
          }
          return step;
        }),
      });
      return newCondition.id;
    };

    const removeStepCondition = (stepId: React.ReactText, conditionId: React.ReactText) => {
      store.set({
        steps: store.state.steps.map(step => {
          if (step.id === stepId) {
            return {
              ...step,
              conditions: step.conditions.filter(c => c.id !== conditionId),
            };
          }
          return step;
        }),
      });
    };

    const updateStepName = (stepId, name) => {
      store.set({
        steps: store.state.steps.map(step => {
          if (step.id === stepId) {
            return {
              ...step,
              stepName: name,
            };
          }
          return step;
        }),
      });
    };

    const removeStep = stepId => {
      store.set({
        steps: store.state.steps.filter(step => step.id !== stepId),
      });
    };

    const duplicateStep = stepId => {
      const duplicatedStep = { ...store.state.steps.find(step => step.id === stepId) };
      duplicatedStep.id = uuid();
      store.set({
        steps: [...store.state.steps, duplicatedStep],
      });
    };

    const addStep = () => {
      const newStep = DEFAULT_STEP();
      store.set({
        steps: [...store.state.steps, newStep],
      });
      return newStep.id;
    };

    const addCustomStep = selectedItem => {
      const newStep = DEFAULT_STEP();
      store.set({
        steps: [...store.state.steps, { ...newStep, context: { ...newStep.context, selectedItem } }],
      });
      store.set({ openedAddStep: false });
    };

    const onChangeOrder = newOrder => {
      store.set({ steps: newOrder });
    };

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
          opened={store.state.openedAddStep}
          onClickOutside={() => store.set({ openedAddStep: false })}
          customTriggerComponent={
            <Button type="ghost" mode="icon-label" onClick={() => store.set({ openedAddStep: true })}>
              <Icon component={<Add3M />} />
              and then...
            </Button>
          }
        />
      );
    };

    return (
      <div
        style={{
          padding: '48px 24px 24px 48px',
          height: '100%',
          width: '100%',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          position: 'absolute',
          top: '0',
          left: '0',
        }}
      >
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
          }}
          inputProps={{autoResize: boolean('Set autoResize', true) ? {maxWidth: `${number('Set autoResize max width', 450)}px`, minWidth: `${number('Set autoResize min width', 144)}px`} : undefined }}
          getPopupContainerOverride={(): HTMLElement => document.body}
          autoClearCondition={boolean('Enable autoclear condition elements', true)}
          addCondition={boolean('Enable add condition', true) && addStepCondition}
          removeCondition={removeStepCondition}
          onUpdateStepName={boolean('Show step name', true) ? updateStepName : undefined}
          removeStep={removeStep}
          duplicateStep={duplicateStep}
          addStep={boolean('Enable default add step', false) ? addStep : undefined}
          renderAddStep={boolean('Enable custom add step', true) ? renderCustomAddStep : undefined}
          onChangeOrder={boolean('Enable change order', true) && onChangeOrder}
          minConditionsLength={0}
          maxConditionsLength={5}
          onChangeContext={setStepContext}
          onChangeSubject={setStepContext}
          onChangeParameter={setStepConditionParameter}
          onChangeOperator={setOperatorValue}
          onChangeFactorValue={setStepConditionFactorValue}
          onChangeFactorType={setStepConditionFactorType}
          showSuffix={boolean('Display and suffix', true)}
          steps={store.state.steps.map(step =>
            transformStep({
              id: step.id,
              stepName: step.stepName,
              context: {
                texts: CONTEXT_TEXTS,
                selectedItem: step.context.selectedItem,
                items: CONTEXT_ITEMS,
                groups: CONTEXT_GROUPS,
                type: step.context.type,
                loading: boolean('Loading context content', false),
                defaultDropdownVisibility: defaultDropdownVisibility,
              },
              conditions: step.conditions.map(condition => ({
                id: condition.id,
                parameter: {
                  availableFactorTypes: ['parameter'],
                  selectedFactorType: 'parameter',
                  defaultFactorType: 'parameter',
                  setSelectedFactorType: () => {},
                  onParamsClick: () => {
                    console.log('params click');
                  },
                  value: condition.parameter.value,
                  parameters: {
                    buttonLabel: 'Parameter',
                    buttonIcon: <VarTypeStringM />,
                    groups: PARAMETER_GROUPS,
                    items: PARAMETER_ITEMS,
                  },
                  withoutTypeSelector: true,
                  texts: FACTORS_TEXTS,
                  loading: boolean('Loading parameters content', false),
                },
                operator: {
                  value: condition.operator.value,
                  items: OPERATORS_ITEMS,
                  groups: OPERATORS_GROUPS,
                  texts: OPERATORS_TEXTS,
                },
                factor: {
                  // @ts-ignore availableFactors is just sample data
                  availableFactorTypes: condition.operator?.value?.availableFactors || null,
                  selectedFactorType: condition.factor.selectedFactorType,
                  defaultFactorType: 'text',
                  textType: select('Select type of text input', ['autocomplete', 'expansible', 'default'], 'default'),
                  autocompleteText: {
                    options: ['First name', 'Last name', 'City', 'Age', 'Points'],
                  },
                  value: condition.factor.value,
                  formulaEditor: <div>Formula editor</div>,
                  withCustomFactor: boolean('With custom factor component', false) && (
                    <span>Custom factor component</span>
                  ),
                  parameters: {
                    buttonLabel: 'Parameter',
                    buttonIcon: <VarTypeStringM />,
                    groups: PARAMETER_GROUPS,
                    items: PARAMETER_ITEMS,
                  },
                  texts: FACTORS_TEXTS,
                },
              })),
            })
          )}
        />
      </div>
    );
  }),
};

export default {
  name: 'Components/Filter/Condition',
  config: {},
  stories,
  Component: Condition,
};
