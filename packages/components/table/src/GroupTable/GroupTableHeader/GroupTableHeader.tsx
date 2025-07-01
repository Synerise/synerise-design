import React from 'react';

import { type Props } from './GroupTableHeader.types';

function GroupTableHeader<T>({
  header,
  activeColumnKey,
  sortColumn,
}: Props<T>): JSX.Element {
  const clickHandle = React.useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (child: any): void => {
      if (child.props.column.sorter) {
        sortColumn(child);
      }
    },
    [sortColumn],
  );
  return (
    <tr>
      {header.children.map(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (child: any): React.ReactNode => {
          const isColumnActive = activeColumnKey === child.key;

          return (
            <th
              key={child.key}
              rowSpan={child.props.rowspan}
              onClick={
                isColumnActive
                  ? (e): void => e.preventDefault()
                  : (): void => clickHandle(child)
              }
              className={`${child.props.className} ${child.props.additionalProps?.className || ''} ${
                isColumnActive ? 'ds-table-active-column' : ''
              }`}
            >
              {child.props.children}
            </th>
          );
        },
      )}
    </tr>
  );
}

export default GroupTableHeader;
