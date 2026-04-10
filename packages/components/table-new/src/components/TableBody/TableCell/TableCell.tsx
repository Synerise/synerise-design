import React, { type ReactNode, memo } from 'react';

import { type WithHTMLAttributes } from '@synerise/ds-utils';

import * as S from './TableCell.styles';

type TableCellProps = WithHTMLAttributes<
  HTMLTableCellElement,
  {
    children?: ReactNode;
    width?: number;
    height?: number;
    colSpan?: number;
    isSorted?: boolean;
    isPinned?: 'right' | 'left' | false;
    rightOffset?: number;
    leftOffset?: number;
    cellKey?: string;
    headerIndex?: number;
  }
>;
export const TableCell = memo(
  ({
    children,
    width,
    height,
    isSorted,
    colSpan,
    isPinned,
    headerIndex,
    rightOffset,
    leftOffset,
    cellKey,
    ...rest
  }: TableCellProps) => (
    <S.Td
      $height={height}
      $width={width}
      isSorted={isSorted}
      role="cell"
      colSpan={colSpan}
      isPinned={isPinned}
      rightOffset={rightOffset}
      leftOffset={leftOffset}
      key={cellKey}
      headerIndex={headerIndex}
      {...rest}
    >
      <S.CellWrapper>{children}</S.CellWrapper>
    </S.Td>
  ),
);
