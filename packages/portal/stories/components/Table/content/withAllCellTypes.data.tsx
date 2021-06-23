import { TableCell } from '@synerise/ds-table';
import { action } from '@storybook/addon-actions';
import { InfoFillS, LockM, VarTypeStringM, VarTypeBooleanM, VarTypeListM, UserM } from '@synerise/ds-icon/dist/icons';
import Select from '@synerise/ds-select';
import Button from '@synerise/ds-button';
import { Tag } from '@synerise/ds-tags';
import Icon from '@synerise/ds-icon';
import Avatar, { UserAvatar, ObjectAvatar } from '@synerise/ds-avatar';
import Switch from '@synerise/ds-switch/dist/Switch';
import Tooltip from '@synerise/ds-tooltip/dist/Tooltip';
import * as React from 'react';
import Checkbox from '@synerise/ds-checkbox/dist';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import { IconLabelCell, LabelsWithShowMore } from '@synerise/ds-table/dist/Cell';
import Badge from '@synerise/ds-badge';
import { boolean, select, text } from '@storybook/addon-knobs';
import ProgressBar from '@synerise/ds-progress-bar';
import { Counter} from '../../Loader/index.stories';
import Loader from '@synerise/ds-loader';
import anonymImage from '../../Avatar/av-anonym-004.png';
import Skeleton from '@synerise/ds-skeleton';
import SkeletonAvatar from '@synerise/ds-skeleton/dist/SkeletonAvatar/SkeletonAvatar';


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
const customColorOptions = {
  blue: theme.palette['blue-500'],
  grey: theme.palette['grey-500'],
  red: theme.palette['red-500'],
  green: theme.palette['green-500'],
  yellow: theme.palette['yellow-500'],
  pink: theme.palette['pink-500'],
  mars: theme.palette['mars-500'],
  orange: theme.palette['orange-500'],
  fern: theme.palette['fern-500'],
  cyan: theme.palette['cyan-500'],
  purple: theme.palette['purple-500'],
  violet: theme.palette['violet-500'],
};
const iconSizes = {
  Small: 'S',
  Medium: 'M',
  Large: 'L',
};
const colorOptions = {
  blue: 'blue',
  grey: 'grey',
  red: 'red',
  green: 'green',
  yellow: 'yellow',
  pink: 'pink',
  mars: 'mars',
  orange: 'orange',
  fern: 'fern',
  cyan: 'cyan',
  purple: 'purple',
  violet: 'violet',
};

export const COLUMNS_WITH_TRIGGERS = [
  {
    title: 'Select',
    dataIndex: 'select',
    key: 'select',
    textWrap: 'word-break',
    ellipsis: true,
    icon: { component: <VarTypeListM /> },
    iconTooltip: { component: <InfoFillS /> },
    render: select => (
      <Select getPopupContainer={()=>document.querySelector(".ds-table")} value={select.value}>
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
    render: editable => <TableCell.EditableCell value={editable} placeholder={'No data'} onChange={console.log} />,
  },
  {
    title: 'Copyable',
    dataIndex: 'name',
    key: 'copyable',
    textWrap: 'word-break',
    ellipsis: true,
    icon: { component: <VarTypeListM /> },
    iconTooltip: { component: <InfoFillS /> },
    render: name => <TableCell.CopyableCell value={name} confirmMessage="Copied to clipboard!" tooltipTimeout={2000} />,
  },
  {
    title: 'Checkbox',
    key: 'checked',
    dataIndex: 'checked',
    icon: { component: <VarTypeBooleanM /> },
    iconTooltip: { component: <InfoFillS /> },
    render: checked => <Checkbox withoutPadding checked={checked} />,
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
export const COLUMNS_WITH_PROGRESS_BAR = [
  {
    title: 'Progress Bar',
    render: () => {
      const color = select('Set custom color', customColorOptions, customColorOptions.green);
      const isThick = boolean('Set thick', false);
      return (
        <ProgressBar
          thick={isThick}
          showLabel={true}
          containerStyles={{ flexDirection: 'row-reverse', width: '80px' }}
          labelFormatter={(amount, percent) => (
            <div style={{ padding: isThick ? '7px 0px 0px 8px' : '8px 0 0 8px' }}>{percent}%</div>
          )}
          percent={60}
          strokeColor={color}
        ></ProgressBar>
      );
    },
  },
];

export const COLUMNS_WITH_LABELS = [
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
    sortRender: 'string',
  },
  {
    title: 'Relations',
    dataIndex: 'relations',
    textWrap: 'word-break',
    ellipsis: true,
    key: 'relations',
    render: () => (
      <LabelsWithShowMore
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
        renderItem={(label, item: { key: number; icon: object }) => {
          return <IconLabelCell label={label} icon={item.icon} />;
        }}
      />
    ),
  },
];

export const COLUMNS_WITH_ICONS = [
  {
    title: 'Name with flag',
    key: 'country',
    dataIndex: 'country',
    icon: { component: <VarTypeStringM /> },
    iconTooltip: { component: <InfoFillS /> },
    sorter: {
      compare: (a, b) => a.country.localeCompare(b.country),
      multiple: 2,
    },
    render: (country, record) => {
      return <TableCell.FlagLabelCell countryCode={country} label={record.name} />;
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
    render: (name, record) => (
      <TableCell.IconLabelCell icon={{ component: <UserM />, color: '#6a7580' }} label={name} />
    ),
  },
];

export const COLUMNS_WITH_STATUSES = [
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    textWrap: 'word-break',
    ellipsis: true,
    icon: { component: <VarTypeBooleanM /> },
    tooltip: { title: 'Tooltip', description: 'Description' },
    render: status => <TableCell.StatusLabelCell status={status} label={status} />,
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
        <Switch onChange={action('Status change')} checked={enabled} label="" />
      </Tooltip>
    ),
  },
];

export const COLUMNS_WITH_AVATARS = [
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
          avatar={
            <Avatar
              backgroundColor="red"
              backgroundColorHue="050"
              src={anonymImage}
              size="small"
            >
            </Avatar>
          }
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
      const loadingText = text('Loading', 'Loading...');

      const getPercent = (): number | React.ReactNode | null => {
          return (
            <div style={{ display: 'flex' }}>
              <Counter/>
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
            <div style={{ display: 'flex', width: '100px', alignItems: 'center', margin: '-1px 0 -3px 0'}}>
              <div>
                {avatar.labelLoader}
              </div>
              <div>
                <Loader
                  percentFormatter={getPercent}
                  size='S'
                  color='blue'
                  label={loadingText}
                  labelPosition='right'
                />
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
export const COLUMNS_WITH_SKELETON = [
  {
    title: <div style={{width: '66px'}}>
      <Skeleton width='M' />
    </div>,
    dataIndex: 'skeleton',
    key: 'skeleton',
    width: 100,
    textWrap: 'none',
    ellipsis: true,
    icon: { component: <VarTypeListM /> },
    iconTooltip: { component: <InfoFillS /> },
    render: skeleton => <Checkbox withoutPadding checked={null} />,
  },
  {
    title: <div style={{width: '66px'}}>
      <Skeleton width='M' />
    </div>,
    dataIndex: 'skeleton',
    key: 'skeleton',
    width: 254,
    textWrap: 'word-break',
    ellipsis: true,
    icon: { component: <VarTypeListM /> },
    iconTooltip: { component: <InfoFillS /> },
    render: skeleton => {
      return (
        <TableCell.AvatarLabelCell
          avatarAction={action('Avatar Action')}
          avatar={
            <SkeletonAvatar size='M' shape={false}  />
          }
          title={<div style={{width: '150px'}}>
            <Skeleton size='M'  />
          </div>}
        />
      );
    },
  },
  {
    title: <div style={{width: '66px'}}>
      <Skeleton width='M' />
    </div>,
    dataIndex: 'skeleton',
    key: 'skeleton-desc',
    width: 254,
    textWrap: 'word-break',
    ellipsis: true,
    icon: { component: <VarTypeListM /> },
    iconTooltip: { component: <InfoFillS /> },
    render: skeleton  => {
      return (
        <div style={{width: '150px'}}>
          <Skeleton size='M'  />
        </div>
      );
    },
  },
  {
    title: <div style={{width: '66px'}}>
      <Skeleton width='M' />
    </div>,
    dataIndex: 'skeleton',
    key: 'skeleton-desc',
    width: 254,
    textWrap: 'word-break',
    ellipsis: true,
    icon: { component: <VarTypeListM /> },
    iconTooltip: { component: <InfoFillS /> },
    render: skeleton => {
      return (
        <div style={{width: '150px'}}>
          <Skeleton size='M'  />
        </div>
      );
    },
  },
];

export const COLUMNS = [
  ...COLUMNS_WITH_LABELS,
  ...COLUMNS_WITH_ICONS,
  ...COLUMNS_WITH_AVATARS,
  ...COLUMNS_WITH_STATUSES,
  ...COLUMNS_WITH_TRIGGERS,
  ...COLUMNS_WITH_PROGRESS_BAR,
];
