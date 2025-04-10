import React from 'react';

import * as S from '../FormField.styles';
import { ContentBelowProps } from '../FormField.types';

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
