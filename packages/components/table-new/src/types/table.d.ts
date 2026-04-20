import { type CellContext, type HeaderContext, type RowData, type ColumnDefTemplate } from '@tanstack/react-table';
import type { TooltipProps } from '@synerise/ds-tooltip';

import { type CSSProperties, type ReactNode } from 'react';


declare module '@tanstack/react-table' {
  interface ColumnMeta<TData extends RowData, TValue> {
    minWidth?: number | string;
    maxWidth?: number | string;
    width?: number | string;
    fixed?: 'left' | 'right';
    align?: 'left' | 'center' | 'right';
    style?: CSSProperties<HTMLTableHeaderCellElement>;
    sortRender?: 'string' | 'default';
    sortOrder?: 'ascend' | 'descend' | null;
    renderCustomSortButton?: (
      headerContext: HeaderContext<TData, TValue>,
    ) => ReactNode;
    childCell?: ColumnDefTemplate<CellContext<TData, TValue>>;
    skeletonCell?: () => ReactNode;
    dataIndex?: string;
    title?: string;
    enableMultiSort?: boolean;
    /**
     * Returns tooltip props for cells in this column, or false to disable tooltip.
     * When provided, the cell content is wrapped in a Tooltip component.
     */
    getCellTooltipProps?: (row: TData) => TooltipProps | false;
  }
}

