import React from 'react';

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
      <Icon component={icon} color="var(--ds-color-icon-base-subtle)" />
      <S.LabelWrapper size="small">{label}</S.LabelWrapper>
    </S.EmptyConditionWrapper>
  );
};
