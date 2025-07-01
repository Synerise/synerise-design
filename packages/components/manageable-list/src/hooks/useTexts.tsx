import React, { useMemo } from 'react';
import { FormattedMessage } from 'react-intl';

import { type Texts } from '../ManageableList.types';

export const useTexts = (defaultTexts?: Partial<Texts>): Texts => {
  const translations = useMemo(
    () => ({
      addItemLabel: (
        <FormattedMessage
          id="DS.MANAGABLE-LIST.ADD-ITEM"
          defaultMessage="Add item"
        />
      ),
      showMoreLabel: (
        <FormattedMessage
          id="DS.MANAGABLE-LIST.SHOW-MORE"
          defaultMessage="Show more"
        />
      ),
      showLessLabel: (
        <FormattedMessage
          id="DS.MANAGABLE-LIST.SHOW-LESS"
          defaultMessage="Show less"
        />
      ),
      more: (
        <FormattedMessage id="DS.MANAGABLE-LIST.MORE" defaultMessage="more" />
      ),
      less: (
        <FormattedMessage id="DS.MANAGABLE-LIST.LESS" defaultMessage="less" />
      ),
      activateItemTitle: (
        <FormattedMessage
          id="DS.MANAGABLE-LIST.ACTIVATE-ITEM"
          defaultMessage="Active item"
        />
      ),
      activate: (
        <FormattedMessage
          id="DS.MANAGABLE-LIST.ACTIVATE"
          defaultMessage="Activate"
        />
      ),
      cancel: (
        <FormattedMessage
          id="DS.MANAGABLE-LIST.CANCEL"
          defaultMessage="Cancel"
        />
      ),
      deleteConfirmationTitle: (
        <FormattedMessage
          id="DS.MANAGABLE-LIST.DELETE-ITEM-TITLE"
          defaultMessage="Delete item"
        />
      ),
      deleteConfirmationDescription: (
        <FormattedMessage
          id="DS.MANAGABLE-LIST.DELETE-ITEM-DESCRIPTION"
          defaultMessage="Deleting this item will permanently remove it from templates library."
        />
      ),
      deleteConfirmationYes: (
        <FormattedMessage id="DS.MANAGABLE-LIST.DELETE" defaultMessage="Yes" />
      ),
      deleteConfirmationNo: (
        <FormattedMessage id="DS.MANAGABLE-LIST.CANCEL" defaultMessage="No" />
      ),
      itemActionRename: (
        <FormattedMessage
          id="DS.MANAGABLE-LIST.ITEM-RENAME"
          defaultMessage="Rename"
        />
      ),
      itemActionRenameTooltip: (
        <FormattedMessage
          id="DS.MANAGABLE-LIST.ITEM-RENAME"
          defaultMessage="Rename"
        />
      ),
      itemActionDuplicate: (
        <FormattedMessage
          id="DS.MANAGABLE-LIST.ITEM-DUPLICATE"
          defaultMessage="Duplicate"
        />
      ),
      itemActionDuplicateTooltip: (
        <FormattedMessage
          id="DS.MANAGABLE-LIST.ITEM-DUPLICATE"
          defaultMessage="Duplicate"
        />
      ),
      itemActionDelete: (
        <FormattedMessage
          id="DS.MANAGABLE-LIST.ITEM-DELETE"
          defaultMessage="Delete"
        />
      ),
      itemActionDeleteTooltip: (
        <FormattedMessage
          id="DS.MANAGABLE-LIST.ITEM-DELETE"
          defaultMessage="Delete"
        />
      ),
      moveToTopTooltip: (
        <FormattedMessage
          id="DS.MANAGABLE-LIST.MOVE-TO-TOP"
          defaultMessage="Move to the top of list"
        />
      ),
      moveToBottomTooltip: (
        <FormattedMessage
          id="DS.MANAGABLE-LIST.MOVE-TO-BOTTOM"
          defaultMessage="Move to the bottom of list"
        />
      ),
      ...(defaultTexts || {}),
    }),
    [defaultTexts],
  );

  return translations;
};
