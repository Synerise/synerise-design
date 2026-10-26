import { useLayoutEffect, useRef, useState } from 'react';

import { useTableContext } from '../contexts/TableContext';

type UseExpandedRowMeasureProps = {
  index: number;
  enabled: boolean;
  hasExpandedContent: boolean;
  initialRowHeight: number;
};

// One virtual item covers a data row plus the expanded content row below it, so the
// virtualizer's measureElement (which sizes an item from a single element) cannot measure it.
export const useExpandedRowMeasure = ({
  index,
  enabled,
  hasExpandedContent,
  initialRowHeight,
}: UseExpandedRowMeasureProps) => {
  const { rowVirtualizer } = useTableContext();
  const rowRef = useRef<HTMLTableRowElement>(null);
  const contentRef = useRef<HTMLTableRowElement>(null);
  const [rowHeight, setRowHeight] = useState(initialRowHeight);

  // biome-ignore lint/correctness/useExhaustiveDependencies: hasExpandedContent re-runs the effect when the content row mounts or unmounts
  useLayoutEffect(() => {
    const row = rowRef.current;
    if (!enabled || !rowVirtualizer || !row) {
      return undefined;
    }
    const content = contentRef.current;

    const measure = () => {
      const measuredRowHeight = row.offsetHeight;
      setRowHeight(measuredRowHeight);
      rowVirtualizer.resizeItem(
        index,
        measuredRowHeight + (content?.offsetHeight ?? 0),
      );
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(row);
    if (content) {
      observer.observe(content);
    }
    return () => observer.disconnect();
  }, [enabled, hasExpandedContent, index, rowVirtualizer]);

  return { rowRef, contentRef, rowHeight };
};
