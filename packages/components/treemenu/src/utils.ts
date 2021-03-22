import TreeModel from 'tree-model';

import { TreeMenuItem, TreeMenuItems, TreeMenuNode, TreeMenuNodes } from './TreeMenu.types';

/**
 * Generates TreeModel for items
 * @param items Your data in array
 */
export function generateTree(items: TreeMenuItems): TreeModel.Node<TreeMenuItem> {
  const treeModel = new TreeModel();
  const model = treeModel.parse({
    name: 'root',
    children: items,
  });

  return model;
}

/**
 * Gets count of all items
 * @param items tree object
 */
export function getCount(items: TreeMenuItems): number {
  let count = items.length;
  items.forEach(item => {
    if (item.children) count += getCount(item.children);
  });
  return count;
}

/**
 * Checks does children have query string
 * @param items TreeModel
 * @param searchQuery string you are looking for
 */
export function childrenHaveString(items: TreeMenuNodes, searchQuery: string): boolean {
  let haveString = false;

  items.forEach(item => {
    if (item.model.name.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1) {
      haveString = true;
      return;
    }
    if (!haveString && item.children) haveString = childrenHaveString(item.children, searchQuery);
  });

  return haveString;
}

/**
 * Flattens the the tree to array
 * @param items TreeModel tree
 * @param depth how deep is it
 * @param expandedKeys
 * @param searchQuery
 */
export function getItemsToRender(
  items: TreeMenuNodes,
  depth = 0,
  expandedKeys: TreeMenuNodes,
  searchQuery: string
): TreeMenuNodes {
  const newItems: TreeMenuNodes = [];

  items.forEach((rawItem, index) => {
    const thisItem = rawItem;
    const { children } = thisItem;
    if (!thisItem.model) return;
    const { name } = thisItem.model;

    thisItem.depth = depth;
    thisItem.index = index;

    if (
      searchQuery &&
      !(
        name.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1 ||
        (children && childrenHaveString(children, searchQuery))
      )
    )
      return;

    newItems.push(thisItem);

    if (children && (expandedKeys.indexOf(thisItem) > -1 || searchQuery)) {
      const childrenItems = getItemsToRender(thisItem.children, depth + 1, expandedKeys, searchQuery);
      childrenItems.forEach(item => newItems.push(item));
    }
  });

  return newItems;
}

export function getKeyFromItem(item: TreeMenuNode): string {
  let itemKey = '';
  if (item.parent?.index !== undefined) itemKey = `${getKeyFromItem(item.parent)}-`;
  itemKey = `${itemKey}${item.index}-${item.model.name}`;
  return itemKey;
}
