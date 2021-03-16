import * as React from 'react';
import { DSColumnType } from '../Table.types';
import createReplaceButtonsPortal from './replaceSortButtons';
import { SortStateAPI } from './useSortState';

export type SortButtonsRenderer<T> = (sortStateApi: SortStateAPI, column: DSColumnType<T>) => React.ReactElement;

export type SortRender<T> = 'default' | 'string' | SortButtonsRenderer<T>;

export interface TitleWithSortOwnProps<T> {
  column: DSColumnType<T>;
  sortRender: React.ReactElement;
}

export type TitleWithSortProps<T> = TitleWithSortOwnProps<T> & React.ComponentPropsWithoutRef<'span'>;

export const TitleWithSort = <T extends unknown>({
  column,
  sortRender,
  ...spanProps
}: TitleWithSortProps<T>): React.ReactElement => {
  const itemRef = React.useRef<HTMLSpanElement>(null);
  const ReplaceButtonsPortal = createReplaceButtonsPortal(itemRef.current, sortRender);

  return (
    <>
      {/* TODO: column.title may be a function */}
      <span ref={itemRef} {...spanProps}>
        {column.title}
      </span>
      <ReplaceButtonsPortal />
    </>
  );
};

export default TitleWithSort;
