import {
  type MutableRefObject,
  useCallback,
  useLayoutEffect,
  useState,
} from 'react';

import { useDebounce, useResizeObserver } from '@synerise/ds-utils';
import { type ColumnSizingState } from '@tanstack/react-table';

import { calculatePixels } from '../utils/calculatePixels';

type UseColumnSizingProps = {
  columnWidths: {
    id: string;
    minWidth?: number;
    width?: number;
    maxWidth?: number;
  }[];
  wrapperRef: MutableRefObject<HTMLDivElement | null>;
  enabled?: boolean;
};
export const useColumnSizing = ({
  wrapperRef,
  columnWidths,
  enabled = true,
}: UseColumnSizingProps) => {
  const [columnSizing, setColumnSizing] = useState<ColumnSizingState>({});
  const [isColumnSizingReady, setIsColumnSizingReady] = useState(!enabled);

  const calc = useCallback(
    (availableWidth: number) => {
      if (!enabled) {
        return;
      }
      const calculatedWidths = calculateWidths(columnWidths, availableWidth);
      const sizing: Record<string, number> = {};
      columnWidths.forEach((_col, index) => {
        const colWidthId = `col-${index}`;
        sizing[colWidthId] = calculatedWidths[index];
      });
      setColumnSizing(sizing);
      setIsColumnSizingReady(true);
    },
    [columnWidths, enabled],
  );

  const debouncedCalc = useDebounce(calc, 500);

  const getContentWidth = useCallback((element: HTMLDivElement) => {
    const { paddingLeft, paddingRight } = getComputedStyle(element);
    return (
      element.clientWidth - parseFloat(paddingLeft) - parseFloat(paddingRight)
    );
  }, []);

  const resizeHandler = useCallback(() => {
    if (!enabled) {
      return;
    }
    if (wrapperRef.current?.clientWidth) {
      debouncedCalc(getContentWidth(wrapperRef.current));
    }
  }, [enabled, debouncedCalc, getContentWidth, wrapperRef]);

  useLayoutEffect(() => {
    if (!enabled) {
      setColumnSizing({});
      setIsColumnSizingReady(true);
      return;
    }
    if (wrapperRef.current) {
      calc(getContentWidth(wrapperRef.current));
    }
  }, [enabled, calc, getContentWidth, wrapperRef]);

  useResizeObserver(wrapperRef, resizeHandler);

  return { columnSizing, setColumnSizing, isColumnSizingReady };
};

export const calculateWidths = (
  columns: { width?: number; maxWidth?: number; minWidth?: number }[],
  availableSpace: number,
) => {
  let baseSum = 0;
  let flexibleColumnCount = 0;
  let noMaxColumnCount = 0;

  const baseWidths = columns.map((column) => {
    const baseWidth = calculatePixels(column.width || column.minWidth) || 0;

    flexibleColumnCount += Number(!column.width);
    noMaxColumnCount += Number(!column.width && !column.maxWidth);
    baseSum += baseWidth;

    return baseWidth;
  });

  if (!flexibleColumnCount) {
    return baseWidths;
  }

  if (baseSum < availableSpace) {
    // split remaining space across columns with minWidth
    const extraWidth = (availableSpace - baseSum) / flexibleColumnCount;
    let interimSum = 0;
    columns.forEach((column, index) => {
      if (!column.width) {
        const maxWidthAsNumber = calculatePixels(column.maxWidth);
        baseWidths[index] = maxWidthAsNumber
          ? Math.min(maxWidthAsNumber, baseWidths[index] + extraWidth)
          : baseWidths[index] + extraWidth;
      }
      interimSum += baseWidths[index];
    });

    if (interimSum < availableSpace) {
      // split the remainder across columns with no maxWidth
      const extraWidth2 = (availableSpace - interimSum) / noMaxColumnCount;
      columns.forEach((column, index) => {
        if (!column.width && !column.maxWidth) {
          baseWidths[index] += extraWidth2;
        }
      });
    }
  }
  return baseWidths;
};
