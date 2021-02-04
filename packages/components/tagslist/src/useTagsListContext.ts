import * as React from 'react';

import TagsListContext, { ContextValues } from './TagsListContext';

export default function useTagsListContext(): ContextValues {
  return React.useContext(TagsListContext) || {};
}