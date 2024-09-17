import React from 'react';
import { faker } from '@faker-js/faker';
import { action } from '@storybook/addon-actions';

import Icon, {
  InfoFillS,
  OptionHorizontalM,
  SettingsM,
  VarTypeBooleanM,
  VarTypeDateM,
  VarTypeListM,
  VarTypeNumberM,
  VarTypeStringM,
} from '@synerise/ds-icon';
import { DSColumnType, TableCell } from '@synerise/ds-table';
import Button from '@synerise/ds-button';
import { UserAvatar } from '@synerise/ds-avatar';
import { focusWithArrowKeys } from '@synerise/ds-utils';
import Menu from '@synerise/ds-menu';
import Dropdown from '@synerise/ds-dropdown';

import { RELATIONS } from '../AllCellTypes/AllCellTypes.data';
import { AdditionalColumnData } from '../Table.types';
import { AVATAR_IMAGE } from '../../../constants';
import { randomDate } from '../../../utils';
import { chromaticCellRender } from '../Table.utils';

const menuData = [
  { text: 'Preview' },
  { text: 'Edit' },
  { text: 'Duplicate' },
  { type: 'divider' },
  { text: 'Delete', type: 'danger' },
];

export const DATA_SOURCE = [...new Array(55)].map((i, k) => ({
  key: k + 1,
  name: faker.person.fullName(),
  city: faker.helpers.arrayElement(['Berlin', 'London', 'Paris', 'Warsaw', 'New York', 'Denver']),
  age: Math.floor(Math.random() * 50 + 10),
  system: faker.helpers.arrayElement(['OSX', 'Windows', 'Linux']),
  format: faker.helpers.arrayElement(['JPG', 'Zip', 'png']),
  lang: faker.helpers.arrayElement(['pl', 'en', 'es']),

  firstName: faker.helpers.arrayElement([
    'John',
    'Anita',
    'Michelle',
    'Wojtek',
    'Wiktoria',
    'Stefan',
    'Marek',
    'Martyna',
  ]),
  lastName: faker.helpers.arrayElement(['Kowalczyk', 'Doe', 'Testovi', 'Testinson', 'Testovich']),

  phone: faker.helpers.arrayElement(['571345127', '678990320', '588991567', '666245912', '654666871', '631001372']),
  color: faker.helpers.arrayElement(['red', 'blue', 'green', 'yellow', 'orange', 'cyan', 'purple', 'violet']),
  last_activity: randomDate(),
  active: faker.datatype.boolean(),
  country: faker.helpers.arrayElement(['us', 'pl', 'de', 'it', 'es', 'ru']),

  address: faker.location.streetAddress(),
  status: faker.helpers.arrayElement(['active', 'inactive', 'blocked']),
  enabled: faker.datatype.boolean(),
  editable: faker.datatype.boolean() ? faker.person.fullName() : undefined,
  checked: faker.datatype.boolean(),
  relations: RELATIONS,

  unavailable: Math.random() < 0.1,
  disabled: Math.random() < 0.3,
}));

export type RowType = typeof DATA_SOURCE[number];
export type ColumnType = DSColumnType<RowType> & AdditionalColumnData;

export const COLUMNS: ColumnType[] = [
  {
    title: 'Name',
    dataIndex: 'name',
    width: 254,
    fixed: 'left',
    key: 'name',
    icon: { component: <VarTypeStringM /> },
    iconTooltip: { component: <InfoFillS /> },
    sorter: {
      compare: (a, b) => a.name.localeCompare(b.name),
      multiple: 1,
    },
    render: chromaticCellRender,
    sortRender: 'string',
    defaultSortOrder: 'ascend',
  },
  {
    title: 'City',
    dataIndex: 'city',
    width: 254,
    textWrap: 'word-break',
    ellipsis: true,
    key: 'city',
    icon: { component: <VarTypeStringM /> },
    iconTooltip: { component: <InfoFillS /> },
    sorter: {
      compare: (a, b) => a.city.localeCompare(b.city),
      multiple: 2,
    },
    render: chromaticCellRender,
    sortRender: 'string',
  },
  {
    title: 'System',
    dataIndex: 'system',
    width: 254,
    textWrap: 'word-break',
    ellipsis: true,
    key: 'system',
    icon: { component: <VarTypeStringM /> },
    iconTooltip: { component: <InfoFillS /> },
    sorter: {
      compare: (a, b) => a.system.localeCompare(b.system),
      multiple: 3,
    },
    render: chromaticCellRender,
    sortRender: 'string',
  },
  {
    title: 'Format',
    dataIndex: 'format',
    width: 254,
    textWrap: 'word-break',
    ellipsis: true,
    key: 'format',
    icon: { component: <VarTypeStringM /> },
    iconTooltip: { component: <InfoFillS /> },
    sorter: {
      compare: (a, b) => a.system.localeCompare(b.system),
      multiple: 4,
    },
    render: chromaticCellRender,
    sortRender: 'string',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    width: 254,
    textWrap: 'word-break',
    ellipsis: true,
    fixed: 'right',
    key: 'age',
    icon: { component: <VarTypeNumberM /> },
    iconTooltip: { component: <InfoFillS /> },
    sorter: {
      compare: (a, b) => a.age - b.age,
      multiple: 5,
    },
    render: chromaticCellRender,
  },
];

export const COLUMNS_WITH_FIXED_ACTION: ColumnType[] = [
  {
    title: 'Name',
    dataIndex: 'avatar',
    key: 'avatar-m',
    width: 254,
    textWrap: 'word-break',
    ellipsis: true,
    icon: { component: <VarTypeListM /> },
    iconTooltip: { component: <InfoFillS /> },
    render: (_avatar, record) => {
      const user = true
        ? {
            tooltip: true,
            firstName: record.name,
            lastName: record.lastName,
            email: `${record.name}.${record.lastName}@synerise.com`,
            avatar: AVATAR_IMAGE,
          }
        : {};
      return (
        <TableCell.AvatarLabelCell
          className="chromatic-ignore"
          avatarAction={action('Avatar Action')}
          avatar={<UserAvatar user={user} badgeStatus="active" size="medium" backgroundColor={record.color} />}
          title={`${record.name} ${record.lastName}`}
        />
      );
    },
  },
  {
    title: 'Email address',
    width: 254,
    ellipsis: true,
    icon: { component: <VarTypeStringM /> },
    iconTooltip: { component: <InfoFillS /> },
    render: record => <div className="chromatic-ignore">{`${record.name}.${record.lastName}@synerise.com`}</div>,
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
    key: 'phone',
    width: 180,
    textWrap: 'word-break',
    ellipsis: true,
    icon: { component: <VarTypeStringM /> },
    iconTooltip: { component: <InfoFillS /> },
    sortRender: 'string',
    render: record => <div className="chromatic-ignore">{record}</div>,
  },
  {
    title: 'City',
    dataIndex: 'city',
    key: 'city',
    ellipsis: true,
    width: 120,
    icon: { component: <VarTypeStringM /> },
    iconTooltip: { component: <InfoFillS /> },
    sortRender: 'string',
    render: chromaticCellRender,
  },
  {
    title: 'Age',
    key: 'age',
    dataIndex: 'age',
    width: 100,
    icon: { component: <VarTypeNumberM /> },
    iconTooltip: { component: <InfoFillS /> },
    render: chromaticCellRender,
  },
  {
    title: 'Last activity',
    key: 'last_activity',
    dataIndex: 'last_activity',
    width: 254,
    icon: { component: <VarTypeDateM /> },
    iconTooltip: { component: <InfoFillS /> },
    render: chromaticCellRender,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    textWrap: 'word-break',
    width: 100,
    ellipsis: true,
    icon: { component: <VarTypeBooleanM /> },
    tooltip: { title: 'Tooltip', description: 'Description' },
    render: status => <TableCell.StatusLabelCell className="chromatic-ignore" status={status} label={status} />,
  },
  {
    title: (
      <Button type="ghost" mode="single-icon">
        <Icon component={<SettingsM />} />
      </Button>
    ),
    dataIndex: 'skeleton',
    key: 'skeleton-desc',
    width: 50,
    textWrap: 'word-break',
    ellipsis: true,
    fixed: 'right',
    icon: { component: <VarTypeListM /> },
    iconTooltip: { component: <InfoFillS /> },
    render: button => {
      return (
        <Dropdown
          overlay={
            <Dropdown.Wrapper
              style={{ width: '220px' }}
              onKeyDown={event => focusWithArrowKeys(event, 'ds-menu-item', () => {})}
            >
              <Menu dataSource={menuData} asDropdownMenu={true} style={{ width: '100%' }} />
            </Dropdown.Wrapper>
          }
        >
          <Button type="ghost" mode="single-icon">
            <Icon component={<OptionHorizontalM />} />
          </Button>
        </Dropdown>
      );
    },
  },
];
