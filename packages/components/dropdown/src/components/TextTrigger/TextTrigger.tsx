import React, { forwardRef } from 'react';

import Icon, { AngleDownS } from '@synerise/ds-icon';
import { Title } from '@synerise/ds-typography';
import { resolveCustomColor } from '@synerise/ds-utils';

import * as S from './TextTrigger.styles';
import type { TextTriggerProps } from './TextTrigger.types';

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
    return (
      <S.TextTrigger
        onFocus={isDisabled ? undefined : onFocus}
        inactiveColor={resolveCustomColor(
          inactiveColor,
          'var(--ds-color-text-base-default)',
          { passthroughResolved: true },
        )}
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
