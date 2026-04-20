import React, { useCallback, useMemo } from 'react';

import Modal from '@synerise/ds-modal';
import { type ColumnDef } from '@tanstack/react-table';

import { VirtualTable } from '../../../../VirtualTable';
import { type DataSourceType, type ModalProps } from './Modal.types';

const DetailsModal = ({
  visible,
  hide,
  items,
  texts,
  renderItem,
  labelKey,
  loading,
}: ModalProps<DataSourceType>) => {
  const columns = useMemo(
    (): ColumnDef<DataSourceType, string>[] => [
      {
        id: labelKey,
        accessorKey: labelKey,
        cell: (info) => renderItem(info.getValue(), info.row.original),
      },
    ],
    [renderItem, labelKey],
  );

  const matchesSearchQuery = useCallback(
    (query: string, row: DataSourceType) => {
      const value = row[labelKey];
      return (
        typeof value === 'string' &&
        value.toLowerCase().includes(query.toLowerCase())
      );
    },
    [labelKey],
  );

  return (
    <Modal
      size="small"
      visible={visible}
      title={texts.modalTitle}
      closable
      onCancel={hide}
      bodyStyle={{ padding: 0 }}
      footer={null}
    >
      <VirtualTable<DataSourceType, string>
        maxHeight={500}
        cellHeight={64}
        data={items}
        title={`${items.length} ${texts.records}`}
        columns={columns}
        isLoading={loading}
        hideTitleBar
        rowKey="key"
        matchesSearchQuery={matchesSearchQuery}
        searchProps={{
          clearTooltip: texts.searchClear,
          placeholder: texts.searchPlaceholder,
        }}
        hideColumnNames
      />
    </Modal>
  );
};

export { DetailsModal };
