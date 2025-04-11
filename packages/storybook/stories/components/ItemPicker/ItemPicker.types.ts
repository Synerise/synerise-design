
import { ItemPickerListProps, ItemPickerPropsNew } from '@synerise/ds-item-picker';
import { ListItemProps } from '@synerise/ds-list-item';
import { InformationCardProps } from '@synerise/ds-information-card';

type SharedItemProps = {
  sectionId?: string;
  text: string;
  informationCardProps?: InformationCardProps
} & Omit<Partial<ListItemProps>, 'text'>;

export type SegmentationType = {
  itemType: 'segmentation';
  createdDate?: string;
  updatedDate?: string;
  usedIn?: number;
  author?: string;
  value?: number;
} & SharedItemProps

export type AttributeType = {
  itemType: 'attribute';
  createdDate?: string;
  updatedDate?: string;
  usedIn?: number;
  author?: string;
  value?: number;
} & SharedItemProps

export type FunnelType = {
  itemType: 'funnel';
  createdDate?: string;
  updatedDate?: string;
  usedIn?: number;
  author?: string
} & SharedItemProps

export type SimpleItem = {
  itemType?: undefined;
} & SharedItemProps

export type ItemType = FunnelType | SegmentationType | SimpleItem | AttributeType;

export type SectionType = {
  id: string;
  text: string;
  folders?: SectionType[];
};

export type NestedSectionType = {
  id: string;
  text: string;
  folders?: NestedSectionType[];
};


export type StoryPropsOverlay = ItemPickerListProps<ItemType, SectionType>;
export type StoryProps = ItemPickerPropsNew<ItemType, SectionType>;
