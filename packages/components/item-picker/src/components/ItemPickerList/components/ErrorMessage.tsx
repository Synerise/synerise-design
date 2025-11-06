import React from 'react';

import { theme } from '@synerise/ds-core';
import { WarningL } from '@synerise/ds-icon';

import { type ItemPickerListTexts } from '../../ItemPickerNew/types/itemPickerListTexts.types';
import * as S from '../ItemPickerList.styles';

type ErrorMessageProps = {
  texts: ItemPickerListTexts;
};

export const ErrorMessage = ({ texts }: ErrorMessageProps) => {
  return (
    <S.EmptyStates
      customIcon={<WarningL fill={theme.palette['red-600']} />}
      text={texts.errorMessageTitle}
      label={texts.errorMessageDetails}
      labelPosition="bottom"
    />
  );
};
