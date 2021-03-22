import React, { useMemo, useState, useEffect, useRef } from 'react';

import Icon from '@synerise/ds-icon';
import Tooltip from '@synerise/ds-tooltip';
import { AngleRightS, FolderM, AddS } from '@synerise/ds-icon/dist/icons';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import { NOOP } from '@synerise/ds-utils';
import { SortableElement } from 'react-sortable-hoc';

import Actions from './Actions';
import AddModal from '../../AddModal';
import DragHandle from './DragHandle';

import { validateItemName } from '../../utils';
import { TreeNode, TreeData } from '../../TreeMenu.types';
import { ItemProps, ItemRef } from './Item.types';

import * as As from './Actions/Actions.styles';
import * as S from './Item.styles';

const ItemContainer: React.FC<ItemProps> = ({
  item,
  type,
  depth = 0,
  draggable,
  expandedKeys = [],
  addItemList,
  searchQuery,
  onAdd = NOOP,
  onDelete = NOOP,
  onCopy = NOOP,
  onPaste = NOOP,
  onCut = NOOP,
  onDuplicate = NOOP,
  onEditChange = NOOP,
  onExpandToggle = NOOP,
  texts,
  onClick,
  ...props
}) => {
  const { title, key: itemKey } = item.model;
  const hasChildren = item.hasChildren();
  const currentExpanded = expandedKeys.includes(itemKey);
  const [isSelected, setSelected] = useState<boolean>(false);

  const [editMode, setEditMode] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const ref = useRef<ItemRef<TreeData>>(null);

  useEffect(() => {
    if (ref.current) ref.current.treeNode = item;
  }, [item, ref]);

  useEffect(() => {
    if (editMode && inputRef.current) inputRef.current.focus();
  }, [editMode]);

  const prefixel = useMemo((): React.ReactNode => {
    const style = hasChildren ? {} : { opacity: 0.3 };

    return (
      <>
        <S.ArrowIcon expanded={currentExpanded} component={<AngleRightS />} style={style} />
        <Icon color={theme.palette['grey-700']} component={<FolderM />} />
      </>
    );
  }, [currentExpanded, hasChildren]);

  const selected = isSelected || editMode;

  const onSelected = (thisSelected: boolean): void => {
    setSelected(thisSelected !== undefined ? thisSelected : !selected);
  };

  const suffixel = (): React.ReactNode => {
    if (editMode) return undefined;

    const onVisibleChange = (visible: boolean): void => {
      onSelected(visible);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleItemAdd = (addItem: any, context?: TreeNode): void => {
      onAdd(addItem, context);
      onSelected(false);
    };

    const handleEdit = (): void => {
      onVisibleChange(false);
      setTimeout(() => {
        setEditMode(true);
      });
    };

    return (
      <S.SuffixWrapper>
        <AddModal
          context={item}
          onVisibleChange={onVisibleChange}
          onItemAdd={handleItemAdd}
          align={{ offset: [32, 16] }}
          itemTypes={addItemList}
          texts={texts}
        >
          <Tooltip title={texts?.addItemLabel} mouseLeaveDelay={0}>
            <As.DropdownTrigger component={<AddS />} />
          </Tooltip>
        </AddModal>
        <Actions
          item={item}
          texts={texts}
          onVisibleChange={onVisibleChange}
          onDelete={onDelete}
          onPaste={onPaste}
          onCopy={onCopy}
          onCut={onCut}
          onDuplicate={onDuplicate}
          onEdit={handleEdit}
        />
      </S.SuffixWrapper>
    );
  };

  const handleExpandToggle = editMode
    ? NOOP
    : (): void => {
        if (!item.children?.length) return;
        const expand = !currentExpanded;
        onExpandToggle(
          expand ? [...expandedKeys, item.model.key] : [...expandedKeys].filter(key => key !== item.model.key),
          item,
          expand
        );
      };

  const changeTitle = (itemTitle: string, originalTitle: string): void => {
    const thisTitle = validateItemName(itemTitle) ? itemTitle.trim() : originalTitle;
    const thisItem = item;
    thisItem.model.title = thisTitle;
    onEditChange(item, thisTitle, item.getPath().shift()?.model.children);
    setEditMode(false);
    onSelected(false);
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>): void => {
    changeTitle(event.target.value, item.model.name);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') {
      const target = event.target as HTMLInputElement;
      changeTitle(target.value, item.model.name);
    }
  };

  return (
    <S.ItemContainer ref={ref} depth={depth} selected={selected} isDraggable={draggable} editMode={editMode}>
      {draggable && (
        <S.DragHandle>
          <DragHandle />
        </S.DragHandle>
      )}
      <S.Item
        onClick={handleExpandToggle}
        highlight={searchQuery}
        className={selected ? 'ant-menu-item-selected' : ''}
        prefixel={prefixel}
        suffixel={suffixel}
        selectedKeys={[itemKey]}
        type="danger"
        suffixVisibilityTrigger={selected || editMode ? undefined : 'hover'}
        {...props}
      >
        {editMode ? (
          <S.InlineEditWrapper>
            <S.InlineEditInput defaultValue={title} ref={inputRef} onBlur={handleBlur} onKeyDown={handleKeyDown} />
          </S.InlineEditWrapper>
        ) : (
          title
        )}
      </S.Item>
    </S.ItemContainer>
  );
};

export const SortableItem = SortableElement<ItemProps>(ItemContainer);

const Item: React.FC<ItemProps> = ({ item, draggable, index, ...props }) => {
  return draggable ? (
    <SortableItem key={item.key} item={item} index={index as number} {...props} />
  ) : (
    <ItemContainer key={item.key} item={item} {...props} />
  );
};

export default Item;
