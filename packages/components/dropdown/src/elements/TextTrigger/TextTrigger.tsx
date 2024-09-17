import React from 'react';
import Icon, { AngleDownS } from '@synerise/ds-icon';

import { Title } from '@synerise/ds-typography';
import { theme } from '@synerise/ds-core';
import { TextTriggerProps } from './TextTrigger.types';
import * as S from './TextTrigger.styles';

const TextTrigger: React.FC<TextTriggerProps> = ({
  value,
  expanded,
  size,
  inactiveColor = 'grey-800',
  onClick,
  onFocus,
}) => {
  return (
    <S.TextTrigger onFocus={onFocus} inactiveColor={theme.palette[inactiveColor]} tabIndex={0} onClick={onClick}>
      <Title level={size}>{value}</Title>
      <S.IconWrapper expanded={expanded}>
        <Icon component={<AngleDownS />} />
      </S.IconWrapper>
    </S.TextTrigger>
  );
};

export default TextTrigger;
