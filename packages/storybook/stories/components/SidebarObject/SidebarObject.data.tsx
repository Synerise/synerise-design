import React, { useState } from 'react';

import Button from '@synerise/ds-button';
import { theme } from '@synerise/ds-core';
import Icon, { ArrowLeftM, StarFillM, StarM } from '@synerise/ds-icon';
import { ContentItem } from '@synerise/ds-manageable-list';
import Tooltip from '@synerise/ds-tooltip';
import Drawer from '@synerise/ds-drawer';
import Status from '@synerise/ds-status';
import { UserAvatar } from '@synerise/ds-avatar';

import { avatar1 } from '../../constants';

export const TEXTS = {
  name: 'DescriptionInput',
  inlineEditPlaceholder: 'Campaign Name',
  editIcon: 'Edit',
  deleteIcon: 'Delete',
  duplicateIcon: 'Duplicate',
  moveIcon: 'Move to',
  cancelButton: 'Cancel',
  applyButton: 'Apply',
};

export const BackIcon = ({ onBackClickHandler }) => {
  return (
    <Drawer.DrawerHeaderBack>
      <Button type="ghost" mode="single-icon" onClick={onBackClickHandler} data-testid="ds-item-filter-close-button">
        <Icon component={<ArrowLeftM />} />
      </Button>
    </Drawer.DrawerHeaderBack>
  );
};

export const StarPrefix = () => {
  const [starred, setStarred] = useState(false);
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
};

const renderVersionList = [...new Array(30)].map((v, i) => (
  <ContentItem item={{ id: `${i}`, name: `Version: 0.0.${i}` }} />
));

export const TABS = [
  {
    label: 'Overview',
    content: <div style={{ height: '340px' }}></div>,
  },
  {
    label: 'Changelog',
  },
  {
    label: 'Versions',
    content: <div style={{ flexGrow: 1 }}>{renderVersionList}</div>,
  },
];

export const DATA = [
  { id: '2', name: 'Example folder' },
  { id: '1', name: 'Winter' },
  { id: '3', name: 'Summer' },
  { id: '4', name: 'Drafts' },
  { id: '5', name: 'Archived' },
];

export const OVERVIEW_TEXTS = {
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

export const OVERVIEW_INPUT_OBJECT = {
  'Type:': 'Email campaign',
  Status: (
    <div>
      <Status label="Draft" type="disabled" />
    </div>
  ),
  Author: (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <UserAvatar src={avatar1} size="small" badgeStatus="active" style={{ marginRight: '10px' }} />
      <span>Teresa Smith</span>
    </div>
  ),
  Created: '25 May, 2020 15:32',
  'Last edited': '27 May, 2020 15:32',
  id: '3423-3426-8263-6634-6834-2352',
};

export const ALL_TAGS = [
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
