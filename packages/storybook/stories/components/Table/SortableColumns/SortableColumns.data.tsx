import { faker } from '@faker-js/faker';
import { DSColumnType } from '@synerise/ds-table';

import { AdditionalColumnData } from '../Table.types';
import { chromaticCellRender } from '../Table.utils';

const companies = new Array(10).fill('').map(() => faker.company.name());

export const DATA_SOURCE = new Array(50).fill({}).map((v, i) => ({
  id: String(i),
  name: faker.person.fullName(),
  company: companies[Math.floor(Math.random() * 10)],
  transactionValue: parseFloat(faker.finance.amount()),
  transactionType: faker.finance.transactionType(),
}));

export type RowType = typeof DATA_SOURCE[number];
export type ColumnType = DSColumnType<RowType> & AdditionalColumnData;

export const sortRenderTypes: ['string', 'default'] = ['string', 'default'];

export const COLUMNS: ColumnType[] = [
  {
    key: 'name',
    title: 'Name',
    dataIndex: 'name',
    sorter: {
      compare: (a, b) => a.name.localeCompare(b.name),
      multiple: 1,
    },
    sortRender: 'string',
    defaultSortOrder: 'ascend',
    render: chromaticCellRender,
  },
  {
    key: 'company',
    title: 'Company',
    dataIndex: 'company',
    sorter: {
      compare: (a, b) => a.company.localeCompare(b.company),
      multiple: 2,
    },
    sortRender: 'string',
    render: chromaticCellRender,
  },
  {
    key: 'transactionValue',
    title: 'Transaction value',
    dataIndex: 'transactionValue',
    sorter: {
      compare: (a, b) => a.transactionValue - b.transactionValue,
      multiple: 3,
    },
    sortRender: 'string',
    render: chromaticCellRender,
  },
  {
    key: 'transactionType',
    title: 'Transaction type',
    dataIndex: 'transactionType',
    sorter: {
      compare: (a, b) => a.transactionType.localeCompare(b.transactionType),
      multiple: 4,
    },
    sortRender: 'string',
    render: chromaticCellRender,
  },
];
