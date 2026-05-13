import React from 'react';
import { FormattedMessage } from 'react-intl';

import Result from '@synerise/ds-result';

import { type TableEmptyBodyProps } from '../../../Table.types';
import { useTableContext } from '../../../contexts/TableContext';
import * as S from './TableEmptyBody.styles';

export const TableEmptyBody = <TData, TValue>({
  emptyDataComponent,
  texts,
}: TableEmptyBodyProps<TData, TValue>) => {
  const { table } = useTableContext();
  const colSpan = table.getAllLeafColumns().length;
  return (
    <S.TBody className="ds-table-body">
      <S.Tr className="ds-table-row">
        <S.Td colSpan={colSpan} className="ds-table-cell">
          <S.TableEmptyBodyWrapper>
            {emptyDataComponent !== undefined ? (
              emptyDataComponent
            ) : (
              <Result
                description={
                  texts.emptyText || (
                    <FormattedMessage id="DS.TABLE.EMPTY_TEXT" />
                  )
                }
                type="no-results"
                noSearchResults
              />
            )}
          </S.TableEmptyBodyWrapper>
        </S.Td>
      </S.Tr>
    </S.TBody>
  );
};
