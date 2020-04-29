import * as React from 'react';
import styled from 'styled-components';
import { v4 as uuid } from 'uuid';
import Icon from '@synerise/ds-icon';
import {
  CloseS,
  FileTypeTableM,
  FileDownloadM,
  UserM,
  ExpressionM,
  AggregateM,
  ParamsBadgeM,
} from '@synerise/ds-icon/dist/icons';
import { text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import Tooltip from '@synerise/ds-tooltip/dist/Tooltip';

export const SEARCH_PLACEHOLDER = 'Search...';

export const TEXT = 'Example item';

export const hundredItems = Array.from(Array(100).keys());
export const thousandItems = Array.from(Array(1000).keys());

export const ITEMS_100 = hundredItems.map(key => ({
  id: uuid(),
  text: `${TEXT}-${key}`,
  suffixel: (
    <Tooltip title="Remove">
      <div>
        <Icon onClick={() => alert('Item deleted')} component={<CloseS />} size={20} color="#f52922" />
      </div>
    </Tooltip>
  ),
}));

export const ITEMS_1000 = thousandItems.map(key => ({
  id: uuid(),
  text: `${TEXT}-${key}`,
  suffixel: (
    <Tooltip title="Remove">
      <div>
        <Icon onClick={() => alert('Item deleted')} component={<CloseS />} size={20} color="#f52922" />
      </div>
    </Tooltip>
  ),
}));

const tenParams = Array.from(Array(13).keys()).map(key => ({
  group: 'Parameter',
  id: uuid(),
  text: `Parameter-${key}`,
  prefixel: (
    <Tooltip title="Parameter">
      <div>
        <Icon component={<ParamsBadgeM />} size={20} color="#f52922" />
      </div>
    </Tooltip>
  ),
}));

const tenAggregates = Array.from(Array(25).keys()).map(key => ({
  group: 'Aggregate',
  id: uuid(),
  text: `Aggregate-${key}`,
  prefixel: (
    <Tooltip title="Aggregate">
      <div>
        <Icon component={<AggregateM />} size={20} color="#f52922" />
      </div>
    </Tooltip>
  ),
}));

const tenExpressions = Array.from(Array(6).keys()).map(key => ({
  group: 'Expression',
  id: uuid(),
  text: `Expression-${key}`,
  prefixel: (
    <Tooltip title="Expression">
      <div>
        <Icon component={<ExpressionM />} size={20} color="#f52922" />
      </div>
    </Tooltip>
  ),
}));

export const GROUPED_ITEMS = {
  items: [...tenParams, ...tenAggregates, ...tenExpressions],
  groups: ['Parameter', 'Aggregate', 'Expression'],
};

export const getTexts = () => ({
  changeSelectionLabel: text('Change selection label', 'Change selection'),
  clearAllLabel: text('Clear all label', 'Clear all'),
  itemsLabel: text('Items label', 'Items'),
  lessLabel: text('Less label', 'Show less'),
  moreLabel: text('More label', 'more'),
  removeTooltipLabel: text('More label', 'Remove'),
  searchClearTooltipLabel: text('Search clear tooltip', 'Clear'),
  showLabel: text('Show less label', 'Show'),
});

export const ACTIONS = [
  {
    id: uuid(),
    onClick: action('OnImportClick'),
    text: 'Import',
    prefixel: <Icon component={<FileTypeTableM />} />,
  },
  {
    id: uuid(),
    onClick: action('OnExportClick'),
    text: 'Export',
    prefixel: <Icon component={<FileDownloadM />} />,
  },
];

const AfterClearWrapper = styled.div`
  height: 278px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-bottom: 24px;
  background: #e9edee;
`;

export const AfterClearInfo = () => (
  <AfterClearWrapper>
    <IconWrapper>
      <Icon component={<UserM />} color="#6a7580" size={28} />
    </IconWrapper>
    <div>Select attributes to export user data</div>
  </AfterClearWrapper>
);

export const onChangeSelectionOptions = {
  function: () => alert(`onChangeSelection is fired 🔥`),
  none: undefined,
};

export const actionsSelectOptions = {
  actions: ACTIONS,
  none: undefined,
};

export const groupOptions = {
  yes: GROUPED_ITEMS.groups,
  no: undefined,
};

export const DEFAULT_STATE = {
  items: ITEMS_100,
  searchValue: '',
  componentVisible: true,
};

export const DEFAULT_STATE_VIRTUALIZED = {
  ...DEFAULT_STATE,
  items: ITEMS_1000,
};

export const DEFAULT_GROUPED_STATE = {
  searchValue: '',
  componentVisible: true,
  items: GROUPED_ITEMS.items,
};
