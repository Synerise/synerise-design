import * as React from 'react';
import SidebarObject from '@synerise/ds-sidebar-object';
import { boolean, select, text } from '@storybook/addon-knobs';
import Button from '@synerise/ds-button';
import Drawer from '@synerise/ds-drawer';
import Typography from 'antd/lib/typography';
import Tabs from '@synerise/ds-tabs';
import { action } from '@storybook/addon-actions';
import Icon from '@synerise/ds-icon';
import { AngleDownM, AngleDownS, AngleUpM, OptionHorizontalM, SearchM } from '@synerise/ds-icon/dist/icons';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import { FormattedMessage } from 'react-intl';
import ArrowLeftM from '@synerise/ds-icon/dist/icons/ArrowLeftM';
import CloseM from '@synerise/ds-icon/dist/icons/CloseM';
import InlineEdit from '@synerise/ds-inline-edit';
import Badge from '@synerise/ds-badge';
import Avatar from '@synerise/ds-avatar';
import MailS from '@synerise/ds-icon/dist/icons/MailS';
import MailM from '@synerise/ds-icon/dist/icons/MailM';
import Description, { DescriptionRow } from '@synerise/ds-description';
import Status from '@synerise/ds-status';
import Tags, { TagShape } from '@synerise/ds-tags';
import { v4 as uuid } from 'uuid';
import sample from 'lodash/sample';

const sizes = ['small', 'medium', 'large', 'extraLarge'] as const;
const statuses = ['blocked', 'inactive', 'active'] as const;
const getColor = (name) => {
  return theme.palette[name];
};
const getIconSize = (size) => {
  return size === 'small' ? <MailS/> : <MailM/>;
};

const randomColorPool = [
  '#699788',
  '#6676e4',
  '#c3f424',
  '#f45a0d',
  '#caaa5b',
  '#c7fdf0',
  '#df3caa',
  '#917809',
  '#ea8a6f',
  '#04ed74',
  '#1c43a2',
  '#0db790',
];
const allTags = [
  {
    id: 0,
    name: 'Summer',
    color: '#13c2bc',
  },
  {
    id: 1,
    name: 'Customer Service PL',
    color: '#13c2bc',
  },
  ];
const backgroundColors = [
  'red',
  'green',
  'grey',
  'yellow',
  'blue',
  'pink',
  'mars',
  'orange',
  'fern',
  'cyan',
  'purple',
  'violet',
] as const;

const iconColors = [
  'red-600',
  'green-600',
  'grey-600',
  'yellow-600',
  'blue-600',
  'pink-600',
  'mars-600',
  'orange-600',
  'fern-600',
  'cyan-600',
  'purple-600',
  'violet-600',
] as const;

const backgroundColorHue = [
  '900',
  '800',
  '700',
  '600',
  '500',
  '400',
  '300',
  '200',
  '100',
  '050',
] as const;

const imgSrc = 'https://www.w3schools.com/howto/img_avatar.png';
const SELECT = ['table', 'inline'];
const RATIO = ['20-80', '30-70', '40-60', '50-50', '60-40', '70-30', '80-20'];

const TABS = [
  {
    label: 'Overview',
  },
  {
    label: 'Changelog',
  },
  {
    label: 'Versions',
  },
];
const texts = {
  noResults: <FormattedMessage id="DS.ITEM-FILTER.NO-RESULTS" />,
};
const headerTypes = {
  singleTitle: 'singleTitle',
  singleTitleWithBackIcon: 'singleTitleWithBackIcon',
};

const closeActionTypes = {
  twoButtons: 'twoButtons',
  singleCloseIcon: 'singleCloseIcon',
};


const renderBackIcon = (headerType, onBackClickHandler) => {
  if (headerType === headerTypes.singleTitleWithBackIcon) {
    return (
      <Drawer.DrawerHeaderBack>
        <Button type="ghost" mode="single-icon" onClick={onBackClickHandler} data-testid="ds-item-filter-close-button">
          <Icon component={<ArrowLeftM />} />
        </Button>
      </Drawer.DrawerHeaderBack>
    );
  } else return null;
};

const renderActionButtons = (closeActionType, actionClickHandler) => {
  if (closeActionType === closeActionTypes.singleCloseIcon) {
    return (
      <React.Fragment>
        <Button type="ghost" mode="single-icon" onClick={actionClickHandler} data-testid="ds-item-filter-close-button">
          <Icon component={<CloseM />} />
        </Button>
      </React.Fragment>
    );
  } else
    return (
      <React.Fragment>
        <Button  type={'ghost'}>
          <Icon component={<AngleUpM />} />
        </Button>
        <Button  type={'ghost'}>
          <Icon component={<AngleDownM />} />
        </Button>
        <Button  type={'ghost'}>
          <Icon component={<OptionHorizontalM />} />
        </Button>
        <Button type={'ghost'} onClick={actionClickHandler}>
          <Icon component={<CloseM />} />
        </Button>
      </React.Fragment>
    );
};

const stories = {
  default: () => {
    const [drawerVisible, setDrawerVisible] = React.useState(false);
    const [activeTab, setActiveTab] = React.useState(0);
    const [value, setValue] = React.useState<string>('Winter Campaign');
    const inputValue = text( 'InputValue', value);
    const [tags, setTags] = React.useState<Array<any>>(allTags);
    const [selected, setSelected] = React.useState<Array<any>>(allTags.slice(0, 6));
    const shapes = {
      'Default Round': TagShape.DEFAULT_ROUND,
      'Default Square': TagShape.DEFAULT_SQUARE,
    };

    const shape = select('Shape', shapes, shapes['Default Round']);
    const removable = boolean('Ability to remove', true);
    const addable = boolean('Ability to add', true);
    const creatable = boolean('Ability to create', true);
    const withManageLink = boolean('With manage tags link', true);
    const disabled = boolean('Disable entire group', false);
    const size = select('Size', ['small', 'normal'], 'small');
    let headerType = select('Set header type', headerTypes, headerTypes.singleTitle);
    let closeActionType = select('Set close action type', closeActionTypes, closeActionTypes.twoButtons);
    return (
      <div>
        <Button onClick={() => setDrawerVisible(!drawerVisible)} type="primary">
          Sidebar Object
        </Button>
        <Drawer visible={drawerVisible} placement="right" width={676} onClose={() => setDrawerVisible(false)}>
          <Drawer.DrawerHeaderWithoutPadding>
            <Drawer.DrawerHeader>
              <Drawer.DrawerHeaderBar>
                {renderBackIcon(headerType, () => setDrawerVisible(false))}
                <Badge status={select('Set status', statuses, 'inactive')}>
                  <Avatar
                    backgroundColor={select('Set background color', backgroundColors, 'pink')}
                    backgroundColorHue={select('Set background color hue', backgroundColorHue, '100')}
                    size={select('Set size', sizes, 'large')}
                    shape={select('Set shape', shapes, 'circle')}
                    iconComponent={
                      <Icon color={getColor(select('Set icon color', iconColors, 'pink-600'))} component={getIconSize(select('Set size', sizes, 'large'))}/>
                    }
                    tooltip={{name: 'Silvia Jobs', email: 'silvia.jobs@gmail.com'}}
                    hasStatus={boolean('Has status', true)}
                    style={{ flex: 1, margin: 0 }}
                  />
                </Badge>
                <Typography.Title style={{ flex: 2, marginLeft: '15px', }} level={4}>
                  <InlineEdit
                    input={{
                      name: 'name-of-input',
                      value: inputValue,
                      maxLength: 120,
                      placeholder: 'This is placeholder',
                      onBlur: action('onBlur'),
                      onChange: event => setValue(event.target.value),
                      onEnterPress: action('onEnterPress'),
                    }}
                  />
                </Typography.Title>
                {renderActionButtons(closeActionType, () => setDrawerVisible(false))}
              </Drawer.DrawerHeaderBar>
              <Tabs
                activeTab={activeTab}
                tabs={TABS}
                handleTabClick={setActiveTab}
                configuration={{ label: 'Configure', action: action('onConfigurationClick') }}
              />
            </Drawer.DrawerHeader>
            <div style={{padding: '12px 24px 12px 24px', borderBottom: '1px solid grey'}}>
            Folder: <Button type={'ghost'}>
            Example folder
              <Icon component={<AngleDownS/>} />
          </Button>
            </div>
          </Drawer.DrawerHeaderWithoutPadding>
          <Drawer.DrawerBody>
            <Drawer.DrawerContent style={{ borderBottom: '1px solid grey'}}>
              <Description type={select('Select description type', SELECT, 'table')} ratio={select('Select ratio', RATIO, '30-70')}>
              <DescriptionRow label="Type:" value={'Email campaign'} />
              <DescriptionRow label="Author:" prefixEl={<Avatar src={imgSrc} size='small' shape='circle' />} value={'Teresa Smith'} />
              <DescriptionRow label="Status:" value={<Status label='Draft' type='disabled'/>}/>
              <DescriptionRow label="Created:" value={'25 May, 2020 15:32'} />
              <DescriptionRow label="Last edited:" value={'27 May, 2020 15:32'} />
              <DescriptionRow label="ID:" value={'3423-3426-8263-6634-6834-2352'} />
              </Description>
              </Drawer.DrawerContent>
            <div style={{padding: '12px 24px 0 20px', borderBottom: '1px solid grey'}}>
              <Tags
                data={tags}
                tagShape={shape}
                selected={selected}
                disabled={disabled}
                addable={addable}
                creatable={creatable}
                removable={removable}
                overlayStyle={{width: '283px'}}
                maxHeight={200}
                texts={{
                  clearTooltip: 'Clear',
                  addButtonLabel: 'Add tag',
                  manageLinkLabel: 'Manage tags',
                  createTagButtonLabel: 'Add tag',
                  searchPlaceholder: 'Search tag...',
                  dropdownNoTags: 'No tags found',
                }}
                onCreate={name => {
                  const tag = {
                    id: uuid(),
                    name,
                    color: sample(randomColorPool),
                  };

                  console.log('Created new tag', name, tag);

                  setTags([...tags, tag]);
                  setSelected([...selected, tag]);
                }}
                onSelectedChange={(tags, actionTaken) => {
                  console.log('Selected tags change', tags, 'with action', actionTaken);
                  setSelected(tags);
                }}
                manageLink={withManageLink}
              />
            </div>
            <div style={{padding: '12px 24px 12px 24px'}}>
              <InlineEdit
                input={{
                  name: 'name-of-input',
                  value: inputValue,
                  maxLength: 120,
                  placeholder: 'This is placeholder',
                  onBlur: action('onBlur'),
                  onChange: event => setValue(event.target.value),
                  onEnterPress: action('onEnterPress'),
                }}
                size={size}
              />
            </div>
          </Drawer.DrawerBody>
        </Drawer>
      </div>
    );
  },
};

export default {
name: 'Components/SidebarObject',
  config: {},
  stories,
  Component: SidebarObject,
}
