import React, { useEffect, useState } from 'react';
import AnimateHeight from 'react-animate-height';

import { useTexts } from '../../hooks/useTexts';
import * as S from './ContentItem.styles';
import { type ContentItemProps } from './ContentItem.types';
import { ContentItemHeader } from './ContentItemHeader';

const ContentItemComponent = ({
  onRemove,
  onUpdate,
  onDuplicate,
  draggable,
  dashed,
  item,
  greyBackground = false,
  changeOrderDisabled,
  texts,
  hideExpander,
  expanded,
  onExpand,
  headerSuffix,
  headerPrefix,
  contentWithoutPadding,
  onMoveTop,
  onMoveBottom,
  isFirst,
  isLast,
  size = 'default',
  ...rest
}: ContentItemProps) => {
  const [isExpanded, setIsExpanded] = useState(expanded);
  const allTexts = useTexts(texts);

  useEffect(() => {
    if (isExpanded !== expanded) {
      setIsExpanded(expanded);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expanded]);

  return (
    <S.ItemContainer
      opened={!!isExpanded}
      greyBackground={greyBackground}
      key={item.id}
      data-testid="item-with-content"
      dashed={dashed}
      size={size}
      isDisabled={!!item.disabled}
      {...rest}
    >
      <ContentItemHeader
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
        onUpdate={onUpdate}
        item={item}
        onRemove={onRemove}
        onDuplicate={onDuplicate}
        draggable={draggable}
        changeOrderDisabled={changeOrderDisabled}
        texts={allTexts}
        hideExpander={hideExpander}
        onExpand={onExpand}
        headerSuffix={headerSuffix}
        headerPrefix={headerPrefix}
        onMoveTop={onMoveTop}
        onMoveBottom={onMoveBottom}
        isFirst={isFirst}
        isLast={isLast}
        size={size}
      />
      {item.content && (
        <AnimateHeight
          className="item-content-animation"
          duration={300}
          height={!item.disableExpanding && !isExpanded ? 0 : 'auto'}
        >
          <S.ContentWrapper
            data-testid="item-content-wrapper"
            withoutPadding={Boolean(contentWithoutPadding)}
          >
            {item.content}
          </S.ContentWrapper>
        </AnimateHeight>
      )}
    </S.ItemContainer>
  );
};

const ContentItem = Object.assign(ContentItemComponent, {
  AdditionalSuffix: S.AdditionalSuffix,
  ContentWrapper: S.ContentWrapper,
  DraggerWrapper: S.DraggerWrapper,
  DropdownTrigger: S.DropdownTrigger,
  DropdownWrapper: S.DropdownWrapper,
  FilterDropdownTrigger: S.FilterDropdownTrigger,
  IconWrapper: S.IconWrapper,
  ItemContainer: S.ItemContainer,
  ItemHeader: S.ItemHeader,
  ItemHeaderPrefix: S.ItemHeaderPrefix,
  ItemHeaderSuffix: S.ItemHeaderSuffix,
  MoveItemButtons: S.MoveItemButtons,
  ToggleContentWrapper: S.ToggleContentWrapper,
});

export default ContentItem;
