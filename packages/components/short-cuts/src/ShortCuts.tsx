import React from 'react';

import { theme } from '@synerise/ds-core';
import Icon from '@synerise/ds-icon';
import { Text } from '@synerise/ds-typography';

import * as S from './ShortCuts.style';
import { type ShortCutsProps } from './ShortCuts.types';

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
            color === 'dark' ? theme.palette.white : theme.palette['grey-600']
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
