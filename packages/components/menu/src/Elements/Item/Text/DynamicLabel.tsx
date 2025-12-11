import React, { type ReactNode } from 'react';

import * as S from './Text.styles';

export const DynamicLabel = ({
  content,
  alternativeContent,
  showAlternative,
}: {
  content: ReactNode;
  alternativeContent: ReactNode;
  showAlternative?: boolean;
}) => {
  return alternativeContent ? (
    <S.DynamicLabelWrapper showAlternative={!!showAlternative}>
      <S.DynamicLabelMain>{content}</S.DynamicLabelMain>
      <S.DynamicLabelAlternate>{alternativeContent}</S.DynamicLabelAlternate>
    </S.DynamicLabelWrapper>
  ) : (
    content
  );
};
