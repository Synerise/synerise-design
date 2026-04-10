import React, { type CSSProperties, type ReactNode, useEffect } from 'react';

import {
  type InfiniteLoaderRowTexts,
  type InfiniteScrollState,
} from '../../../../Table.types';
import { useTableContext } from '../../../../contexts/TableContext';
import { TableCell } from '../../../TableBody/TableCell/TableCell';
import * as S from '../TableRow.styles';
import { ErrorItem } from './ErrorItem';
import { LoadingItem } from './LoadingItem';
import { NoMoreItem } from './NoMoreItem';

type InfiniteLoaderRowProps = {
  position: 'TOP' | 'BOTTOM';
  children?: ReactNode;
  style?: CSSProperties;
  infiniteLoaderItemProps: InfiniteScrollState & {
    handleRetryClick?: () => void;
  };
  loadMore?: () => void;
  texts: InfiniteLoaderRowTexts;
};
export const InfiniteLoaderRow = ({
  texts,
  style,
  loadMore,
  infiniteLoaderItemProps,
}: InfiniteLoaderRowProps) => {
  const { table, rowVirtualizer } = useTableContext();

  const size = table.getTotalSize();

  const { hasError, hasMore, isLoading, handleRetryClick } =
    infiniteLoaderItemProps;

  const autoLoadMore = !isLoading && hasMore && !hasError;

  // @ts-expect-error TS7030: Not all code paths return a value
  useEffect(() => {
    if (autoLoadMore && loadMore && !rowVirtualizer?.isScrolling) {
      const timeout = setTimeout(loadMore, 0);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [loadMore, autoLoadMore, hasError, hasMore, rowVirtualizer, isLoading]);

  return (
    <S.Tr style={style} role="row">
      <TableCell
        style={{ zIndex: 11 }}
        isPinned="left"
        leftOffset={0}
        width={400}
      >
        {isLoading && <LoadingItem texts={texts} />}
        {!isLoading && !hasMore && <NoMoreItem texts={texts} />}
        {!isLoading && hasError && (
          <ErrorItem texts={texts} onRetryClick={handleRetryClick} />
        )}
      </TableCell>
      <TableCell style={{ zIndex: 11 }} width={size - 400}></TableCell>
    </S.Tr>
  );
};
