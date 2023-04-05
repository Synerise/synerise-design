import * as React from 'react';
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

const ContentItem: React.FC<ContentItemProps> = ({
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
}): React.ReactElement => {
  const [expandedState, setExpanded] = React.useState(expanded);
  const [editMode, setEditMode] = React.useState(false);

  React.useEffect(() => {
    if (expandedState !== expanded) {
      setExpanded(expanded);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expanded]);

  const updateName = React.useCallback(
    (updateParams): void => {
      setEditMode(false);
      onUpdate && onUpdate(updateParams);
    },
    [onUpdate]
  );
  const enterEditMode = React.useCallback((): void => {
    setEditMode(true);
  }, []);
  const stopPropagationHandler = React.useCallback((e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
  }, []);

  const renderMoveButtons = React.useMemo(() => {
    return (
      (onMoveTop || onMoveBottom) && (
        <S.MoveItemButtons>
          {onMoveTop && !isFirst && (
            <Tooltip title={texts?.moveToTopTooltip}>
              <Button
                type="ghost"
                mode="single-icon"
                onClick={(e): void => {
                  e.stopPropagation();
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
                onClick={(e): void => {
                  e.stopPropagation();
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
        onDoubleClick={(): void => {
          !item.disableExpanding && setExpanded(false);
          !item.disableExpanding && onExpand && onExpand(item.id, false);
        }}
        onClick={(): void => {
          !item.disableExpanding && setExpanded(true);
          !item.disableExpanding && onExpand && onExpand(item.id, true);
        }}
      >
        <S.ItemHeaderPrefix>
          {draggable && (
            <S.DraggerWrapper disabled={Boolean(changeOrderDisabled)}>
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
                onClick={(e?: React.MouseEvent<HTMLElement>): void => {
                  !!e && e.stopPropagation();
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

export default withTheme(ContentItem);
