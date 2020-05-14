import * as React from 'react';

import Button from '@synerise/ds-button';
import Checkbox from '@synerise/ds-checkbox/dist';
import { DSTableProps } from '../Table.types';
import DSTable from '../Table';
import * as S from './GroupedTable.styles';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function GroupedTable<T extends object = any>(props: DSTableProps<T>): React.ReactElement {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const groupedTableBody = (row: any): React.ReactNode => {
    return (
      <>
        <tr className={row.className}>
          <td colSpan={row.children.length}>
            <S.GroupRow>
              <Checkbox />
              {row.children[0].props.record.value} ({row.children[0].props.record.rows.length})
              <Button.Expander onClick={(): void => console.log('expand')} expanded={false} />
            </S.GroupRow>
          </td>
        </tr>
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {row.children[0].props.record.rows.map(
          (record: any): React.ReactNode => {
            return (
              <tr key={record.column}>
                <td>
                  <Checkbox />
                </td>
                <td>{record.first_name}</td>
                <td>{record.last_name}</td>
                <td>{record.city}</td>
                <td>{record.age}</td>
              </tr>
            );
          }
        )}
      </>
    );
  };

  return (
    <DSTable<T>
      {...props}
      // scroll={{y: 200}}
      /* eslint-disable-next-line @typescript-eslint/ban-ts-ignore */
      // @ts-ignore
      components={{
        body: {
          row: groupedTableBody,
        },
      }}
    />
  );
}

export default GroupedTable;
