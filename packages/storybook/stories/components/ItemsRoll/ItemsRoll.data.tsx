import React from 'react';
import { action } from 'storybook/actions';
import { v4 as uuid } from 'uuid';

import Icon, { FileTypeTableM, FileDownloadM, ExpressionM, AggregateM, ParamsBadgeM, Add3M } from '@synerise/ds-icon';
import Tooltip from '@synerise/ds-tooltip';
import { theme } from '@synerise/ds-core';

export const SEARCH_PLACEHOLDER = 'Search...';
export const TEXT = 'Example item';

export const hundredItems = Array.from(Array(100).keys());
export const thousandItems = Array.from(Array(1000).keys());

export const ITEMS_100 = hundredItems.map(key => ({
  id: uuid(),
  text: `${TEXT}-${key}`,
}));

export const ITEMS_1000 = thousandItems.map(key => ({
  id: uuid(),
  text: `${TEXT}-${key}`,
}));

const tenParams = Array.from(Array(13).keys()).map(key => ({
  group: 'Parameter',
  id: uuid(),
  text: `Parameter-${key}`,
  prefixel: (
    <Tooltip title="Parameter">
      <div>
        <Icon component={<ParamsBadgeM />} size={20} color={theme.palette['red-600']} />
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
        <Icon component={<AggregateM />} size={20} color={theme.palette['red-600']} />
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
        <Icon component={<ExpressionM />} size={20} color={theme.palette['red-600']} />
      </div>
    </Tooltip>
  ),
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
    prefixel: <Icon component={<FileTypeTableM />} color={theme.palette['grey-600']} />,
  },
  {
    id: uuid(),
    onClick: action('OnExportClick'),
    text: 'Export',
    prefixel: <Icon component={<FileDownloadM color={theme.palette['grey-600']} />} />,
  },
];

export const ICONS = {
  default: undefined,
  add3M: <Add3M />,
};
