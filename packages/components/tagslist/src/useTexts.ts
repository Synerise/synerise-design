import * as React from 'react';
import { TagsListTexts } from "./TagsList.types";
import { useIntl } from 'react-intl';

export default function useTexts(texts: TagsListTexts = {}): TagsListTexts {
  const { formatMessage } = useIntl();

  return React.useMemo(() => ({
    addItemLabel: formatMessage({id: 'DS.TAGS-LIST.ADD-ITEM'}),
    ...texts
  }), [texts]);
}