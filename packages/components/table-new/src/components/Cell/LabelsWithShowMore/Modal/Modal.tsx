import React, { useMemo, useState } from 'react';

import Modal from '@synerise/ds-modal';
import SearchInput from '@synerise/ds-search/dist/Elements/SearchInput/SearchInput';
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
  const [searchQuery, setSearchQuery] = useState('');

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

  const filteredItems = useMemo(() => {
    return searchQuery !== ''
      ? items.filter((item) => {
          const value = item[labelKey];
          return (
            typeof value === 'string' &&
            value.toLowerCase().includes(searchQuery.toLowerCase())
          );
        })
      : items;
  }, [items, labelKey, searchQuery]);

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
        data={filteredItems}
        title={`${filteredItems.length} ${texts.records}`}
        columns={columns}
        isLoading={loading}
        hideTitleBar
        rowKey="key"
        searchComponent={
          <SearchInput
            clearTooltip={texts.searchClear}
            placeholder={texts.searchPlaceholder}
            onChange={(value: string): void => {
              setSearchQuery(value);
            }}
            value={searchQuery}
            onClear={(): void => {
              setSearchQuery('');
            }}
            closeOnClickOutside
          />
        }
        hideColumnNames
      />
    </Modal>
  );
};

export { DetailsModal };
