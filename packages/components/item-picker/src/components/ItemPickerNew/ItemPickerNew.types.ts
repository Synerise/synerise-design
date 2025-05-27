import type { ReactNode } from 'react';

import type { ListItemProps } from '@synerise/ds-list-item';
import type { InformationCardProps } from '@synerise/ds-information-card';
import type { WithHTMLAttributes } from '@synerise/ds-utils';
import type { DropdownProps } from '@synerise/ds-dropdown';
import type { FormFieldCommonProps } from '@synerise/ds-form-field';

import type { ItemPickerListProps, ItemPickerListTexts } from '../ItemPickerList/ItemPickerList.types';
import type { ItemPickerTriggerProps, ItemPickerTriggerTexts } from '../ItemPickerTrigger/Trigger.types';

type HeightConfig = {
  defaultHeight: number;
  viewportHeightThreshold?: number;
  belowThresholdHeight?: number;
};

export type ContainerHeightType = 'fitContent' | 'fillSpace' | HeightConfig;

type InheritedFromListItem = Pick<
  ListItemProps,
  | 'id'
  | 'type'
  | 'selected'
  | 'prefixel'
  | 'highlight'
  | 'renderHoverTooltip'
  | 'hoverTooltipProps'
  | 'timeToHideTooltip'
>;

export type BaseSectionType = InheritedFromListItem & {
  text: string;
  id: string | number;
};

export type BaseSectionTypeWithFolders<SectionType extends BaseSectionType> = SectionType & {
  folders?: BaseSectionTypeWithFolders<SectionType>[];
};

export type BaseItemType = InheritedFromListItem & {
  text: string;
  sectionId?: BaseSectionType['id'];
  informationCardProps?: InformationCardProps;
};

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
};

export type ItemLoaderConfig<ItemType extends BaseItemType> = {
  limitPerPage?: number; // 50
  limitPerSection?: number; // 5
  loadItems: (props: LoaderProps) => Promise<ItemLoaderResponse<ItemType>>;
};

export type ItemsConfig<ItemType extends BaseItemType> = {
  limitPerSection?: number;
  items: ItemType[];
};

type RedirectActionType = {
  actionType: 'redirect';
};

type CustomActionType = {
  actionType: 'custom';
  onClick: (action: ActionType) => void;
};

export type ItemPickerTexts = ItemPickerListTexts & ItemPickerTriggerTexts;

export type ActionType = Omit<InheritedFromListItem, 'onClick'> & {
  sectionId?: BaseSectionType['id'];
  id: string | number;
  text: ReactNode;
  icon?: ReactNode;
} & (RedirectActionType | CustomActionType);

export type ItemPickerProps<
  ItemType extends BaseItemType,
  SectionType extends BaseSectionType | undefined
> = WithHTMLAttributes<
  HTMLDivElement,
  {
    isNewVersion: true;
    renderTrigger?: (
      props: Pick<ItemPickerTriggerProps, 'disabled' | 'error' | 'selected' | 'openDropdown' | 'closeDropdown'>
    ) => ReactNode;
    texts?: Partial<ItemPickerTexts>;
    triggerProps?: {
      size?: ItemPickerTriggerProps['size'];
      allowClear?: boolean;
      withChangeButton?: ItemPickerTriggerProps['withChangeButton'];
      withClearConfirmation?: ItemPickerTriggerProps['withClearConfirmation'];
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
  Partial<Pick<ItemPickerTriggerProps, 'placeholder' | 'placeholderIcon' | 'onClear'>>;
