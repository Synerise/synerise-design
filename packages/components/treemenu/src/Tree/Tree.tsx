import React, { useEffect, useMemo, useState, useRef, ReactElement } from 'react';
import { SortEndHandler, SortOverHandler, SortStartHandler } from 'react-sortable-hoc';
import { NOOP } from '@synerise/ds-utils';
import TreeModel from 'tree-model';

import { getItemsToRender, generateTree } from '../utils';
import SortableContainer from './SortableContainer';
import Item, { SortableItem } from './Item';

import { TreeProps, TreeNode, SortableNode, SortableItemRef } from './Tree.types';
import Ghost from './Ghost';
import { EmptyList } from './EmptyList';

interface ItemProps {
  [key: string]: Function;
}

export default function Tree({
  items,
  expandedKeys: propExpandedKeys,
  addItemList,
  draggable = true,
  searchQuery = '',
  texts,
  onItemDragStart = NOOP,
  onItemDragEnd = NOOP,
  getContainer,
  hasClipboard,
  ...restProps
}: TreeProps): ReactElement {
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>(propExpandedKeys || []);

  const timeoutRef = useRef<number>(0);
  const itemGhostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (propExpandedKeys) setExpandedKeys(propExpandedKeys);
  }, [propExpandedKeys]);

  const treeItems = useMemo(() => {
    return generateTree(items);
  }, [items]);

  const itemsToRender = useMemo(() => {
    return getItemsToRender(treeItems.children, 0, expandedKeys, searchQuery);
  }, [expandedKeys, searchQuery, treeItems]);

  const itemPropsRegexp = /^onItem([A-Z])/;
  const itemProps = Object.keys(restProps)
    .filter(prop => prop.match(itemPropsRegexp))
    .reduce<ItemProps>(
      (props, prop) => ({
        ...props,
        [prop.replace(itemPropsRegexp, 'on$1')]: restProps[prop],
      }),
      {}
    );

  const getGhost = (): HTMLDivElement => {
    return itemGhostRef.current?.querySelector('.ds-treemenu-item-ghost') as HTMLDivElement;
  };

  const handleSortStart: SortStartHandler = ({ node }) => {
    // Show ghost
    const ghost = getGhost();
    // const ghostItem = ghost.querySelector('.ant-menu-item') as HTMLDivElement;
    const { treeNode } = node as SortableItemRef;
    const container = node.closest('.ant-menu') as HTMLDivElement;

    // Set up ghost
    ghost.style.top = `${(node as HTMLDivElement).offsetTop}px`;
    setTimeout(() => ghost.classList.add('show'));

    // Need to disable pointer-events on container
    container.classList.add('ds-tree-menu-no-pointer');

    // If has children we need to unexpand
    if (treeNode.hasChildren() && expandedKeys.includes(treeNode.model.key)) {
      setExpandedKeys([...expandedKeys].filter(key => key !== treeNode.model.key));
    }

    onItemDragStart(treeNode);
  };

  const handleSortOver: SortOverHandler = ({ nodes, oldIndex, newIndex }): void => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      const target = nodes[oldIndex <= newIndex ? newIndex : newIndex] as SortableNode;
      const ghost = getGhost();

      ghost.style.top = `${(target.node as HTMLDivElement).offsetTop}px`;
    }, 25);
  };

  const handleSortEnd: SortEndHandler = ({ nodes, oldIndex, newIndex }): void => {
    const ghost = getGhost();
    ghost.classList.remove('show');

    const dragged = nodes[oldIndex] as SortableNode;
    const container = dragged.node?.closest('.ant-menu') as HTMLDivElement;
    container.classList.remove('ds-tree-menu-no-pointer');

    // If was in expandedKeys put it back
    const draggedKey = dragged.node?.treeNode.model.key;
    if (draggedKey && propExpandedKeys?.includes(draggedKey) && !expandedKeys.includes(draggedKey)) {
      setExpandedKeys([...expandedKeys, draggedKey]);
    }

    if (oldIndex === newIndex) return;

    const target = nodes[oldIndex <= newIndex ? newIndex + 1 : newIndex] as SortableNode;
    const newDraggedNode = new TreeModel().parse(dragged.node?.treeNode.model);

    if (dragged.node) dragged.node.treeNode.drop();

    if (target?.node?.treeNode) {
      target.node.treeNode.parent.addChildAtIndex(newDraggedNode, target.node?.treeNode.getIndex());
    } else {
      treeItems.addChild(newDraggedNode);
    }

    onItemDragEnd([...treeItems.model.children], dragged.node?.treeNode as TreeNode, target?.node?.treeNode);
  };

  return itemsToRender.length ? (
    <div>
      <Ghost ref={itemGhostRef} />
      <SortableContainer
        hideSortableGhost
        helperClass="ds-tree-menu-helper"
        distance={5}
        onSortEnd={handleSortEnd}
        onSortStart={handleSortStart}
        onSortOver={handleSortOver}
        getContainer={getContainer}
      >
        {itemsToRender.map((item, index) => {
          const ItemComponent = draggable || item.draggable ? SortableItem : Item;
          return (
            /*
            // @ts-ignore */
            <ItemComponent
              key={item.model.key}
              draggable={draggable}
              item={item}
              index={index}
              depth={item.depth}
              addItemList={addItemList}
              expandedKeys={expandedKeys}
              searchQuery={searchQuery}
              texts={texts}
              hasClipboard={hasClipboard}
              {...itemProps}
            />
          );
        })}
      </SortableContainer>
    </div>
  ) : (
    <EmptyList texts={texts} />
  );
}
