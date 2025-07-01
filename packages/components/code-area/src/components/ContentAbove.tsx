import React, { type ReactNode } from 'react';

import * as S from '../CodeArea.styles';

type ContentAboveProps = {
  label?: ReactNode;
  counter?: ReactNode;
};
export const ContentAbove = ({ label, counter }: ContentAboveProps) => {
  return label || counter ? (
    <S.ContentAbove>
      {label && <S.LeftSide data-testid="code-area-label">{label}</S.LeftSide>}
      {counter && (
        <S.RightSide data-testid="code-area-counter-top">{counter}</S.RightSide>
      )}
    </S.ContentAbove>
  ) : (
    <></>
  );
};
