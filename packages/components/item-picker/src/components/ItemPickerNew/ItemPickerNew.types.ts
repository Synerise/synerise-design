import type { ReactNode, Ref } from 'react';

import type { DropdownProps } from '@synerise/ds-dropdown';
import type { FormFieldCommonProps } from '@synerise/ds-form-field';
import type { InformationCardTooltipProps } from '@synerise/ds-information-card';
import { type ScrollbarAdditionalProps } from '@synerise/ds-scrollbar';
import { type SearchBarProps } from '@synerise/ds-search-bar';
import type { WithHTMLAttributes } from '@synerise/ds-utils';

import { type ItemSelectHandler } from '../ItemPickerList/ItemPickerList.types';
import type { RenderMode } from '../ItemPickerList/types/renderMode';
import type {
  ItemPickerTriggerProps,
  ItemPickerTriggerTexts,
} from '../ItemPickerTrigger/Trigger.types';
import { type Action } from './types/actions.types';
import type {
  BaseItemType,
  BaseSectionType,
  BaseSectionTypeWithFolders,
} from './types/baseItemSectionType.types';

type HeightConfig = {
  defaultHeight: number;
  viewportHeightThreshold?: number;
  belowThresholdHeight?: number;
};

export type ContainerHeightType = 'fitContent' | 'fillSpace' | HeightConfig;

export type ItemLoaderMeta = Record<string, unknown> | undefined;

export type ItemLoaderResponse<ItemType extends BaseItemType> = {
  items: ItemType[];
  total: number;
  meta?: ItemLoaderMeta;
};

export type LoaderProps = {
  sectionId?: BaseSectionType['id'];
  page: number;
  limit: number;
  searchQuery?: string;
  meta?: ItemLoaderMeta;
  abortController?: AbortController;
  searchKey?: string;
  searchInItem?: BaseItemType;
};

export type OnLoadedData = (
  options: Pick<LoaderProps, 'sectionId' | 'meta'> & {
    renderMode: RenderMode;
  },
) => void;

export type ItemLoaderConfig<ItemType extends BaseItemType> = {
  limitPerPage?: number; // 50
  limitPerSection?: number; // 5
  loadItems: (props: LoaderProps) => Promise<ItemLoaderResponse<ItemType>>;
};

export type ItemsConfig<ItemType extends BaseItemType> = {
  limitPerSection?: number;
  items: ItemType[];
};

export type ItemPickerTexts = ItemPickerListTexts & ItemPickerTriggerTexts;

export type ItemPickerProps<
  ItemType extends BaseItemType,
  SectionType extends BaseSectionType | undefined,
> = WithHTMLAttributes<
  HTMLDivElement,
  {
    isNewVersion: true;
    renderTrigger?: (
      props: Pick<
        ItemPickerTriggerProps,
        'disabled' | 'error' | 'selected' | 'openDropdown' | 'closeDropdown'
      >,
    ) => ReactNode;
    texts?: Partial<ItemPickerTexts>;
    triggerProps?: {
      size?: ItemPickerTriggerProps['size'];
      allowClear?: boolean;
      withChangeButton?: ItemPickerTriggerProps['withChangeButton'];
      withClearConfirmation?: ItemPickerTriggerProps['withClearConfirmation'];
      informationCardTooltipProps?: Omit<
        InformationCardTooltipProps,
        'children'
      >;
    };
    /**
     * @deprecated - use errorText prop instead
     */
    errorMessage?: FormFieldCommonProps['errorText'];
    error?: boolean;
    disabled?: boolean;
    onChange?: (item: ItemType) => void;
    onFocus?: () => void;
    onBlur?: () => void;
    onLoadedData?: OnLoadedData;
    dropdownProps?: Partial<DropdownProps>;
  } & Pick<
    ItemPickerListProps<ItemType, SectionType>,
    | 'items'
    | 'actions'
    | 'recents'
    | 'sections'
    | 'isLoading'
    | 'onRefresh'
    | 'onSectionChange'
    | 'containerHeight'
    | 'showItemsSectionLabel'
    | 'noResultsIcon'
    | 'emptyListIcon'
    | 'selectedItem'
    | 'getItemHeight'
    | 'scrollbarProps'
    | 'searchBarProps'
    | 'includeFooter'
    | 'includeSearchBar'
  >
> &
  FormFieldCommonProps &
  Partial<
    Pick<ItemPickerTriggerProps, 'placeholder' | 'placeholderIcon' | 'onClear'>
  >;

export type TextsAsReactNode =
  | 'basicSearchPlaceholder'
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
  SectionType extends BaseSectionType | undefined,
> = WithHTMLAttributes<
  HTMLDivElement,
  {
    recents?: ItemType[];
    actions?: Action[];
    texts?: Partial<ItemPickerListTexts>;
    containerHeight?: ContainerHeightType;
    showItemsSectionLabel?: boolean;
    noResultsIcon?: ReactNode;
    emptyListIcon?: ReactNode;
    onItemSelect: ItemSelectHandler<ItemType, SectionType>;
    onSectionChange?: SectionType extends BaseSectionType
      ? (section?: BaseSectionTypeWithFolders<SectionType>) => void
      : undefined;
    selectedItem?: ItemType;
    getItemHeight?: (item: ItemType | SectionType | Action) => number;
    scrollbarProps?: ScrollbarAdditionalProps;
    searchBarProps?: Omit<
      SearchBarProps,
      'value' | 'onSearchChange' | 'placeholder'
    >;
    onRefresh?: () => void;
    items: ItemType[] | ItemsConfig<ItemType> | ItemLoaderConfig<ItemType>;
    isLoading?: boolean;
    isVisible?: boolean;
    sections?: SectionType extends BaseSectionType
      ? BaseSectionTypeWithFolders<SectionType>[]
      : undefined;
    containerRef?: Ref<HTMLDivElement>;
    includeSearchBar?: boolean;
    includeFooter?: boolean;
    onLoadedData?: OnLoadedData;
    isDropdown?: boolean;
  }
>;
