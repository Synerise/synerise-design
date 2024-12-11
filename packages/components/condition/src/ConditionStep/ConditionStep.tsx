import React, { useCallback, useMemo, ReactText } from 'react';
import Subject from '@synerise/ds-subject';
import ContextSelector from '@synerise/ds-context-selector';

import { useIntl } from 'react-intl';
import { DragHandleM } from '@synerise/ds-icon';
import Factors from '@synerise/ds-factors';
import * as S from '../Condition.style';
import * as T from './ConditionStep.types';
import { StepHeader } from './StepHeader';
import { AddCondition } from './AddCondition';
import { ConditionRow } from './ConditionRow';
import { ACTION_ATTRIBUTE, SUBJECT } from '../constants';
import { EmptyCondition } from './EmptyCondition';

export const ConditionStep = ({
  step,
  texts,
  index,
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
  showEmptyConditionPlaceholder = false,
}: T.ConditionStepProps) => {
  const { formatMessage } = useIntl();
  const text = useMemo(
    () => ({
      stepNamePlaceholder: formatMessage({ id: 'DS.CONDITION.STEP_NAME-PLACEHOLDER', defaultMessage: 'Step name' }),
      removeConditionRowTooltip: formatMessage({
        id: 'DS.CONDITION.REMOVE-CONDITION-ROW-TOOLTIP',
        defaultMessage: 'Delete',
      }),
      addConditionRowButton: formatMessage({
        id: 'DS.CONDITION.ADD-CONDITION-ROW-BUTTON',
        defaultMessage: 'Add condition',
      }),
      addFirstConditionRowButton: formatMessage({
        id: 'DS.CONDITION.ADD-FIRST-CONDITION-ROW-BUTTON',
        defaultMessage: 'Add condition',
      }),
      dropLabel: formatMessage({ id: 'DS.CONDITION.DROP-LABEL', defaultMessage: 'Drop me here' }),
      moveTooltip: formatMessage({ id: 'DS.CONDITION.MOVE-TOOLTIP', defaultMessage: 'Move' }),
      duplicateTooltip: formatMessage({ id: 'DS.CONDITION.DUPLICATE-TOOLTIP', defaultMessage: 'Duplicate' }),
      removeTooltip: formatMessage({ id: 'DS.CONDITION.REMOVE-TOOLTIP', defaultMessage: 'Delete' }),
      addStep: formatMessage({ id: 'DS.CONDITION.ADD-STEP', defaultMessage: 'Add step' }),
      conditionSuffix: formatMessage({ id: 'DS.CONDITION.SUFFIX', defaultMessage: 'and' }),
      ...texts,
    }),
    [texts, formatMessage]
  );

  const withCruds = !readOnly && (duplicateStep || removeStep);

  const onActivate = useCallback(
    () => (setCurrentStep ? (): void => setCurrentStep(step.id) : undefined),
    [step.id, setCurrentStep]
  );

  const onAddCondition = useCallback(
    (stepId: ReactText) => {
      addCondition && addCondition(stepId);
      onActivate && onActivate();
    },
    [addCondition, onActivate]
  );

  const stepHeader = useMemo(
    () => (
      <StepHeader
        index={index}
        stepId={step.id}
        stepName={step.stepName || ''}
        texts={text}
        updateStepName={updateStepName}
        removeStep={removeStep}
        duplicateStep={duplicateStep}
        draggableEnabled={Boolean(draggableEnabled)}
        readOnly={readOnly}
      />
    ),
    [draggableEnabled, duplicateStep, index, removeStep, step.id, step.stepName, text, updateStepName, readOnly]
  );

  const addConditionButton = useMemo(() => {
    return (
      !readOnly &&
      addCondition &&
      (maxConditionsLength === undefined || step.conditions.length < maxConditionsLength) && (
        <AddCondition
          errorText={step.addConditionErrorText}
          texts={text}
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
    text,
    readOnly,
    step.addConditionErrorText,
    showActionAttribute,
    step.actionAttribute?.value,
  ]);

  const renderConditionRow = useCallback(
    (condition, conditionIndex) => {
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
          onActivate={handleActivation(condition.id)}
          stepId={step.id}
          currentStepId={currentStepId}
          currentConditionId={currentConditionId}
          currentField={currentField}
          selectParameter={selectParameter}
          selectOperator={selectOperator}
          getPopupContainerOverride={
            getPopupContainerOverride ||
            ((): HTMLElement => document.querySelector(`#condition-step-${step.id}`) || document.body)
          }
          setStepConditionFactorType={setStepConditionFactorType}
          setStepConditionFactorValue={setStepConditionFactorValue}
          texts={text}
          stepType={step.context?.type}
          onDeactivate={onDeactivate}
          readOnly={readOnly}
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
      text,
      onDeactivate,
      onActivate,
      setCurrentField,
      setCurrentCondition,
      setCurrentStep,
      inputProps,
      readOnly,
    ]
  );

  const hasSelectedSubjectOrContext = useMemo(() => {
    return step.subject?.selectedItem || step.context?.selectedItem;
  }, [step.subject?.selectedItem, step.context?.selectedItem]);

  const contextOrActionErrorText = useMemo(() => {
    return step.context?.errorText || (showActionAttribute && step.actionAttribute?.errorText);
  }, [showActionAttribute, step.actionAttribute?.errorText, step.context?.errorText]);

  return (
    <S.Step
      key={step.id}
      id={`condition-step-${step.id}`}
      data-dropLabel={text.dropLabel}
      data-conditionSuffix={text.conditionSuffix}
      style={hasPriority ? { zIndex: 1001 } : undefined}
      active={step.id === currentStepId && currentField !== ''}
      hoverDisabled={Boolean(currentStepId) || singleStepCondition}
      showSuffix={showSuffix}
      singleStepCondition={singleStepCondition}
    >
      {!updateStepName && (
        <S.DraggedLabel>{step.subject?.selectedItem?.name || step.context?.selectedItem?.name}</S.DraggedLabel>
      )}
      {updateStepName && stepHeader}
      <S.StepConditions withCruds={Boolean(!updateStepName && withCruds)}>
        {draggableEnabled && !updateStepName && (
          <S.DragIcon className="step-drag-handler" component={<DragHandleM />} />
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
          {step.context && (
            <ContextSelector
              {...step.context}
              errorText={undefined}
              getPopupContainerOverride={getPopupContainerOverride}
              onActivate={onActivate}
              onDeactivate={onDeactivate}
              opened={step.id === currentStepId && currentField === SUBJECT}
              onSelectItem={(value): void => selectContext(value, step.id)}
              readOnly={step.context.readOnly || readOnly}
            />
          )}
          {contextOrActionErrorText && <S.ErrorWrapper>{contextOrActionErrorText}</S.ErrorWrapper>}
        </S.Subject>
        {hasSelectedSubjectOrContext || !showEmptyConditionPlaceholder ? (
          <>
            {showActionAttribute && (
              <S.ActionAttribute
                style={{ zIndex: step.id === currentStepId && currentField === ACTION_ATTRIBUTE ? 10002 : 0 }}
              >
                <Factors
                  {...step.actionAttribute}
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
                  onChangeValue={(value): void => selectActionAttribute(value, step.id)}
                  opened={step.id === currentStepId && currentField === ACTION_ATTRIBUTE}
                  readOnly={readOnly}
                  error={Boolean(step.actionAttribute?.errorText)}
                />
              </S.ActionAttribute>
            )}
            <S.ConditionRows>
              {step.conditions.length > 0 && step.conditions.map(renderConditionRow)}
              {addConditionButton}
            </S.ConditionRows>
            {!updateStepName && withCruds && (
              <S.StepConditionCruds
                onDuplicate={duplicateStep ? (): void => duplicateStep(step.id) : undefined}
                onDelete={removeStep ? (): void => removeStep(step.id) : undefined}
                duplicateTooltip={text.duplicateTooltip}
                deleteTooltip={text.removeTooltip}
              />
            )}
          </>
        ) : (
          <EmptyCondition
            label={
              texts?.emptyConditionLabel ||
              formatMessage({ id: 'DS.CONDITION.EMPTY_CONDITION_LABEL', defaultMessage: 'Choose event first' })
            }
          />
        )}
      </S.StepConditions>
    </S.Step>
  );
};
