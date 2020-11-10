import * as React from 'react';
import Modal from '@synerise/ds-modal';
import SearchInput from '@synerise/ds-search/dist/Elements/SearchInput/SearchInput';
import VirtualTable from "../../../VirtualTable/VirtualTable";
import { ModalProps } from './Modal.types';

const DetailsModal: React.FC<ModalProps<object>> = ({ visible, hide, items, title, renderItem, labelKey }) => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const columns = React.useMemo(
    () => [
      {
        dataIndex: labelKey,
        render: renderItem,
      },
    ],
    [renderItem]
  );

  const filteredItems = React.useMemo(() => {
    return searchQuery !== ''
      ? items.filter(item => item[labelKey].toLowerCase().includes(searchQuery.toLowerCase()))
      : items;
  }, [items, labelKey, searchQuery]);

  return (
    <Modal size="small" visible={visible} title={title} closable onCancel={hide} bodyStyle={{ padding: 0 }}>
      <VirtualTable
        scroll={{ y: 500, x: 0 }}
        cellHeight={64}
        initialWidth={500}
        dataSource={filteredItems}
        title={`${filteredItems.length} records`}
        columns={columns}
        searchComponent={
          <SearchInput
            clearTooltip="Clear"
            placeholder="Search"
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
