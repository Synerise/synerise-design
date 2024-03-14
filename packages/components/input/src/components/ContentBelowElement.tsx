import React from 'react';
import { BaseProps } from '../Input.types';
import * as S from '../Input.styles';

type ContentBelowProps = Pick<BaseProps, 'description' | 'errorText'>;
export const ContentBelowElement = ({ description, errorText }: ContentBelowProps) => {
  if (!errorText && !description) {
    return null;
  }
  const hasErrorMessage = Boolean(errorText);
  return (
    <S.ContentBelow>
      {hasErrorMessage && <S.ErrorText>{errorText}</S.ErrorText>}
      {description && <S.Description>{description}</S.Description>}
    </S.ContentBelow>
  );
};
