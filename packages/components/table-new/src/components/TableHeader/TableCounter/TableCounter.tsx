import React, { useMemo } from 'react';

import { useDataFormat } from '@synerise/ds-core';

import { TableSkeleton } from '../../../Table.styles';
import { type TableCounterProps } from '../../../Table.types';
import * as S from './TableCounter.styles';

export const TableCounter = <TData extends object, TValue>({
  selectedItemsCount,
  texts,
  tableTotal,
  isCounterLoading,
  renderCustomCounter,
}: TableCounterProps<TData, TValue>) => {
  const { formatValue } = useDataFormat();
  const defaultCounterContent = useMemo(() => {
    return (
      <S.TableCounterWrapper>
        {selectedItemsCount ? (
          <>
            <strong>{formatValue(selectedItemsCount)}</strong>{' '}
            <span>{texts.selected}</span>
          </>
        ) : (
          <>
            <strong>{formatValue(tableTotal)}</strong>
            <span>{texts.totalItems}</span>
          </>
        )}
      </S.TableCounterWrapper>
    );
  }, [selectedItemsCount, tableTotal, texts.totalItems, texts.selected]);

  return (
    <>
      {isCounterLoading ? (
        <TableSkeleton numberOfSkeletons={1} size="S" skeletonWidth="100px" />
      ) : (
        <>
          {renderCustomCounter
            ? renderCustomCounter({
                count: tableTotal,
                content: defaultCounterContent,
              })
            : defaultCounterContent}
        </>
      )}
    </>
  );
};
