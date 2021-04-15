import * as React from 'react';
import * as ReactDOM from 'react-dom';

const createReplaceButtonsPortal = <T extends Element>(
  columnTitleElement: T | null,
  newButtonsNode: React.ReactNode
) => (): React.ReactPortal | null => {
  const sortContainerElem = columnTitleElement?.parentElement?.nextSibling as T;

  if (!sortContainerElem) {
    return null;
  }

  const sortInnerElem = sortContainerElem.querySelector('.ant-table-column-sorter-inner');

  if (sortInnerElem) {
    sortContainerElem.removeChild(sortInnerElem);
  }

  return ReactDOM.createPortal(newButtonsNode, sortContainerElem);
};

export default createReplaceButtonsPortal;
