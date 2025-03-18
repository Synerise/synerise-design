import React, { CSSProperties, PropsWithChildren, useCallback, MouseEvent } from 'react';

import ListItem, { ItemData, ListItemProps } from '@synerise/ds-list-item';

import { isTitle } from '../utils/typeguards.utils';
import * as S from '../ItemPickerList.styles';
import { ItemPickerListTexts, TitleListItemProps } from '../ItemPickerList.types';
import { InfiniteLoaderItem } from './InfiniteLoaderItem';

const INFINITE_LOADER_ITEM_HEIGHT = 48;

export type ItemPickerListRowProps = {
  index: number;
  style: CSSProperties;
  data: {
    dataSource: Array<ListItemProps | TitleListItemProps>;
    classNames: string;
    getItemSize: (index: number) => number;
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
  data: { dataSource, classNames, getItemSize, infiniteScroll, texts },
}: PropsWithChildren<ItemPickerListRowProps>) => {
  const listItem = dataSource[index];
  const lastItemHeight = getItemSize(dataSource.length - 1);
  const infiniteLoaderItem = useCallback(() => {
    if (infiniteScroll) {
      const { isLoading, hasMore, hasError } = infiniteScroll;
      const top = `${Number(style.top) + lastItemHeight}px`;
      if (isLoading || hasError || !hasMore) {
        return (
          <S.InfiniteLoaderItemWrapper
            style={{ ...style, top, height: `${INFINITE_LOADER_ITEM_HEIGHT}px`, padding: '6px 0' }}
          >
            <InfiniteLoaderItem hasMore={hasMore} isLoading={isLoading} hasError={hasError} texts={texts} />
          </S.InfiniteLoaderItemWrapper>
        );
      }
    }
    return null;
  }, [infiniteScroll, lastItemHeight, style, texts]);

  if (isTitle(listItem)) {
    return <S.Title style={style}>{listItem.text}</S.Title>;
  }
  return (
    <>
      <ListItem
        {...listItem}
        style={style}
        className={classNames}
        onClick={(eventData: ItemData<MouseEvent<HTMLDivElement>>) => {
          listItem.onClick && listItem.onClick(eventData);
        }}
      />
      {index === dataSource.length - 1 && infiniteLoaderItem()}
    </>
  );
};
