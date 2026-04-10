import { type TagsProps } from '@synerise/ds-tags';
import { type WithHTMLAttributes } from '@synerise/ds-utils';

export type BaseTagsGroupProps = {
  disabled?: boolean;
  isLoading?: boolean;
  isError?: boolean;
  tagsProps?: TagsProps;
};

export type TagsGroupProps = WithHTMLAttributes<
  HTMLDivElement,
  BaseTagsGroupProps
>;
