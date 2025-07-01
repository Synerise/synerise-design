import React from 'react';

import Button from '@synerise/ds-button';
import Icon, { Add2M } from '@synerise/ds-icon';

import * as S from '../../Condition.style';
import type * as T from './AddCondition.types';

export const AddCondition = ({
  addCondition,
  stepId,
  conditionsNumber,
  texts,
  isDisabled = false,
  errorText,
}: T.AddConditionProps) => {
  return (
    <>
      <S.AddConditionRow>
        <S.ConditionConnections last first={conditionsNumber === 0} />

        <S.ConditionRowLine>
          <Button
            icon={<Icon component={<Add2M />} />}
            error={!isDisabled && Boolean(errorText)}
            type="ghost"
            mode="icon-label"
            onClick={(): void => {
              addCondition && addCondition(stepId);
            }}
            disabled={isDisabled}
          >
            {conditionsNumber > 0
              ? texts.addConditionRowButton
              : texts.addFirstConditionRowButton}
          </Button>
          {!isDisabled && errorText && (
            <S.ErrorWrapper>{errorText}</S.ErrorWrapper>
          )}
        </S.ConditionRowLine>
      </S.AddConditionRow>
    </>
  );
};
