import { Key, useState } from 'react';

export const useExpandableData = () => {
  const [selectedRows, setSelectedRows] = useState<Key[]>([]);
  const [expandedRows, setExpandedRows] = useState<string[]>([]);

  const handleExpandRow = (key: string): void => {
    if (expandedRows.indexOf(key) < 0) {
      setExpandedRows([...expandedRows, key]);
    } else {
      setExpandedRows(expandedRows.filter(k => k !== key));
    }
  };

  const handleSelectRow = (selectedRowKeys: Key[]) => setSelectedRows(selectedRowKeys);
  
  return { selectedRows, expandedRows, handleExpandRow, handleSelectRow };
};
