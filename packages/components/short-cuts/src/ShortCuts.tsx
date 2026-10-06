import React from 'react';

import Icon from '@synerise/ds-icon';
import { Text } from '@synerise/ds-typography';

import * as S from './ShortCuts.style';
import type { ShortCutsProps } from './ShortCuts.types';

const ShortCuts = ({
  size = 'L',
  children,
  color,
  icon,
  autoWidth,
  ...htmlAttributes
}: ShortCutsProps) => {
  return (
    <S.Wrapper
      color={color}
      size={size}
      autoWidth={autoWidth}
      isIcon={Boolean(icon)}
      {...htmlAttributes}
    >
      {icon ? (
        <Icon
          color={
            color === 'dark'
              ? 'var(--ds-color-icon-onsolid-default)'
              : 'var(--ds-color-icon-base-default)'
          }
          component={icon}
          size={12}
        />
      ) : (
        <Text size="xsmall">{children}</Text>
      )}
    </S.Wrapper>
  );
};
export default ShortCuts;
