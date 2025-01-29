import type { ReactPortal, ReactNode } from 'react';
import { createPortal } from 'react-dom';

const createReplaceButtonsPortal =
  <T extends Element>(columnTitleElement: T | null, newButtonsNode: ReactNode) =>
  (): ReactPortal | null => {
    const sortContainerElem = columnTitleElement?.parentElement?.nextSibling as T;

    if (!sortContainerElem) {
      return null;
    }

    const sortInnerElem = sortContainerElem.querySelector('.ant-table-column-sorter-inner');

    if (sortInnerElem) {
      sortContainerElem.removeChild(sortInnerElem);
    }

    return createPortal(newButtonsNode, sortContainerElem);
  };

export default createReplaceButtonsPortal;
