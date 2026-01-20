import type { InformationCardProps } from '@synerise/ds-information-card';
import type { ListItemProps } from '@synerise/ds-list-item';

import type { ItemPickerListTexts } from './itemPickerListTexts.types';

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
  | 'popoverProps'
  | 'timeToHideTooltip'
>;

export type BaseSectionType = InheritedFromListItem & {
  text: string;
  id: string | number;
  texts?: Partial<
    Pick<
      ItemPickerListTexts,
      'noResultsInSection' | 'searchAllFoldersButtonLabel'
    >
  >;
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
