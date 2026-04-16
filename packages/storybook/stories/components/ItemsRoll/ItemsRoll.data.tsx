import React from 'react';
import { action } from 'storybook/actions';
import { v4 as uuid } from 'uuid';

import { ObjectAvatar } from '@synerise/ds-avatar';
import { theme } from '@synerise/ds-core';
import Icon, {
  Add3M,
  AggregateM,
  ExpressionM,
  FileDownloadM,
  FileTypeTableM,
  ParamsBadgeM,
} from '@synerise/ds-icon';
import InformationCard from '@synerise/ds-information-card';
import Tooltip from '@synerise/ds-tooltip';

export const SEARCH_PLACEHOLDER = 'Search...';
export const TEXT = 'Example item';

const infocard = (title: string, type: string) => () => (
  <InformationCard
    title={title}
    subtitle={type}
    propertyListItems={[
      { label: 'Created', value: '2026-03-15' },
      { label: 'Author', value: 'John Doe' },
      { label: 'Used in', value: '12 automations' },
    ]}
  />
);

export const hundredItems = Array.from(Array(100).keys());
export const thousandItems = Array.from(Array(1000).keys());

export const ITEMS_100 = hundredItems.map((key) => ({
  id: uuid(),
  text: `${TEXT}-${key}`,
  renderHoverTooltip: infocard(`${TEXT}-${key}`, 'Item'),
}));

const LARGE = 'large' as const;

export const ITEMS_LARGE = hundredItems.map((key) => ({
  id: uuid(),
  size: LARGE,
  prefixel: (
    <ObjectAvatar iconComponent={<Icon component={<ExpressionM />} />} />
  ),
  text: `${TEXT}-${key}`,
  renderHoverTooltip: infocard(`${TEXT}-${key}`, 'Large item'),
}));

export const ITEMS_1000 = thousandItems.map((key) => ({
  id: uuid(),
  text: `${TEXT}-${key}`,
  renderHoverTooltip: infocard(`${TEXT}-${key}`, 'Item'),
}));

const tenParams = Array.from(Array(13).keys()).map((key) => ({
  group: 'Parameter',
  id: uuid(),
  text: `Parameter-${key}`,
  prefixel: (
    <Tooltip title="Parameter">
      <div>
        <Icon
          component={<ParamsBadgeM />}
          size={20}
          color={theme.palette['red-600']}
        />
      </div>
    </Tooltip>
  ),
  renderHoverTooltip: infocard(`Parameter-${key}`, 'Parameter'),
}));

const tenAggregates = Array.from(Array(25).keys()).map((key) => ({
  group: 'Aggregate',
  id: uuid(),
  text: `Aggregate-${key}`,
  prefixel: (
    <Tooltip title="Aggregate">
      <div>
        <Icon
          component={<AggregateM />}
          size={20}
          color={theme.palette['red-600']}
        />
      </div>
    </Tooltip>
  ),
  renderHoverTooltip: infocard(`Aggregate-${key}`, 'Aggregate'),
}));

const tenExpressions = Array.from(Array(6).keys()).map((key) => ({
  group: 'Expression',
  id: uuid(),
  text: `Expression-${key}`,
  prefixel: (
    <Tooltip title="Expression">
      <div>
        <Icon
          component={<ExpressionM />}
          size={20}
          color={theme.palette['red-600']}
        />
      </div>
    </Tooltip>
  ),
  renderHoverTooltip: infocard(`Expression-${key}`, 'Expression'),
}));

export const GROUPED_ITEMS = {
  items: [...tenParams, ...tenAggregates, ...tenExpressions],
  groups: ['Parameter', 'Aggregate', 'Expression'],
};

export const ACTIONS = [
  {
    id: uuid(),
    onClick: action('OnImportClick'),
    text: 'Import',
    prefixel: (
      <Icon component={<FileTypeTableM />} color={theme.palette['grey-600']} />
    ),
  },
  {
    id: uuid(),
    onClick: action('OnExportClick'),
    text: 'Export',
    prefixel: (
      <Icon component={<FileDownloadM color={theme.palette['grey-600']} />} />
    ),
  },
];

export const ICONS = {
  default: undefined,
  add3M: <Add3M />,
};
