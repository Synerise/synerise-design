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
  onExpand: (id: string, isExpanded: boolean) => void;
  expanderDisabled?: boolean;
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
  onExpand,
  expanderDisabled,
}): React.ReactElement => {
  const [contentVisible, setContentVisible] = React.useState(item.showContentOnMount);
  const [editMode, setEditMode] = React.useState(false);

  const toggleContentVisibility = React.useCallback(
    (visibility: boolean): void => {
      setContentVisible(visibility);
      item && item.id && onExpand && onExpand(item.id, visibility);
    },
    [setContentVisible, item, onExpand]
  );

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
  return (
    <S.ItemContainer
      opened={contentVisible}
      greyBackground={greyBackground}
      key={item.id}
      data-testid="item-with-content"
    >
      <S.ItemHeader
        hasPrefix={Boolean(draggable || item.tag || item.icon)}
        onDoubleClick={(): void => {
          toggleContentVisibility(false);
        }}
        onClick={(): void => {
          !contentVisible && toggleContentVisibility(true);
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
          {item.content && !expanderDisabled && (
            <S.ToggleContentWrapper data-testid="item-toggle-content-wrapper">
              <Button.Expander
                onClick={(e: React.MouseEvent<HTMLButtonElement>): void => {
                  e.stopPropagation();
                  toggleContentVisibility(!contentVisible);
                }}
                expanded={contentVisible}
              />
            </S.ToggleContentWrapper>
          )}
          {item.dropdown && (
            <Dropdown trigger={['click']} overlay={item.dropdown}>
              <S.DropdownTrigger
                className="ds-dropdown-trigger"
                onClick={(e: React.MouseEvent<HTMLSpanElement>): void => {
                  e.stopPropagation();
                }}
              >
                <Icon component={<OptionHorizontalM />} color={theme.palette['grey-600']} />
              </S.DropdownTrigger>
            </Dropdown>
          )}
        </S.ItemHeaderSuffix>
      </S.ItemHeader>
      {Boolean(item.content) && <S.ContentWrapper data-testid="item-content-wrapper">{item.content}</S.ContentWrapper>}
    </S.ItemContainer>
  );
};

export default withTheme(ContentItem);
