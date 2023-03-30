import * as React from 'react';
import Subject from '@synerise/ds-subject';
import ContextSelector from '@synerise/ds-context-selector';
import { useIntl } from 'react-intl';
import { DragHandleM } from '@synerise/ds-icon';
import * as S from '../Condition.style';
import * as T from './ConditionStep.types';
import { StepHeader } from './StepHeader';
import { AddCondition } from './AddCondition';
import { ConditionRow } from './ConditionRow';
import { SUBJECT } from '../Condition';

// eslint-disable-next-line import/prefer-default-export
export const ConditionStep: React.FC<T.ConditionStepProps> = ({
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
  hoverDisabled,
  inputProps,
  readOnly = false,
}) => {
  const { formatMessage } = useIntl();
  const text = React.useMemo(
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

  const onActivate = setCurrentStep ? (): void => setCurrentStep(step.id) : undefined;

  const onAddCondition = React.useCallback(
    (stepId: React.ReactText) => {
      addCondition && addCondition(stepId);
      onActivate && onActivate();
    },
    [addCondition, onActivate]
  );

  const stepHeader = React.useMemo(
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

  const addConditionButton = React.useMemo(() => {
    return (
      !readOnly &&
      addCondition &&
      (maxConditionsLength === undefined || step.conditions.length < maxConditionsLength) && (
        <AddCondition
          texts={text}
          stepId={step.id}
          addCondition={onAddCondition}
          conditionsNumber={step.conditions.length}
          selectedSubject={Boolean(step.subject?.selectedItem)}
          selectedContext={Boolean(step.context?.selectedItem)}
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
  ]);

  const renderConditionRow = React.useCallback(
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

  return (
    <S.Step
      key={step.id}
      id={`condition-step-${step.id}`}
      data-dropLabel={text.dropLabel}
      data-conditionSuffix={text.conditionSuffix}
      style={hasPriority ? { zIndex: 10001 } : undefined}
      active={step.id === currentStepId && currentField !== ''}
      hoverDisabled={hoverDisabled}
      showSuffix={showSuffix}
    >
      {!updateStepName && (
        <S.DraggedLabel>{step.subject?.selectedItem?.name || step.context?.selectedItem?.name}</S.DraggedLabel>
      )}
      {updateStepName && stepHeader}
      <S.StepConditions withoutStepName={updateStepName === undefined}>
        {draggableEnabled && !updateStepName && (
          <S.DragIcon className="step-drag-handler" component={<DragHandleM />} />
        )}
        <S.Subject>
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
              getPopupContainerOverride={getPopupContainerOverride}
              onActivate={onActivate}
              onDeactivate={onDeactivate}
              opened={step.id === currentStepId && currentField === SUBJECT}
              onSelectItem={(value): void => selectContext(value, step.id)}
              readOnly={readOnly}
            />
          )}
        </S.Subject>
        <S.ConditionRows>
          {step.conditions.length > 0 && step.conditions.map(renderConditionRow)}
          {addConditionButton}
        </S.ConditionRows>
        {!updateStepName && !readOnly && (
          <S.StepConditionCruds
            onDuplicate={duplicateStep ? (): void => duplicateStep(step.id) : undefined}
            onDelete={removeStep ? (): void => removeStep(step.id) : undefined}
            duplicateTooltip={text.duplicateTooltip}
            deleteTooltip={text.removeTooltip}
          />
        )}
      </S.StepConditions>
    </S.Step>
  );
};
