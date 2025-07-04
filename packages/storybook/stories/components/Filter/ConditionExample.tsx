import React, { forwardRef } from 'react';

import Button from '@synerise/ds-button';
import Condition, { ConditionStep } from '@synerise/ds-condition';
import ContextSelector from '@synerise/ds-context-selector';
import Icon, { Add3M } from '@synerise/ds-icon';
import { getPopupContainer } from '@synerise/ds-utils';

import { CONDITION_TEXTS } from '../Condition/Condition.data';
import { CONTEXT_CLIENT_ITEMS, CONTEXT_CLIENT_GROUPS } from '../ContextSelector/data/client.data';
import { CONTEXT_TEXTS } from '../ContextSelector/data/context.data';

import { useConditionHandlers } from './hooks/useConditionHandlers';

type ConditionExampleProps = {
  steps: ConditionStep[];
  onChange: (steps: ConditionStep[]) => void;
  hoverDisabled?: boolean;
  readOnly?: boolean;
  showActionAttribute?: boolean;
  addStepType?: string;
};

export const ConditionExample = forwardRef<HTMLDivElement, ConditionExampleProps>(
  ({ steps, onChange, hoverDisabled, readOnly = false, addStepType, showActionAttribute }, ref) => {
    const {
      updateStepName,
      duplicateStep,
      addCustomStep,
      addStep,
      addStepCondition,
      openedAddStep,
      setOpenedAddStep,
      setOperatorValue,
      setStepConditionFactorType,
      setStepConditionFactorValue,
      setStepConditionParameter,
      setStepActionAttribute,
      setStepContext,
      removeStep,
      removeStepCondition,
      onChangeOrder,
    } = useConditionHandlers(steps, onChange);

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

    return (
      <div ref={ref} data-popup-container>
        <Condition
          texts={CONDITION_TEXTS}
          minConditionsLength={1}
          maxConditionsLength={10}
          showActionAttribute={showActionAttribute}
          autoClearCondition
          inputProps={{
            autoResize: {
              minWidth: '150px',
              stretchToFit: true,
            },
          }}
          addCondition={addStepCondition}
          removeCondition={removeStepCondition}
          onUpdateStepName={updateStepName}
          removeStep={removeStep}
          duplicateStep={duplicateStep}
          addStep={addStepType === 'Default' ? addStep : undefined}
          renderAddStep={addStepType === 'Custom' ? renderCustomAddStep : undefined}
          onChangeOrder={onChangeOrder}
          onChangeContext={setStepContext}
          onChangeSubject={setStepContext}
          onChangeParameter={setStepConditionParameter}
          onChangeOperator={setOperatorValue}
          onChangeFactorValue={setStepConditionFactorValue}
          onChangeFactorType={setStepConditionFactorType}
          onChangeActionAttribute={setStepActionAttribute}
          showSuffix
          getPopupContainerOverride={getPopupContainer}
          hoverDisabled={hoverDisabled}
          readOnly={readOnly}
          steps={steps}
        />
      </div>
    );
  }
);
