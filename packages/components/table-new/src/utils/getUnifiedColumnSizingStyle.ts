import { type CSSProperties } from 'react';

import { type Column } from '@tanstack/react-table';

const toCssLength = (
  v: number | string | undefined | null,
): string | undefined => {
  if (v === undefined || v === null) {
    return undefined;
  }
  return typeof v === 'number' ? `${v}px` : v;
};

const positiveOrUndefined = (v: number | undefined): number | undefined =>
  typeof v === 'number' && v > 0 ? v : undefined;

// Derives width / minWidth / maxWidth from a column's user-set sizing for
// unified-content mode (colgroup-based layout). Widths come from two surfaces:
// meta.{width,minWidth,maxWidth} (populated by legacyColumnConfigAdapter) and
// the native ColumnDef.{size,minSize,maxSize} fields. useTable overrides
// TanStack's defaultColumn so those only appear when the consumer set them;
// the adapter writes size: 0 for unset widths, hence the positive-only filter.
//
// When only width is set, the value is mirrored onto min/max so the column
// stays pinned at that size — otherwise content can still stretch the cell
// past the colgroup hint under table-layout: auto.
export const getUnifiedColumnSizingStyle = <TData, TValue>(
  column: Column<TData, TValue>,
): CSSProperties => {
  const meta = column.columnDef.meta;
  const widthRaw = meta?.width ?? positiveOrUndefined(column.columnDef.size);
  const minWidthRaw =
    meta?.minWidth ?? positiveOrUndefined(column.columnDef.minSize);
  const maxWidthRaw =
    meta?.maxWidth ?? positiveOrUndefined(column.columnDef.maxSize);
  const width = toCssLength(widthRaw);
  const minWidth = toCssLength(minWidthRaw ?? widthRaw);
  const maxWidth = toCssLength(maxWidthRaw ?? widthRaw);
  const style: CSSProperties = {};
  if (width !== undefined) {
    style.width = width;
  }
  if (minWidth !== undefined) {
    style.minWidth = minWidth;
  }
  if (maxWidth !== undefined) {
    style.maxWidth = maxWidth;
  }
  return style;
};
