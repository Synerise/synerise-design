import React, { forwardRef, ReactNode } from 'react';
import { CodeAreaProps } from '../CodeArea.types';

import * as S from '../CodeArea.styles';

type ContentBelowProps = Pick<CodeAreaProps, 'description' | 'errorText'> & {
  additionalDescription?: ReactNode;
  counter?: ReactNode;
};
export const ContentBelow = forwardRef<HTMLDivElement, ContentBelowProps>(
  ({ description, additionalDescription, errorText, counter }, ref) => {
    const isEmpty = !(description || additionalDescription || errorText || counter);
    return (
      <S.ContentBelow data-testid="code-area-below" ref={ref} isEmpty={isEmpty}>
        {(description || additionalDescription || errorText) && (
          <S.LeftSide>
            {additionalDescription}
            {errorText && <S.ErrorText data-testid="code-area-error">{errorText}</S.ErrorText>}
            {description && <S.Description data-testid="code-area-description">{description}</S.Description>}
          </S.LeftSide>
        )}
        {counter && <S.RightSide data-testid="code-area-counter-bottom">{counter}</S.RightSide>}
      </S.ContentBelow>
    );
  }
);
