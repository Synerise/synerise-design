import * as React from 'react';
import { useIntl } from 'react-intl';

import { TreeMenuTexts } from './TreeMenu.types';

export default function useTexts(texts: TreeMenuTexts | undefined): TreeMenuTexts {
  const { formatMessage } = useIntl();

  return React.useMemo(
    () => ({
      add: formatMessage({ id: 'DS.TAGS-LIST.ADD', defaultMessage: 'Add' }),
      addItemLabel: formatMessage({ id: 'DS.TAGS-LIST.ADD-ITEM', defaultMessage: 'Add item' }),
      addToFavourite: formatMessage({ id: 'DS.TAGS-LIST.FAVOURITE', defaultMessage: 'Favourite' }),
      applyAdd: formatMessage({ id: 'DS.TAGS-LIST.APPLY', defaultMessage: 'Apply' }),
      cut: formatMessage({ id: 'DS.TAGS-LIST.CUT', defaultMessage: 'Cut' }),
      paste: formatMessage({ id: 'DS.TAGS-LIST.CUT', defaultMessage: 'Paste' }),
      copy: formatMessage({ id: 'DS.TAGS-LIST.CUT', defaultMessage: 'Copy' }),
      cancel: formatMessage({ id: 'DS.TAGS-LIST.CANCEL', defaultMessage: 'Cancel' }),
      delete: formatMessage({ id: 'DS.TAGS-LIST.DELETE', defaultMessage: 'Delete' }),
      deleteConfirm: formatMessage({
        id: 'DS.TREEMENU.DELETE-CONFIRM',
        defaultMessage: 'Are you sure you want to delete?',
      }),
      duplicate: formatMessage({ id: 'DS.TAGS-LIST.DELETE', defaultMessage: 'Duplicate' }),
      edit: formatMessage({ id: 'DS.TAGS-LIST.RENAME', defaultMessage: 'Rename' }),
      enterSettings: formatMessage({ id: 'DS.TAGS-LIST.MANAGE-TAGS', defaultMessage: 'Manage tags' }),
      elements: formatMessage({ id: 'DS.TREEMENU.ELEMENTS', defaultMessage: 'Elements' }),
      favourite: formatMessage({ id: 'DS.TAGS-LIST.FAVOURITE', defaultMessage: 'Favourite' }),
      invalidNameError: formatMessage({ id: 'DS.TAGS-LIST.INVALID-NAME-ERROR', defaultMessage: 'Error' }),
      showLessLabel: formatMessage({ id: 'DS.TAGS-LIST.HIDE', defaultMessage: 'Hide' }),
      showMoreLabel: formatMessage({ id: 'DS.TAGS-LIST.SHOW', defaultMessage: 'Show' }),
      searchClear: formatMessage({ id: 'DS.TAGS-LIST.CLEAR', defaultMessage: 'Clear' }),
      less: formatMessage({ id: 'DS.TAGS-LIST.LESS', defaultMessage: 'less' }),
      loading: formatMessage({ id: 'DS.TAGS-LIST.LOADING', defaultMessage: 'Loading...' }),
      more: formatMessage({ id: 'DS.TAGS-LIST.MORE', defaultMessage: 'more' }),
      visibilityShow: formatMessage({ id: 'DS.TAGS-LIST.SHOW', defaultMessage: 'Show' }),
      visibilityShowIfUsed: formatMessage({ id: 'DS.TAGS-LIST.SHOW-IF-USED', defaultMessage: 'Show if used' }),
      visibilityHide: formatMessage({ id: 'DS.TAGS-LIST.HIDE', defaultMessage: 'Hide' }),
      ...texts,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [texts]
  );
}
