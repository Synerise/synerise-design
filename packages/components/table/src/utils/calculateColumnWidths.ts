import { type VirtualColumnType } from '../VirtualTable/VirtualTable.types';
import { calculatePixels } from './calculatePixels';

export const calculateColumnWidths = <T extends object>(
  columns: VirtualColumnType<T>[],
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
        baseWidths[index] =
          maxWidthAsNumber !== undefined
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
