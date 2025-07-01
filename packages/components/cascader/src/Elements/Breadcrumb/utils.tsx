import type { RefObject } from 'react';

export const attachActiveClassName = (
  index: number,
  highlightActivePath: boolean,
  path: Array<string>,
  compact: boolean,
) => {
  if (compact) {
    return highlightActivePath && index === 0 ? 'active' : '';
  }
  return highlightActivePath && index === path.length - 1 ? 'active' : '';
};

export const shouldRenderArrow = (
  breadCrumbPath: string[],
  index: number,
  startWithArrow: boolean,
) => {
  if (!breadCrumbPath || !breadCrumbPath.length) {
    return false;
  }
  const nextBreadcrumb = breadCrumbPath[index + 1];
  if (!nextBreadcrumb) {
    return startWithArrow;
  }
  return true;
};

export const shouldHaveArrowPlaceholder = (
  index: number,
  path: string[],
  compact: boolean,
  startWithArrow: boolean,
) => {
  if (compact) {
    return startWithArrow || (index < path.length - 1 && path.length > 1);
  }
  return startWithArrow || path.length > 1 || index > 0;
};

export const isOverflown = (elementRef: RefObject<HTMLDivElement>) => {
  if (elementRef !== null && elementRef.current !== null) {
    const element = elementRef.current;
    return element.scrollWidth > element.clientWidth;
  }
  return false;
};
