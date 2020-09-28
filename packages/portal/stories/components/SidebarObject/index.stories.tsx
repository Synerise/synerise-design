import * as React from 'react';
import SidebarObject from '@synerise/ds-sidebar-object';
import { boolean, select } from '@storybook/addon-knobs';
import Button from '@synerise/ds-button';
import Drawer from '@synerise/ds-drawer';
import Icon from '@synerise/ds-icon';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import ArrowLeftM from '@synerise/ds-icon/dist/icons/ArrowLeftM';
import Badge from '@synerise/ds-badge';
import Avatar from '@synerise/ds-avatar';
import MailS from '@synerise/ds-icon/dist/icons/MailS';
import MailM from '@synerise/ds-icon/dist/icons/MailM';
import Status from '@synerise/ds-status';
import Tags, { TagShape } from '@synerise/ds-tags';
import { v4 as uuid } from 'uuid';
import sample from 'lodash/sample';


const getColor = name => {
  return theme.palette[name];
};
const getIconSize = size => {
  return size === 'small' ? <MailS /> : <MailM />;
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
  {
    id: 2,
    name: 'Tag Name 3',
    color: '#76dc25',
  },
  {
    id: 3,
    name: 'Tag Name 4',
    color: '#6d2dd3',
  },
];



const imgSrc = 'https://www.w3schools.com/howto/img_avatar.png';
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
const headerTypes = {
  singleTitle: 'singleTitle',
  singleTitleWithBackIcon: 'singleTitleWithBackIcon',
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

const stories = {
  default: () => {
    const [drawerVisible, setDrawerVisible] = React.useState(false);
    const [tags, setTags] = React.useState<Array<any>>(allTags);
    const [selected, setSelected] = React.useState<Array<any>>(allTags.slice(0, 2));
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
    const data = [
      { id: '2', name: 'Example folder' },
      { name: 'Winter' },
      { name: 'Summer' },
      { name: 'Drafts' },
      { name: 'Archived' },
    ];
    let headerType = select('Set header type', headerTypes, headerTypes.singleTitle);
    return (
      <div>
        <Button onClick={() => setDrawerVisible(!drawerVisible)} type="primary">
          Sidebar Object
        </Button>
        <Drawer visible={drawerVisible} placement="right" width={676} onClose={() => setDrawerVisible(false)}>
          <SidebarObject
            avatar={
              <Badge status={('inactive')}>
                <Avatar
                  backgroundColor={('pink')}
                  backgroundColorHue={('100')}
                  size={('large')}
                  shape={( 'circle')}
                  iconComponent={
                    <Icon
                      color={getColor('pink-600')}
                      component={getIconSize('large')}
                    />
                  }
                  hasStatus={boolean('Has status', true)}
                  style={{ flex: 1, margin: 0 }}
                />
              </Badge>
            }
            onCloseClick={() => setDrawerVisible(false)}
            folders={data}
            parentFolder={{ id: '2', name: 'Example folder' }}
            texts={{
              namePlaceholder: 'Description',
              name: 'DescriptionInput',
              search: 'Search',
              inlineEditPlaceholder: 'Campaign Name',
              editIcon: 'Edit',
              deleteIcon: 'Delete',
              duplicateIcon: 'Duplicate',
              moveIcon: 'Move to',
              folder: 'Folder',
              placeholder: 'Description',
              labelName: 'Description',
              labelTooltip: 'Description',
              suffixTooltip: 'Edit',
            }}
            headerPreffix={renderBackIcon(headerType, () => setDrawerVisible(false))}
            onEdit={() => {}}
            onDuplicate={() => {}}
            onMove={() => {}}
            onDelete={() => {}}
            onId={() => {}}
            headerTabs={TABS}
            inputObject={{
              'Type:': 'Email campaign',
              Status: (
                <div>
                  <Status label="Draft" type="disabled" />
                </div>
              ),
              Author: (
                <div style={{display: 'flex', alignItems: 'center'}}>
                  <Avatar src={imgSrc} size="small" shape="circle" style={{ marginRight: '10px' }} />
                  <span>Teresa Smith</span>
                </div>
              ),
              Created: '25 May, 2020 15:32',
              'Last edited': '27 May, 2020 15:32',
              id: '3423-3426-8263-6634-6834-2352',
            }}
            contentTags={
              <Tags
                data={tags}
                tagShape={shape}
                selected={selected}
                disabled={disabled}
                addable={addable}
                creatable={creatable}
                removable={removable}
                overlayStyle={{ width: '283px', boxShadow: '0 4px 17px -3px rgba(191,191,191,1)' }}
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
            }
            textDescription=''
          ></SidebarObject>
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
};
