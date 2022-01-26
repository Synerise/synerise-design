import React, { useMemo, useState, useEffect, useRef } from 'react';

import Tooltip from '@synerise/ds-tooltip';
import Icon, { AngleRightS, AddS, WarningFillM, ShowRemoveM } from '@synerise/ds-icon';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import { NOOP } from '@synerise/ds-utils';
import { SortableElement } from 'react-sortable-hoc';
import { VisibilityTrigger } from '@synerise/ds-menu/dist/Menu.types';

import Popconfirm from '@synerise/ds-popconfirm';
import Actions from './Actions';
import AddModal from '../../AddModal';
import DragHandle from './DragHandle';

import { typeIcons, validateItemName } from '../../utils';
import { TreeNode, TreeData } from '../../TreeMenu.types';
import { ItemProps, ItemRef } from './Item.types';

import * as As from './Actions/Actions.styles';
import * as S from './Item.styles';

const FOLDER = 'folder';

const ItemContainer: React.FC<ItemProps> = ({
  item,
  type,
  depth = 0,
  draggable,
  expandedKeys = [],
  addItemList,
  searchQuery,
  onAdd,
  onDelete,
  onCopy,
  onPaste,
  onCut,
  onDuplicate,
  onEditChange,
  onExpandToggle,
  onVisibilityChange,
  hasClipboard,
  texts,
  onClick,
  ...props
}) => {
  const { name, key: itemKey } = item.model;
  const hasChildren = item.hasChildren();
  const currentExpanded = expandedKeys.includes(itemKey);
  const [deleteMode, setDeleteMode] = useState<boolean>(false);

  const [editMode, setEditMode] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const ref = useRef<ItemRef<TreeData>>(null);

  useEffect(() => {
    if (ref.current) ref.current.treeNode = item;
  }, [item, ref]);

  useEffect(() => {
    if (editMode && inputRef.current) inputRef.current.focus();
  }, [editMode]);

  useEffect(() => {
    if (item.model.editMode) {
      setEditMode(true);
    }
  }, [item]);

  const prefixel = useMemo((): React.ReactNode => {
    const style = hasChildren ? {} : { opacity: 0 };
    const TypeIcon = typeIcons[item.model.type];

    return (
      <>
        <S.ArrowIcon expanded={currentExpanded} component={<AngleRightS />} style={style} />
        <Icon color={theme.palette['grey-700']} component={<TypeIcon />} />
      </>
    );
  }, [currentExpanded, hasChildren, item]);

  const selected = editMode;

  const suffixel = (): React.ReactNode => {
    if (editMode) return undefined;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleItemAdd = (addItem: any, context?: TreeNode): void => {
      onAdd(addItem, context);
    };

    const handleEdit = (): void => {
      setTimeout(() => {
        setEditMode(true);
      });
    };

    const handleDeleteConfirmationVisibilityChange = (visible: boolean): void => {
      setDeleteMode(visible);
    };

    return (
      <>
        {item.model.hidden === true && (
          <Icon className="ds-treemenu-hidden-icon" component={<ShowRemoveM />} color={theme.palette['grey-600']} />
        )}
        <S.Suffix>
          {item.model.type === FOLDER && (
            <AddModal
              context={item}
              onItemAdd={handleItemAdd}
              align={{ offset: [32, 16] }}
              itemTypes={addItemList}
              texts={texts}
            >
              <Tooltip title={texts?.addItemLabel} mouseLeaveDelay={0}>
                <As.DropdownTrigger component={<AddS />} />
              </Tooltip>
            </AddModal>
          )}
          <Actions
            item={item}
            texts={texts}
            onDeleteConfirmationVisibilityChange={handleDeleteConfirmationVisibilityChange}
            onDelete={onDelete}
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            onPaste={hasClipboard && onPaste}
            onCopy={onCopy}
            onCut={onCut}
            onDuplicate={onDuplicate}
            deleteMode={deleteMode}
            onVisibilityChange={onVisibilityChange}
            onEdit={handleEdit}
          />
        </S.Suffix>
      </>
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

  const changeName = (itemName: string, originalName: string): void => {
    const thisName = validateItemName(itemName || '') ? itemName.trim() : originalName;
    const thisItem = { ...item };
    thisItem.model.name = thisName;
    thisItem.model.editMode = false;
    onEditChange(item, thisName, item.getPath().shift()?.model.children);
    setEditMode(false);
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>): void => {
    changeName(event.target.value, item.model.name);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') {
      const target = event.target as HTMLInputElement;
      changeName(target.value, item.model.name);
    }
  };

  const handleDeleteCancel = React.useCallback(() => {
    setDeleteMode(false);
  }, []);

  const handleDeleteConfirm = React.useCallback(() => {
    setDeleteMode(false);
    onDelete(item);
  }, [item, onDelete]);

  return (
    <S.ItemContainer
      ref={ref}
      depth={depth}
      selected={selected}
      isDraggable={draggable}
      editMode={editMode}
      deleteMode={deleteMode}
      expanded={currentExpanded}
    >
      {draggable && (
        <S.DragHandle>
          <DragHandle />
        </S.DragHandle>
      )}
      <Popconfirm
        title={texts?.deleteConfirm}
        cancelText="No"
        icon={<Icon color="#ffc300" component={<WarningFillM />} />}
        okText="Yes"
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        visible={deleteMode}
      >
        <S.Item
          onClick={handleExpandToggle}
          highlight={searchQuery}
          className={selected ? 'ant-menu-item-selected' : ''}
          prefixel={prefixel}
          suffixel={suffixel}
          selectedKeys={[itemKey]}
          suffixVisibilityTrigger={selected || editMode ? undefined : VisibilityTrigger.HOVER}
          {...props}
        >
          {editMode ? (
            <S.InlineEditWrapper>
              <S.InlineEditInput defaultValue={name} ref={inputRef} onBlur={handleBlur} onKeyDown={handleKeyDown} />
            </S.InlineEditWrapper>
          ) : (
            <Tooltip title={name}>{name}</Tooltip>
          )}
        </S.Item>
      </Popconfirm>
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
