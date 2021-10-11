import InlineEdit from '@synerise/ds-inline-edit';
import * as React from 'react';
import Cruds from '@synerise/ds-cruds';
import { DragHandleM } from '@synerise/ds-icon/dist/icons';
import { NOOP } from '@synerise/ds-utils';
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
  return (
    <S.StepHeader>
      {stepName !== undefined && (
        <S.StepName>
          {`${index + 1}.`}{' '}
          <InlineEdit
            size="small"
            input={{
              value: stepName,
              name: `condition-step-name-${stepId}`,
              placeholder: texts.stepNamePlaceholder,
              onChange: (event: React.ChangeEvent<HTMLInputElement>): void =>
                updateStepName && updateStepName(stepId, event.target.value),
            }}
          />
        </S.StepName>
      )}
      <S.StepCruds>
        {draggableEnabled && (
          <Cruds.CustomAction
            icon={<DragHandleM />}
            title={texts.moveTooltip}
            onClick={NOOP}
            className="step-drag-handler"
          />
        )}
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
