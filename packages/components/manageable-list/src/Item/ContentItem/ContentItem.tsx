import * as React from 'react';
import Icon from '@synerise/ds-icon';
import DragHandleM from '@synerise/ds-icon/dist/icons/DragHandleM';
import Button from '@synerise/ds-button';
import AngleDownS from '@synerise/ds-icon/dist/icons/AngleDownS';
import { withTheme } from 'styled-components';
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
  onSelect: (selectParams: { id: string }) => void;
  greyBackground?: boolean;
  theme: { [k: string]: string };
  changeOrderDisabled?: boolean;
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
}): React.ReactElement => {
  const [contentVisible, setContentVisible] = React.useState(false);
  const [editMode, setEditMode] = React.useState(false);

  const toggleContentVisibility = React.useCallback((): void => {
    setContentVisible(!contentVisible);
  }, [setContentVisible, contentVisible]);

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
      <S.ItemHeader>
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
          <ItemActions item={item} duplicateAction={onDuplicate} removeAction={onRemove} editAction={enterEditMode} />
          {item.content && (
            <S.ToggleContentWrapper data-testid="item-toggle-content-wrapper">
              <Button type="ghost" onClick={toggleContentVisibility} mode="single-icon" size="small">
                <Icon component={<AngleDownS />} size={24} />
              </Button>
            </S.ToggleContentWrapper>
          )}
        </S.ItemHeaderSuffix>
      </S.ItemHeader>
      {Boolean(item.content) && <S.ContentWrapper data-testid="item-content-wrapper">{item.content}</S.ContentWrapper>}
    </S.ItemContainer>
  );
};

export default withTheme(ContentItem);
