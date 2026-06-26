export type PageItem = number | 'jump-prev' | 'jump-next';

/**
 * The page-item list, mirroring antd/rc-pagination: when there are few pages they are all shown;
 * otherwise a window of `buffer` pages around `current` is shown, with the first/last page pinned
 * and `jump-prev` / `jump-next` ellipsis controls filling the gaps.
 */
export const getPages = (
  current: number,
  totalPages: number,
  showLessItems = false,
): PageItem[] => {
  const buffer = showLessItems ? 1 : 2;

  if (totalPages <= 5 + buffer * 2) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  let left = Math.max(1, current - buffer);
  let right = Math.min(current + buffer, totalPages);

  if (current - 1 <= buffer) {
    right = 1 + buffer * 2;
  }
  if (totalPages - current <= buffer) {
    left = totalPages - buffer * 2;
  }

  const items: PageItem[] = [];

  if (left > 1) {
    items.push(1);
    if (left > 2) {
      items.push('jump-prev');
    }
  }
  for (let page = left; page <= right; page += 1) {
    items.push(page);
  }
  if (right < totalPages) {
    if (right < totalPages - 1) {
      items.push('jump-next');
    }
    items.push(totalPages);
  }

  return items;
};

/** How many pages a jump-prev / jump-next control skips. */
export const getJumpSize = (showLessItems = false): number =>
  (showLessItems ? 1 : 2) * 2 + 1;
