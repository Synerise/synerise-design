import * as React from 'react';
import faker from 'faker';
import { action } from '@storybook/addon-actions';
import { boolean, select } from '@storybook/addon-knobs';
import Table from '@synerise/ds-table';
import {
  COLUMNS_WITH_SKELETON,
  RELATIONS,
} from './content/withAllCellTypes.data';

import { Column, renderWithIconInHeaders } from './helpers/helpers';
import Skeleton from '@synerise/ds-skeleton';
import { theme } from '@synerise/ds-core';

const decorator = storyFn => <div style={{ padding: 20, width: '100vw', minWidth: '100%' }}>{storyFn()}</div>;

const dataSource = [...new Array(10)].map((i, k) => ({
  key: k + 1,
  name: faker.name.findName(),
  active: faker.random.boolean(),
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
const getSkeletonDefaultProps = () => ({
  hideTitleBar: false,
  hideTitlePart: true,
  dataSource,
  loading: boolean('Set loading state', false),
  roundedHeader: boolean('Rounded header', false),
  footer: () => (
    <div style={{ backgroundColor: theme.palette['grey-050'], height: '70px', display: 'flex', justifyContent:'space-between' }}>
      <div style={{ width: '150px', marginLeft: '15px', marginTop: '10px' }}>
        <Skeleton numberOfSkeletons={1} size="M" />
      </div>
      <div style={{ width: '150px', display:'flex', marginRight: '40px', marginTop: '10px' }}>
        <div style={{ width: '150px' }}>
          <Skeleton numberOfSkeletons={1} size="M" />
        </div>{' '}
        <div style={{ width: '150px' }}>
          <Skeleton numberOfSkeletons={1} size="M" />
        </div>
      </div>
    </div>
  ),
  scroll: {
    x: false,
  },
  title: (
    <div style={{ width: '150px' }}>
      <Skeleton numberOfSkeletons={1} size="M" />
    </div>
  ),
  onSearch: action('onSearch'),
  cellSize: select('Set cells size', CELL_SIZES, CELL_SIZES.default),
});

const stories = {
  withSkeleton: () => ({
    ...getSkeletonDefaultProps(),
    columns: renderWithIconInHeaders(COLUMNS_WITH_SKELETON as unknown as Column[], false),
  }),
};

export default {
  name: 'Components/Table/Table with skeleton',
  decorator,
  stories,
  Component: Table,
};
