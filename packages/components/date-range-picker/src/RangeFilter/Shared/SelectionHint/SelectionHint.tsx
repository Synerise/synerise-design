import React from 'react';
import { withTheme } from 'styled-components';

import { type ThemeProps } from '@synerise/ds-core';
import Icon, { InfoM } from '@synerise/ds-icon';

import * as S from '../TimeWindow/TimeWindow.styles';

export type SelectionHintProps = {
  message: React.ReactNode | string;
} & ThemeProps;

const SelectionHint = ({ message, theme }: SelectionHintProps): JSX.Element => {
  return (
    <S.SelectionHint>
      <Icon component={<InfoM />} color={theme.palette['grey-600']} /> {message}
    </S.SelectionHint>
  );
};

export default withTheme(SelectionHint);
