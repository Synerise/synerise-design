import React, {
  type MutableRefObject,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { useTableContext } from '../../../contexts/TableContext';
import { TableCell } from '../TableCell/TableCell';
import * as S from './TableBodySkeleton.styles';

export const TableBodySkeleton = ({
  cellHeight,
  wrapperRef,
}: {
  cellHeight: number;
  wrapperRef: MutableRefObject<HTMLDivElement | null>;
}) => {
  const { table, getScrollContainer } = useTableContext();
  const headerGroups = table.getHeaderGroups();
  const [availableSpace, setAvailableSpace] = useState<number>();

  useEffect(() => {
    const container = getScrollContainer();
    if (container && wrapperRef.current) {
      const y1 = container.getBoundingClientRect().top;
      const y2 = wrapperRef.current.getBoundingClientRect().top;
      setAvailableSpace(container.offsetHeight - (y2 - y1));
    }
  }, [getScrollContainer, wrapperRef]);

  const rowCount = useMemo(() => {
    const container = getScrollContainer();
    if (!container) {
      return 5;
    }
    return availableSpace ? Math.floor(availableSpace / cellHeight) : 0;
  }, [availableSpace, cellHeight, getScrollContainer]);

  const skeletonRows = useMemo(() => {
    return Array.from({ length: rowCount }, (_, rowIndex) =>
      headerGroups.map((headerGroup) => (
        <S.Tr key={`${headerGroup.id}-${rowIndex}`} role="row">
          {headerGroup.headers.map((header, columnIndex) => {
            return (
              <TableCell
                isSorted={!!header.column.getIsSorted()}
                key={header.id}
                headerIndex={columnIndex}
                width={header.column.getSize()}
                height={cellHeight}
                isPinned={header.column.getIsPinned()}
                rightOffset={header.column.getAfter('right')}
                leftOffset={header.column.getStart('left')}
              >
                {header.column.columnDef.meta?.skeletonCell ? (
                  header.column.columnDef.meta?.skeletonCell()
                ) : (
                  <S.TableSkeletonCell>
                    <S.Skeleton numberOfSkeletons={1} size="M" />
                  </S.TableSkeletonCell>
                )}
              </TableCell>
            );
          })}
        </S.Tr>
      )),
    );
  }, [cellHeight, headerGroups, rowCount]);

  return <S.TBody role="rowgroup">{skeletonRows}</S.TBody>;
};
