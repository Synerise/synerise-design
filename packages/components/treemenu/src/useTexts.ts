import React from 'react';
import { useIntl } from 'react-intl';

import { TreeMenuTexts } from './TreeMenu.types';

export default function useTexts(texts: TreeMenuTexts | undefined): TreeMenuTexts {
  const { formatMessage } = useIntl();

  return React.useMemo(
    () => ({
      add: formatMessage({ id: 'DS.TREE-MENU.ADD', defaultMessage: 'Add' }),
      addItemLabel: formatMessage({ id: 'DS.TREE-MENU.ADD-ITEM', defaultMessage: 'Add item' }),
      addToFavourite: formatMessage({ id: 'DS.TREE-MENU.FAVOURITE', defaultMessage: 'Favourite' }),
      applyAdd: formatMessage({ id: 'DS.TREE-MENU.APPLY', defaultMessage: 'Apply' }),
      cut: formatMessage({ id: 'DS.TREE-MENU.CUT', defaultMessage: 'Cut' }),
      paste: formatMessage({ id: 'DS.TREE-MENU.CUT', defaultMessage: 'Paste' }),
      copy: formatMessage({ id: 'DS.TREE-MENU.CUT', defaultMessage: 'Copy' }),
      cancel: formatMessage({ id: 'DS.TREE-MENU.CANCEL', defaultMessage: 'Cancel' }),
      delete: formatMessage({ id: 'DS.TREE-MENU.DELETE', defaultMessage: 'Delete' }),
      showItem: formatMessage({ id: 'DS.TREE-MENU.SHOW-ITEM', defaultMessage: 'Show item' }),
      hideItem: formatMessage({ id: 'DS.TREE-MENU.HIDE-ITEM', defaultMessage: 'Hide item' }),
      deleteConfirm: formatMessage({
        id: 'DS.TREEMENU.DELETE-CONFIRM',
        defaultMessage: 'Are you sure you want to delete?',
      }),
      duplicate: formatMessage({ id: 'DS.TREE-MENU.DELETE', defaultMessage: 'Duplicate' }),
      edit: formatMessage({ id: 'DS.TREE-MENU.RENAME', defaultMessage: 'Rename' }),
      enterSettings: formatMessage({ id: 'DS.TREE-MENU.MANAGE-TAGS', defaultMessage: 'Manage tags' }),
      elements: formatMessage({ id: 'DS.TREEMENU.ELEMENTS', defaultMessage: 'Elements' }),
      favourite: formatMessage({ id: 'DS.TREE-MENU.FAVOURITE', defaultMessage: 'Favourite' }),
      invalidNameError: formatMessage({ id: 'DS.TREE-MENU.INVALID-NAME-ERROR', defaultMessage: 'Error' }),
      showLessLabel: formatMessage({ id: 'DS.TREE-MENU.HIDE', defaultMessage: 'Hide' }),
      showMoreLabel: formatMessage({ id: 'DS.TREE-MENU.SHOW', defaultMessage: 'Show' }),
      search: formatMessage({ id: 'DS.TREE-MENU.SEARCH', defaultMessage: 'Search' }),
      searchClear: formatMessage({ id: 'DS.TREE-MENU.CLEAR', defaultMessage: 'Clear' }),
      less: formatMessage({ id: 'DS.TREE-MENU.LESS', defaultMessage: 'less' }),
      loading: formatMessage({ id: 'DS.TREE-MENU.LOADING', defaultMessage: 'Loading...' }),
      more: formatMessage({ id: 'DS.TREE-MENU.MORE', defaultMessage: 'more' }),
      visibilityShow: formatMessage({ id: 'DS.TREE-MENU.SHOW', defaultMessage: 'Show' }),
      visibilityShowIfUsed: formatMessage({ id: 'DS.TREE-MENU.SHOW-IF-USED', defaultMessage: 'Show if used' }),
      visibilityHide: formatMessage({ id: 'DS.TREE-MENU.HIDE', defaultMessage: 'Hide' }),
      cutTooltip: formatMessage({ id: 'DS.TREE-MENU.CUT_TOOLTIP', defaultMessage: 'Cut element should be pasted' }),
      noResults: formatMessage({ id: 'DS.TREE-MENU.NO_RESULTS', defaultMessage: 'No results' }),
      pasteTooltip: formatMessage({ id: 'DS.TREE-MENU.PASTE_TOOLTIP', defaultMessage: 'Paste in place' }),
      ...texts,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [texts]
  );
}
