import React from 'react';
import { FormattedMessage } from 'react-intl';

import Result from '@synerise/ds-result';

import { type TableEmptyBodyProps } from '../../../Table.types';
import { useTableContext } from '../../../contexts/TableContext';
import * as S from './TableEmptyBody.styles';

export const TableEmptyBody = <TData, TValue>({
  emptyDataComponent,
  noResultsComponent,
  hasNoSearchResults,
  texts,
}: TableEmptyBodyProps<TData, TValue>) => {
  const { table } = useTableContext();
  const colSpan = table.getAllLeafColumns().length;

  // The two empty states are independent: the "no results" state (an internal search/filter emptied
  // a non-empty dataSource) uses `noResultsComponent` then `noResultsText`; the "no data" state uses
  // `emptyDataComponent` then `emptyText`. A no-results state does NOT fall back to
  // `emptyDataComponent` — that component is the no-data UI. (Pass it to both props to reuse it.)
  // Both render the same `Result type="no-results"` visual by default — only the copy differs.
  const customComponent = hasNoSearchResults
    ? noResultsComponent
    : emptyDataComponent;
  const description = hasNoSearchResults
    ? texts.noResultsText || <FormattedMessage id="DS.TABLE.NO_RESULTS" />
    : texts.emptyText || <FormattedMessage id="DS.TABLE.EMPTY_TEXT" />;

  return (
    <S.TBody className="ds-table-body">
      <S.Tr className="ds-table-row">
        <S.Td colSpan={colSpan} className="ds-table-cell">
          <S.TableEmptyBodyWrapper>
            {customComponent !== undefined ? (
              customComponent
            ) : (
              <Result description={description} type="no-results" />
            )}
          </S.TableEmptyBodyWrapper>
        </S.Td>
      </S.Tr>
    </S.TBody>
  );
};
