import type { InformationCardProps } from '@synerise/ds-information-card';
import type { ListItemProps } from '@synerise/ds-list-item';

export type InheritedFromListItem = Pick<
  ListItemProps,
  | 'id'
  | 'type'
  | 'selected'
  | 'prefixel'
  | 'prefixVisibilityTrigger'
  | 'suffixel'
  | 'suffixVisibilityTrigger'
  | 'highlight'
  | 'renderHoverTooltip'
  | 'hoverTooltipProps'
  | 'timeToHideTooltip'
>;

export type BaseSectionType = InheritedFromListItem & {
  text: string;
  id: string | number;
};

export type BaseSectionTypeWithFolders<SectionType extends BaseSectionType> =
  SectionType & {
    folders?: BaseSectionTypeWithFolders<SectionType>[];
  };

export type BaseItemType = InheritedFromListItem & {
  text: string;
  sectionId?: BaseSectionType['id'];
  informationCardProps?: InformationCardProps;
};
