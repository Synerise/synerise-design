import { VirtualTable } from '@synerise/ds-table';
import faker from 'faker';
import { Text } from '@synerise/ds-typography';
import Table from '@synerise/ds-table';
import React, { useState } from 'react';
import { SearchInput } from '@synerise/ds-search/dist/Elements';
import { boolean, number, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import Modal from '@synerise/ds-modal';
import Button from '@synerise/ds-button';
import Icon, { AddM, InfoFillS, VarTypeStringM } from '@synerise/ds-icon';
import { renderWithIconInHeaders } from './helpers/helpers';

const decorator = storyFn => <div style={{ padding: 20, width: '100vw', minWidth: '100%' }}>{storyFn()}</div>;

const dataSource = [...new Array(5000)].map((i, k) => {
  const name = k === 1 ? faker.lorem.sentences(8) : faker.name.findName();
  return {
    key: String(k + 1),
    unavailable: Math.random() < 0.1,
    disabled: Math.random() < 0.3,
    name: <Text size="medium" ellipsis={{ tooltip: name }}>{name}</Text>
  };
});

const columns = [
  {
    title: 'User name',
    key: 'name',
    dataIndex: 'name',
    icon: { component: <VarTypeStringM /> },
    iconTooltip: { component: <InfoFillS /> },
  },
];

const TableOnModal: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const [selectedRowsMap, setSelectedRowsMap] = useState({});
  const [starredRowKeys, setStarredRowKeys] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const filteredDataSource = () => {
    return !searchValue
      ? dataSource
      : dataSource.filter((record) => {
        let nameLowercase = '';
        if (typeof record.name === 'string') {
          nameLowercase = record.name.toLowerCase();
        } else if (React.isValidElement(record.name) && typeof record.name.props.children === 'string') {
          nameLowercase = record.name.props.children.toLowerCase();
        }
        return nameLowercase.includes(searchValue.toLowerCase());
      });
  };

  const handleSelectRow = (selectedRowKeys, dataSourceSubset) => {
    action('selection.onChange')(selectedRowKeys)
    const newSelectedRowsMap = {};
    selectedRowKeys.forEach(key => {
      const row = dataSourceSubset.find(row => row.key === key);
      if (row) {
        newSelectedRowsMap[key] = row;
      }
    });
    setSelectedRowsMap(newSelectedRowsMap);
  };

  const randomStatus = (_record) => ({disabled: _record.disabled, unavailable: _record.unavailable});

  return (
    <>
      <Button type="primary" onClick={() => setModalVisible(true)}>
        Show table
      </Button>
      <Modal
        size="medium"
        visible={modalVisible}
        title={'Table'}
        bodyStyle={{ padding: 0 }}
        onCancel={() => {
          setModalVisible(false);
          setSelectedRowsMap({});
        }}
      >
        <VirtualTable
          title={text('Table title', '')}
          scroll={{ y: 500, x: 0 }}
          initialWidth={792}
          dataSource={filteredDataSource()}
          dataSourceFull={dataSource}
          columns={renderWithIconInHeaders(columns, boolean('Set icons in headers', false))}
          cellHeight={50}
          rowKey={row => row.key}
          headerButton={
            boolean('Show header button', false) && (
              <Button type="ghost" mode="icon-label" onClick={action('Header button action')}>
                <Icon component={<AddM />} />
                {text('Header button label', 'Add row')}
              </Button>
            )
          }
          selection={{
            onChange: handleSelectRow,
            selectedRowKeys: Object.keys(selectedRowsMap),
            checkRowSelectionStatus: boolean('Selection disabled / unavailable for some rows?', true) ? randomStatus : undefined,
            selections: [
              Table.SELECTION_ALL,
              Table.SELECTION_INVERT,
              {
                key: 'even',
                label: 'Select even',
                onClick: () => {
                  const evenRowsMap = {};
                  dataSource.forEach((row, index) => {
                    if (index % 2 === 0) {
                      evenRowsMap[row.key] = row;
                    }
                  });
                  setSelectedRowsMap(evenRowsMap);
                },
              },
            ],
            limit: boolean('Show selection limit', false) ? number('Set selection limit', 5) : undefined,
          }}
          rowStar={
            boolean('Enable row star', undefined) && {
              starredRowKeys: starredRowKeys,
              onChange: (starredRowKeys): void => {
                setStarredRowKeys(starredRowKeys);
              },
            }
          }
          onRowClick={record => {
            const newSelectedRowsMap = { ...selectedRowsMap };
            const key = record.key;
            if (newSelectedRowsMap[key]) {
              delete newSelectedRowsMap[key];
            } else {
              newSelectedRowsMap[key] = record;
            }
            setSelectedRowsMap(newSelectedRowsMap);
          }}
          searchComponent={
            <SearchInput
              placeholder="Search"
              clearTooltip="Clear"
              onChange={value => {
                setSearchValue(value);
              }}
              value={searchValue}
              onClear={() => {
                setSearchValue('');
              }}
              closeOnClickOutside={true}
              inputProps={{ autoFocus: false }}
            />
          }
        />
      </Modal>
    </>
  );
};

const stories = {
  default: <TableOnModal />,
};

export default {
  name: 'Components/Table/Table on modal',
  decorator,
  stories,
  Component: Table,
};