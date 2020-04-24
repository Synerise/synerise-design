import * as React from 'react';
import faker from 'faker';
import { action } from '@storybook/addon-actions';
import VirtualTable from '@synerise/ds-table/dist/Virtualized/Virtualized';
import { withState } from '@dump247/storybook-state';
import { boolean, select } from '@storybook/addon-knobs';
import Table from '@synerise/ds-table';
import {
  MailM,
} from '@synerise/ds-icon/dist/icons';
import { TagShape } from '@synerise/ds-tags';
import { COLUMNS } from './content/withAllCellTypes.data';


const decorator = (storyFn) => (
  <div style={{ padding: 20, width: '100vw', minWidth: '100%' }}>
    {storyFn()}
  </div>
);

const dataSource = [...new Array(55)].map((i, k) => ({
  key: k + 1,
  name: faker.name.findName(),
  active: faker.random.boolean(),
  country: faker.random.arrayElement(['us', 'pl', 'de', 'it', 'es', 'ru']),
  age: (Math.random() * 50 + 10).toFixed(0),
  address: faker.address.streetAddress(),
  status: faker.random.arrayElement(['active', 'inactive', 'blocked']),
  avatar: {
    initials: 'AN',
    icon: <MailM />,
    title: 'Top 10 product add to cart',
    status: 'active',
    labels: [
      'Text AB/X',
      'Edited 11 Jun 2019 18:47',
    ],
  },
  select: {
    value: faker.random.arrayElement(['option 1', 'option 2', 'option 3']),
    options: ['option 1', 'option 2', 'option 3'],
  },
  tag: {
    label: 'status',
    shape: TagShape.STATUS_NEUTRAL,
  },
  enabled: faker.random.boolean(),
  editable: faker.name.findName(),
}));

const CELL_SIZES = {
  default: 'default',
  medium: 'medium',
  small: 'small',
};

const stories = {
  allColumnTypes: () => ({
    title: `${dataSource.length} records`,
    dataSource,
    columns: COLUMNS,
    loading: boolean('Set loading state', false),
    roundedHeader: boolean('Rounded header', false),
    pagination: {
      showSizeChanger: boolean('Show size changer', true),
      showQuickJumper: boolean('Show quick jumper', true),
      onChange: action('pageChanged'),
    },
    scroll: {
      x: false,
    },
    onSearch: action('onSearch'),
    cellSize: select('Set cells size', CELL_SIZES, CELL_SIZES.default)
  }),
};

export default {
  name: 'Table|Table with all types of content',
  decorator,
  stories,
  Component: Table,
};
