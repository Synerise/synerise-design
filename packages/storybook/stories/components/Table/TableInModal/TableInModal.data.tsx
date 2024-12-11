import React, { ReactNode } from 'react';
import { faker } from '@faker-js/faker';

import { Text } from '@synerise/ds-typography';
import { VarTypeStringM, InfoFillS } from '@synerise/ds-icon';
import { DSColumnType } from '@synerise/ds-table';

import { AdditionalColumnData } from '../Table.types';
import { chromaticCellRender } from '../Table.utils';

export type RowType = {
  key: string;
  unavailable: boolean;
  disabled: boolean;
  name: ReactNode;
};
export type ColumnType = DSColumnType<RowType> & AdditionalColumnData;

export const DATA_SOURCE: RowType[] = [...new Array(5000)].map((i, k) => {
  const name = k === 1 ? faker.lorem.sentences(8) : faker.person.fullName();
  return {
    key: String(k + 1),
    unavailable: (k+1) % 6 === 0,
    disabled: k % 3 === 0,
    name: (
      <Text size="medium" ellipsis={{ tooltip: name }}>
        {name}
      </Text>
    ),
  };
});

export const COLUMNS: ColumnType[] = [
  {
    title: 'User name',
    key: 'name',
    dataIndex: 'name',
    icon: { component: <VarTypeStringM /> },
    iconTooltip: { component: <InfoFillS /> },
    render: chromaticCellRender,
  },
];
