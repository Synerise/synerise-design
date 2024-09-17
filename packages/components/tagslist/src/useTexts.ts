import React from 'react';
import { useIntl } from 'react-intl';

import { TagsListTexts } from './TagsList.types';

export default function useTexts(texts: TagsListTexts | undefined): TagsListTexts {
  const { formatMessage } = useIntl();

  return React.useMemo(
    () => ({
      add: formatMessage({ id: 'DS.TAGS-LIST.ADD', defaultMessage: 'Add' }),
      addItemLabel: formatMessage({ id: 'DS.TAGS-LIST.ADD-ITEM', defaultMessage: 'Add tag' }),
      addToFavourite: formatMessage({ id: 'DS.TAGS-LIST.FAVOURITE', defaultMessage: 'Add to starred' }),
      applyAdd: formatMessage({ id: 'DS.TAGS-LIST.APPLY', defaultMessage: 'Apply' }),
      cancel: formatMessage({ id: 'DS.TAGS-LIST.CANCEL', defaultMessage: 'Cancel' }),
      delete: formatMessage({ id: 'DS.TAGS-LIST.DELETE', defaultMessage: 'Delete' }),
      deleteFromFavourites: formatMessage({
        id: 'DS.TAGS-LIST.DELETE-FROM-FAVOURITE',
        defaultMessage: 'Remove from starred',
      }),
      edit: formatMessage({ id: 'DS.TAGS-LIST.RENAME', defaultMessage: 'Rename' }),
      enterSettings: formatMessage({ id: 'DS.TAGS-LIST.MANAGE-TAGS', defaultMessage: 'Manage tags' }),
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
