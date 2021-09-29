import * as React from 'react';
import faker from 'faker';
import { action } from '@storybook/addon-actions';
import { boolean, select, text } from '@storybook/addon-knobs';
import Table from '@synerise/ds-table';
import Button from '@synerise/ds-button';
import Icon from '@synerise/ds-icon';
import { AddM, MailM } from '@synerise/ds-icon/dist/icons';
import { Column, renderWithIconInHeaders } from './helpers/helpers';
import {
  COLUMNS_WITH_FIXED,
  RELATIONS,
} from './content/withAllCellTypes.data';
import { withState } from '@dump247/storybook-state';
import randomDate from '../../utils/randomDate';

const decorator = storyFn => <div style={{ padding: 20, width: '100vw', minWidth: '100%' }}>{storyFn()}</div>;
const dataSource = [...new Array(55)].map((i, k) => ({
  key: k + 1,
  name: faker.random.arrayElement(['John', 'Anita', 'Michelle', 'Wojtek', 'Wiktoria', 'Stefan','Marek','Martyna']),
  lastName: faker.random.arrayElement(['Kowalczyk', 'Doe', 'Testovi', 'Testinson', 'Testovich']),
  city: faker.random.arrayElement(['Kraków', 'Warszawa', 'Poznań', 'Łódź', 'Wrocław', 'Gdańsk']),
  phone:faker.random.arrayElement(['571345127', '678990320', '588991567', '666245912', '654666871', '631001372']),
  color: faker.random.arrayElement(['red', 'blue', 'green', 'yellow', 'orange', 'cyan','purple','violet']),
  last_activity: randomDate(),
  active: faker.random.boolean(),
  country: faker.random.arrayElement(['us', 'pl', 'de', 'it', 'es', 'ru']),
  age: (Math.random() * 50 + 10).toFixed(0),
  address: faker.address.streetAddress(),
  status: faker.random.arrayElement(['active', 'inactive', 'blocked']),
  enabled: faker.random.boolean(),
  editable: faker.random.boolean() ? faker.name.findName() : undefined,
  checked: faker.random.boolean(),
  relations: RELATIONS,
}));
const CELL_SIZES = {
  default: 'default',
  medium: 'medium',
  small: 'small',
};
const stories = {
  fixedColumns: withState({
    selectedRows: [],
    starredRowKeys: [],
  })(({ store }) => {
    const handleSelectRow = selectedRowKeys => {
      store.set({ selectedRows: selectedRowKeys });
    };
    const selectEven = () => {
      const evenRows = dataSource.map(row => row.key).filter((key, index) => index % 2);
      store.set({ selectedRows: evenRows });
    };
    return (
      <Table
        title={text('Table title', 'Fixed columns')}
        dataSource={dataSource}
        columns={renderWithIconInHeaders(COLUMNS_WITH_FIXED, boolean('Set icons in headers', false))}
        scroll={{ x: 1200 }}
        loading={boolean('Set loading state', false)}
        roundedHeader={boolean('Rounded header', false)}
        pagination={{
          showSizeChanger: boolean('Show size changer', true),
          showQuickJumper: boolean('Show quick jumper', true),
          onChange: action('pageChanged'),
        }}
        headerButton={
          boolean('Show header button', false) && (
            <Button type="ghost" mode="icon-label" onClick={action('Header button action')}>
              <Icon component={<AddM />} />
              {text('Header button label', 'Add row')}
            </Button>
          )
        }
        rowKey={row => row.key}
        selection={
          boolean('Enable row selection', true) && {
            onChange: handleSelectRow,
            selectedRowKeys: store.state.selectedRows,
            selections: [
              Table.SELECTION_ALL,
              Table.SELECTION_INVERT,
              {
                key: 'even',
                label: 'Select even',
                onClick: selectEven,
              },
            ],
          }
        }
        rowStar={boolean('Enable row star', undefined) && {
          starredRowKeys: store.state.starredRowKeys,
          onChange: (starredRowKeys): void => {
            store.set({ starredRowKeys });
          }
        }}
        onSearch={action('onSearch')}
        cellSize={select('Set cells size', CELL_SIZES, CELL_SIZES.default)}
      />
    );
  }),
};
export default {
  name: 'Components/Table/Table with fixed option',
  decorator,
  stories,
  Component: Table,
};