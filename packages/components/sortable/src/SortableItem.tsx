import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { SortableItemProps, BaseItem } from './Sortable.types';
import * as S from './Sortable.styles';

export const SortableItem = <ItemType extends BaseItem>({
  id,
  data,
  index,
  isDragged = false,
  component: Component,
  style,
  placeholderCss,
  ...htmlAttributes
}: SortableItemProps<ItemType>) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const itemStyle = {
    ...style,
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: 1,
  };
  const handleProps = { ...attributes, ...listeners };

  return (
    <S.SortableItemWrapper
      style={itemStyle}
      data-testid="ds-sortable-item"
      {...htmlAttributes}
      isGrabbed={index === -1}
      placeholderCss={placeholderCss}
      isDragged={isDragged}
      ref={setNodeRef}
    >
      <S.SortableItemContent>
        <Component
          {...data}
          index={index}
          dragHandleProps={handleProps}
          isGrabbed={index === -1}
          isDragged={isDragged}
        />
      </S.SortableItemContent>
    </S.SortableItemWrapper>
  );
};
