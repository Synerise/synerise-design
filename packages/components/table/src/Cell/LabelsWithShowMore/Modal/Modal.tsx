import React, { useMemo, useState } from 'react';

import Modal from '@synerise/ds-modal';
import SearchInput from '@synerise/ds-search/dist/Elements/SearchInput/SearchInput';

import VirtualTable from '../../../VirtualTable/VirtualTable';
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
    () => [
      {
        dataIndex: labelKey,
        key: labelKey,
        render: renderItem,
      },
    ],
    [renderItem, labelKey],
  );

  const filteredItems = useMemo(() => {
    return searchQuery !== ''
      ? items.filter((item) =>
          item[labelKey].toLowerCase().includes(searchQuery.toLowerCase()),
        )
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
      <VirtualTable
        scroll={{ y: 500, x: 0 }}
        cellHeight={64}
        initialWidth={500}
        dataSource={filteredItems}
        title={`${filteredItems.length} ${texts.records}`}
        columns={columns}
        loading={loading}
        showHeader={false}
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

export default DetailsModal;
