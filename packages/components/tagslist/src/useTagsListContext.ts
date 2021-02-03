import * as React from 'react';

import TagsListContext from './TagsListContext';

export default function useTagsListContext() {
  return React.useContext(TagsListContext) || {};
}