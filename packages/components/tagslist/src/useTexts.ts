import * as React from 'react';
import { useIntl } from 'react-intl';

import { TagsListTexts } from "./TagsList.types";

export default function useTexts(texts: TagsListTexts = {}): TagsListTexts {
  const { formatMessage } = useIntl();

  return React.useMemo(() => ({
    add: formatMessage({id: 'DS.TAGS-LIST.ADD'}),
    addItemLabel: formatMessage({id: 'DS.TAGS-LIST.ADD-ITEM'}),
    addToFavourite: formatMessage({id: 'DS.TAGS-LIST.FAVOURITE'}),
    applyAdd: formatMessage({id: 'DS.TAGS-LIST.APPLY'}),
    cancel: formatMessage({id: 'DS.TAGS-LIST.CANCEL'}),
    delete: formatMessage({id: 'DS.TAGS-LIST.DELETE'}),
    deleteFolderLabel: 'Remove folder',
    deleteFolderConfirmationMessage: 'Are you sure you want to remove folder',
    deleteFolderDescription: 'What you want to do with content? ',
    deleteFromFavourites: 'Favourite',
    deleteAllContent: 'Remove all items',
    edit: formatMessage({id: 'DS.TAGS-LIST.RENAME'}),
    enterSettings: formatMessage({id: 'DS.TAGS-LIST.MANAGE-TAGS'}),
    favourite: formatMessage({id: 'DS.TAGS-LIST.FAVOURITE'}),
    invalidNameError: formatMessage({id: 'DS.TAGS-LIST.INVALID-NAME-ERROR'}),
    folderNamePlaceholder: 'Folder name',
    showLessLabel: formatMessage({id: 'DS.TAGS-LIST.HIDE'}),
    showMoreLabel: formatMessage({id: 'DS.TAGS-LIST.SHOW'}),
    searchClear: formatMessage({id: 'DS.TAGS-LIST.CLEAR'}),
    less: formatMessage({id: 'DS.TAGS-LIST.LESS'}),
    loading: formatMessage({id: 'DS.TAGS-LIST.LOADING'}),
    more: formatMessage({id: 'DS.TAGS-LIST.MORE'}),
    visibilityShow: formatMessage({id: 'DS.TAGS-LIST.SHOW'}),
    visibilityShowIfUsed: formatMessage({id: 'DS.TAGS-LIST.SHOW-IF-USED'}),
    visibilityHide: formatMessage({id: 'DS.TAGS-LIST.HIDE'}),
    ...texts
  }), [texts, formatMessage]);
}