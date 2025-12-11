import React from 'react';

import { isSplitFooter } from '../../utils';
import * as S from './DropdownFooter.styles';
import { type DropdownFooterProps } from './DropdownFooter.types';

export const DropdownFooter = ({ footer }: DropdownFooterProps) => {
  const split = isSplitFooter(footer);

  return (
    <S.DropdownFooterWrapper split={split}>
      {split ? (
        <>
          <S.DropdownFooterLeft>{footer.left}</S.DropdownFooterLeft>
          <S.DropdownFooterLeft>{footer.right}</S.DropdownFooterLeft>
        </>
      ) : (
        footer
      )}
    </S.DropdownFooterWrapper>
  );
};
