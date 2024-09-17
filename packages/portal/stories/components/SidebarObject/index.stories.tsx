import React from 'react';
import SidebarObject from '@synerise/ds-sidebar-object';
import { boolean, select } from '@storybook/addon-knobs';
import Button from '@synerise/ds-button';
import Drawer from '@synerise/ds-drawer';
import Icon, { ArrowLeftM , MailS, MailM, StarFillM, StarM } from '@synerise/ds-icon';
import { theme } from '@synerise/ds-core';
import { UserAvatar, ObjectAvatar } from '@synerise/ds-avatar';
import Status from '@synerise/ds-status';
import Tags, { TagShape } from '@synerise/ds-tags';
import { v4 as uuid } from 'uuid';
import Overview from '@synerise/ds-sidebar-object/dist/Elements/Overview/Overview';
import { ButtonWrapper } from '@synerise/ds-sidebar-object/dist/Elements/Header/Header.style';
import Tooltip from '@synerise/ds-tooltip';

import ContentItem from '@synerise/ds-manageable-list/dist/Item/ContentItem/ContentItem';
import Menu from '@synerise/ds-menu';

const getColor = name => {
  return theme.palette[name];
};
const getIconSize = size => {
  return size === 'small' ? <MailS /> : <MailM />;
};

const allTags = [
  {
    id: 0,
    name: 'Summer',
    color: theme.palette['grey-200'],
  },
  {
    id: 1,
    name: 'Customer Service PL',
    color: theme.palette['grey-200'],
  },
  {
    id: 2,
    name: 'Tag Name 3',
    color: theme.palette['grey-200'],
  },
  {
    id: 3,
    name: 'Tag Name 4',
    color: theme.palette['grey-200'],
  },
];

const imgSrc = 'https://www.w3schools.com/howto/img_avatar.png';

const headerTypes = {
  readonly: 'readonly',
  editable: 'editable',
};
const buttonTypes = {
  twoButtons: 'twoButtons',
  withNavigation: 'withNavigation',
};

const renderBackIcon = (showBackIcon, onBackClickHandler) => {
  if (showBackIcon) {
    return (
      <Drawer.DrawerHeaderBack>
        <Button type="ghost" mode="single-icon" onClick={onBackClickHandler} data-testid="ds-item-filter-close-button">
          <Icon component={<ArrowLeftM />} />
        </Button>
      </Drawer.DrawerHeaderBack>
    );
  } else return null;
};
const renderStarred = showStarred => {
  const [starred, setStarred] = React.useState(false);
  if (showStarred) {
    return (
      <div style={{ marginRight: '10px' }}>
        <Tooltip align={{ offset: [0, 5] }} title="Starred">
          <Button
            iconColor={starred ? theme.palette['yellow-600'] : theme.palette['grey-600']}
            type="ghost"
            mode="single-icon"
            onClick={() => {
              setStarred(!starred);
            }}
          >
            <Icon
              component={starred ? <StarFillM /> : <StarM />}
              color={starred ? theme.palette['yellow-600'] : theme.palette['grey-600']}
            />
          </Button>
        </Tooltip>
      </div>
    );
  } else return null;
};

const renderVersionList = [...new Array(30)].map((v, i) => (
  <ContentItem item={{ id: `${i}`, name: `Version: 0.0.${i}` }} />
));

const stories = {
  default: () => {
    const [drawerVisible, setDrawerVisible] = React.useState(false);
    const showIcon = boolean('Set Icon', true);
    const showStarred = boolean('Set starred icon', false);
    const showBackIcon = boolean('Set back icon', false);
    const showTabs = boolean('Set Tabs', true);
    const showFooter = boolean('Set Footer', true);
    const [activeTab, setActiveTab] = React.useState(0);
    const [name, setName] = React.useState('Winter campaign');
    let headerType = select('Set header type', headerTypes, headerTypes.readonly);
    let buttonsType = select('Set buttons type', buttonTypes, buttonTypes.withNavigation);
    const inputObject = {
      id: '3423-3426-8263-6634-6834-2352',
    };
    const texts = {
      name: 'DescriptionInput',
      inlineEditPlaceholder: 'Campaign Name',
      editIcon: 'Edit',
      deleteIcon: 'Delete',
      duplicateIcon: 'Duplicate',
      moveIcon: 'Move to',
      cancelButton: 'Cancel',
      applyButton: 'Apply',
    };

    const TABS = [
      {
        label: 'Overview',
        content: <div style={{ height: '340px' }}></div>,
      },
      {
        label: 'Changelog',
      },
      {
        label: 'Versions',
        content: <Menu>{renderVersionList}</Menu>,
      },
    ];
    return (
      <div>
        <Button onClick={() => setDrawerVisible(!drawerVisible)} type="primary">
          Sidebar Object
        </Button>
        <Drawer visible={drawerVisible} placement="right" width={676} onClose={() => setDrawerVisible(false)}>
          <SidebarObject
            avatar={
              <ObjectAvatar 
                color={'pink'}
                iconComponent={<Icon color={getColor('pink-600')} component={getIconSize('large')} />}
                badgeStatus={'inactive'}
              />
            }
            onCloseClick={() => setDrawerVisible(false)}
            onApplyClick={() => {}}
            onCancelClick={() => {}}
            texts={texts}
            headerPreffix={renderStarred(showStarred) || renderBackIcon(showBackIcon, () => setDrawerVisible(false))}
            onArrowUp={showIcon ? () => {} : null}
            onArrowDown={showIcon ? () => {} : null}
            onEdit={() => {}}
            onDuplicate={() => {}}
            onMove={() => {}}
            onDelete={() => {}}
            onId={() => {}}
            headerTabs={showTabs ? TABS : []}
            activeTab={activeTab}
            handleTabClick={setActiveTab}
            inputObject={inputObject}
            name={name}
            headerType={headerType}
            typeButtons={buttonsType}
            onRename={setName}
            footer={
              showFooter ? (
                <>
                  <ButtonWrapper style={{ flex: 1, padding: '0' }}>
                    <Button type="secondary"> Settings </Button>
                  </ButtonWrapper>
                  <ButtonWrapper style={{ padding: '0px 8px 0px 0' }}>
                    <Button type="ghost"> Cancel </Button>
                  </ButtonWrapper>
                  <ButtonWrapper style={{ padding: '0' }}>
                    <Button type="primary"> Apply </Button>
                  </ButtonWrapper>
                </>
              ) : null
            }
          ></SidebarObject>
        </Drawer>
      </div>
    );
  },
  campaign: () => {
    const [drawerVisible, setDrawerVisible] = React.useState(false);
    const [tags, setTags] = React.useState<Array<any>>(allTags);
    const [selected, setSelected] = React.useState<Array<any>>(allTags.slice(0, 2));
    const [description, setDescription] = React.useState('');
    const shapes = {
      'Default Round': TagShape.DEFAULT_ROUND,
      'Default Square': TagShape.DEFAULT_SQUARE,
    };
    const shape = select('Shape', shapes, shapes['Default Round']);
    const showStarred = boolean('Set starred icon', false);
    const removable = boolean('Ability to remove', true);
    const addable = boolean('Ability to add', true);
    const creatable = boolean('Ability to create', true);
    const withManageLink = boolean('With manage tags link', true);
    const disabled = boolean('Disable entire tag group', false);
    const [activeTab, setActiveTab] = React.useState(0);
    const showIcon = boolean('Set Icon', true);
    const showFolder = boolean('Set Folder', true);
    const [name, setName] = React.useState('Winter campaign');
    const data = [
      { id: '2', name: 'Example folder' },
      { name: 'Winter' },
      { name: 'Summer' },
      { name: 'Drafts' },
      { name: 'Archived' },
    ];
    let headerType = select('Set header type', headerTypes, headerTypes.readonly);
    let buttonsType = select('Set buttons type', buttonTypes, buttonTypes.withNavigation);
    const parentFolder = { id: '2', name: 'Example folder' };
    const autoSize = { minRows: 3, maxRows: 10 };
    const inputObject = {
      'Type:': 'Email campaign',
      Status: (
        <div>
          <Status label="Draft" type="disabled" />
        </div>
      ),
      Author: (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <UserAvatar src={imgSrc} size="small" badgeStatus="active" style={{marginRight: '10px'}} />
          <span>Teresa Smith</span>
        </div>
      ),
      Created: '25 May, 2020 15:32',
      'Last edited': '27 May, 2020 15:32',
      id: '3423-3426-8263-6634-6834-2352',
    };
    const texts = {
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
      cancelButton: 'Cancel',
      applyButton: 'Apply',
      addFolder: 'Add folder',
    };
    const contentTags = (
      <Tags
        data={tags}
        tagShape={shape}
        selected={selected}
        disabled={disabled}
        addable={addable && !disabled}
        creatable={creatable}
        removable={removable}
        overlayStyle={{ width: '283px' }}
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
            color: theme.palette['grey-200'],
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
    );
    const TABS = [
      {
        label: 'Overview',
        content: (
          <Overview
            contentTags={contentTags}
            folders={data}
            parentFolder={parentFolder}
            onDescriptionChange={setDescription}
            textDescription={description}
            onFolderSelect={showFolder}
            autoSize={autoSize}
            texts={texts}
            inputObject={inputObject}
            onAddFolderClick={() => {}}
          />
        ),
      },
      {
        label: 'Changelog',
      },
      {
        label: 'Versions',
      },
    ];
    return (
      <div>
        <Button onClick={() => setDrawerVisible(!drawerVisible)} type="primary">
          Sidebar Object
        </Button>
        <Drawer visible={drawerVisible} placement="right" width={676} onClose={() => setDrawerVisible(false)}>
          <SidebarObject
            avatar={
              <ObjectAvatar 
                color={'pink'}
                iconComponent={<Icon color={getColor('pink-600')} component={getIconSize('large')} />}
                badgeStatus={'inactive'}
              />
            }
            onCloseClick={() => setDrawerVisible(false)}
            headerPreffix={renderStarred(showStarred)}
            autoSize={autoSize}
            folders={data}
            parentFolder={parentFolder}
            texts={texts}
            onArrowUp={showIcon ? () => {} : null}
            onArrowDown={showIcon ? () => {} : null}
            onFolderSelect={showFolder}
            onEdit={undefined}
            onDuplicate={undefined}
            onMove={undefined}
            onDelete={undefined}
            onId={() => {}}
            headerTabs={TABS}
            inputObject={inputObject}
            activeTab={activeTab}
            handleTabClick={setActiveTab}
            name={name}
            headerType={headerType}
            typeButtons={buttonsType}
            onRename={setName}
            contentTags={contentTags}
            textDescription=""
            footer={null}
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
