import React from 'react';

import Icon, { WarningL } from '@synerise/ds-icon';

import { type ItemPickerListTexts } from '../../ItemPickerNew/types/itemPickerListTexts.types';
import * as S from '../ItemPickerList.styles';

type ErrorMessageProps = {
  texts: ItemPickerListTexts;
};

export const ErrorMessage = ({ texts }: ErrorMessageProps) => {
  return (
    <S.EmptyStates
      customIcon={
        <Icon
          component={<WarningL />}
          color="var(--ds-color-icon-danger-default)"
        />
      }
      text={texts.errorMessageTitle}
      label={texts.errorMessageDetails}
      labelPosition="bottom"
    />
  );
};
