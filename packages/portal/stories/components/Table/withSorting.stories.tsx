import * as React from 'react';
import faker from 'faker';
import { select, text, number } from '@storybook/addon-knobs';
import Table from '@synerise/ds-table';
import { CompareFn } from 'antd/lib/table/interface';

const companies = new Array(10).fill('').map(() => faker.company.companyName());

const fakeData = new Array(50).fill({}).map((v, i) => ({
  id: String(i),
  name: faker.name.findName(),
  company: companies[Math.floor(Math.random() * 10)],
  transactionValue: faker.finance.amount(),
  transactionType: faker.finance.transactionType(),
}));


const sortRenderTypes: ['string', 'default'] = ['string', 'default'];

const stories = {
  default: () => (
    <Table
      dataSource={fakeData}
      columns={[
        {
          key: 'name',
          title: 'Name',
          dataIndex: 'name',
          sorter: {
            compare: (a, b) => a.name.localeCompare(b.name),
            multiple: number('Multiple sort order', 1, { min: 1, max: 4}, 'Name'),
          },
          sortRender: select('Sort render type', sortRenderTypes, 'string', 'Name'),
          defaultSortOrder: 'ascend',
        },
        {
          key: 'company',
          title: 'Company',
          dataIndex: 'company',
          sorter: {
            compare: (a, b) => a.company.localeCompare(b.company),
            multiple: number('Multiple sort order', 2, { min: 1, max: 4}, 'Company'),

          },
          sortRender: select('Sort render type', sortRenderTypes, 'string', 'Company'),
        },
        {
          key: 'transactionValue',
          title: 'Transaction value',
          dataIndex: 'transactionValue',
          sorter: {
            compare: (a, b) => a.transactionValue - b.transactionValue,
            multiple: number('Multiple sort order', 3, { min: 1, max: 4}, 'Transaction value'),
          },
          sortRender: select('Sort render type', sortRenderTypes, 'default', 'Transaction value'),
        },
        {
          key: 'transactionType',
          title: 'Transaction type',
          dataIndex: 'transactionType',
          sorter: {
            compare: (a, b) => a.transactionType.localeCompare(b.transactionType),
            multiple: number('Multiple sort order', 4, { min: 1, max: 4}, 'Transaction type'),

          },
          sortRender: select('Sort render type', sortRenderTypes, 'string', 'Transaction type'),
        }
      ]}
      pagination={{
        pageSize: 10,
      }}
    />
  )
};

export default {
  name: 'Table/Table with sorting',
  // decorator,
  stories,
  Component: Table,
};