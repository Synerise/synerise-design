import React, { useState, useRef, useEffect } from 'react';

import { SortableHandle, SortableElement, SortableElementProps } from 'react-sortable-hoc';
import { Node } from 'tree-model';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import Icon from '@synerise/ds-icon';
import { DragHandleM, FileM } from '@synerise/ds-icon/dist/icons';
import { NOOP } from '@synerise/ds-utils';

import { ItemProps } from './Item.types';
import * as S from './Item.styles';
import { TreeMenuItem, TreeMenuItemRef } from '../../TreeMenu.types';
import { BaseComponent } from './Items/Elements';

type SortableItemProps = SortableElementProps & ItemProps;

const DragHandle = SortableHandle(() => (
  <Icon color={theme.palette['grey-060']} size={16} component={<DragHandleM />} />
));
export interface ItemRef extends HTMLDivElement {
  item: TreeMenuItem;
  node: Node<TreeMenuItem>;
}

export const ItemComponent: React.FC<ItemProps> = ({
  item,
  depth = 0,
  ghostDynamic = false,
  onEditModeChange = NOOP,
  onDelete = NOOP,
  itemTypes = {},
  ...itemProps
}) => {
  const node = item;
  const type = item?.model?.type || 'folder';
  const TypeComponent =
    itemTypes[type]?.component ||
    function TypeComponent(props: SortableItemProps): React.ReactElement {
      return <BaseComponent {...props} icon={itemTypes[type]?.icon || FileM} />;
    };
  const ref = useRef<TreeMenuItemRef>(null);
  const [isSelected, setSelected] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(item.editMode);
  const style = item?.type === 'folderEnd' ? { background: '#000' } : {};

  useEffect(() => {
    if (ref.current) {
      ref.current.item = item.model;
      ref.current.node = item;
    }
    if (editMode !== item.editMode) setEditMode(item.editMode);
  }, [item, editMode]);

  const selected = isSelected || editMode;

  const onSelected = (thisSelected: boolean): void => {
    setSelected(thisSelected !== undefined ? thisSelected : !selected);
  };

  const onEditMode = (thisEditMode: boolean): void => {
    node.editMode = thisEditMode;
    setEditMode(thisEditMode);
  };

  return (
    <S.ItemContainer ref={ref} depth={depth} selected={selected} style={style} fullWidth={!ghostDynamic}>
      <S.DragHandle>
        <DragHandle />
      </S.DragHandle>
      <TypeComponent
        item={item}
        className={selected ? 'ant-menu-item-selected' : ''}
        onSelected={onSelected}
        editMode={editMode}
        onDelete={onDelete}
        onEditMode={onEditMode}
        onEditModeChange={onEditModeChange}
        itemTypes={itemTypes}
        {...itemProps}
      />
    </S.ItemContainer>
  );
};

const SortableItem = SortableElement<ItemProps>(ItemComponent);

const Item: React.FC<ItemProps> = ({ item, draggable, index, ...props }) => {
  return draggable ? (
    <SortableItem item={item} index={index as number} {...props} />
  ) : (
    <ItemComponent item={item} {...props} />
  );
};

export default Item;
