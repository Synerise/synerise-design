import * as React from 'react';
import Button from '@synerise/ds-button';
import Icon, { Add2M } from '@synerise/ds-icon';
import * as S from '../../Condition.style';
import * as T from './AddCondition.types';

// eslint-disable-next-line import/prefer-default-export
export const AddCondition: React.FC<T.AddConditionProps> = ({
  addCondition,
  stepId,
  conditionsNumber,
  texts,
  selectedSubject,
  selectedContext,
  readOnly = false,
  errorText,
}) => {
  const disabled = !(selectedSubject || selectedContext);
  return (
    <>
      <S.AddConditionRow>
        <S.ConditionConnections last first={conditionsNumber === 0} />

        <S.ConditionRowLine>
          <Button
            icon={<Icon component={<Add2M />} />}
            error={!disabled && Boolean(errorText)}
            type="ghost"
            mode="icon-label"
            onClick={(): void => {
              addCondition && addCondition(stepId);
            }}
            disabled={disabled}
          >
            {!readOnly && conditionsNumber > 0 ? texts.addConditionRowButton : texts.addFirstConditionRowButton}
          </Button>
          {!disabled && errorText && <S.ErrorWrapper>{errorText}</S.ErrorWrapper>}
        </S.ConditionRowLine>
      </S.AddConditionRow>
    </>
  );
};
