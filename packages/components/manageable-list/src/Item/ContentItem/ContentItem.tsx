import * as React from 'react';
import Icon from '@synerise/ds-icon';
import DragHandleM from '@synerise/ds-icon/dist/icons/DragHandleM';
import Button from '@synerise/ds-button';
import { withTheme } from 'styled-components';
import Dropdown from '@synerise/ds-dropdown';
import { OptionHorizontalM } from '@synerise/ds-icon/dist/icons';
import AnimateHeight from 'react-animate-height';
import * as S from './ContentItem.styles';
import ItemActions from '../ItemActions/ItemActions';
import ItemName from '../ItemName/ItemName';
import { ContentItemProps } from './ContentItem.types';

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
          {!!headerSuffix && headerSuffix}
          <ItemActions
            item={item}
            duplicateAction={onDuplicate}
            duplicateActionTooltip={texts.itemActionDuplicateTooltip}
            removeAction={onRemove}
            removeActionTooltip={texts.itemActionDeleteTooltip}
            editAction={enterEditMode}
            editActionTooltip={texts.itemActionRenameTooltip}
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
                  size="small"
                  onClick={stopPropagationHandler}
                >
                  <Icon component={<OptionHorizontalM />} color={theme.palette['grey-600']} />
                </S.DropdownTrigger>
              </Dropdown>
            </S.DropdownWrapper>
          )}
        </S.ItemHeaderSuffix>
      </S.ItemHeader>
      {item.content && (
        <AnimateHeight
          className="item-content-animation"
          duration={300}
          height={!item.disableExpanding && !expandedState ? 0 : 'auto'}
        >
          git
          <S.ContentWrapper data-testid="item-content-wrapper" withoutPadding={Boolean(contentWithoutPadding)}>
            {item.content}
          </S.ContentWrapper>
        </AnimateHeight>
      )}
    </S.ItemContainer>
  );
};

export default withTheme(ContentItem);
