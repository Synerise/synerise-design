import React from 'react';
import { faker } from '@faker-js/faker';

import { InfoFillS, VarTypeStringM } from '@synerise/ds-icon';
import { DSColumnType } from '@synerise/ds-table';

import { AdditionalColumnData } from '../Table.types';
import { chromaticCellRender } from '../Table.utils';

export const DATA_SOURCE = [...new Array(500)].map((i, k) => ({
  key: String(k + 1),
  name: faker.person.fullName(),
  city: faker.location.city(),
  address: faker.location.streetAddress(),
  number: String(faker.finance.amount()),
  unavailable: Math.random() < 0.1,
  disabled: Math.random() < 0.3,
  transactionType: faker.finance.transactionType(),
}));

type RowType = typeof DATA_SOURCE[number];
type ColumnType = AdditionalColumnData & DSColumnType<RowType>;

export const COLUMNS: Partial<ColumnType>[] = [
  {
    title: 'User name',
    key: 'name',
    dataIndex: 'name',
    icon: { component: <VarTypeStringM /> },
    iconTooltip: { component: <InfoFillS /> },
    sorter: (a, b) => a.name.localeCompare(b.name),
    sortRender: 'string',
    width: 200,
    render: chromaticCellRender,
  },
  {
    title: 'Address',
    key: 'address',
    dataIndex: 'address',
    sorter: (a, b) => a.address.localeCompare(b.address),
    sortRender: 'string',
    width: '300px',
    render: chromaticCellRender,
  },
  {
    title: 'City',
    key: 'city',
    dataIndex: 'city',
    sorter: (a, b) => a.city.localeCompare(b.city),
    sortRender: 'string',
    width: '400px',
    render: chromaticCellRender,
  },
  {
    title: 'Number',
    key: 'number',
    dataIndex: 'number',
    sorter: (a, b) => a.number.localeCompare(b.number),
    width: 140,
    render: chromaticCellRender,
  },
  {
    title: 'Type',
    key: 'transactionType',
    dataIndex: 'transactionType',
    sorter: (a, b) => a.transactionType.localeCompare(b.transactionType),
    sortRender: 'string',
    width: 180,
    render: chromaticCellRender,
  },
];

export const FIXED_COLUMNS = [
  { ...COLUMNS[0], fixed: 'left' },
  ...COLUMNS.slice(1, -1),
  { ...COLUMNS[COLUMNS.length], fixed: 'right' },
];
