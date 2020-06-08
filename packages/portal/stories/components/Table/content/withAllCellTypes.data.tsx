import { TableCell } from '@synerise/ds-table';
import { action } from '@storybook/addon-actions';
import { LockM, PlayM, UserM, VarTypeStringM } from '@synerise/ds-icon/dist/icons';
import Select from '@synerise/ds-select';
import Button from '@synerise/ds-button';
import { Tag } from '@synerise/ds-tags';
import Icon from '@synerise/ds-icon';
import Avatar from '@synerise/ds-avatar';
import Switch from '@synerise/ds-switch/dist/Switch';
import Tooltip from '@synerise/ds-tooltip/dist/Tooltip';
import * as React from 'react';
import Checkbox from '@synerise/ds-checkbox/dist';

export const COLUMNS = [
  {
    title: 'Name',
    dataIndex: 'name',
    defaultSortOrder: 'descend',
    width: 254,
    textWrap: 'word-break',
    ellipsis: true,
    sorter: (a, b) => a.name < b.name,
    key: 'name',
  },
  {
    title: 'Name with flag',
    key: 'country',
    dataIndex: 'country',
    width: 254,
    render: (country, record) => {
      return (<TableCell.FlagLabelCell countryCode={country} label={record.name} />)
    }
  },
  {
    title: 'Name with star',
    key: 'active',
    dataIndex: 'active',
    width: 254,
    sorter: (a, b) =>  a.active - b.active,
    render: (active, record) => {
      return (<TableCell.StarCell active={active} onClick={action('Click start')}>{record.name}</TableCell.StarCell>)
    }
  },
  {
    title: 'Name with icon and star',
    key: 'name',
    dataIndex: 'name',
    width: 254,
    render: (name, record) => {
      return (<TableCell.StarCell active={record.active} onClick={action('Click start')}>
        <TableCell.IconLabelCell label={name} icon={{component: <VarTypeStringM />, color: '#6a7580'}}/>
      </TableCell.StarCell>)
    }
  },
  {
    title: 'Icon with label',
    dataIndex: 'name',
    width: 254,
    textWrap: 'word-break',
    ellipsis: true,
    render: (name, record) => (<TableCell.IconLabelCell icon={{component: <VarTypeStringM />, color: '#6a7580'}} label={name}/>)
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    width: 254,
    textWrap: 'word-break',
    ellipsis: true,
    render: (status) => (<TableCell.StatusLabelCell status={status} label={status} />)
  },
  {
    title: 'Select',
    dataIndex: 'select',
    key: 'key',
    width: 254,
    textWrap: 'word-break',
    ellipsis: true,
    render: (select) => (
    <Select value={select.value}>
      {select.options.map((option: string) => (
          <Select.Option value={option}>{option}</Select.Option>
        ))}
      </Select>
  )
  },
  {
    title: 'Button',
    dataIndex: 'age',
    key: 'age',
    width: 254,
    textWrap: 'word-break',
    ellipsis: true,
    render: (age) => (<Button type="secondary" onClick={() => alert(age)}>Show age</Button>)
  },
  {
    title: 'Tag',
    dataIndex: 'tag',
    key: 'tag',
    width: 254,
    textWrap: 'word-break',
    ellipsis: true,
    render: (tag) => (<Tag shape={tag.shape} name={tag.label} />)
  },
  {
    title: 'Tag with icon',
    dataIndex: 'tag',
    key: 'tag',
    width: 254,
    textWrap: 'word-break',
    ellipsis: true,
    render: (tag) => (<TableCell.TagIconCell>
      <Tag shape={tag.shape} name={tag.label} />
      <Icon component={<LockM />} color="#949ea6" />
    </TableCell.TagIconCell>)
  },
  {
    title: 'Avatar',
    dataIndex: 'avatar',
    key: 'avatar',
    width: 254,
    textWrap: 'word-break',
    ellipsis: true,
    render: (avatar) => <Avatar backgroundColor='red' backgroundColorHue='050' size='medium' iconComponent={<Icon component={avatar.icon} color='red' />}>{avatar.initials}</Avatar>
  },
  {
    title: 'Avatar with title',
    dataIndex: 'avatar',
    key: 'avatar',
    width: 254,
    textWrap: 'word-break',
    ellipsis: true,
    render: (avatar) => <TableCell.AvatarLabelCell avatar={<Avatar backgroundColor='red' backgroundColorHue='050' size='medium' iconComponent={<Icon component={avatar.icon} color='red' />}>{avatar.initials}</Avatar>} title={avatar.title}/>
  },
  {
    title: 'Avatar with title and meta',
    dataIndex: 'avatar',
    key: 'avatar',
    width: 254,
    textWrap: 'word-break',
    ellipsis: true,
    render: (avatar) => <TableCell.AvatarLabelCell avatar={<Avatar backgroundColor='red' backgroundColorHue='050' size='large' iconComponent={<Icon component={avatar.icon} color='red' />}>{avatar.initials}</Avatar>} title={avatar.title} labels={avatar.labels}/>
  },
  {
    title: 'Enabled',
    dataIndex: 'enabled',
    key: 'enabled',
    width: 254,
    textWrap: 'word-break',
    ellipsis: true,
    render: (enabled) => <Tooltip title={enabled ? 'Switch off' : 'Switch on'} placement={'topLeft'}><Switch onChange={action('Status change')} checked={enabled} label='' /></Tooltip>
  },
  {
    title: 'Editable row',
    dataIndex: 'editable',
    key: 'editable',
    width: 254,
    textWrap: 'word-break',
    ellipsis: true,
    render: (editable) => <TableCell.EditableCell value={editable} onChange={console.log} />
  },
  {
    title: 'Copyable',
    dataIndex: 'editable',
    key: 'editable',
    width: 254,
    textWrap: 'word-break',
    ellipsis: true,
    render: (editable) => <TableCell.CopyableCell value={editable} confirmMessage="Copied to clipboard!" tooltipTimeout={2000} />
  },
  {
    title: 'Checkbox',
    key: 'checked',
    dataIndex: 'checked',
    width: 120,
    render: (checked) => <Checkbox withoutPadding checked={checked} />
  },
  {
    title: 'Icon with tooltip',
    width: 254,
    textWrap: 'word-break',
    ellipsis: true,
    render: (editable) => <Tooltip title="Run"><Icon component={<PlayM/>} color='#54cb0b' /> </Tooltip>
  },
  {
    width: 254,
    render: () => <TableCell.ActionCell>
      <Button onClick={action('click')} type='secondary' mode='split'>Edit rule</Button>
    </TableCell.ActionCell>
  }
];
