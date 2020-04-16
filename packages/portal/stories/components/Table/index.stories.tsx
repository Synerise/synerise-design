import * as React from 'react';
import faker from 'faker';
import { action } from '@storybook/addon-actions';
import VirtualTable from '@synerise/ds-table/dist/Virtualized/Virtualized';
import { withState } from '@dump247/storybook-state';
import { boolean, select } from '@storybook/addon-knobs';
import Table, { TableCell } from '@synerise/ds-table';
import { LockM, MailM, UserM } from '@synerise/ds-icon/dist/icons';
import Select from '@synerise/ds-select';
import Button from '@synerise/ds-button';
import { Tag, TagShape } from '@synerise/ds-tags';
import Avatar from '@synerise/ds-avatar';
import Icon from '@synerise/ds-icon';
import Switch from '@synerise/ds-switch/dist/Switch';

const decorator = (storyFn) => (
  <div style={{ padding: 20, width: '100%', minWidth: '1500px' }}>
    {storyFn()}
  </div>
);

const dataSource = [...new Array(55)].map((i, k) => ({
  key: k + 1,
  name: faker.name.findName(),
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
  enabled: faker.random.boolean()
}));

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.name <= b.name,
    key: 'name',
  },
  {
    title: 'Icon with label',
    dataIndex: 'name',
    render: (name, record) => (<TableCell.IconLabelCell icon={{component: <UserM />}} label={name}/>)
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status) => (<TableCell.StatusLabelCell status={status} label={status} />)
  },
  {
    title: 'Select',
    dataIndex: 'select',
    key: 'key',
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
    render: (age) => (<Button type="secondary" onClick={() => alert(age)}>Show age</Button>)
  },
  {
    title: 'Tag',
    dataIndex: 'tag',
    key: 'tag',
    render: (tag) => (<Tag shape={tag.shape} name={tag.label} />)
  },
  {
    title: 'Tag',
    dataIndex: 'tag',
    key: 'tag',
    render: (tag) => (<TableCell.TagIconCell>
      <Tag shape={tag.shape} name={tag.label} />
      <Icon component={<LockM />} color="#949ea6" />
    </TableCell.TagIconCell>)
  },
  {
    title: 'Avatar',
    dataIndex: 'avatar',
    key: 'avatar',
    render: (avatar) => <Avatar backgroundColor='red' backgroundColorHue='050' size='medium' iconComponent={<Icon component={avatar.icon} color='red' />}>{avatar.initials}</Avatar>
  },
  {
    title: 'Avatar with title',
    dataIndex: 'avatar',
    key: 'avatar',
    render: (avatar) => <TableCell.AvatarLabelCell avatar={<Avatar backgroundColor='red' backgroundColorHue='050' size='medium' iconComponent={<Icon component={avatar.icon} color='red' />}>{avatar.initials}</Avatar>} title={avatar.title}/>
  },
  {
    title: 'Avatar with title and meta',
    dataIndex: 'avatar',
    key: 'avatar',
    render: (avatar) => <TableCell.AvatarLabelCell avatar={<Avatar backgroundColor='red' backgroundColorHue='050' size='large' iconComponent={<Icon component={avatar.icon} color='red' />}>{avatar.initials}</Avatar>} title={avatar.title} labels={avatar.labels}/>
  },
  {
    title: 'Enabled',
    dataIndex: 'enabled',
    key: 'enabled',
    render: (enabled) => <Switch onChange={action('Status change')} checked={enabled} label='' />
  },
  {
    title: 'Action',
    dataIndex: '',
    key: 'x'
  }
];

const rowSelection = {
  selectedRowKeys: [0, 5],
  onChange: action('checkboxChanged'),
};

const CELL_SIZES = {
  default: 'default',
  medium: 'medium',
  small: 'small',
};

const stories = {
  default: () => ({
    title: `${dataSource.length} records`,
    dataSource,
    columns,
    loading: true,
    pagination: {
      showSizeChanger: boolean('pagination.showSizeChanger', true),
      showQuickJumper: boolean('pagination.showQuickJumper', true),
      onChange: action('pageChanged'),
    },
    rowSelection: (boolean('show selection', false) ? rowSelection : undefined),
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
  expandable: () => ({
    title: `${dataSource.length} records`,
    dataSource,
    columns,
    loading: true,
    pagination: {
      showSizeChanger: boolean('pagination.showSizeChanger', true),
      showQuickJumper: boolean('pagination.showQuickJumper', true),
      onChange: action('pageChanged'),
    },
    rowSelection: (boolean('show selection', false) ? rowSelection : undefined),
    onSearch: action('onSearch'),
    cellSize: select('Set cells size', CELL_SIZES, CELL_SIZES.default)
  })
};

export default {
  name: 'Components|Table',
  decorator,
  stories,
  Component: Table,
};
