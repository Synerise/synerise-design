import React from 'react';

import CheckboxTristate from '@synerise/ds-checkbox-tristate';

import * as S from '../../Mapping.styles';
import { type BatchSelectionProps } from '../../Mapping.types';

export const BatchSelectionHeader = ({
  counter,
  checkboxState,
  onChange,
  actionButtons,

  batchButton,
  enabled,
}: BatchSelectionProps) => {
  const handleChange = () => {
    if (checkboxState !== true) {
      onChange(true);
    } else {
      onChange(false);
    }
  };
  return (
    <S.BatchSelectionWrapper>
      {enabled && (
        <S.RowSelectionWrapper>
          <CheckboxTristate
            withoutPadding
            checked={checkboxState}
            onChange={handleChange}
          />
        </S.RowSelectionWrapper>
      )}
      <S.BatchSelectionInner>
        <S.BatchCounter>{counter}</S.BatchCounter>
        {enabled && checkboxState !== false && (
          <S.BatchActionButtons>{actionButtons}</S.BatchActionButtons>
        )}
      </S.BatchSelectionInner>
      <S.BatchToggleButton>{batchButton}</S.BatchToggleButton>
    </S.BatchSelectionWrapper>
  );
};
