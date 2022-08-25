import { COLUMNS_WITH_AVATARS_LINK, COLUMNS_WITH_SKELETON, RELATIONS } from './content/withAllCellTypes.data';
import * as React from 'react';
import faker from 'faker';
import { Column, renderWithIconInHeaders } from './helpers/helpers';
import { boolean, select, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import Table from '@synerise/ds-table/dist/Table';
import Icon, { AddM, MailM } from '@synerise/ds-icon';
import Button from '@synerise/ds-button';

const decorator = storyFn => <div style={{ padding: 20, width: '100vw', minWidth: '100%' }}>{storyFn()}</div>;

const dataSource = [...new Array(10)].map((i, k) => ({
  key: k + 1,
  name: faker.name.findName(),
  active: faker.random.boolean(),
  enabled: faker.random.boolean(),
  editable: faker.random.boolean() ? faker.name.findName() : undefined,
  checked: faker.random.boolean(),
  relations: RELATIONS,
  avatar: {
    initials: 'AN',
    icon: <MailM />,
    title: 'Top 10 product add to cart',
    titleLarg: 'Summer Sale 45% OFF',
    status: 'active',
    labels: ['Text AB/X', 'Edited 11 Jun 2019 18:47'],
    label: ['Edited 11 Jun 2019 18:47'],
    labelLoader: ['Dynamic'],
  },
}));
const CELL_SIZES = {
  default: 'default',
  medium: 'medium',
  small: 'small',
};
const getAvatarLinkDefaultProps = () => ({
  hideTitleBar: boolean('Hide title bar', false),
  hideTitlePart: false,
  dataSource,
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
  title: text('Table title', ''),
  onSearch: action('onSearch'),
  cellSize: select('Set cells size', CELL_SIZES, CELL_SIZES.default),
  headerButton: boolean('Show header button', false) && (
    <Button type="ghost" mode="icon-label" onClick={action('Header button action')}>
      <Icon component={<AddM />} />
      {text('Header button label', 'Add row')}
    </Button>
  ),
});

const stories = {
  withAvatarLink: () => ({
    ...getAvatarLinkDefaultProps(),
    columns: renderWithIconInHeaders(COLUMNS_WITH_AVATARS_LINK as unknown as Column[], false),
  }),
};

export default {
  name: 'Components/Table/Table with AvatarLink',
  decorator,
  stories,
  Component: Table,
};