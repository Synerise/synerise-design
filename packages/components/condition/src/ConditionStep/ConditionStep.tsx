import React, { type ReactText, useCallback, useMemo } from 'react';

import ContextSelector, {
  type ContextProps,
} from '@synerise/ds-context-selector';
import Factors from '@synerise/ds-factors';
import { DragHandleM } from '@synerise/ds-icon';
import { CSS, useSortable } from '@synerise/ds-sortable';
import Subject from '@synerise/ds-subject';

import * as S from '../Condition.style';
import {
  type CustomContextSelectorProps,
  type StepConditions,
} from '../Condition.types';
import { ACTION_ATTRIBUTE, SUBJECT } from '../constants';
import { useTranslations } from '../hooks/useTranslations';
import { AddCondition } from './AddCondition';
import { ConditionRow } from './ConditionRow';
import type * as T from './ConditionStep.types';
import { EmptyCondition } from './EmptyCondition';
import { StepHeader } from './StepHeader';

export const ConditionStep = ({
  step,
  texts,
  index,
  isLast,
  isDragged,
  addCondition,
  removeCondition,
  updateStepName,
  removeStep,
  duplicateStep,
  minConditionsLength = 1,
  maxConditionsLength,
  draggableEnabled,
  selectSubject,
  selectContext,
  selectActionAttribute,
  selectOperator,
  selectParameter,
  setStepConditionFactorType,
  setStepConditionFactorValue,
  getPopupContainerOverride,
  hasPriority,
  currentStepId,
  currentConditionId,
  currentField,
  setCurrentField,
  setCurrentCondition,
  setCurrentStep,
  onDeactivate,
  showSuffix,
  inputProps,
  readOnly = false,
  singleStepCondition = false,
  showActionAttribute,
  contextSelectorComponent: CustomContextSelectorComponent,
  actionAttributeParameterSelectorComponent,
  parameterSelectorComponent,
  factorParameterSelectorComponent,
  showEmptyConditionPlaceholder = false,
}: T.ConditionStepProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: step.id });
  const zIndexStyle = hasPriority ? { zIndex: 1001 } : {};

  const style = {
    ...zIndexStyle,
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const allTexts = useTranslations(texts);

  const withCruds = !readOnly && (duplicateStep || removeStep);

  const onActivate = useCallback(
    () => (setCurrentStep ? (): void => setCurrentStep(step.id) : undefined),
    [step.id, setCurrentStep],
  );

  const onAddCondition = useCallback(
    (stepId: ReactText) => {
      addCondition && addCondition(stepId);
      onActivate && onActivate();
    },
    [addCondition, onActivate],
  );

  const stepHeader = useMemo(
    () => (
      <StepHeader
        index={index}
        stepId={step.id}
        stepName={step.stepName || ''}
        texts={allTexts}
        updateStepName={updateStepName}
        removeStep={removeStep}
        duplicateStep={duplicateStep}
        draggableEnabled={Boolean(draggableEnabled)}
        readOnly={readOnly}
        dragHandleProps={{ ...attributes, ...listeners }}
      />
    ),
    [
      draggableEnabled,
      attributes,
      listeners,
      duplicateStep,
      index,
      removeStep,
      step.id,
      step.stepName,
      allTexts,
      updateStepName,
      readOnly,
    ],
  );

  const renderContextSelector = useCallback(
    (contextData: Omit<ContextProps, 'onSelectItem'>) => {
      const commonProps: ContextProps | CustomContextSelectorProps = {
        ...contextData,
        onActivate,
        onDeactivate,
        errorText: undefined,
        isError: !!contextData.errorText,
        opened: step.id === currentStepId && currentField === SUBJECT,
        onSelectItem: (value) => selectContext(value, step.id),
        readOnly: contextData.readOnly || readOnly,
      };
      return CustomContextSelectorComponent ? (
        <CustomContextSelectorComponent
          {...commonProps}
          getPopupContainer={getPopupContainerOverride}
        />
      ) : (
        <ContextSelector
          {...commonProps}
          getPopupContainerOverride={getPopupContainerOverride}
        />
      );
    },
    [
      CustomContextSelectorComponent,
      currentField,
      currentStepId,
      getPopupContainerOverride,
      onActivate,
      onDeactivate,
      readOnly,
      selectContext,
      step.id,
    ],
  );

  const addConditionButton = useMemo(() => {
    return (
      !readOnly &&
      addCondition &&
      (maxConditionsLength === undefined ||
        step.conditions.length < maxConditionsLength) && (
        <AddCondition
          errorText={step.addConditionErrorText}
          texts={allTexts}
          stepId={step.id}
          data-testid="ds-add-condition-button"
          addCondition={onAddCondition}
          conditionsNumber={step.conditions.length}
          isDisabled={
            (!step.subject?.selectedItem && !step.context?.selectedItem) ||
            (showActionAttribute && !step.actionAttribute?.value)
          }
        />
      )
    );
  }, [
    addCondition,
    onAddCondition,
    maxConditionsLength,
    step.conditions.length,
    step.context,
    step.id,
    step.subject,
    allTexts,
    readOnly,
    step.addConditionErrorText,
    showActionAttribute,
    step.actionAttribute?.value,
  ]);

  const renderConditionRow = useCallback(
    (condition: StepConditions, conditionIndex: number) => {
      const handleActivation =
        (conditionId: string): ((field: string) => void) =>
        (fieldType: string): void => {
          onActivate && onActivate();
          setCurrentField && setCurrentField(fieldType);
          setCurrentCondition && setCurrentCondition(conditionId);
          setCurrentStep && setCurrentStep(step.id);
        };

      return (
        <ConditionRow
          key={`step-${step.id}-condition-${condition.id}`}
          hasPriority={hasPriority && currentConditionId === condition.id}
          index={conditionIndex}
          conditionId={condition.id}
          addCondition={addCondition}
          inputProps={inputProps}
          conditionParameter={condition.parameter}
          conditionOperator={condition.operator}
          conditionFactor={condition.factor}
          removeCondition={removeCondition}
          minConditionLength={minConditionsLength}
          maxConditionLength={maxConditionsLength}
          conditionsNumber={step.conditions.length}
          onActivate={handleActivation(condition.id as string)}
          stepId={step.id}
          currentStepId={currentStepId}
          currentConditionId={currentConditionId}
          currentField={currentField}
          selectParameter={selectParameter}
          selectOperator={selectOperator}
          getPopupContainerOverride={
            getPopupContainerOverride ||
            ((): HTMLElement =>
              document.querySelector(`#condition-step-${step.id}`) ||
              document.body)
          }
          setStepConditionFactorType={setStepConditionFactorType}
          setStepConditionFactorValue={setStepConditionFactorValue}
          texts={allTexts}
          stepType={step.context?.type}
          onDeactivate={onDeactivate}
          readOnly={readOnly}
          parameterSelectorComponent={parameterSelectorComponent}
          factorParameterSelectorComponent={factorParameterSelectorComponent}
        />
      );
    },
    [
      step.id,
      step.conditions.length,
      step.context,
      hasPriority,
      currentConditionId,
      addCondition,
      removeCondition,
      minConditionsLength,
      maxConditionsLength,
      currentStepId,
      currentField,
      selectParameter,
      selectOperator,
      getPopupContainerOverride,
      setStepConditionFactorType,
      setStepConditionFactorValue,
      allTexts,
      onDeactivate,
      onActivate,
      setCurrentField,
      setCurrentCondition,
      setCurrentStep,
      inputProps,
      readOnly,
      parameterSelectorComponent,
      factorParameterSelectorComponent,
    ],
  );

  const hasSelectedSubjectOrContext = useMemo(() => {
    return step.subject?.selectedItem || step.context?.selectedItem;
  }, [step.subject?.selectedItem, step.context?.selectedItem]);

  const contextOrActionErrorText = useMemo(() => {
    return (
      step.context?.errorText ||
      (showActionAttribute && step.actionAttribute?.errorText)
    );
  }, [
    showActionAttribute,
    step.actionAttribute?.errorText,
    step.context?.errorText,
  ]);

  return (
    <S.StepWrapper
      style={style}
      key={step.id}
      ref={setNodeRef}
      isDragged={isDragged}
    >
      {isDragged ? (
        <S.DropLabel>{allTexts.dropLabel}</S.DropLabel>
      ) : (
        <S.Step
          id={`condition-step-${step.id}`}
          data-conditionSuffix={allTexts.conditionSuffix}
          active={step.id === currentStepId && currentField !== ''}
          hoverDisabled={Boolean(currentStepId) || singleStepCondition}
          showSuffix={showSuffix && !isLast && !isDragged}
          singleStepCondition={singleStepCondition}
        >
          {!updateStepName && (
            <S.DraggedLabel>
              {step.subject?.selectedItem?.name ||
                step.context?.selectedItem?.name}
            </S.DraggedLabel>
          )}
          {updateStepName && stepHeader}
          <S.StepConditions withCruds={Boolean(!updateStepName && withCruds)}>
            {draggableEnabled && !updateStepName && (
              <S.DragIcon
                className="step-drag-handler"
                component={<DragHandleM />}
                {...attributes}
                {...listeners}
              />
            )}
            <S.Subject data-testid="condition-subject-or-context">
              {step.subject && (
                <Subject
                  {...step.subject}
                  getPopupContainerOverride={getPopupContainerOverride}
                  onActivate={onActivate}
                  onDeactivate={onDeactivate}
                  opened={step.id === currentStepId && currentField === SUBJECT}
                  onSelectItem={(value): void => selectSubject(value, step.id)}
                />
              )}
              {step.context && renderContextSelector(step.context)}
              {contextOrActionErrorText && (
                <S.ErrorWrapper>{contextOrActionErrorText}</S.ErrorWrapper>
              )}
            </S.Subject>
            {hasSelectedSubjectOrContext || !showEmptyConditionPlaceholder ? (
              <>
                {showActionAttribute && (
                  <S.ActionAttribute
                    style={{
                      zIndex:
                        step.id === currentStepId &&
                        currentField === ACTION_ATTRIBUTE
                          ? 10002
                          : 0,
                    }}
                  >
                    <Factors
                      {...step.actionAttribute}
                      customFactorValueComponents={
                        actionAttributeParameterSelectorComponent && {
                          parameter: {
                            component:
                              actionAttributeParameterSelectorComponent,
                          },
                          contextParameter: {
                            component:
                              actionAttributeParameterSelectorComponent,
                          },
                        }
                      }
                      errorText={undefined}
                      value={step.actionAttribute?.value}
                      withoutTypeSelector
                      selectedFactorType="parameter"
                      defaultFactorType="parameter"
                      inputProps={inputProps}
                      getPopupContainerOverride={getPopupContainerOverride}
                      onActivate={(): void => {
                        setCurrentCondition('');
                        onActivate && onActivate();
                        setCurrentField && setCurrentField(ACTION_ATTRIBUTE);
                        setCurrentStep && setCurrentStep(step.id);
                      }}
                      onDeactivate={onDeactivate}
                      onChangeValue={(value): void =>
                        selectActionAttribute(value, step.id)
                      }
                      opened={
                        step.id === currentStepId &&
                        currentField === ACTION_ATTRIBUTE
                      }
                      readOnly={readOnly}
                      error={Boolean(step.actionAttribute?.errorText)}
                    />
                  </S.ActionAttribute>
                )}
                <S.ConditionRows>
                  {step.conditions.length > 0 &&
                    step.conditions.map(renderConditionRow)}
                  {addConditionButton}
                </S.ConditionRows>
                {!updateStepName && withCruds && (
                  <S.StepConditionCruds
                    onDuplicate={
                      duplicateStep
                        ? (): void => duplicateStep(step.id)
                        : undefined
                    }
                    onDelete={
                      removeStep ? (): void => removeStep(step.id) : undefined
                    }
                    duplicateTooltip={allTexts.duplicateTooltip}
                    deleteTooltip={allTexts.removeTooltip}
                  />
                )}
              </>
            ) : (
              <EmptyCondition label={allTexts.emptyConditionLabel} />
            )}
          </S.StepConditions>
        </S.Step>
      )}
    </S.StepWrapper>
  );
};
