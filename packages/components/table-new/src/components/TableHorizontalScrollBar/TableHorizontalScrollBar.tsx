import React from 'react';

import Scrollbar from '@synerise/ds-scrollbar';

import * as S from './TableHorizontalScrollBar.styles';

type TableHorizontalScrollBarProps = {
  contentRef?: (element: HTMLDivElement) => void;
};
export const TableHorizontalScrollBar = ({
  contentRef,
}: TableHorizontalScrollBarProps) => {
  return (
    <S.ScrollbarWrapper data-testid="ds-table-horizontal-scroll">
      <Scrollbar absolute ref={contentRef}>
        <S.ScrollbarContent />
      </Scrollbar>
    </S.ScrollbarWrapper>
  );
};
