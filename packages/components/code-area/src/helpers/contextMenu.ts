// Generally this code looks like bad smell but this is this is the only one road
// to accomplish removing items from contextmenu in monaco-editor
// https://github.com/microsoft/monaco-editor/issues/1280#issuecomment-459507645

// @ts-ignore
import * as actions from 'monaco-editor/esm/vs/platform/actions/common/actions';

import { LinkedList, MenuLinkElement, MenuId } from '../CodeArea.types';

const removeById = (list: LinkedList<MenuLinkElement>, ids: string[]) => {
  let node = list._first;
  do {
    const commandId = node.element?.command?.id;
    if (commandId) {
      const shouldRemove = ids.includes(commandId);
      if (shouldRemove) {
        list._remove(node);
      }
    }
  } while ((node = node.next));
};

export const removeContextMenuElements = (menu: string, ids: string[]) => {
  if (!menu) {
    return;
  }

  const menus: Map<MenuId, LinkedList<MenuLinkElement>> = actions?.MenuRegistry?._menuItems;
  const [, contextMenuLinks] = [...menus].find((entry) => entry[0]._debugName === menu) || [];

  if (contextMenuLinks) {
    removeById(contextMenuLinks, ids);
  }
};
