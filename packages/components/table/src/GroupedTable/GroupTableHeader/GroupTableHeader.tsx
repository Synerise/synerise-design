import React from 'react';

interface Props<T extends unknown> {
  header: any;
  activeColumnKey: string;
}

function GroupTableHeader<T extends unknown>({ header, activeColumnKey }: Props<T>): React.ReactNode {
  console.log(header);
  return (
    <tr>
      {header.children.map(
        (child: unknown): React.ReactNode => (
          <th
            key={child.key}
            {...child.props}
            className={`${child.props.className} ${activeColumnKey === child.key ? 'ds-table-active-column' : ''}`}
          />
        )
      )}
    </tr>
  );
}

export default GroupTableHeader;
