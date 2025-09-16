import React from 'react';

import { type TitleWithSortProps } from '../Table.types';
import createReplaceButtonsPortal from './replaceSortButtons';

export const TitleWithSort = <T,>({
  column,
  sortRender,
  titleProps,
  ...spanProps
}: TitleWithSortProps<T>): React.ReactElement => {
  const itemRef = React.useRef<HTMLSpanElement>(null);
  const ReplaceButtonsPortal = createReplaceButtonsPortal(
    itemRef.current,
    sortRender,
  );

  return (
    <>
      <span ref={itemRef} {...spanProps}>
        {typeof column.title === 'function'
          ? column.title(titleProps)
          : column.title}
      </span>
      <ReplaceButtonsPortal />
    </>
  );
};

export default TitleWithSort;
