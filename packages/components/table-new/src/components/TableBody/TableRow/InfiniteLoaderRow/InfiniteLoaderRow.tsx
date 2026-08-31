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

  // `rowVirtualizer.isScrolling` is a plain mutable property, not React state, so this effect never
  // re-runs when it flips. Reading it at schedule time meant the deferred callback could fire into a
  // scroll that started afterwards, racing the scroll handler for the same page. Re-check it when the
  // timeout actually runs — a viewport too tall to overflow still auto-loads, because there it is
  // false at both points.
  // @ts-expect-error TS7030: Not all code paths return a value
  useEffect(() => {
    if (autoLoadMore && loadMore) {
      const timeout = setTimeout(() => {
        if (!rowVirtualizer?.isScrolling) {
          loadMore();
        }
      }, 0);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [loadMore, autoLoadMore, hasError, hasMore, rowVirtualizer, isLoading]);

  return (
    <S.Tr style={style} role="row">
      <TableCell
        style={{ zIndex: 12 }}
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
