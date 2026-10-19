import React, {
  type CSSProperties,
  type PropsWithChildren,
  useCallback,
} from 'react';

import ListItem, { type ListItemProps } from '@synerise/ds-list-item';
import { getMeasuredRowStyle, useMeasuredRow } from '@synerise/ds-utils';

import type { ItemPickerListTexts } from '../../ItemPickerNew/types/itemPickerListTexts.types';
import * as S from '../ItemPickerList.styles';
import type { TitleListItemProps } from '../ItemPickerList.types';
import { isTitle } from '../utils/typeguards.utils';
import { InfiniteLoaderItem } from './InfiniteLoaderItem';

const INFINITE_LOADER_ITEM_HEIGHT = 48;

export type ItemPickerListRowProps = {
  index: number;
  style: CSSProperties;
  data: {
    dataSource: Array<ListItemProps | TitleListItemProps>;
    classNames: string;
    getItemSize: (index: number) => number;
    getEstimatedItemSize: (index: number) => number;
    measureRow: (index: number, height: number) => void;
    texts: ItemPickerListTexts;
    infiniteScroll?: {
      isLoading: boolean;
      hasMore: boolean;
      hasError: boolean;
    };
  };
};

export const ItemPickerListRow = ({
  index,
  style,
  data: {
    dataSource,
    classNames,
    getItemSize,
    getEstimatedItemSize,
    measureRow,
    infiniteScroll,
    texts,
  },
}: PropsWithChildren<ItemPickerListRowProps>) => {
  const listItem = dataSource[index];
  const rowRef = useMeasuredRow<HTMLDivElement>(index, measureRow);
  /**
   * react-window's offset moves onto this wrapper so the row inside is free to be taller
   * than the estimate — `size="auto"` rows are sized by their content. The estimate is the
   * floor, so a row also measures shorter again once its content does.
   */
  const rowStyle = getMeasuredRowStyle(style, getEstimatedItemSize(index));
  const lastItemHeight = getItemSize(dataSource.length - 1);
  const infiniteLoaderItem = useCallback(() => {
    if (infiniteScroll) {
      const { isLoading, hasMore, hasError } = infiniteScroll;
      const top = `${Number(style.top) + lastItemHeight}px`;
      if (isLoading || hasError || !hasMore) {
        return (
          <S.InfiniteLoaderItemWrapper
            style={{
              ...style,
              top,
              height: `${INFINITE_LOADER_ITEM_HEIGHT}px`,
              padding: '6px 0',
            }}
          >
            <InfiniteLoaderItem
              hasMore={hasMore}
              isLoading={isLoading}
              hasError={hasError}
              texts={texts}
            />
          </S.InfiniteLoaderItemWrapper>
        );
      }
    }
    return null;
  }, [infiniteScroll, lastItemHeight, style, texts]);

  if (isTitle(listItem)) {
    return (
      <div ref={rowRef} style={rowStyle}>
        <S.Title>{listItem.text}</S.Title>
      </div>
    );
  }
  return (
    <>
      <div ref={rowRef} style={rowStyle}>
        <ListItem {...listItem} className={classNames} />
      </div>
      {index === dataSource.length - 1 && infiniteLoaderItem()}
    </>
  );
};
