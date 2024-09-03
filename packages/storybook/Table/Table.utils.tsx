import React, { ReactNode } from 'react';
import { IconProps } from '@synerise/ds-icon';
import { IconTooltipCell } from '@synerise/ds-table/dist/Cell';

import TooltipExtendedProps from '@synerise/ds-tooltip/dist/Tooltip.types';
import { theme } from '@synerise/ds-core';

export type Column = {
  title: ReactNode;
  key: string;
  dataIndex: string;
  width: string | number;
  sorter: Function;
  render: Function;
  icon: IconProps;
  tooltip: TooltipExtendedProps;
  iconTooltip: IconProps;
};

const renderAlertTooltip = (title: ReactNode, description: ReactNode) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        color: theme.palette['grey-200'],
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          fontWeight: 500,
          marginBottom: '2px',
        }}
      >
        <span>{title}</span>
      </div>
      <div style={{ width: '100%', display: 'flex', alignItems: 'center' }}>{description}</div>
    </div>
  );
};

export const renderWithIconInHeaders = (columns: Partial<Column>[]) => {
  return columns.map(col => ({
    ...col,
    title: (
      <IconTooltipCell
        label={col.title}
        icon={col.icon}
        tooltipIcon={col.iconTooltip}
        tooltip={
          col.iconTooltip && {
            ...col.tooltip,
            type: 'largeSimple',
            offset: 'small',
            description: renderAlertTooltip('FieldID', 'Lorem ipsum'),
          }
        }
      />
    ),
    width: col.width,
  }));
};
