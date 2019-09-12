import * as React from 'react';
import faker from 'faker';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Table from '@synerise/ds-table';

const stories = storiesOf('Components|Table', module);

const dataSource = [...new Array(50)].map((i, k) => ({
  key: k + 1,
  name: faker.name.findName(),
  age: (Math.random() * 50 + 10).toFixed(0),
  address: faker.address.streetAddress(),
}));

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
];

stories.add('default', () => {
  return <Table dataSource={dataSource} columns={columns} />;
});

export default stories;
