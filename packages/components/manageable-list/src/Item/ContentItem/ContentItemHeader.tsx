import React, { type MouseEvent, useCallback, useMemo, useState } from 'react';

import Button from '@synerise/ds-button';
import { useTheme } from '@synerise/ds-core';
import Dropdown from '@synerise/ds-dropdown';
import Icon, {
  AngleBottomS,
  AngleTopS,
  DragHandleM,
  OptionHorizontalM,
} from '@synerise/ds-icon';
import Tooltip from '@synerise/ds-tooltip';

import ItemActions from '../ItemActions/ItemActions';
import ItemMeta from '../ItemMeta/ItemMeta';
import ItemName from '../ItemName/ItemName';
import ItemNameLarge from '../ItemNameLarge/ItemNameLarge';
import * as S from './ContentItem.styles';
import type { ContentItemHeaderProps } from './ContentItem.types';

export const ContentItemHeader = ({
  onRemove,
  onUpdate,
  onDuplicate,
  draggable,
  item,
  changeOrderDisabled,
  texts,
  hideExpander,
  onExpand,
  onSelect,
  headerSuffix,
  headerPrefix,
  onMoveTop,
  onMoveBottom,
  isFirst,
  isLast,
  isExpanded,
  dragHandleProps,
  isDragOverlay,
  setIsExpanded,
  size = 'default',
}: ContentItemHeaderProps) => {
  const theme = useTheme();
  const [editMode, setEditMode] = useState(false);

  const updateName = useCallback(
    (updateParams: { id: string | number; name: string }) => {
      setEditMode(false);
      onUpdate && onUpdate(updateParams);
    },
    [onUpdate],
  );
  const enterEditMode = () => {
    setEditMode(true);
  };
  const stopPropagationHandler = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
  };

  const hasPrefix = useMemo(() => {
    if (size === 'large') {
      return Boolean(
        headerPrefix || item.headerPrefix || item.tag || item.icon,
      );
    }
    return Boolean(headerPrefix || draggable || item.tag || item.icon);
  }, [draggable, item, size, headerPrefix]);

  const renderMoveButtons = useMemo(() => {
    return (
      (onMoveTop || onMoveBottom) && (
        <S.MoveItemButtons>
          {onMoveTop && !isFirst && (
            <Tooltip title={texts?.moveToTopTooltip}>
              <Button
                type="ghost"
                mode="single-icon"
                onClick={(event) => {
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
                onClick={(event) => {
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
    <S.ItemHeader
      size={size}
      hasPrefix={hasPrefix}
      hasDescription={!!item.description}
      onClick={() => {
        if (onSelect && !editMode) {
          onSelect({ id: item.id });
        } else if (
          !item.disableExpanding &&
          !editMode &&
          !item.disableHeaderClick
        ) {
          setIsExpanded(!isExpanded);
          onExpand && onExpand(item.id, !isExpanded);
        }
      }}
    >
      {hasPrefix && (
        <S.ItemHeaderPrefix>
          {(draggable || isDragOverlay) && (
            <S.DraggerWrapper
              {...dragHandleProps}
              disabled={Boolean(changeOrderDisabled)}
            >
              <Icon size={24} component={<DragHandleM />} />
            </S.DraggerWrapper>
          )}
          {item.headerPrefix ? (
            item.headerPrefix
          ) : (
            <>
              {item.tag && item.tag}
              {item.icon && (
                <S.IconWrapper>
                  <Icon
                    size={24}
                    component={item.icon}
                    color={theme.palette['grey-600']}
                  />
                </S.IconWrapper>
              )}
            </>
          )}

          {!!headerPrefix && headerPrefix}
        </S.ItemHeaderPrefix>
      )}

      {size === 'default' ? (
        <ItemName item={item} editMode={editMode} onUpdate={updateName} />
      ) : (
        <ItemNameLarge item={item} />
      )}

      <S.ItemHeaderSuffix>
        <div
          className={
            item.hideHeaderSuffixOnHover ? 'suffix--hide-on-hover' : ''
          }
        >
          {((!!headerSuffix || item?.headerSuffix) && headerSuffix) ||
            item.headerSuffix}
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
                !item.disableExpanding && setIsExpanded(!isExpanded);
                !item.disableExpanding &&
                  onExpand &&
                  onExpand(item.id, !isExpanded);
              }}
              expanded={isExpanded}
            />
          </S.ToggleContentWrapper>
        )}
        {item.dropdown && (
          <S.DropdownWrapper onClick={stopPropagationHandler}>
            <Dropdown
              trigger={['click']}
              overlay={item.dropdown}
              placement="bottomRight"
            >
              <S.DropdownTrigger
                className="ds-dropdown-trigger"
                mode="single-icon"
                type="ghost"
                onClick={stopPropagationHandler}
              >
                <Icon
                  component={<OptionHorizontalM />}
                  color={theme.palette['grey-600']}
                />
              </S.DropdownTrigger>
            </Dropdown>
          </S.DropdownWrapper>
        )}
        {item.additionalSuffix && (
          <S.AdditionalSuffix>{item.additionalSuffix}</S.AdditionalSuffix>
        )}
        {(item.user || item.created) && (
          <ItemMeta user={item.user} created={item.created} />
        )}
      </S.ItemHeaderSuffix>
    </S.ItemHeader>
  );
};
