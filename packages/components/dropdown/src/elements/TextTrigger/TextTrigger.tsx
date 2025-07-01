import React from 'react';

import { theme } from '@synerise/ds-core';
import Icon, { AngleDownS } from '@synerise/ds-icon';
import { Title } from '@synerise/ds-typography';

import * as S from './TextTrigger.styles';
import { type TextTriggerProps } from './TextTrigger.types';

const TextTrigger: React.FC<TextTriggerProps> = ({
  value,
  expanded,
  size,
  inactiveColor = 'grey-800',
  onClick,
  onFocus,
  isDisabled = false,
}) => {
  return (
    <S.TextTrigger
      onFocus={isDisabled ? undefined : onFocus}
      inactiveColor={theme.palette[inactiveColor]}
      tabIndex={0}
      onClick={isDisabled ? undefined : onClick}
      isDisabled={isDisabled}
    >
      <Title level={size}>{value}</Title>
      <S.IconWrapper expanded={expanded}>
        <Icon component={<AngleDownS />} />
      </S.IconWrapper>
    </S.TextTrigger>
  );
};

export default TextTrigger;
