import * as React from 'react';
import { Props } from './GroupTableHeader.types';

function GroupTableHeader<T extends unknown>({ header, activeColumnKey, sortColumn }: Props<T>): JSX.Element {
  const clickHandle = React.useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (child: any): void => {
      if (child.props.column.sorter) {
        sortColumn(child);
      }
    },
    [sortColumn]
  );
  return (
    <tr>
      {header.children.map(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (child: any): React.ReactNode => {
          return (
            <th
              key={child.key}
              rowSpan={child.props.rowspan}
              onClick={(): void => clickHandle(child)}
              className={`${child.props.className} ${child.props.additionalProps?.className || ''} ${
                activeColumnKey === child.key ? 'ds-table-active-column' : ''
              }`}
            >
              {child.props.children}
            </th>
          );
        }
      )}
    </tr>
  );
}

export default GroupTableHeader;
