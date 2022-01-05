import * as React from 'react';
import Subject from '@synerise/ds-subject';
import ContextSelector from '@synerise/ds-context-selector';
import { useIntl } from 'react-intl';
import * as S from '../Condition.style';
import * as T from './ConditionStep.types';
import { StepHeader } from './StepHeader';
import { AddCondition } from './AddCondition';
import { ConditionRow } from './ConditionRow';

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
  onStepActivate,
  hasPriority,
  currentStepId,
  currentConditionId,
  currentField,
}) => {
  const [activeConditionId, setActiveConditionId] = React.useState<string | null>(null);
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
      ...texts,
    }),
    [texts, formatMessage]
  );

  const onActivate = onStepActivate ? (): void => onStepActivate(step.id) : undefined;

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
      />
    ),
    [draggableEnabled, duplicateStep, index, removeStep, step.id, step.stepName, text, updateStepName]
  );

  const addConditionButton = React.useMemo(() => {
    return (
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
  ]);

  const handleActivation = (conditionId: string): (() => void) => (): void => {
    setActiveConditionId(conditionId);
    onActivate && onActivate();
  };

  const renderConditionRow = React.useCallback(
    (condition, conditionIndex) => (
      <ConditionRow
        key={`step-${step.id}-condition-${condition.id}`}
        hasPriority={hasPriority && activeConditionId === condition.id}
        index={conditionIndex}
        conditionId={condition.id}
        addCondition={addCondition}
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
      />
    ),
    [
      getPopupContainerOverride,
      addCondition,
      currentConditionId,
      currentField,
      currentStepId,
      maxConditionsLength,
      minConditionsLength,
      removeCondition,
      selectOperator,
      selectParameter,
      setStepConditionFactorType,
      setStepConditionFactorValue,
      step.conditions.length,
      step.context,
      step.id,
      text,
      onActivate,
      handleActivation,
      activeConditionId,
      hasPriority,
    ]
  );

  return (
    <S.Step
      key={step.id}
      id={`condition-step-${step.id}`}
      data-dropLabel={text.dropLabel}
      style={hasPriority ? { zIndex: 10001 } : undefined}
    >
      {updateStepName && stepHeader}
      <S.StepConditions withoutStepName={updateStepName === undefined}>
        <S.Subject>
          {step.subject && (
            <Subject
              {...step.subject}
              getPopupContainerOverride={getPopupContainerOverride}
              onActivate={onActivate}
              onSelectItem={(value): void => selectSubject(value, step.id)}
            />
          )}
          {step.context && (
            <ContextSelector
              {...step.context}
              getPopupContainerOverride={getPopupContainerOverride}
              onActivate={onActivate}
              onSelectItem={(value): void => selectContext(value, step.id)}
            />
          )}
        </S.Subject>
        <S.ConditionRows>
          {step.conditions.length > 0 && step.conditions.map(renderConditionRow)}
          {addConditionButton}
        </S.ConditionRows>
      </S.StepConditions>
    </S.Step>
  );
};
