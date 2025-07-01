import React, {
  type ReactText,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import Button from '@synerise/ds-button';
import {
  type ContextGroup,
  type ContextItem,
} from '@synerise/ds-context-selector';
import { type FactorValueType } from '@synerise/ds-factors';
import Icon, { Add3M, DragHandleM } from '@synerise/ds-icon';
import {
  type OperatorsGroup,
  type OperatorsItem,
} from '@synerise/ds-operators';
import { DragOverlay, SortableContainer } from '@synerise/ds-sortable';
import { type SubjectItem } from '@synerise/ds-subject';
import { usePrevious } from '@synerise/ds-utils';

import * as S from './Condition.style';
import type {
  ConditionProps,
  ConditionStep as ConditionStepType,
  StepConditions,
} from './Condition.types';
import { ConditionStep } from './ConditionStep';
import { StepName } from './ConditionStep/StepName/StepName';
import {
  ACTION_ATTRIBUTE,
  DEFAULT_CONDITION,
  DEFAULT_FIELD,
  DEFAULT_INPUT_PROPS,
  DEFAULT_STEP,
  FACTOR,
  OPERATOR,
  PARAMETER,
  SUBJECT,
} from './constants';
import { useTranslations } from './hooks/useTranslations';

const Condition = (props: ConditionProps) => {
  const {
    steps,
    addCondition,
    removeCondition,
    texts,
    duplicateStep,
    removeStep,
    addStep,
    renderAddStep,
    onChangeOrder,
    minConditionsLength = 1,
    maxConditionsLength,
    autoClearCondition,
    onChangeContext,
    onChangeSubject,
    onChangeParameter,
    onChangeOperator,
    onChangeFactorType,
    onChangeFactorValue,
    onUpdateStepName,
    getPopupContainerOverride,
    showSuffix,
    hoverDisabled,
    autoOpenedComponent = DEFAULT_FIELD,
    inputProps,
    onDeactivate,
    readOnly = false,
    singleStepCondition,
    showActionAttribute,
    onChangeActionAttribute,
    contextSelectorComponent,
    parameterSelectorComponent,
    factorParameterSelectorComponent,
    actionAttributeParameterSelectorComponent,
    showEmptyConditionPlaceholder = false,
  } = props;
  const allTexts = useTranslations(texts);

  const [draggedStep, setDraggedStep] = useState<
    ConditionStepType & { index: number }
  >();
  const [currentConditionId, setCurrentConditionId] =
    useState<ReactText>(DEFAULT_CONDITION);
  const [currentStepId, setCurrentStepId] = useState<ReactText>(DEFAULT_STEP);
  const [currentField, setCurrentField] = useState<string>(autoOpenedComponent);

  const prevSteps = usePrevious(steps);

  useEffect(() => {
    if (
      autoOpenedComponent &&
      steps.length &&
      steps[0].conditions[0].operator &&
      steps[0].conditions[0].operator.value === undefined
    ) {
      setCurrentStepId(steps[0].id);
      setCurrentConditionId(steps[0].conditions[0].id);
      setCurrentField(autoOpenedComponent);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const newConditionId =
      prevSteps &&
      steps &&
      steps.reduce(
        (id: string | number | undefined, step: ConditionStepType) => {
          let result = id;
          const conditions = step.conditions.map(
            (condition: StepConditions) => ({
              id: condition.id,
              value: condition.parameter?.value,
            }),
          );
          const oldStep = prevSteps.find(
            (prevStep: ConditionStepType) => prevStep.id === step.id,
          );
          if (oldStep) {
            const oldConditions = oldStep.conditions.map(
              (condition: StepConditions) => condition.id,
            );
            const newCondition = conditions.find(
              (condition) => oldConditions.indexOf(condition.id) === -1,
            );
            result =
              newCondition && !newCondition.value ? newCondition.id : result;
          } else {
            result = step.conditions[0]?.id;
          }

          return result;
        },
        undefined,
      );
    if (newConditionId && newConditionId !== currentConditionId) {
      setCurrentConditionId(newConditionId);
    }
  }, [currentConditionId, currentField, prevSteps, steps]);

  const clearConditionRow = useCallback(
    (stepId: string | number) => {
      const step = steps.find((s) => s.id === stepId);
      if (step === undefined || step.conditions.length === 0) {
        return;
      }
      if (removeCondition && addCondition) {
        step.conditions.forEach((condition: StepConditions, index: number) => {
          if (index > 0) {
            removeCondition(step.id, condition.id);
          }
        });
      }

      autoClearCondition &&
        step.conditions.forEach((condition: StepConditions) => {
          onChangeFactorValue &&
            onChangeFactorValue(step.id, condition.id, undefined);
          onChangeOperator &&
            onChangeOperator(step.id, condition.id, undefined);
          onChangeParameter &&
            onChangeParameter(step.id, condition.id, undefined);
        });
      setCurrentConditionId(step.conditions[0].id);
      setCurrentStepId(step.id);
      if (step.conditions[0].parameter) {
        setCurrentField(PARAMETER);
      } else if (step.conditions[0].operator) {
        setCurrentField(OPERATOR);
      }
    },
    [
      steps,
      removeCondition,
      addCondition,
      autoClearCondition,
      onChangeFactorValue,
      onChangeOperator,
      onChangeParameter,
    ],
  );

  const selectSubject = useCallback(
    (value: SubjectItem, stepId: ReactText): void => {
      clearConditionRow(stepId);
      setCurrentStepId(stepId);
      if (showActionAttribute) {
        setCurrentField(ACTION_ATTRIBUTE);
      } else {
        setCurrentField(PARAMETER);
      }
      onChangeSubject && onChangeSubject(stepId, value);
    },
    [clearConditionRow, onChangeSubject, showActionAttribute],
  );

  const selectContext = useCallback(
    (
      value: ContextItem | ContextGroup | undefined,
      stepId: ReactText,
    ): void => {
      clearConditionRow(stepId);
      setCurrentStepId(stepId);
      if (showActionAttribute) {
        setCurrentField(ACTION_ATTRIBUTE);
      } else {
        setCurrentField(PARAMETER);
      }
      onChangeContext && onChangeContext(stepId, value);
    },
    [clearConditionRow, onChangeContext, showActionAttribute],
  );

  const selectActionAttribute = useCallback(
    (value: FactorValueType, stepId: string | number) => {
      clearConditionRow(stepId);
      setCurrentStepId(stepId);
      setCurrentField(PARAMETER);
      onChangeActionAttribute && onChangeActionAttribute(stepId, value);
    },
    [onChangeActionAttribute, clearConditionRow],
  );

  const selectParameter = useCallback(
    (
      stepId: ReactText,
      conditionId: ReactText,
      value: FactorValueType,
    ): void => {
      if (conditionId && onChangeParameter) {
        autoClearCondition &&
          onChangeOperator &&
          onChangeOperator(stepId, conditionId, undefined);
        autoClearCondition &&
          onChangeFactorValue &&
          onChangeFactorValue(stepId, conditionId, undefined);
        onChangeParameter(stepId, conditionId, value);
        setCurrentConditionId(conditionId);
        setCurrentStepId(stepId);
        setCurrentField(OPERATOR);
      }
    },
    [
      autoClearCondition,
      onChangeFactorValue,
      onChangeOperator,
      onChangeParameter,
    ],
  );

  const selectOperator = useCallback(
    (
      stepId: ReactText,
      conditionId: ReactText,
      value: OperatorsItem | OperatorsGroup | undefined,
    ): void => {
      if (conditionId && onChangeOperator && value && 'groupId' in value) {
        autoClearCondition &&
          onChangeFactorValue &&
          onChangeFactorValue(stepId, conditionId, undefined);
        onChangeOperator(stepId, conditionId, value);
        setCurrentConditionId(conditionId);
        setCurrentStepId(stepId);
        setCurrentField(FACTOR);
      }
    },
    [autoClearCondition, onChangeFactorValue, onChangeOperator],
  );

  const setStepConditionFactorType = useCallback(
    (
      stepId: string | number,
      conditionId: string | number,
      factorType?: string,
    ): void => {
      setCurrentConditionId(conditionId);
      setCurrentStepId(stepId);
      setCurrentField(FACTOR);
      onChangeFactorType && onChangeFactorType(stepId, conditionId, factorType);
    },
    [onChangeFactorType],
  );

  const setStepConditionFactorValue = useCallback(
    (
      stepId: string | number,
      conditionId: string | number,
      value: FactorValueType,
    ) => {
      setCurrentField(DEFAULT_FIELD);
      setCurrentStepId(stepId);
      onChangeFactorValue && onChangeFactorValue(stepId, conditionId, value);
    },
    [onChangeFactorValue],
  );

  const draggableEnabled = useMemo(
    () => onChangeOrder && steps.length > 1,
    [steps, onChangeOrder],
  );

  const handleAddStep = useCallback(() => {
    const newStepId = addStep ? addStep() : undefined;
    if (newStepId) {
      setCurrentStepId(newStepId);
      setCurrentField(SUBJECT);
    }
  }, [addStep]);

  const handleAddCondition = useMemo(() => {
    if (!addCondition) {
      return undefined;
    }
    return (stepId: ReactText): void => {
      const newConditionId = addCondition ? addCondition(stepId) : undefined;
      if (newConditionId) {
        setCurrentConditionId(newConditionId);
        setCurrentStepId(stepId);
        setCurrentField(PARAMETER);
      }
    };
  }, [addCondition]);

  const handleClearActiveCondition = useCallback(() => {
    onDeactivate && onDeactivate(currentStepId, currentConditionId);
    setCurrentConditionId(DEFAULT_CONDITION);
    setCurrentStepId(DEFAULT_STEP);
    setCurrentField(DEFAULT_FIELD);
  }, [currentConditionId, currentStepId, onDeactivate]);

  return (
    <S.Condition className="ds-conditions" data-popup-container>
      <SortableContainer
        items={steps}
        axis="y"
        onDragStart={({ active }) => {
          const stepIndex = steps.findIndex((item) => item.id === active.id);
          setDraggedStep({ ...steps[stepIndex], index: stepIndex });
        }}
        onDragEnd={() => {
          setDraggedStep(undefined);
        }}
        onDragCancel={() => setDraggedStep(undefined)}
        onOrderChange={onChangeOrder}
      >
        {steps.map((step, index) => {
          return (
            <ConditionStep
              key={`step-id-${step.id}`}
              step={step}
              isDragged={draggedStep?.id === step.id}
              isLast={index === steps.length - 1}
              texts={allTexts}
              index={index}
              contextSelectorComponent={contextSelectorComponent}
              parameterSelectorComponent={parameterSelectorComponent}
              factorParameterSelectorComponent={
                factorParameterSelectorComponent
              }
              actionAttributeParameterSelectorComponent={
                actionAttributeParameterSelectorComponent
              }
              hasPriority={step.id === currentStepId}
              getPopupContainerOverride={getPopupContainerOverride}
              draggableEnabled={draggableEnabled}
              selectOperator={selectOperator}
              selectParameter={selectParameter}
              selectContext={selectContext}
              selectSubject={selectSubject}
              selectActionAttribute={selectActionAttribute}
              updateStepName={onUpdateStepName}
              duplicateStep={duplicateStep}
              removeStep={removeStep}
              minConditionsLength={minConditionsLength}
              maxConditionsLength={maxConditionsLength}
              setStepConditionFactorType={setStepConditionFactorType}
              setStepConditionFactorValue={setStepConditionFactorValue}
              currentConditionId={currentConditionId}
              currentStepId={currentStepId}
              currentField={currentField}
              removeCondition={removeCondition}
              addCondition={handleAddCondition}
              setCurrentField={setCurrentField}
              setCurrentCondition={setCurrentConditionId}
              setCurrentStep={setCurrentStepId}
              onDeactivate={handleClearActiveCondition}
              showSuffix={showSuffix}
              hoverDisabled={
                hoverDisabled ||
                (currentStepId !== step.id && currentStepId !== undefined)
              }
              inputProps={{ ...DEFAULT_INPUT_PROPS, ...inputProps }}
              readOnly={readOnly}
              singleStepCondition={singleStepCondition}
              showActionAttribute={showActionAttribute}
              showEmptyConditionPlaceholder={showEmptyConditionPlaceholder}
            />
          );
        })}
        <DragOverlay dropAnimation={null}>
          {draggedStep && (
            <S.StepWrapper isDragOverlay key="dragOverlay">
              <S.DragLabel>
                <Icon component={<DragHandleM />} />
                {onUpdateStepName && (
                  <StepName
                    name={draggedStep.stepName}
                    index={draggedStep.index}
                    texts={allTexts}
                  />
                )}
                {draggedStep.context?.selectedItem && (
                  <S.DragLabelPart>
                    {draggedStep.context.selectedItem.name}
                  </S.DragLabelPart>
                )}
              </S.DragLabel>
            </S.StepWrapper>
          )}
        </DragOverlay>
      </SortableContainer>
      {addStep && (
        <S.AddStepButton>
          <Button type="ghost" mode="icon-label" onClick={handleAddStep}>
            <Icon component={<Add3M />} />
            {allTexts.addStep}
          </Button>
        </S.AddStepButton>
      )}
      {!readOnly && renderAddStep && (
        <S.AddStepButton>{renderAddStep()}</S.AddStepButton>
      )}
    </S.Condition>
  );
};

export default Condition;
