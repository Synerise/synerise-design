import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import TreeModel, { Node } from 'tree-model';
import Result from '@synerise/ds-result';
import { NOOP } from '@synerise/ds-utils';
import { SortEndHandler, SortOverHandler, SortStartHandler } from 'react-sortable-hoc';

import AddModal from './Elements/AddModal';
import Ghost from './Elements/Ghost';
import Header from './Elements/Header';
import Item from './Elements/Item';
import Toolbar from './Elements/Toolbar';
import SortableContainer from './Elements/SortableContainer';
import useTexts from './useTexts';
import TreeMenuContext, { defaultValue } from './TreeMenuContext';
import { generateTree, getItemsToRender, getCount, getKeyFromItem } from './utils';

import {
  TreeMenuItem,
  TreeMenuItems,
  TreeMenuTexts,
  TreeMenuProps,
  TreeMenuNode,
  TreeMenuNodes,
  TreeMenuItemRef,
  TreeMenuSortableNode,
} from './TreeMenu.types';
import * as S from './TreeMenu.styles';

const TreeMenu: React.FC<TreeMenuProps> = ({
  dataSource,
  showToolbar = true,
  showHeader = true,
  draggable = true,
  count: propCount,
  ghostDynamic = false,
  texts: propTexts,
  addItemList,
  onItemClick = NOOP,
  ...restProps
}) => {
  const [items] = useState(dataSource || []);
  const [treeItems, setTreeItems] = useState(generateTree(items as TreeMenuItems));
  const [expandedKeys, setExpandedKeys] = useState<TreeMenuNodes>([]);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [searchOpen, setSearchOpen] = React.useState<boolean>(false);
  const forcedDraggableDisable = !searchQuery || draggable === false;

  const itemGhostRef = useRef<HTMLDivElement>(null);
  const helperRef = useRef<HTMLDivElement | null>(null);
  const dropRef = useRef<HTMLDivElement | null>(null);
  const finalDropRef = useRef<Node<TreeMenuItem>>();
  const prevDropRef = useRef<HTMLDivElement | null>(null);
  const indexes = useRef<[number, number]>([0, 0]);
  const copyBuffer = useRef<TreeMenuNode | null>(null);
  const timeoutRef = useRef<number>(0);

  useEffect(() => {
    if (!treeItems) {
      setTreeItems(generateTree(items));
    }
  }, [items, treeItems]);

  const itemsToRender = useMemo(() => {
    return getItemsToRender(treeItems.children, 0, expandedKeys, searchQuery);
  }, [treeItems, searchQuery, expandedKeys]);

  const texts: TreeMenuTexts = useTexts(propTexts);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const getGhost = (): HTMLDivElement => {
    return itemGhostRef.current?.querySelector('.ds-treemenu-item-ghost') as HTMLDivElement;
  };

  const onSortEnd: SortEndHandler = (sort): void => {
    const ghost = getGhost();
    const newIndex = sort.newIndex > sort.oldIndex ? sort.newIndex + 1 : sort.newIndex;
    const target = sort.nodes[newIndex] as TreeMenuItemRef;
    const dragged = sort.nodes[sort.oldIndex] as TreeMenuSortableNode;
    const targetNode = target?.node?.node;
    const draggedNode = dragged.node?.node as TreeMenuNode;
    const container = dragged.node ? (dragged.node.closest('.ant-menu') as HTMLDivElement) : null;

    ghost.classList.remove('show');
    if (container) container.classList.remove('ds-tree-menu-no-pointer');
    if (sort.newIndex === sort.oldIndex) return;

    const newDraggedNode = new TreeModel().parse(draggedNode.model);
    const newExpanded = [...expandedKeys];

    draggedNode.drop();

    if (!targetNode) {
      treeItems.addChild(newDraggedNode);
    } else if (finalDropRef.current) {
      finalDropRef.current.addChild(newDraggedNode);
    } else if (targetNode && targetNode.parent) {
      targetNode.parent.addChildAtIndex(newDraggedNode, targetNode.getIndex());
    }

    // Clear older drops
    // prevDrop?.querySelector('.ant-menu-item')?.classList.remove('ant-menu-item-selected');
    dropRef.current = null;
    prevDropRef.current = null;

    setExpandedKeys(newExpanded);
  };

  const onSortOver: SortOverHandler = (sort): void => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    const newIndex = sort.newIndex > sort.oldIndex ? sort.newIndex + 1 : sort.newIndex;

    timeoutRef.current = setTimeout(() => {
      const ghost = getGhost();
      const prevOver = sort.nodes[newIndex - 1] as TreeMenuSortableNode;
      const prevDrop = prevDropRef.current as TreeMenuItemRef;
      const prevDropItem = prevDrop ? prevDrop.querySelector('.ant-menu-item') : null;
      const over = sort.nodes[sort.newIndex] as TreeMenuItemRef;
      const ghostItem = ghost.querySelector('.ant-menu-item') as HTMLDivElement;
      const item = over.node.querySelector('.ant-menu-item');
      const style = window.getComputedStyle(item);

      // Clear older drops
      if (prevDropItem) prevDropItem.classList.remove('ant-menu-item-selected');

      dropRef.current = over;
      prevDropRef.current = prevOver?.node || null;
      indexes.current = [sort.oldIndex, sort.newIndex];

      ghost.style.top = `${over.node.offsetTop}px`;
      if (ghostItem) ghostItem.style.marginLeft = ghostDynamic ? style.marginLeft : '0';

      const helper = sort.helper?.querySelector('.ant-menu-item') as HTMLDivElement;

      if (helper) helper.style.marginLeft = `${style.marginLeft} !important`;
    }, 25);
  };

  const onSortStart: SortStartHandler = sort => {
    const ghost = getGhost();
    const ghostItem = ghost.querySelector('.ant-menu-item') as HTMLDivElement;
    const item = sort.node.querySelector('.ant-menu-item') as HTMLDivElement;
    const container = item.closest('.ant-menu') as HTMLDivElement;
    const { node } = sort.node as TreeMenuItemRef;
    const style = window.getComputedStyle(item);
    const prevDropNode = sort.nodes[sort.index - 1] as TreeMenuSortableNode;
    const prevDrop = prevDropNode?.node || null;
    const prevDropItem = prevDrop ? prevDrop.querySelector('.ant-menu-item') : null;

    dropRef.current = sort.node as HTMLDivElement;
    prevDropRef.current = prevDrop;
    helperRef.current = sort.helper as HTMLDivElement;

    if (container) container.classList.add('ds-tree-menu-no-pointer');
    if (prevDropItem) prevDropItem.classList.remove('ant-menu-item-selected');

    ghost.style.top = `${dropRef.current.offsetTop}px`;
    if (ghostDynamic && ghostItem) ghostItem.style.marginLeft = style.marginLeft;
    setTimeout(() => ghost.classList.add('show'));

    const newExpanded = [...expandedKeys];
    const idx = expandedKeys.indexOf(node);
    if (idx > -1) {
      newExpanded.splice(idx, 1);
      setExpandedKeys(newExpanded);
    }
  };

  const HeaderComponent = useCallback(
    props => {
      const count = searchQuery ? itemsToRender.length : getCount(treeItems.children);

      if (typeof showHeader === 'function') {
        const ShowHeader = showHeader;
        return <ShowHeader count={count} {...props} />;
      }
      if (showHeader === true) return <Header count={count} {...props} />;

      return null;
    },
    [showHeader, treeItems, searchQuery, itemsToRender]
  );

  const ToolbarComponent = useCallback(
    props => {
      return showToolbar ? <Toolbar {...props} /> : null;
    },
    [showToolbar]
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleItemAdd = (item: any, context: TreeMenuNode | undefined): void => {
    const treeModel = new TreeModel();

    const newItem = {
      type: item.type,
      name: `New ${item.name}`,
    };

    const newTreeItem = treeModel.parse(newItem);
    newTreeItem.editMode = true;

    const newExpanded = [...expandedKeys];

    if (context) {
      context.addChildAtIndex(newTreeItem, 0);
      if (expandedKeys.indexOf(context) < 0) {
        newExpanded.push(context);
      }
    } else {
      treeItems.addChildAtIndex(newTreeItem, 0);
    }

    setExpandedKeys(newExpanded);
  };

  const renderChildren = (): React.ReactNode => {
    const rendered = itemsToRender.map((item: TreeMenuNode, thisIndex: number) => {
      const onExpandToggle = (expandItem: TreeMenuNode, expanded: boolean): void => {
        if (!expandItem.children?.length) return;

        const newExpandedKeys = [...new Set([...expandedKeys])];

        if (!expanded) {
          const index = newExpandedKeys.indexOf(expandItem);
          newExpandedKeys.splice(index, 1);
        } else {
          newExpandedKeys.push(expandItem);
        }

        setExpandedKeys(newExpandedKeys);
      };

      const onEditModeChange = (event: React.FocusEvent<HTMLInputElement>): void => {
        const editItem = item;
        editItem.model.name = event.target.value.trim();
        editItem.editMode = false;
        setExpandedKeys([...expandedKeys]);
      };

      const onItemDelete = (thisItem: TreeMenuNode): void => {
        thisItem.drop();
        setExpandedKeys([...expandedKeys]);
      };

      const onItemCopy = (thisItem: TreeMenuNode): void => {
        copyBuffer.current = thisItem;
      };

      const onItemPaste = (thisItem: TreeMenuNode): void => {
        if (copyBuffer.current) {
          const treeModel = new TreeModel();
          const newNode = treeModel.parse(JSON.parse(JSON.stringify(copyBuffer.current.model)));
          thisItem.addChildAtIndex(newNode, 0);
          setExpandedKeys([...expandedKeys, thisItem]);
        }
      };

      const onItemDuplicate = (thisItem: TreeMenuNode): void => {
        const prevCopy = copyBuffer.current;
        copyBuffer.current = thisItem;
        thisItem.parent.addChildAtIndex(
          new TreeModel().parse(JSON.parse(JSON.stringify(thisItem.model))),
          thisItem.getIndex()
        );
        copyBuffer.current = prevCopy;
        setExpandedKeys([...expandedKeys]);
      };

      const onItemCut = (thisItem: TreeMenuNode): void => {
        onItemCopy(thisItem);
        onItemDelete(thisItem);
      };

      const key = getKeyFromItem(item);

      return (
        <Item
          index={thisIndex}
          item={item}
          depth={item.depth}
          highlight={searchQuery}
          ghostDynamic={ghostDynamic}
          draggable={forcedDraggableDisable}
          texts={texts}
          itemTypes={addItemList}
          onAdd={handleItemAdd}
          onCopy={onItemCopy}
          onPaste={onItemPaste}
          onDelete={onItemDelete}
          onCut={onItemCut}
          onDuplicate={onItemDuplicate}
          onEditModeChange={onEditModeChange}
          onExpandToggle={onExpandToggle}
          onClick={onItemClick}
          expanded={item.children && expandedKeys.includes(item)}
          key={key}
        />
      );
    });

    if (searchQuery && !rendered.length) return <Result description="No results" type="no-results" />;

    return rendered;
  };

  if (!loaded) return null;

  const contextValue = {
    ...defaultValue,
    ...restProps,
    texts,
    searchQuery,
    setSearchQuery,
    searchOpen,
    setSearchOpen,
  };

  return (
    <S.TreeMenuContainer>
      <TreeMenuContext.Provider value={contextValue}>
        <ToolbarComponent>
          <AddModal texts={texts} itemTypes={addItemList} onItemAdd={handleItemAdd} />
        </ToolbarComponent>
        <HeaderComponent texts={texts} />
        <Ghost key="ghost" ref={itemGhostRef} />
        <SortableContainer
          onSortEnd={onSortEnd}
          onSortOver={onSortOver}
          onSortStart={onSortStart}
          hideSortableGhost
          helperClass="ds-tree-menu-helper"
          distance={5}
          {...restProps}
        >
          {renderChildren()}
        </SortableContainer>
      </TreeMenuContext.Provider>
    </S.TreeMenuContainer>
  );
};

export default TreeMenu;
