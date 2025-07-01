import React from 'react';

import { theme } from '@synerise/ds-core';
import Icon, { ClickM } from '@synerise/ds-icon';

import * as S from './emptyCondition.styles';

type EmptyConditionProps = {
  icon?: JSX.Element;
  label: string;
};

export const EmptyCondition = ({
  icon = <ClickM />,
  label,
}: EmptyConditionProps) => {
  return (
    <S.EmptyConditionWrapper>
      <Icon component={icon} color={theme.palette['grey-500']} />
      <S.LabelWrapper size="small">{label}</S.LabelWrapper>
    </S.EmptyConditionWrapper>
  );
};
