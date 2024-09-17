import React, { useState } from 'react';

import { DSColumnType } from '@synerise/ds-table';
import Checkbox from '@synerise/ds-checkbox';
import { InfoFillS, VarTypeBooleanM, VarTypeStringM } from '@synerise/ds-icon';

import { AdditionalColumnData } from '../Table.types';
import { DATA_SOURCE } from './TreeTable.data';
import { chromaticCellRender } from '../Table.utils';

type RowType = typeof DATA_SOURCE[number];
type ColumnType = DSColumnType<RowType> & AdditionalColumnData;

const updateChildren = (label: string, newValue: boolean, children: any[]) => {
  return children.map(child => {
    if (!child.children) {
      return {
        ...child,
        [label]: newValue,
      };
    }
    return {
      ...child,
      [label]: newValue,
      children: updateChildren(label, newValue, child.children),
    };
  });
};

const updateParents = (data: any[], label: string) => {
  return data.map(record => {
    if (!record.children) {
      return {
        ...record,
      };
    }
    return {
      ...record,
      [label]: updateParents(record.children, label).filter(child => child[label] === false).length === 0,
    };
  });
};

export const useTreeTableData = () => {
  const [dataSource, setDataSource] = useState(DATA_SOURCE);
  const [expandedRows, setExpandedRows] = useState<Array<string>>([]);

  const handleExpandRow = (key: string): void => {
    if (expandedRows.indexOf(key) < 0) {
      setExpandedRows([...expandedRows, key]);
    } else {
      setExpandedRows(expandedRows.filter(k => k !== key));
    }
  };

  const setValue = (newValue: boolean, record: any, label: string) => {
    const setChildrenValue = data => {
      return data.map(rec => {
        if (rec.key === record.key) {
          if (!rec.children) {
            return {
              ...rec,
              [label]: newValue,
            };
          }
          return {
            ...rec,
            [label]: newValue,
            children: updateChildren(label, newValue, rec.children),
          };
        } else {
          if (!rec.children) {
            return {
              ...rec,
            };
          }
          return {
            ...rec,
            children: setChildrenValue(rec.children),
          };
        }
      });
    };

    const updatedChilds = setChildrenValue(dataSource);
    setDataSource(updateParents(updatedChilds, label));
  };

  const columnsData: ColumnType[] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      icon: { component: <VarTypeStringM /> },
      iconTooltip: { component: <InfoFillS /> },
    },
    {
      title: 'Create',
      dataIndex: 'create_permission',
      key: 'create_permission',
      icon: { component: <VarTypeBooleanM /> },
      iconTooltip: { component: <InfoFillS /> },
      width: 120,
      render: (value, record) => (
        <Checkbox
          withoutPadding
          checked={value}
          onChange={e => setValue(e.target.checked, record, 'create_permission')}
        />
      ),
    },
    {
      title: 'Read',
      dataIndex: 'read_permission',
      key: 'read_permission',
      icon: { component: <VarTypeBooleanM /> },
      iconTooltip: { component: <InfoFillS /> },
      width: 120,
      render: (value, record) => (
        <Checkbox
          withoutPadding
          checked={value}
          onChange={e => setValue(e.target.checked, record, 'read_permission')}
        />
      ),
    },
    {
      title: 'Edit',
      dataIndex: 'edit_permission',
      key: 'edit_permission',
      icon: { component: <VarTypeBooleanM /> },
      iconTooltip: { component: <InfoFillS /> },
      width: 120,
      render: (value, record) => (
        <Checkbox
          withoutPadding
          checked={value}
          onChange={e => setValue(e.target.checked, record, 'edit_permission')}
        />
      ),
    },
    {
      title: 'Delete',
      dataIndex: 'delete_permission',
      key: 'delete_permission',
      icon: { component: <VarTypeBooleanM /> },
      iconTooltip: { component: <InfoFillS /> },
      width: 120,
      render: (value, record) => (
        <Checkbox
          withoutPadding
          checked={value}
          onChange={e => setValue(e.target.checked, record, 'delete_permission')}
        />
      ),
    },
  ];
  return { dataSource, columnsData, handleExpandRow };
};
