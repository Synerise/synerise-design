import React, { ReactNode } from 'react';
import { faker } from '@faker-js/faker';

import Icon, { InfoFillS, LockM, MailM, UserM, VarTypeBooleanM, VarTypeListM, VarTypeStringM } from '@synerise/ds-icon';
import { theme } from '@synerise/ds-core';
import { DSColumnType, TableCell } from '@synerise/ds-table';
import Avatar, { ObjectAvatar } from '@synerise/ds-avatar';
import Button from '@synerise/ds-button';
import Select from '@synerise/ds-select';
import Checkbox from '@synerise/ds-checkbox';
import ProgressBar from '@synerise/ds-progress-bar';
import Skeleton, { SkeletonAvatar } from '@synerise/ds-skeleton';
import { action } from '@storybook/addon-actions';
import Loader from '@synerise/ds-loader';
import Tooltip from '@synerise/ds-tooltip';
import Switch from '@synerise/ds-switch';
import { Tag, TagShape } from '@synerise/ds-tags';

import { AVATAR_IMAGE } from '../../../constants';
import { Counter } from '../../Loader/Loader.data';
import { AdditionalColumnData } from '../Table.types';
import { chromaticCellRender } from '../Table.utils';

export const DATA_SOURCE = [...new Array(10)].map((i, k) => ({
  key: k + 1,
  name: faker.person.fullName(),
  active: faker.datatype.boolean(),
  enabled: faker.datatype.boolean(),
  editable: faker.datatype.boolean() ? faker.person.fullName() : undefined,
  checked: faker.datatype.boolean(),
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

export const DATA_SOURCE_FULL = [...new Array(55)].map((i, k) => ({
  key: k + 1,
  name: faker.person.fullName(),
  active: faker.datatype.boolean(),
  country: faker.helpers.arrayElement(['us', 'pl', 'de', 'it', 'es', 'ru']),
  age: (Math.random() * 50 + 10).toFixed(0),
  address: faker.location.streetAddress(),
  status: faker.helpers.arrayElement(['active', 'inactive', 'blocked']),
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
  select: {
    value: faker.helpers.arrayElement(['option 1', 'option 2', 'option 3']),
    options: ['option 1', 'option 2', 'option 3'],
  },
  tag: {
    label: 'status',
    shape: TagShape.STATUS_NEUTRAL,
  },
  enabled: faker.datatype.boolean(),
  editable: faker.datatype.boolean() ? faker.person.fullName() : undefined,
  checked: faker.datatype.boolean(),
  relations: RELATIONS,
}));

export type RowType = typeof DATA_SOURCE_FULL[number];
export type RowTypeFull = typeof DATA_SOURCE_FULL[number];

type ColumnType = AdditionalColumnData & DSColumnType<RowTypeFull>;

export const COLUMNS_WITH_AVATARS_LINK: ColumnType[] = [
  {
    title: 'Avatar M with label',
    dataIndex: 'avatar',
    key: 'avatar-m',
    width: 254,
    textWrap: 'word-break',
    ellipsis: true,
    icon: { component: <VarTypeListM /> },
    iconTooltip: { component: <InfoFillS /> },
    render: avatar => {
      return (
        <a href="#">
          <TableCell.AvatarLabelCell
            className="chromatic-ignore"
            avatar={
              <ObjectAvatar
                badgeStatus="active"
                size="medium"
                iconComponent={<Icon component={avatar.icon} color="red" />}
              />
            }
            title={avatar.titleLarg}
            labels={avatar.label}
          />
        </a>
      );
    },
  },
];

export type RelationsType = typeof RELATIONS[number];

export const RELATIONS = [
  {
    fieldName: 'Milk',
    key: 0,
    icon: { component: <VarTypeStringM />, color: theme.palette['grey-600'] },
  },
  {
    fieldName: 'Oil',
    key: 1,
    icon: { component: <VarTypeStringM />, color: theme.palette['grey-600'] },
  },
  {
    fieldName: 'Apple',
    key: 2,
    icon: { component: <VarTypeStringM />, color: theme.palette['grey-600'] },
  },
  {
    fieldName: 'Banana',
    key: 3,
    icon: { component: <VarTypeStringM />, color: theme.palette['grey-600'] },
  },
  {
    fieldName: 'Bread',
    key: 4,
    icon: { component: <VarTypeStringM />, color: theme.palette['grey-600'] },
  },
  {
    fieldName: 'Orange',
    key: 5,
    icon: { component: <VarTypeStringM />, color: theme.palette['grey-600'] },
  },
  {
    fieldName: 'Eggs',
    key: 6,
    icon: { component: <VarTypeStringM />, color: theme.palette['grey-600'] },
  },
  {
    fieldName: 'Beer',
    key: 7,
    icon: { component: <VarTypeStringM />, color: theme.palette['grey-600'] },
  },
  {
    fieldName: 'Cheese',
    key: 8,
    icon: { component: <VarTypeStringM />, color: theme.palette['grey-600'] },
  },
  {
    fieldName: 'Pasta',
    key: 9,
    icon: { component: <VarTypeStringM />, color: theme.palette['grey-600'] },
  },
  {
    fieldName: 'Rice',
    key: 10,
    icon: { component: <VarTypeStringM />, color: theme.palette['grey-600'] },
  },
];

export const COLUMNS_WITH_TRIGGERS: ColumnType[] = [
  {
    title: 'Select',
    dataIndex: 'select',
    key: 'select',
    textWrap: 'word-break',
    ellipsis: true,
    icon: { component: <VarTypeListM /> },
    iconTooltip: { component: <InfoFillS /> },
    render: select => (
      <Select value={select.value} className="chromatic-ignore">
        {select.options.map((option: string) => (
          <Select.Option value={option}>{option}</Select.Option>
        ))}
      </Select>
    ),
  },
  {
    title: 'Button',
    dataIndex: 'age',
    key: 'age',
    textWrap: 'word-break',
    ellipsis: true,
    icon: { component: <VarTypeListM /> },
    iconTooltip: { component: <InfoFillS /> },
    render: age => (
      <Button type="secondary" onClick={() => alert(age)}>
        Show age
      </Button>
    ),
  },
  {
    title: 'Multiple buttons',
    icon: { component: <VarTypeListM /> },
    iconTooltip: { component: <InfoFillS /> },
    render: () => (
      <TableCell.ActionCell gapSize={8} contentAlign={'left'}>
        <Button onClick={action('click')} type="custom-color" color="green">
          Accept
        </Button>
        <Button onClick={action('click')} type="secondary">
          Decline
        </Button>
      </TableCell.ActionCell>
    ),
  },
  {
    title: 'Editable row',
    dataIndex: 'editable',
    key: 'editable',
    textWrap: 'word-break',
    ellipsis: true,
    icon: { component: <VarTypeListM /> },
    iconTooltip: { component: <InfoFillS /> },
    render: editable => (
      <TableCell.EditableCell
        value={editable}
        placeholder={'No data'}
        onChange={action('onChange')}
        className="chromatic-ignore"
      />
    ),
  },
  {
    title: 'Copyable',
    dataIndex: 'name',
    key: 'copyable',
    textWrap: 'word-break',
    ellipsis: true,
    icon: { component: <VarTypeListM /> },
    iconTooltip: { component: <InfoFillS /> },
    render: name => (
      <TableCell.CopyableCell
        className="chromatic-ignore"
        value={name}
        confirmMessage="Copied to clipboard!"
        tooltipTimeout={2000}
      />
    ),
  },
  {
    title: 'Checkbox',
    key: 'checked',
    dataIndex: 'checked',
    icon: { component: <VarTypeBooleanM /> },
    iconTooltip: { component: <InfoFillS /> },
    render: checked => chromaticCellRender(<Checkbox withoutPadding checked={checked} />),
  },
  {
    render: () => (
      <TableCell.ActionCell>
        <Button onClick={action('click')} type="secondary" mode="split">
          Edit rule
        </Button>
      </TableCell.ActionCell>
    ),
  },
];

export const COLUMNS_WITH_PROGRESS_BAR: ColumnType[] = [
  {
    title: 'Progress Bar',
    render: () => {
      return (
        <ProgressBar
          showLabel={true}
          containerStyles={{ flexDirection: 'row-reverse', width: '80px' }}
          labelFormatter={(amount, percent) => <div style={{ padding: '8px 0 0 8px' }}>{percent}%</div>}
          percent={60}
          strokeColor={theme.palette['green-500']}
        ></ProgressBar>
      );
    },
  },
];

export const COLUMNS_WITH_LABELS: ColumnType[] = [
  {
    title: 'Name',
    dataIndex: 'name',
    textWrap: 'word-break',
    ellipsis: true,
    key: 'name',
    icon: { component: <VarTypeStringM /> },
    iconTooltip: { component: <InfoFillS /> },
    sorter: {
      compare: (a, b) => a.name.localeCompare(b.name),
      multiple: 1,
    },
    width: '200px',
    sortRender: 'string',
    render: chromaticCellRender,
  },
  {
    title: 'Relations',
    dataIndex: 'relations',
    textWrap: 'word-break',
    ellipsis: true,
    key: 'relations',
    width: '120px',
    render: () => (
      <TableCell.LabelsWithShowMore
        className="chromatic-ignore"
        items={RELATIONS}
        numberOfVisibleItems={2}
        labelKey={'fieldName'}
        texts={{
          modalTitle: 'Products',
          tooltip: 'Show more',
          searchPlaceholder: 'Search',
          searchClear: 'Clear',
          records: 'records',
        }}
        renderItem={(label, item) => {
          return <TableCell.IconLabelCell label={label} icon={item.icon} />;
        }}
      />
    ),
  },
];

export const COLUMNS_WITH_ICONS: ColumnType[] = [
  {
    title: 'Name with flag',
    key: 'country',
    dataIndex: 'country',
    icon: { component: <VarTypeStringM /> },
    iconTooltip: { component: <InfoFillS /> },
    width: '240px',
    sorter: {
      compare: (a, b) => a.country.localeCompare(b.country),
      multiple: 2,
    },
    render: (country, record) => {
      return <TableCell.FlagLabelCell className="chromatic-ignore" countryCode={country} label={record.name} />;
    },
  },

  {
    key: 'icon-with-label',
    title: 'Icon with label',
    dataIndex: 'name',
    textWrap: 'word-break',
    ellipsis: true,
    icon: { component: <UserM /> },
    iconTooltip: { component: <InfoFillS /> },
    sorter: (a, b) => a.name.localeCompare(b.name),
    width: '240px',
    render: (name, record) => (
      <TableCell.IconLabelCell
        className="chromatic-ignore"
        icon={{ component: <UserM />, color: '#6a7580' }}
        label={name}
      />
    ),
  },
];

export const COLUMNS_WITH_STATUSES: ColumnType[] = [
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    textWrap: 'word-break',
    ellipsis: true,
    icon: { component: <VarTypeBooleanM /> },
    tooltip: { title: 'Tooltip', description: 'Description' },
    render: status => <TableCell.StatusLabelCell className="chromatic-ignore" status={status} label={status} />,
  },
  {
    title: 'Tag',
    dataIndex: 'tag',
    key: 'tag',
    textWrap: 'word-break',
    ellipsis: true,
    icon: { component: <VarTypeStringM /> },
    iconTooltip: { component: <InfoFillS /> },
    render: tag => <Tag shape={tag.shape} name={tag.label} />,
  },
  {
    title: 'Tag with icon',
    dataIndex: 'tag',
    key: 'tag',
    textWrap: 'word-break',
    ellipsis: true,
    icon: { component: <VarTypeStringM /> },
    iconTooltip: { component: <InfoFillS /> },
    render: tag => (
      <TableCell.TagIconCell>
        <Tag shape={tag.shape} name={tag.label} />
        <Icon component={<LockM />} color="#949ea6" />
      </TableCell.TagIconCell>
    ),
  },
  {
    title: 'Enabled',
    dataIndex: 'enabled',
    key: 'enabled',
    textWrap: 'word-break',
    ellipsis: true,
    icon: { component: <VarTypeBooleanM /> },
    iconTooltip: { component: <InfoFillS /> },
    render: enabled => (
      <Tooltip title={enabled ? 'Switch off' : 'Switch on'} placement={'topLeft'}>
        <Switch className="chromatic-ignore" onChange={action('Status change')} checked={enabled} label="" />
      </Tooltip>
    ),
  },
];

export const COLUMNS_WITH_AVATARS: ColumnType[] = [
  {
    title: 'Avatar S',
    dataIndex: 'avatar',
    key: 'avatar-s',
    width: 100,
    textWrap: 'none',
    ellipsis: true,
    icon: { component: <VarTypeListM /> },
    iconTooltip: { component: <InfoFillS /> },
    render: avatar => {
      return (
        <TableCell.AvatarLabelCell
          avatar={<Avatar backgroundColor="red" backgroundColorHue="050" src={AVATAR_IMAGE} size="small"></Avatar>}
          title="Test"
        />
      );
    },
  },
  {
    title: 'Avatar M with label',
    dataIndex: 'avatar',
    key: 'avatar-m',
    width: 254,
    textWrap: 'word-break',
    ellipsis: true,
    icon: { component: <VarTypeListM /> },
    iconTooltip: { component: <InfoFillS /> },
    render: avatar => {
      return (
        <TableCell.AvatarLabelCell
          avatarAction={action('Avatar Action')}
          avatar={
            <ObjectAvatar
              badgeStatus="active"
              size="medium"
              iconComponent={<Icon component={avatar.icon} color="red" />}
            />
          }
          title={avatar.title}
        />
      );
    },
  },
  {
    title: 'Avatar with label and description',
    dataIndex: 'avatar',
    key: 'avatar-desc',
    width: 254,
    textWrap: 'word-break',
    ellipsis: true,
    icon: { component: <VarTypeListM /> },
    iconTooltip: { component: <InfoFillS /> },
    render: avatar => {
      return (
        <TableCell.AvatarLabelCell
          avatar={
            <ObjectAvatar
              badgeStatus="active"
              size="medium"
              iconComponent={<Icon component={avatar.icon} color="red" />}
            />
          }
          title={avatar.titleLarg}
          labels={avatar.label}
        />
      );
    },
  },
  {
    title: 'Avatar with loading state',
    dataIndex: 'avatar',
    key: 'avatar-loading',
    width: 254,
    textWrap: 'word-break',
    ellipsis: true,
    icon: { component: <VarTypeListM /> },
    iconTooltip: { component: <InfoFillS /> },
    render: avatar => {
      const getPercent = (): number | ReactNode | null => {
        return (
          <div style={{ display: 'flex' }}>
            <Counter />
          </div>
        );
      };
      return (
        <TableCell.AvatarLabelCell
          avatar={<ObjectAvatar badgeStatus="active" iconComponent={<Icon component={avatar.icon} color="red" />} />}
          title={avatar.titleLarg}
          loader={
            <div style={{ display: 'flex', width: '100px', alignItems: 'center', margin: '-1px 0 -3px 0' }}>
              <div>{avatar.labelLoader}</div>
              <div className="chromatic-ignore">
                <Loader percentFormatter={getPercent} size="S" color="blue" label="Loading..." labelPosition="right" />
              </div>
            </div>
          }
        />
      );
    },
  },
  {
    title: 'Avatar with label and meta',
    dataIndex: 'avatar',
    key: 'avatar-meta',
    width: 254,
    textWrap: 'word-break',
    ellipsis: true,
    icon: { component: <VarTypeListM /> },
    iconTooltip: { component: <InfoFillS /> },
    render: avatar => {
      return (
        <TableCell.AvatarLabelCell
          avatar={
            <ObjectAvatar
              badgeStatus="active"
              size="medium"
              iconComponent={<Icon component={avatar.icon} color="red" />}
            />
          }
          title={avatar.titleLarg}
          labels={avatar.labels}
        />
      );
    },
  },
];

export const COLUMNS_ALL = [
  ...COLUMNS_WITH_LABELS,
  ...COLUMNS_WITH_ICONS,
  ...COLUMNS_WITH_AVATARS,
  ...COLUMNS_WITH_STATUSES,
  ...COLUMNS_WITH_TRIGGERS,
  ...COLUMNS_WITH_PROGRESS_BAR,
];
