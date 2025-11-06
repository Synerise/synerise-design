import React, { forwardRef } from 'react';

import { useTheme } from '@synerise/ds-core';
import Icon, { AngleDownS } from '@synerise/ds-icon';
import { Title } from '@synerise/ds-typography';

import * as S from './TextTrigger.styles';
import { type TextTriggerProps } from './TextTrigger.types';

export const TextTrigger = forwardRef<HTMLDivElement, TextTriggerProps>(
  (
    {
      value,
      expanded,
      size,
      inactiveColor = 'grey-800',
      onClick,
      onFocus,
      isDisabled = false,
    },
    ref,
  ) => {
    const theme = useTheme();
    return (
      <S.TextTrigger
        onFocus={isDisabled ? undefined : onFocus}
        inactiveColor={theme.palette[inactiveColor]}
        tabIndex={0}
        ref={ref}
        onClick={isDisabled ? undefined : onClick}
        isDisabled={isDisabled}
      >
        <Title level={size}>{value}</Title>
        <S.IconWrapper expanded={expanded}>
          <Icon component={<AngleDownS />} />
        </S.IconWrapper>
      </S.TextTrigger>
    );
  },
);
