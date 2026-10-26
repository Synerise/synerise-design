type IsItemAboveScrollViewportProps = {
  itemStart: number;
  bodyElement: Element;
  scrollElement: Element;
  rowOffset?: number;
};

// The virtualizer measures item offsets from the top of the table body, not from the top of the
// scroll element, so its default check misses whatever precedes the body (title bar, column
// headers, a page header when scrolling an outer container).
export const isItemAboveScrollViewport = ({
  itemStart,
  bodyElement,
  scrollElement,
  rowOffset = 0,
}: IsItemAboveScrollViewportProps): boolean => {
  const bodyTop =
    bodyElement.getBoundingClientRect().top -
    scrollElement.getBoundingClientRect().top;
  return bodyTop + rowOffset + itemStart < 0;
};
