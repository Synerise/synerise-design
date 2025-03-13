import React from 'react';
import Checkbox from '@synerise/ds-checkbox';

import type { BaseItemType, RowSelectionProps } from '../../Mapping.types';
import * as S from '../../Mapping.styles';

export const RowSelection = <T extends BaseItemType>({ itemId, checkboxState, onChange }: RowSelectionProps<T>) => {
  return (
    <S.RowSelectionWrapper>
      <Checkbox withoutPadding checked={checkboxState} onChange={event => onChange(event.target.checked, itemId)} />
    </S.RowSelectionWrapper>
  );
};
