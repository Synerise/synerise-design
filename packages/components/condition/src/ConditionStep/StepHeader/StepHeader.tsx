import InlineEdit from '@synerise/ds-inline-edit';
import * as React from 'react';
import Cruds from '@synerise/ds-cruds';
import { DragHandleM } from '@synerise/ds-icon/';
import { NOOP } from '@synerise/ds-utils';
import { debounce } from 'lodash';

import * as S from '../../Condition.style';

import * as T from './StepHeader.types';

// eslint-disable-next-line import/prefer-default-export
export const StepHeader: React.FC<T.StepHeaderProps> = ({
  stepName,
  stepId,
  texts,
  updateStepName,
  duplicateStep,
  removeStep,
  index,
  draggableEnabled,
  readOnly = false,
}) => {
  const onChangeNameDebounce = React.useRef(debounce(updateStepName || NOOP, 300)).current;
  const [localName, setLocalName] = React.useState(stepName);

  React.useEffect(() => {
    setLocalName(stepName);
  }, [stepName]);

  React.useEffect(() => {
    return () => {
      onChangeNameDebounce.cancel();
    };
  }, [onChangeNameDebounce]);

  const handleChangeName = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setLocalName(event.target.value);
      onChangeNameDebounce(stepId, event.target.value);
    },
    [onChangeNameDebounce, stepId]
  );

  const dragHandleElement = !readOnly && draggableEnabled && (
    <S.DragIcon className="step-drag-handler" component={<DragHandleM />} />
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
        onDuplicate={duplicateStep ? (): void => duplicateStep(stepId) : undefined}
        onDelete={removeStep ? (): void => removeStep(stepId) : undefined}
        duplicateTooltip={texts.duplicateTooltip}
        deleteTooltip={texts.removeTooltip}
      />
    </S.StepCruds>
  );

  return (
    <S.StepHeader className="ds-condition-step-header" draggable={draggableEnabled}>
      <S.LeftSide>
        {dragHandleElement}
        <S.StepName className="ds-condition-step-name">
          <S.StepIndexWrapper readOnly={readOnly}>{`${index + 1}`}</S.StepIndexWrapper>
          {stepNameElement}
        </S.StepName>
      </S.LeftSide>
      {crudElement}
    </S.StepHeader>
  );
};
