import React from 'react';

import Button from '@synerise/ds-button';

import * as S from './ColumnManagerActions.styles';
import { type ColumnManagerActionsProps } from './ColumnManagerActions.types';

export const ColumnManagerActions = ({
  texts,
  onApply,
  onCancel,
}: ColumnManagerActionsProps) => {
  return (
    <S.ColumnManagerActions>
      <S.RightButtons>
        <Button
          data-testid="ds-column-manager-cancel"
          type="ghost"
          mode="simple"
          onClick={onCancel}
        >
          {texts.cancel}
        </Button>
        <Button
          data-testid="ds-column-manager-apply"
          type="primary"
          mode="simple"
          onClick={onApply}
        >
          {texts.apply}
        </Button>
      </S.RightButtons>
    </S.ColumnManagerActions>
  );
};
