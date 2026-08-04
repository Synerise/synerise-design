/**
 * How many toolbar items fit into `availableWidth`. When they all fit, returns
 * `itemWidths.length`; otherwise reserves `reservedWidth` for the "more"
 * button and returns the number of leading items that still fit next to it.
 */
export const computeVisibleCount = (
  itemWidths: number[],
  availableWidth: number,
  reservedWidth: number,
): number => {
  const total = itemWidths.reduce((acc, width) => acc + width, 0);
  if (total <= availableWidth) {
    return itemWidths.length;
  }
  let used = reservedWidth;
  let count = 0;
  for (const width of itemWidths) {
    if (used + width > availableWidth) {
      break;
    }
    used += width;
    count += 1;
  }
  return count;
};
