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
}) => {
  const onChangeNameDebounce = React.useCallback(debounce(updateStepName || NOOP, 300), [updateStepName]);
  const [localName, setLocalName] = React.useState(stepName);

  React.useEffect(() => {
    setLocalName(stepName);
  }, [stepName]);

  const handleChangeName = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setLocalName(event.target.value);
      onChangeNameDebounce(stepId, event.target.value);
    },
    [onChangeNameDebounce, stepId]
  );

  return (
    <S.StepHeader className="ds-condition-step-header" draggable={draggableEnabled}>
      <S.LeftSide>
        {draggableEnabled && <S.DragIcon className="step-drag-handler" component={<DragHandleM />} />}
        <S.StepName className="ds-condition-step-name">
          {`${index + 1}`}{' '}
          <InlineEdit
            size="small"
            input={{
              value: localName,
              name: `condition-step-name-${stepId}`,
              placeholder: texts.stepNamePlaceholder,
              onChange: handleChangeName,
            }}
          />
        </S.StepName>
      </S.LeftSide>
      <S.StepCruds>
        <Cruds
          onDuplicate={duplicateStep ? (): void => duplicateStep(stepId) : undefined}
          onDelete={removeStep ? (): void => removeStep(stepId) : undefined}
          duplicateTooltip={texts.duplicateTooltip}
          deleteTooltip={texts.removeTooltip}
        />
      </S.StepCruds>
    </S.StepHeader>
  );
};
