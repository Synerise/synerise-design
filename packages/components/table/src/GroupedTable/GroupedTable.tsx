import * as React from 'react';

import Button from '@synerise/ds-button';
import { DSTableProps } from '../Table.types';
import DSTable from '../Table';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function GroupedTable<T extends object = any>(props: DSTableProps<T>): React.ReactElement {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const groupedTableBody = (row: any): React.ReactNode => {
    return (
      <>
        <tr className={row.className}>
          <td colSpan={row.children.length}>
            {row.children[0].props.record.value} ({row.children[0].props.record.rows.length})
            <Button.Expander />
          </td>
        </tr>
        {row.children[0].props.record.rows.map(record => {
          return (
            <tr key={record.column}>
              <td>{record.first_name}</td>
              <td>{record.last_name}</td>
              <td>{record.city}</td>
              <td>{record.age}</td>
            </tr>
          );
        })}
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
