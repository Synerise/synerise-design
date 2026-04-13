import React from 'react';

import * as S from './HoverableSuffix.styles';
import { type HoverableSuffixProps } from './HoverableSuffix.types';

export const HoverableSuffix = ({
  hovered,
  hoverContent,
  defaultContent,
}: HoverableSuffixProps) => {
  if (!defaultContent) {
    return <S.Slot visible={hovered}>{hoverContent}</S.Slot>;
  }

  return (
    <S.Container>
      <S.Slot visible={!hovered}>{defaultContent}</S.Slot>
      <S.Slot visible={hovered}>{hoverContent}</S.Slot>
    </S.Container>
  );
};
