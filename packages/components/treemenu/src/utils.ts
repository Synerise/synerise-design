import TreeModel from 'tree-model';

import { TreeData, TreeNode } from './TreeMenu.types';

/**
 * Generates TreeModel for items
 * @param items Your data in array
 */
export function generateTree(items: TreeData[]): TreeNode {
  const treeModel = new TreeModel();
  const model = treeModel.parse({
    key: 'root',
    title: 'root',
    children: items,
  });

  return model;
}

/**
 * Gets count of all items
 * @param items your tree data
 */
export function getCount(items: TreeData[]): number {
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
export function childrenHaveString(items: TreeNode[], searchQuery: string): boolean {
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
 */
export function getItemsToRender(
  items: TreeNode[],
  depth = 0,
  expandedKeys: React.ReactText[],
  searchQuery: string
): TreeNode[] {
  const newItems: TreeNode[] = [];

  items.forEach((rawItem, index) => {
    const thisItem = rawItem;
    const { children } = thisItem;
    if (!thisItem.model) return;
    const { title, key } = thisItem.model;

    thisItem.depth = depth;
    thisItem.index = index;

    if (
      searchQuery &&
      !(
        title.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1 ||
        (children && childrenHaveString(children, searchQuery))
      )
    )
      return;

    newItems.push(thisItem);

    if (children && (expandedKeys.includes(key) || searchQuery)) {
      const childrenItems = getItemsToRender(thisItem.children, depth + 1, expandedKeys, searchQuery);
      childrenItems.forEach(item => newItems.push(item));
    }
  });

  return newItems;
}

export function getKeyFromItem(item: TreeNode): string {
  let itemKey = '';
  if (item.parent?.index !== undefined) itemKey = `${getKeyFromItem(item.parent)}-`;
  itemKey = `${itemKey}${item.index}-${item.model.name}`;
  return itemKey;
}

export const validateItemName = (name: string): boolean => {
  const trimmedName = name.trim();
  // eslint-disable-next-line no-useless-escape
  const CONTAINS_ONLY_ALLOWED_CHARACTERS = /^[^\\\/\?\*\"\>\<\:\|]*$/im;
  if (!trimmedName || !trimmedName.match(CONTAINS_ONLY_ALLOWED_CHARACTERS)) {
    return false;
  }
  return true;
};
