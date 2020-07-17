import * as React from 'react';
import Icon from '@synerise/ds-icon';
import DragHandleM from '@synerise/ds-icon/dist/icons/DragHandleM';
import Button from '@synerise/ds-button';
import { withTheme } from 'styled-components';
import Dropdown from '@synerise/ds-dropdown';
import { OptionHorizontalM } from '@synerise/ds-icon/dist/icons';
import * as S from './ContentItem.styles';
import { ItemProps } from '../Item';
import ItemActions from '../ItemActions/ItemActions';
import ItemName from '../ItemName/ItemName';

export type ContentItemProps = {
  item: ItemProps;
  draggable?: boolean;
  onRemove?: (removeParams: { id: string }) => void;
  onDuplicate?: (duplicateParams: { id: string }) => void;
  onUpdate?: (updateParams: { id: string; name: string }) => void;
  greyBackground?: boolean;
  theme: { [k: string]: string };
  changeOrderDisabled?: boolean;
  texts: {
    [k: string]: string | React.ReactNode;
  };
  hideExpander?: boolean;
};

const ContentItem: React.FC<ContentItemProps> = ({
  onRemove,
  onUpdate,
  onDuplicate,
  draggable,
  item,
  greyBackground = false,
  changeOrderDisabled,
  theme,
  texts,
  hideExpander,
}): React.ReactElement => {
  ContentItem.whyDidYouRender = true;
  console.log('Rerender',item.name);

  const [editMode, setEditMode] = React.useState(false);
  const [expanded, setExpanded] = React.useState(item.expanded);

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
      opened={!!expanded}
      greyBackground={greyBackground}
      key={item.id}
      data-testid="item-with-content"
    >
      <S.ItemHeader
        hasPrefix={Boolean(draggable || item.tag || item.icon)}
        onDoubleClick={(): void => {
          !item.disableExpanding && setExpanded(false);
        }}
        onClick={(): void => {
          !item.disableExpanding && setExpanded(true);
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
        </S.ItemHeaderPrefix>
        <ItemName item={item} editMode={editMode} onUpdate={updateName} />
        <S.ItemHeaderSuffix>
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
                onClick={(e: React.MouseEvent<HTMLButtonElement>): void => {
                  e.stopPropagation();
                  !item.disableExpanding &&  setExpanded(!expanded);
                }}
                expanded={expanded}
              />
            </S.ToggleContentWrapper>
          )}
          {item.dropdown && (
            <S.DropdownWrapper onClick={stopPropagationHandler}>
              <Dropdown trigger={['click']} overlay={item.dropdown} placement="bottomRight">
                <S.DropdownTrigger className="ds-dropdown-trigger" mode="single-icon" type="ghost" size="small" onClick={stopPropagationHandler}>
                  <Icon component={<OptionHorizontalM />} color={theme.palette['grey-600']} />
                </S.DropdownTrigger>
              </Dropdown>
            </S.DropdownWrapper>
          )}
        </S.ItemHeaderSuffix>
      </S.ItemHeader>
      {Boolean(item.content) && Boolean(expanded) && (
        <S.ContentWrapper data-testid="item-content-wrapper">{item.content}</S.ContentWrapper>
      )}
    </S.ItemContainer>
  );
};

export default withTheme(ContentItem);
