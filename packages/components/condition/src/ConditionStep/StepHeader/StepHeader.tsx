import debounce from 'lodash.debounce';
import React, {
  type ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import Cruds from '@synerise/ds-cruds';
import { DragHandleM } from '@synerise/ds-icon';
import InlineEdit from '@synerise/ds-inline-edit';
import { NOOP } from '@synerise/ds-utils';

import * as S from '../../Condition.style';
import { StepName } from '../StepName/StepName';
import type * as T from './StepHeader.types';

export const StepHeader = ({
  stepName,
  stepId,
  texts,
  updateStepName,
  duplicateStep,
  removeStep,
  index,
  draggableEnabled,
  dragHandleProps = {},
  readOnly = false,
}: T.StepHeaderProps) => {
  const onChangeNameDebounce = useRef(
    debounce(updateStepName || NOOP, 300),
  ).current;
  const [localName, setLocalName] = useState(stepName);

  useEffect(() => {
    setLocalName(stepName);
  }, [stepName]);

  useEffect(() => {
    return () => {
      onChangeNameDebounce.cancel();
    };
  }, [onChangeNameDebounce]);

  const handleChangeName = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setLocalName(event.target.value);
      onChangeNameDebounce(stepId, event.target.value);
    },
    [onChangeNameDebounce, stepId],
  );

  const dragHandleElement = !readOnly && draggableEnabled && (
    <S.DragIcon
      className="step-drag-handler"
      component={<DragHandleM />}
      {...dragHandleProps}
    />
  );

  const stepNameElement = readOnly ? (
    localName
  ) : (
    <InlineEdit
      size="small"
      input={{
        value: localName,
        name: `condition-step-name-${stepId}`,
        placeholder: texts.stepNamePlaceholder,
        onChange: handleChangeName,
      }}
    />
  );

  const crudElement = !readOnly && (
    <S.StepCruds>
      <Cruds
        onDuplicate={
          duplicateStep ? (): void => duplicateStep(stepId) : undefined
        }
        onDelete={removeStep ? (): void => removeStep(stepId) : undefined}
        duplicateTooltip={texts.duplicateTooltip}
        deleteTooltip={texts.removeTooltip}
      />
    </S.StepCruds>
  );

  return (
    <S.StepHeader
      className="ds-condition-step-header"
      draggable={draggableEnabled}
    >
      <S.LeftSide>
        {dragHandleElement}
        <StepName name={stepNameElement} index={index} texts={texts} />
      </S.LeftSide>
      {crudElement}
    </S.StepHeader>
  );
};
