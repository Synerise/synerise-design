import { useContext } from 'react';
import TagsListContext, { ContextValues } from './TagsListContext';

export default function useTagsListContext(): ContextValues {
  return useContext(TagsListContext) || {};
}
