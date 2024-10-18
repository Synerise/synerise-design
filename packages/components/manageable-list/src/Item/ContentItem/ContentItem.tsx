import React, { useCallback, useState, MouseEvent, useEffect, useMemo } from 'react';
import AnimateHeight from 'react-animate-height';
import { withTheme } from 'styled-components';

import Icon, { DragHandleM, AngleBottomS, AngleTopS, OptionHorizontalM } from '@synerise/ds-icon';
import Button from '@synerise/ds-button';
import Dropdown from '@synerise/ds-dropdown';
import Tooltip from '@synerise/ds-tooltip';

import ItemActions from '../ItemActions/ItemActions';
import ItemName from '../ItemName/ItemName';
import ItemMeta from '../ItemMeta/ItemMeta';

import { ContentItemProps } from './ContentItem.types';
import * as S from './ContentItem.styles';

const ContentItemComponent = ({
  onRemove,
  onUpdate,
  onDuplicate,
  draggable,
  dashed,
  item,
  greyBackground = false,
  changeOrderDisabled,
  theme,
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
  ...rest
}: ContentItemProps) => {
  const [expandedState, setExpanded] = useState(expanded);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (expandedState !== expanded) {
      setExpanded(expanded);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expanded]);

  const updateName = useCallback(
    (updateParams: { id: string | number; name: string }) => {
      setEditMode(false);
      onUpdate && onUpdate(updateParams);
    },
    [onUpdate]
  );
  const enterEditMode = () => {
    setEditMode(true);
  };
  const stopPropagationHandler = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
  };

  const renderMoveButtons = useMemo(() => {
    return (
      (onMoveTop || onMoveBottom) && (
        <S.MoveItemButtons>
          {onMoveTop && !isFirst && (
            <Tooltip title={texts?.moveToTopTooltip}>
              <Button
                type="ghost"
                mode="single-icon"
                onClick={event => {
                  event.stopPropagation();
                  onMoveTop(item);
                }}
              >
                <Icon component={<AngleTopS />} />
              </Button>
            </Tooltip>
          )}
          {onMoveBottom && !isLast && (
            <Tooltip title={texts?.moveToBottomTooltip}>
              <Button
                type="ghost"
                mode="single-icon"
                onClick={event => {
                  event.stopPropagation();
                  onMoveBottom(item);
                }}
              >
                <Icon component={<AngleBottomS />} />
              </Button>
            </Tooltip>
          )}
        </S.MoveItemButtons>
      )
    );
  }, [isFirst, isLast, item, onMoveBottom, onMoveTop, texts]);

  return (
    <S.ItemContainer
      opened={!!expandedState}
      greyBackground={greyBackground}
      key={item.id}
      data-testid="item-with-content"
      dashed={dashed}
      {...rest}
    >
      <S.ItemHeader
        hasPrefix={Boolean(draggable || item.tag || item.icon)}
        onClick={() => {
          if (!item.disableExpanding && !editMode) {
            setExpanded(!expandedState);
            onExpand && onExpand(item.id, !expandedState);
          }
        }}
      >
        <S.ItemHeaderPrefix>
          {draggable && (
            <S.DraggerWrapper className="item-drag-handle" disabled={Boolean(changeOrderDisabled)}>
              <Icon size={24} component={<DragHandleM />} />
            </S.DraggerWrapper>
          )}
          {item.tag && item.tag}
          {item.icon && (
            <S.IconWrapper>
              <Icon size={24} component={item.icon} color={theme.palette['grey-600']} />
            </S.IconWrapper>
          )}
          {!!headerPrefix && headerPrefix}
        </S.ItemHeaderPrefix>
        <ItemName item={item} editMode={editMode} onUpdate={updateName} />
        <S.ItemHeaderSuffix>
          <div className={item.hideHeaderSuffixOnHover ? 'suffix--hide-on-hover' : ''}>
            {((!!headerSuffix || item?.headerSuffix) && headerSuffix) || item.headerSuffix}
          </div>
          {renderMoveButtons}
          <ItemActions
            item={item}
            duplicateAction={onDuplicate}
            duplicateActionTooltip={texts?.itemActionDuplicateTooltip}
            removeAction={onRemove}
            removeActionTooltip={texts?.itemActionDeleteTooltip}
            editAction={enterEditMode}
            editActionTooltip={texts?.itemActionRenameTooltip}
          />{' '}
          {item.content && !hideExpander && (
            <S.ToggleContentWrapper data-testid="item-toggle-content-wrapper">
              <Button.Expander
                disabled={item.disableExpanding}
                onClick={(event?: MouseEvent<HTMLElement>) => {
                  !!event && event.stopPropagation();
                  !item.disableExpanding && setExpanded(!expandedState);
                  !item.disableExpanding && onExpand && onExpand(item.id, !expandedState);
                }}
                expanded={expandedState}
              />
            </S.ToggleContentWrapper>
          )}
          {item.dropdown && (
            <S.DropdownWrapper onClick={stopPropagationHandler}>
              <Dropdown trigger={['click']} overlay={item.dropdown} placement="bottomRight">
                <S.DropdownTrigger
                  className="ds-dropdown-trigger"
                  mode="single-icon"
                  type="ghost"
                  onClick={stopPropagationHandler}
                >
                  <Icon component={<OptionHorizontalM />} color={theme.palette['grey-600']} />
                </S.DropdownTrigger>
              </Dropdown>
            </S.DropdownWrapper>
          )}
          {item.additionalSuffix && <S.AdditionalSuffix>{item.additionalSuffix}</S.AdditionalSuffix>}
          {(item.user || item.created) && <ItemMeta user={item.user} created={item.created} />}
        </S.ItemHeaderSuffix>
      </S.ItemHeader>
      {item.content && (
        <AnimateHeight
          className="item-content-animation"
          duration={300}
          height={!item.disableExpanding && !expandedState ? 0 : 'auto'}
        >
          <S.ContentWrapper data-testid="item-content-wrapper" withoutPadding={Boolean(contentWithoutPadding)}>
            {item.content}
          </S.ContentWrapper>
        </AnimateHeight>
      )}
    </S.ItemContainer>
  );
};

const ContentItem = Object.assign(withTheme(ContentItemComponent), {
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
