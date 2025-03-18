import React, { ReactText, useState } from 'react';
import { v4 as uuid } from 'uuid';

import { action } from '@storybook/addon-actions';
import Button from '@synerise/ds-button';
import Condition, { ConditionStep } from '@synerise/ds-condition';
import ContextSelector, { ContextGroup, ContextItem } from '@synerise/ds-context-selector';
import ItemPicker, { ItemPickerProps, ItemPickerPropsNew } from '@synerise/ds-item-picker';
import type { FactorValueType } from '@synerise/ds-factors';
import type { OperatorsItem } from '@synerise/ds-operators';
import Icon, { Add3M } from '@synerise/ds-icon';

import type { ConditionMeta, ConditionStory } from './Condition.types';

import {
  CONDITION_TEXTS,
  DEFAULT_ACTION_ATTRIBUTE_VALUE,
  DEFAULT_CONDITION_ROW,
  DEFAULT_CONTEXT_VALUE,
  DEFAULT_FACTOR_VALUE,
  DEFAULT_OPERATOR_VALUE,
  DEFAULT_PARAMETER_VALUE,
  DEFAULT_STEP,
  getAvailableFactorTypes,
} from './Condition.data';

import { CONTEXT_TEXTS } from '../ContextSelector/data/context.data';
import { CONTEXT_CLIENT_GROUPS, CONTEXT_CLIENT_ITEMS } from '../ContextSelector/data/client.data';
import { BOOLEAN_CONTROL, controlFromOptionsArray, fixedWrapper300, NUMBER_CONTROL } from '../../utils';
import { ITEMS_IN_SECTIONS, SECTIONS } from '../ItemPicker/ItemPicker.data';

export default {
  component: Condition,
  title: 'Components/Filter/Condition',
  tags: ['autodocs'],
  decorators: [fixedWrapper300],
  render: ({
    addStepType,
    textFactorInputType,
    withCustomFactor,
    enableChangeOrder,
    enableAddCondition,
    showStepName,
    showActionAttribute,
    ...args
  }) => {
    const [steps, setSteps] = useState(args.steps);
    const [openedAddStep, setOpenedAddStep] = useState(false);

    const handleChangeContext = (stepId: ReactText, item?: ContextItem | ContextGroup) => {
      setSteps(
        steps.map(step => {
          return step.id === stepId
            ? {
                ...step,
                context: {
                  ...DEFAULT_CONTEXT_VALUE,
                  ...step.context,
                  selectedItem: item as ContextItem,
                },
                conditions:
                  step.conditions.length === 0 && !showActionAttribute ? [DEFAULT_CONDITION_ROW()] : step.conditions,
              }
            : step;
        })
      );
      args.onChangeContext?.(stepId, item);
    };

    const handleChangeActionAttribute = (stepId: ReactText, item?: FactorValueType) => {
      setSteps(
        steps.map(step => {
          return step.id === stepId
            ? {
                ...step,
                actionAttribute: {
                  ...DEFAULT_ACTION_ATTRIBUTE_VALUE,
                  ...step.actionAttribute,
                  value: item,
                },
                conditions: step.conditions.length === 0 ? [DEFAULT_CONDITION_ROW()] : step.conditions,
              }
            : step;
        })
      );
      args.onChangeActionAttribute?.(stepId, item);
    };

    const handleChangeParameter = (stepId: ReactText, conditionId: ReactText, value: FactorValueType) => {
      setSteps(
        steps.map(step => {
          return step.id === stepId
            ? {
                ...step,
                conditions: step.conditions?.map(condition => {
                  return conditionId === condition.id
                    ? {
                        ...condition,
                        parameter: {
                          ...DEFAULT_PARAMETER_VALUE,
                          ...condition.parameter,
                          value: value,
                        },
                      }
                    : condition;
                }),
              }
            : step;
        })
      );
      args.onChangeParameter?.(stepId, conditionId, value);
    };

    const handleChangeFactorValue = (stepId: ReactText, conditionId: ReactText, value: FactorValueType) => {
      setSteps(
        steps.map(step => {
          if (step.id === stepId) {
            return {
              ...step,
              conditions: step.conditions.map(condition => {
                if (conditionId === condition.id) {
                  return {
                    ...condition,
                    factor: {
                      ...DEFAULT_FACTOR_VALUE,
                      ...condition.factor,
                      textType: textFactorInputType,
                      withCustomFactor: withCustomFactor && <span>Custom factor component</span>,
                      value: value,
                    },
                  };
                }
                return condition;
              }),
            };
          }
          return step;
        })
      );
      args.onChangeFactorValue?.(stepId, conditionId, value);
    };

    const handleChangeFactorType = (stepId: ReactText, conditionId: ReactText, value?: string) => {
      setSteps(
        steps.map(step => {
          return value && step.id === stepId
            ? {
                ...step,
                conditions: step.conditions.map(condition => {
                  if (condition.id === conditionId) {
                    return {
                      ...condition,
                      factor: {
                        ...DEFAULT_FACTOR_VALUE,
                        ...condition.factor,
                        textType: textFactorInputType,
                        withCustomFactor: withCustomFactor && <span>Custom factor component</span>,
                        value: '',
                        selectedFactorType: value,
                      },
                    };
                  }
                  return condition;
                }),
              }
            : step;
        })
      );
      args.onChangeFactorType?.(stepId, conditionId, value);
    };

    const handleChangeOperator = (stepId: ReactText, conditionId: ReactText, value?: OperatorsItem) => {
      setSteps(
        steps.map(step => {
          return step.id === stepId
            ? {
                ...step,
                conditions: step.conditions.map(condition => {
                  if (conditionId === condition.id) {
                    const availableFactorTypes = getAvailableFactorTypes(value);

                    return {
                      ...condition,
                      operator: {
                        ...DEFAULT_OPERATOR_VALUE,
                        ...condition.operator,
                        value: value,
                      },
                      factor: availableFactorTypes
                        ? {
                            ...DEFAULT_FACTOR_VALUE,
                            ...condition.factor,
                            textType: textFactorInputType,
                            withCustomFactor: withCustomFactor && <span>Custom factor component</span>,
                            availableFactorTypes,
                            selectedFactorType: availableFactorTypes ? availableFactorTypes[0] : '',
                          }
                        : undefined,
                    };
                  }
                  return condition;
                }),
              }
            : step;
        })
      );
      args.onChangeOperator?.(stepId, conditionId, value);
    };

    const handleAddCondition = (stepId: ReactText) => {
      const newCondition = { ...DEFAULT_CONDITION_ROW(), id: uuid() };
      setSteps(
        steps.map(step => {
          return step.id === stepId
            ? {
                ...step,
                conditions: [...step.conditions, newCondition],
              }
            : step;
        })
      );
      args.addCondition?.(stepId);
      return newCondition.id;
    };

    const handleRemoveCondition = (stepId: ReactText, conditionId: ReactText) => {
      setSteps(
        steps.map(step => {
          return step.id === stepId
            ? {
                ...step,
                conditions: step.conditions.filter(condition => condition.id !== conditionId),
              }
            : step;
        })
      );
      args.removeCondition?.(stepId, conditionId);
    };

    const handleUpdateStepName = (stepId: ReactText, name: string) => {
      setSteps(
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
      args.onUpdateStepName?.(stepId, name);
    };

    const handleRemoveStep = (stepId: ReactText) => {
      setSteps(steps.filter(step => step.id !== stepId));
      args.removeStep?.(stepId);
    };

    const handleDuplicateStep = (stepId: ReactText) => {
      const stepToDuplicate = steps.find(step => step.id === stepId);
      if (stepToDuplicate) {
        setSteps([...steps, { ...stepToDuplicate, id: uuid() }]);
      }
      args.duplicateStep?.(stepId);
    };

    const handleAddStep = () => {
      const newStep = DEFAULT_STEP();
      setSteps([...steps, newStep]);
      args.addStep?.();
      return newStep.id;
    };

    const addCustomStep = (selectedItem?: ContextItem | ContextGroup) => {
      const newStep = DEFAULT_STEP();
      setSteps([...steps, { ...newStep, context: { ...newStep.context, selectedItem } }]);
      setOpenedAddStep(false);
    };

    const handleChangeOrder = (newOrder: ConditionStep[]) => {
      setSteps(newOrder);
      args.onChangeOrder?.(newOrder);
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
          opened={openedAddStep}
          onClickOutside={() => setOpenedAddStep(false)}
          customTriggerComponent={
            <Button type="ghost" mode="icon-label" onClick={() => setOpenedAddStep(true)}>
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
          {...args}
          showActionAttribute={showActionAttribute}
          steps={steps}
          onChangeContext={handleChangeContext}
          onChangeSubject={handleChangeContext}
          onChangeParameter={handleChangeParameter}
          onChangeActionAttribute={handleChangeActionAttribute}
          onUpdateStepName={showStepName ? handleUpdateStepName : undefined}
          onChangeOperator={handleChangeOperator}
          addCondition={enableAddCondition ? handleAddCondition : undefined}
          removeCondition={handleRemoveCondition}
          renderAddStep={addStepType === 'Custom' ? renderCustomAddStep : undefined}
          onChangeFactorValue={handleChangeFactorValue}
          onChangeFactorType={handleChangeFactorType}
          removeStep={handleRemoveStep}
          duplicateStep={handleDuplicateStep}
          addStep={addStepType === 'Default' ? handleAddStep : undefined}
          onChangeOrder={enableChangeOrder ? handleChangeOrder : undefined}
        />
      </div>
    );
  },
  argTypes: {
    minConditionsLength: NUMBER_CONTROL,
    maxConditionsLength: NUMBER_CONTROL,
    autoClearCondition: BOOLEAN_CONTROL,
    showSuffix: BOOLEAN_CONTROL,
    readOnly: BOOLEAN_CONTROL,
    showActionAttribute: BOOLEAN_CONTROL,
    onChangeActionAttribute: { action: 'onChangeActionAttribute' },
    onChangeContext: { action: 'onChangeContext' },
    onChangeSubject: { action: 'onChangeSubject' },
    onDeactivate: { action: 'onDeactivate' },
    onChangeParameter: { action: 'onChangeParameter' },
    onChangeOperator: { action: 'onChangeOperator' },
    onChangeFactorType: { action: 'onChangeFactorType' },
    onChangeFactorValue: { action: 'onChangeFactorValue' },

    texts: { control: false },

    showStepName: { ...BOOLEAN_CONTROL, table: { category: 'Story options' } },
    enableAddCondition: { ...BOOLEAN_CONTROL, table: { category: 'Story options' } },
    addStepType: {
      ...controlFromOptionsArray('inline-radio', ['Default', 'Custom', undefined]),
      table: { category: 'Story options' },
    },
    enableChangeOrder: { ...BOOLEAN_CONTROL, table: { category: 'Story options' } },
    withCustomFactor: { ...BOOLEAN_CONTROL, table: { category: 'Story options' } },
    textFactorInputType: {
      ...controlFromOptionsArray('inline-radio', ['autocomplete', 'expansible', 'default']),
      table: { category: 'Story options' },
    },
  },
  args: {
    textFactorInputType: 'autocomplete',
    enableAddCondition: true,
    addStepType: 'Default',
    enableChangeOrder: true,
    showStepName: false,
    texts: CONDITION_TEXTS,
    getPopupContainerOverride: () => document.body,
    minConditionsLength: 1,
    maxConditionsLength: 1,
    showSuffix: true,
    inputProps: {
      autoResize: {
        stretchToFit: true,
        minWidth: '144px',
      },
    },
    steps: [DEFAULT_STEP()],
  },
} as ConditionMeta;

type RenderTriggerType = Required<ItemPickerPropsNew<ItemType, undefined>>['renderTrigger'];
type ItemType = typeof ITEMS_IN_SECTIONS[number];
type TriggerProps = Parameters<RenderTriggerType>[0];

const CustomContextSelector = ({
  onActivate,
  getPopupContainer,
  onDeactivate,
  onSelectItem,
  selectedItem,
  opened,
  readOnly,
}) => {
  const renderTrigger = ({ selected, disabled }: Partial<TriggerProps>) => (
    <Button disabled={disabled} mode={selected? 'icon-label' : ''} type="primary">{selected ? (<>{selected.prefixel} {selected.text}</>) :  'Choose context'}</Button>
  );
  const [localOpen, setLocalOpen] = useState(opened);
  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen) {
      onActivate();
    } else {
      onDeactivate();
    }
    setLocalOpen(isOpen);
  };
  const handleChange = (item: ItemType) => {
    onSelectItem(item);
    setLocalOpen(false)
  }
  return readOnly ? (
    renderTrigger({ selected: selectedItem, disabled: true })
  ) : (
    <ItemPicker
      dropdownProps={{
        onOpenChange: handleOpenChange,
        getPopupContainer,
        open: localOpen,
      }}
      selectedItem={selectedItem}
      onChange={handleChange}
      isNewVersion
      items={ITEMS_IN_SECTIONS}
      sections={SECTIONS}
      renderTrigger={renderTrigger}
    />
  );
};

export const Default: ConditionStory = {};
export const WithCustomContextSelector: ConditionStory = {
  args: {
    contextSelectorComponent: CustomContextSelector,
  },
};
