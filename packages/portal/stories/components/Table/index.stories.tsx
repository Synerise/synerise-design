import * as React from 'react';
import faker from 'faker';
import { action } from '@storybook/addon-actions';
import VirtualTable from '@synerise/ds-table/dist/Virtualized/Virtualized';
import { withState } from '@dump247/storybook-state';
import { boolean, select } from '@storybook/addon-knobs';
import Table, { ItemsMenu, TableCell } from '@synerise/ds-table';
import {
  EditM,
  LockM,
  MailM,
  OptionHorizontalM,
  TrashM,
  UserM,
  PlayM, DuplicateM, FileDownloadM, AngleDownS
} from '@synerise/ds-icon/dist/icons';
import Select from '@synerise/ds-select';
import Button from '@synerise/ds-button';
import { Tag, TagShape } from '@synerise/ds-tags';
import Avatar from '@synerise/ds-avatar';
import Icon from '@synerise/ds-icon';
import Switch from '@synerise/ds-switch/dist/Switch';
import Dropdown from '@synerise/ds-dropdown';
import Menu from '@synerise/ds-menu';
import Tooltip from '@synerise/ds-tooltip';

const decorator = (storyFn) => (
  <div style={{ padding: 20, width: '100vw', minWidth: '100%' }}>
    {storyFn()}
  </div>
);

const dataSource = [...new Array(55)].map((i, k) => ({
  key: k + 1,
  name: faker.name.findName(),
  active: faker.random.boolean(),
  country: faker.random.arrayElement(['us', 'pl', 'de', 'it', 'es', 'ru']),
  age: (Math.random() * 50 + 10).toFixed(0),
  address: faker.address.streetAddress(),
  status: faker.random.arrayElement(['active', 'inactive', 'blocked']),
  avatar: {
    initials: 'AN',
    icon: <MailM />,
    title: 'Top 10 product add to cart',
    status: 'active',
    labels: [
      'Text AB/X',
      'Edited 11 Jun 2019 18:47',
    ],
  },
  select: {
    value: faker.random.arrayElement(['option 1', 'option 2', 'option 3']),
    options: ['option 1', 'option 2', 'option 3'],
  },
  tag: {
    label: 'status',
    shape: TagShape.STATUS_NEUTRAL,
  },
  enabled: faker.random.boolean(),
  editable: faker.name.findName(),
}));

const columns = [
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
    render: (name, record) => {
      return (<TableCell.StarCell active={record.active} onClick={action('Click start')}>{name}</TableCell.StarCell>)
    }
  },
  {
    title: 'Name with icon and star',
    key: 'name',
    dataIndex: 'name',
    width: 254,
    render: (name, record) => {
      return (<TableCell.StarCell active={record.active} onClick={action('Click start')}><TableCell.IconLabelCell label={name} icon={{component: <UserM />}}/></TableCell.StarCell>)
    }
  },
  {
    title: 'Icon with label',
    dataIndex: 'name',
    width: 254,
    textWrap: 'word-break',
    ellipsis: true,
    render: (name, record) => (<TableCell.IconLabelCell icon={{component: <UserM />}} label={name}/>)
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
    title: 'Tag',
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
    render: (enabled) => <Switch onChange={action('Status change')} checked={enabled} label='' />
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
    render: (editable) => <TableCell.CopyableCell value={editable} confirmMessage="Copied to clipboard!" />
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
      <Button type='secondary' mode='split'>Edit rule</Button>
    </TableCell.ActionCell>
  }
];

const simpleList = [
  {
    title: 'Avatar with title',
    dataIndex: 'avatar',
    key: 'avatar',
    render: (avatar) => <TableCell.AvatarLabelCell avatar={<Avatar backgroundColor='red' backgroundColorHue='050' size='medium' iconComponent={<Icon component={avatar.icon} color='red' />}>{avatar.initials}</Avatar>} title={avatar.title}/>
  }, {
    render: () => <TableCell.ActionCell>
      <Dropdown
        overlay={
          <Menu style={{padding: 8}}>
            <Menu.Item onClick={action('Edit')} prefixel={<Icon component={<EditM />} />}>
              Edit
            </Menu.Item>
            <Menu.Item onClick={action('Duplicate')} prefixel={<Icon component={<DuplicateM />} />}>
              Duplicate
            </Menu.Item>
            <Menu.Item onClick={action('Delete')} danger prefixel={<Icon component={<TrashM />} />}>
              Delete
            </Menu.Item>
          </Menu>
        }
        trigger='click'>
        <Button type='ghost' mode='single-icon'>
          <Icon component={<OptionHorizontalM/>}/>
        </Button>
      </Dropdown>
    </TableCell.ActionCell>
  }
];

const CELL_SIZES = {
  default: 'default',
  medium: 'medium',
  small: 'small',
};

const stories = {
  allColumnTypes: () => ({
    title: `${dataSource.length} records`,
    dataSource,
    columns,
    loading: boolean('Set loading state', false),
    roundedHeader: boolean('Rounded header', false),
    pagination: {
      showSizeChanger: boolean('pagination.showSizeChanger', true),
      showQuickJumper: boolean('pagination.showQuickJumper', true),
      onChange: action('pageChanged'),
    },
    scroll: {
      x: false,
    },
    onSearch: action('onSearch'),
    cellSize: select('Set cells size', CELL_SIZES, CELL_SIZES.default)
  }),
  withVirtualization: withState({
    selectedRowKeys: [],
  })(({store}) => {
    return (
      <div style={{width: 1200}}>
        <VirtualTable
          scroll={{ x: 0, y: 480 }}
          rowSelection={{ onChange: (selectedRows, records) => store.set({selectedRowKeys: selectedRows}), selectedRowKeys: store.state.selectedRowKeys }}
          dataSource={dataSource}
          columns={[{title: 'Segment name', key: 'name', dataIndex: 'name'}, {title: 'Age', key: 'age', dataIndex: 'age'}]}
          rowKey="key"
          pagination={false}
          onRowClick={(record) => {
            if(store.state.selectedRowKeys.indexOf(record.key) >= 0) {
              store.set({selectedRowKeys: store.state.selectedRowKeys.filter(k => k !== record.key)});
            }else {
              store.set({selectedRowKeys: [...store.state.selectedRowKeys, record.key]});
            }
          }}
          cellHeight={64}
        />
      </div>
    )
  }),
};

export default {
  name: 'Table|Table with all types of content',
  decorator,
  stories,
  Component: Table,
};
