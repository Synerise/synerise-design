import React, { ReactNode } from 'react';
import { action } from 'storybook/actions';

import Avatar, { ObjectAvatar } from '@synerise/ds-avatar';
import Button from '@synerise/ds-button';
import Checkbox from '@synerise/ds-checkbox';
import Icon, { AngleDownS, LockM, UserM } from '@synerise/ds-icon';
import Loader from '@synerise/ds-loader';
import ProgressBar from '@synerise/ds-progress-bar';
import Select from '@synerise/ds-select';
import Switch from '@synerise/ds-switch';
import { TableCell } from '@synerise/ds-table-new';
import Tag from '@synerise/ds-tag';
import Tooltip from '@synerise/ds-tooltip';
import { type ColumnDef, type Row } from '@tanstack/react-table';

import { AVATAR_IMAGE } from '../../../constants';
import { Counter } from '../../Loader/Loader.data';
import { chromaticCellRender } from '../utils';
import { RELATIONS } from './relations';
import { DATA_SOURCE_FULL } from './tableData';
import { TAGS } from './tags';

type RowType = (typeof DATA_SOURCE_FULL)[number];

export const COLUMNS_WITH_LABELS: ColumnDef<RowType, unknown>[] = [
  {
    accessorKey: 'name',
    id: 'name',
    header: 'Name',
    size: 200,
    enableSorting: true,
    enableMultiSort: true,
    sortingFn: (rowA: Row<RowType>, rowB: Row<RowType>) =>
      rowA.original.name.localeCompare(rowB.original.name),
    meta: {
      sortRender: 'string',
      enableMultiSort: true,
    },
    cell: (info) => (
      <TableCell.IconLabelCell
        label={info.getValue() as string}
        disabled={
          (info.row.original as RowType & { inactive?: boolean }).inactive
        }
      />
    ),
  },
  {
    accessorKey: 'relations',
    id: 'relations',
    header: 'Relations',
    size: 150,
    cell: () => (
      <TableCell.LabelsWithShowMore
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

export const COLUMNS_WITH_ICONS: ColumnDef<RowType, unknown>[] = [
  {
    accessorKey: 'country',
    id: 'country',
    header: 'Name with flag',
    size: 240,
    enableSorting: true,
    enableMultiSort: true,
    sortingFn: (rowA: Row<RowType>, rowB: Row<RowType>) =>
      rowA.original.country.localeCompare(rowB.original.country),
    meta: {
      enableMultiSort: true,
    },
    cell: (info) => {
      return (
        <TableCell.FlagLabelCell
          countryCode={info.getValue() as string}
          label={info.row.original.name}
        />
      );
    },
  },
  {
    accessorKey: 'name',
    id: 'icon-with-label',
    header: 'Icon with label',
    size: 240,
    enableSorting: true,
    sortingFn: (rowA: Row<RowType>, rowB: Row<RowType>) =>
      rowA.original.name.localeCompare(rowB.original.name),
    cell: (info) => (
      <TableCell.IconLabelCell
        icon={{ component: <UserM />, color: '#6a7580' }}
        label={info.getValue() as string}
        disabled={
          (info.row.original as RowType & { inactive?: boolean }).inactive
        }
      />
    ),
  },
];

export const COLUMNS_WITH_STATUSES: ColumnDef<RowType, unknown>[] = [
  {
    accessorKey: 'status',
    id: 'status',
    header: 'Status',
    size: 100,
    cell: (info) => {
      const status = info.getValue() as string;
      return <TableCell.StatusLabelCell status={status} label={status} />;
    },
  },
  {
    accessorKey: 'tag',
    id: 'tag',
    header: 'Tag',
    minSize: 150,
    cell: (info) => {
      const tag = info.getValue() as { shape: string; label: string };
      return <Tag shape={tag.shape} name={tag.label} />;
    },
  },
  {
    accessorKey: 'tag',
    id: 'tag-icon',
    header: 'Tag with icon',
    minSize: 200,
    cell: (info) => {
      const tag = info.getValue() as { shape: string; label: string };
      return (
        <TableCell.TagIconCell>
          <Tag shape={tag.shape} name={tag.label} />
          <Icon component={<LockM />} color="#949ea6" />
        </TableCell.TagIconCell>
      );
    },
  },
  {
    accessorKey: 'enabled',
    id: 'enabled',
    header: 'Enabled',
    minSize: 100,
    cell: (info) => {
      const enabled = info.getValue() as boolean;
      return (
        <Tooltip
          title={enabled ? 'Switch off' : 'Switch on'}
          placement={'topLeft'}
        >
          <Switch
            onChange={action('Status change')}
            checked={enabled}
            label=""
          />
        </Tooltip>
      );
    },
  },
];

export const COLUMNS_WITH_AVATARS: ColumnDef<RowType, unknown>[] = [
  {
    accessorKey: 'avatar',
    id: 'avatar-s',
    header: 'Avatar S',
    size: 200,
    cell: () => {
      return (
        <TableCell.AvatarLabelCell
          avatar={
            <Avatar
              backgroundColor="red"
              backgroundColorHue="050"
              src={AVATAR_IMAGE}
              size="small"
            ></Avatar>
          }
          title="Test"
        />
      );
    },
  },
  {
    accessorKey: 'avatar',
    id: 'avatar-m',
    header: 'Avatar M with label',
    size: 254,
    cell: (info) => {
      const avatar = info.getValue() as RowType['avatar'];
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
    accessorKey: 'avatar',
    id: 'avatar-desc',
    header: 'Avatar with label and description',
    size: 254,
    cell: (info) => {
      const avatar = info.getValue() as RowType['avatar'];
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
    accessorKey: 'avatar',
    id: 'avatar-loading',
    header: 'Avatar with loading state',
    size: 254,
    cell: (info) => {
      const avatar = info.getValue() as RowType['avatar'];
      const getPercent = (): number | ReactNode | null => {
        return (
          <div style={{ display: 'flex' }}>
            <Counter />
          </div>
        );
      };
      return (
        <TableCell.AvatarLabelCell
          avatar={
            <ObjectAvatar
              badgeStatus="active"
              iconComponent={<Icon component={avatar.icon} color="red" />}
            />
          }
          title={avatar.titleLarg}
          loader={
            <div
              style={{
                display: 'flex',
                width: '100px',
                alignItems: 'center',
                margin: '-1px 0 -3px 0',
              }}
            >
              <div>{avatar.labelLoader}</div>
              <div>
                <Loader
                  percentFormatter={getPercent}
                  size="S"
                  color="blue"
                  label="Loading..."
                  labelPosition="right"
                />
              </div>
            </div>
          }
        />
      );
    },
  },
  {
    accessorKey: 'avatar',
    id: 'avatar-meta',
    header: 'Avatar with label and meta',
    size: 254,
    cell: (info) => {
      const avatar = info.getValue() as RowType['avatar'];
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

export const COLUMNS_WITH_TRIGGERS: ColumnDef<RowType, unknown>[] = [
  {
    accessorKey: 'select',
    id: 'select',
    header: 'Select',
    size: 150,
    cell: (info) => {
      const select = info.getValue() as { value: string; options: string[] };
      return (
        <Select value={select.value}>
          {select.options.map((option: string) => (
            <Select.Option value={option}>{option}</Select.Option>
          ))}
        </Select>
      );
    },
  },
  {
    accessorKey: 'age',
    id: 'age',
    header: 'Button',
    size: 150,
    meta: {
      getCellTooltipProps: () => ({ title: 'age' }),
    },
    cell: (info) => {
      const age = info.getValue() as string;
      return (
        <Button type="secondary" onClick={() => alert(age)}>
          Show age
        </Button>
      );
    },
  },
  {
    id: 'multiple-buttons',
    header: 'Multiple buttons',
    size: 220,
    cell: () => (
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
    accessorKey: 'editable',
    id: 'editable',
    header: 'Editable row',
    size: 150,
    meta: {
      getCellTooltipProps: (row: RowType) => ({ title: row.name }),
    },
    cell: (info) => (
      <TableCell.EditableCell
        value={info.getValue() as string}
        placeholder={'No data'}
        onChange={action('onChange')}
      />
    ),
  },
  {
    accessorKey: 'name',
    id: 'copyable',
    header: 'Copyable',
    size: 150,
    cell: (info) => (
      <TableCell.CopyableCell
        value={info.getValue() as string}
        confirmMessage="Copied to clipboard!"
        tooltipTimeout={2000}
      />
    ),
  },
  {
    id: 'split-button',
    header: '',
    size: 220,
    cell: () => (
      <TableCell.ActionCell>
        <Button onClick={action('click')} type="secondary" mode="split">
          Edit rule
          <Icon component={<AngleDownS />} />
        </Button>
      </TableCell.ActionCell>
    ),
  },
];

export const COLUMNS_WITH_TAGS: ColumnDef<RowType, unknown>[] = [
  {
    accessorKey: 'tags',
    id: 'tags',
    header: 'Tags list',
    size: 254,
    cell: (info) => {
      const tags = info.getValue() as typeof TAGS;
      const index = info.row.index;
      return (
        <TableCell.TagsGroupCell
          isError={index === 2}
          isLoading={index === 1}
          tagsProps={{
            addable: true,
            removable: true,
            selected: tags || [],
            data: TAGS,
          }}
        />
      );
    },
  },
];

export const COLUMNS_WITH_PROGRESS_BAR: ColumnDef<RowType, unknown>[] = [
  {
    id: 'progress-bar',
    header: 'Progress Bar',
    size: 150,
    cell: () => {
      return (
        <ProgressBar
          width="80px"
          inline
          label="60%"
          percent={60}
          style={{ justifyContent: 'flex-start' }}
        ></ProgressBar>
      );
    },
  },
];

export const COLUMNS_WITH_INPUT_NUMBER: ColumnDef<RowType, unknown>[] = [
  {
    accessorKey: 'input-number',
    id: 'input-number',
    header: 'Limit',
    size: 150,
    cell: () => {
      return (
        <TableCell.InputNumberCell
          inputNumberProps={{ placeholder: 'Enter Limit' }}
        />
      );
    },
  },
  {
    id: 'select-input',
    header: 'Select',
    size: 200,
    cell: () => {
      return <Select placeholder="Placeholder"></Select>;
    },
  },
  {
    accessorKey: 'checked',
    id: 'checked-input',
    header: 'Checkbox',
    size: 150,
    cell: (info) =>
      chromaticCellRender(
        <Checkbox withoutPadding checked={info.getValue() as boolean} />,
      ),
  },
  {
    accessorKey: 'editable',
    id: 'editable-input',
    header: 'Editable row',
    size: 150,
    cell: (info) => (
      <TableCell.EditableCell
        value={info.getValue() as string}
        placeholder={'No data'}
        onChange={action('onChange')}
      />
    ),
  },
];

export const RESPONSIVE_COLUMNS: ColumnDef<RowType, unknown>[] = [
  {
    accessorKey: 'name',
    id: 'name',
    header: 'User name',
    enableSorting: true,
    sortingFn: (rowA: Row<RowType>, rowB: Row<RowType>) =>
      rowA.original.name.localeCompare(rowB.original.name),
    minSize: 600,
    maxSize: 900,
    meta: {
      sortRender: 'string',
    },
  },
  {
    accessorKey: 'address',
    id: 'address',
    header: 'Address',
    enableSorting: true,
    minSize: 250,
    sortingFn: (rowA: Row<RowType>, rowB: Row<RowType>) =>
      rowA.original.address.localeCompare(rowB.original.address),
    meta: {
      sortRender: 'string',
    },
  },
  {
    accessorKey: 'city',
    id: 'city',
    header: 'City',
    enableSorting: true,
    minSize: 250,
    sortingFn: (rowA: Row<RowType>, rowB: Row<RowType>) =>
      rowA.original.city.localeCompare(rowB.original.city),
    meta: {
      sortRender: 'string',
    },
  },
  {
    accessorKey: 'number',
    id: 'number',
    header: 'Number',
    enableSorting: true,
    minSize: 250,
    sortingFn: (rowA: Row<RowType>, rowB: Row<RowType>) =>
      rowA.original.number.localeCompare(rowB.original.number),
  },
  {
    accessorKey: 'transactionType',
    id: 'transactionType',
    header: 'Type',
    size: 180,
    enableSorting: true,
    sortingFn: (rowA: Row<RowType>, rowB: Row<RowType>) =>
      rowA.original.transactionType.localeCompare(
        rowB.original.transactionType,
      ),
    meta: {
      sortRender: 'string',
    },
  },
];

export const RAW_TABLE_COLUMNS: ColumnDef<RowType, unknown>[] = [
  {
    accessorKey: 'name',
    id: 'name',
    header: 'User name',
  },
  {
    accessorKey: 'address',
    id: 'address',
    header: 'Address',
  },
  {
    accessorKey: 'city',
    id: 'city',
    header: 'City',
  },
  {
    accessorKey: 'number',
    id: 'number',
    header: 'Number',
  },
  {
    accessorKey: 'transactionType',
    id: 'transactionType',
    header: 'Type',
  },
];

export const COLUMNS_MULTIPLE_SORT: ColumnDef<RowType, unknown>[] = [
  {
    accessorKey: 'name',
    id: 'name',
    header: 'User name',
    enableSorting: true,
    enableMultiSort: true,
    minSize: 600,
    maxSize: 900,
    sortingFn: (rowA: Row<RowType>, rowB: Row<RowType>) =>
      rowA.original.name.localeCompare(rowB.original.name),
    meta: {
      sortRender: 'string',
      enableMultiSort: true,
    },
  },
  {
    accessorKey: 'address',
    id: 'address',
    header: 'Address',
    enableSorting: true,
    enableMultiSort: true,
    minSize: 250,
    sortingFn: (rowA: Row<RowType>, rowB: Row<RowType>) =>
      rowA.original.address.localeCompare(rowB.original.address),
    meta: {
      sortRender: 'string',
      enableMultiSort: true,
    },
  },
  {
    accessorKey: 'city',
    id: 'city',
    header: 'City',
    enableSorting: true,
    enableMultiSort: true,
    minSize: 250,
    sortingFn: (rowA: Row<RowType>, rowB: Row<RowType>) =>
      rowA.original.city.localeCompare(rowB.original.city),
    meta: {
      sortRender: 'string',
      enableMultiSort: true,
    },
  },
  {
    accessorKey: 'number',
    id: 'number',
    header: 'Number',
    enableSorting: true,
    minSize: 250,
    sortingFn: (rowA: Row<RowType>, rowB: Row<RowType>) =>
      rowA.original.number.localeCompare(rowB.original.number),
    meta: {
      sortRender: 'default',
    },
  },
  {
    accessorKey: 'transactionType',
    id: 'transactionType',
    header: 'Type',
    size: 180,
    enableSorting: true,
    sortingFn: (rowA: Row<RowType>, rowB: Row<RowType>) =>
      rowA.original.transactionType.localeCompare(
        rowB.original.transactionType,
      ),
    meta: {
      sortRender: 'string',
    },
  },
];

export const COLUMNS_ALL = [
  ...COLUMNS_WITH_LABELS,
  ...COLUMNS_WITH_ICONS,
  ...COLUMNS_WITH_AVATARS,
  ...COLUMNS_WITH_STATUSES,
  ...COLUMNS_WITH_TRIGGERS,
  ...COLUMNS_WITH_TAGS,
  ...COLUMNS_WITH_PROGRESS_BAR,
  ...COLUMNS_WITH_INPUT_NUMBER,
];
