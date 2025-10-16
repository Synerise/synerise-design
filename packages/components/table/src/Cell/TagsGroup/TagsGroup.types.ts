import { type TagsProps } from '@synerise/ds-tags';
import { type WithHTMLAttributes } from '@synerise/ds-utils';

export type TagsGroupProps = WithHTMLAttributes<
  HTMLDivElement,
  {
    disabled?: boolean;
    isLoading?: boolean;
    isError?: boolean;
    tagsProps?: TagsProps;
  }
>;
