import React, { CSSProperties, UIEvent, useMemo, useRef, useState } from 'react';
import type { FixedSizeList } from 'react-window';
import { DragOverlay } from '@dnd-kit/core';

import { SortableContainer } from '@synerise/ds-sortable';
import Scrollbar from '@synerise/ds-scrollbar';
import Result from '@synerise/ds-result';
import { useResizeObserver } from '@synerise/ds-utils';

import { ColumnManagerListProps } from './ColumnManagerList.types';
import { ColumnManagerSortableItem } from '../ColumnManagerSortableItem/ColumnManagerSortableItem';
import type { ColumnManagerSortableItemProps } from '../ColumnManagerSortableItem/ColumnManagerSortableItem.types';
import { ColumnManagerItem } from '../ColumnManagerItem/ColumnManagerItem';
import type { Column, ColumnManagerItemProps } from '../ColumnManagerItem/ColumManagerItem.types';
import * as S from './ColumnManager.style';

export const LIST_STYLE: CSSProperties = { overflowX: 'unset', overflowY: 'unset' };

const ColumnManagerList = <ColumnType extends Column>({
  searchQuery,
  columns,
  draggable,
  handleOrderChange,
  toggleColumn,
  texts,
}: ColumnManagerListProps<ColumnType>) => {
  const [activeItem, setActiveItem] = useState<ColumnManagerItemProps<ColumnType> | undefined>();
  const [containerHeight, setContainerHeight] = useState(0);
  const listRef = useRef<FixedSizeList>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const isItemDraggable = draggable && !searchQuery;

  const items: ColumnManagerItemProps<ColumnType>[] = useMemo(() => {
    return columns.map(column => ({
      key: column.id,
      id: column.id,
      item: column,
      isDragged: activeItem?.id === column.id,
      switchAction: toggleColumn,
      draggable: isItemDraggable,
      texts,
    }));
  }, [columns, toggleColumn, texts, activeItem, isItemDraggable]);

  const handleScroll = ({ currentTarget }: UIEvent) => {
    const { scrollTop } = currentTarget;
    if (listRef.current) {
      listRef.current.scrollTo(scrollTop);
    }
  };

  useResizeObserver(containerRef, dimensions => {
    setContainerHeight(dimensions.height);
  });

  return (
    <S.ColumnManagerList ref={containerRef} data-testid="ds-column-manager-list">
      {!items.length && searchQuery ? (
        <Result description={texts.noResults} type="no-results" noSearchResults />
      ) : (
        <SortableContainer
          onDragStart={({ active }) => {
            const column = items.find(item => item.id === active.id);
            setActiveItem(column);
          }}
          onDragEnd={() => {
            setActiveItem(undefined);
          }}
          onOrderChange={handleOrderChange}
          onDragCancel={() => setActiveItem(undefined)}
          items={items}
          axis="y"
        >
          <Scrollbar absolute withDnd onScroll={handleScroll} maxHeight={containerHeight}>
            <S.List
              isDragging={!!activeItem}
              height={containerHeight}
              itemCount={items.length}
              itemSize={56}
              itemData={items}
              width="100%"
              ref={listRef}
              style={LIST_STYLE}
            >
              {props => <ColumnManagerSortableItem {...(props as ColumnManagerSortableItemProps<ColumnType>)} />}
            </S.List>
          </Scrollbar>
          <DragOverlay>{activeItem && <ColumnManagerItem {...activeItem} />}</DragOverlay>
        </SortableContainer>
      )}
    </S.ColumnManagerList>
  );
};

export default ColumnManagerList;
