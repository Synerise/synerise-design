import type { ReactNode, Ref } from 'react';

import type { ListItemProps } from '@synerise/ds-list-item';
import type { ScrollbarAdditionalProps } from '@synerise/ds-scrollbar';

import type { SearchBarProps } from '@synerise/ds-search-bar';
import type { WithHTMLAttributes } from '@synerise/ds-utils';
import type {
  BaseSectionType,
  BaseSectionTypeWithFolders,
  ItemLoaderConfig,
  ActionType,
  ContainerHeightType,
  BaseItemType,
  ItemsConfig,
} from '../ItemPickerNew/ItemPickerNew.types';

type TextsAsReactNode =
  | 'searchPlaceholder'
  | 'refreshButtonLabel'
  | 'showMoreResultsLabel'
  | 'noItems'
  | 'noResults'
  | 'noResultsInSection'
  | 'searchAllFoldersButtonLabel'
  | 'recentsSectionLabel'
  | 'actionsSectionLabel'
  | 'resultsSectionLabel'
  | 'noActions'
  | 'itemsSectionLabel'
  | 'infiniteScrollLoadingMore'
  | 'infiniteScrollLoadingError'
  | 'errorMessageTitle'
  | 'errorMessageDetails'
  | 'backTooltip'
  | 'clearSearchTooltip'
  | 'infiniteScrollAllLoaded';

export type ItemPickerListTexts = {
  [key in TextsAsReactNode]: ReactNode;
};

export type ItemPickerListProps<
  ItemType extends BaseItemType,
  SectionType extends BaseSectionType | undefined
> = WithHTMLAttributes<
  HTMLDivElement,
  {
    recents?: ItemType[];
    actions?: ActionType[];
    texts?: Partial<ItemPickerListTexts>;
    containerHeight?: ContainerHeightType;
    showItemsSectionLabel?: boolean;
    noResultsIcon?: ReactNode;
    emptyListIcon?: ReactNode;
    onItemSelect: (item: ItemType) => void;
    onSectionChange?: SectionType extends BaseSectionType
      ? (section?: BaseSectionTypeWithFolders<SectionType>) => void
      : undefined;
    selectedItem?: ItemType;
    getItemHeight?: (item: ItemType | SectionType | ActionType) => number;
    scrollbarProps?: ScrollbarAdditionalProps;
    searchBarProps?: Omit<SearchBarProps, 'value' | 'onSearchChange' | 'placeholder'>;
    onRefresh?: () => void;
    items: ItemType[] | ItemsConfig<ItemType> | ItemLoaderConfig<ItemType>;
    isLoading?: boolean;
    isVisible?: boolean;
    sections?: SectionType extends BaseSectionType ? BaseSectionTypeWithFolders<SectionType>[] : undefined;
    containerRef?: Ref<HTMLDivElement>;
    includeSearchBar?: boolean;
    includeFooter?: boolean;
  }
>;

export type TitleListItemProps = Omit<ListItemProps, 'type'> & {
  type: 'title';
};
