import * as React from 'react';

import Table from 'antd/lib/table';
import { DSTableProps } from '../Table.types';
import GroupTableBody from './GroupTableBody/GroupTableBody';
import TableHeader from '../TableHeader/TableHeader';
import '../style/index.less';
import GroupTableHeader from './GroupTableHeader/GroupTableHeader';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function GroupedTable<T extends { key: string; rows: T[]; column: string }>(
  props: DSTableProps<T>
): React.ReactElement {
  const {
    selection,
    rowKey,
    dataSource,
    columns,
    title,
    onSearch,
    filters,
    itemsMenu,
    searchComponent,
    cellSize,
    roundedHeader,
  } = props;
  const [expandedGroups, setExpandedGroups] = React.useState<React.ReactText[]>(
    dataSource?.map(group => group.key) || []
  );

  const activeColumn = React.useMemo(() => {
    return dataSource && dataSource[0].column;
  }, [dataSource]);

  const toggleExpand = React.useCallback(
    (groupKey: React.ReactText) => {
      if (expandedGroups.indexOf(groupKey) >= 0) {
        setExpandedGroups(expandedGroups.filter(key => key !== groupKey));
      } else {
        setExpandedGroups([...expandedGroups, groupKey]);
      }
    },
    [expandedGroups, setExpandedGroups]
  );

  const allItems = React.useMemo<T[]>(() => {
    const result: T[] = [];
    dataSource && dataSource.forEach(group => group.rows.forEach(row => result.push(row)));
    return result;
  }, [dataSource]);

  const renderHeader = React.useCallback((): React.ReactNode => {
    const size = selection && selection?.selectedRowKeys && selection?.selectedRowKeys.length;
    return (
      <TableHeader
        selectedRows={size}
        title={title}
        onSearch={onSearch}
        filters={filters}
        itemsMenu={itemsMenu}
        selection={selection}
        dataSource={allItems}
        searchComponent={searchComponent}
      />
    );
  }, [selection, title, onSearch, dataSource, filters, itemsMenu, searchComponent]);

  return (
    <div className={`ds-table ds-table-cell-size-${cellSize} ${roundedHeader ? 'ds-table-rounded' : ''}`}>
      <Table<T>
        {...props}
        // scroll={{y: 200}}
        title={renderHeader}
        /* eslint-disable-next-line @typescript-eslint/ban-ts-ignore */
        // @ts-ignore
        components={{
          header: {
            row: (header: any): React.ReactNode => <GroupTableHeader header={header} activeColumnKey={activeColumn} />,
          },
          body: {
            row: (record: any): React.ReactNode => (
              <GroupTableBody
                group={record}
                selection={selection}
                rowKey={rowKey}
                allItems={allItems}
                expanded={expandedGroups.indexOf(record['data-row-key']) >= 0}
                expandGroup={toggleExpand}
                columns={columns}
              />
            ),
          },
        }}
        /* eslint-disable-next-line @typescript-eslint/ban-ts-ignore */
        // @ts-ignore
        rowSelection={
          selection && {
            ...selection,
            columnWidth: 72,
          }
        }
      />
    </div>
  );
}

export default GroupedTable;
