import type { CSSProperties, ReactElement, ReactNode } from 'react';

import type { IconName, IconPrefix } from '@fortawesome/fontawesome-svg-core';
import { type PopoverTriggerType } from '@synerise/ds-popover';

export type FilterItem<ValueType extends FAValue | ReactNode> = {
  keywords?: string;
  value: ValueType;
  item: ReactNode;
};

export type FilterElement<ValueType extends FAValue | ReactNode = ReactNode> =
  Category & {
    items: FilterItem<ValueType>[];
  };

export type DataSource = Category & {
  items: { item: ReactNode; value?: ReactNode; keywords?: string }[];
};

export type Category = {
  category: ReactNode;
};

export type FAValue = [IconPrefix, IconName];

export type ValueTypeForSource<Source extends SourceType> =
  Source extends FASource ? FAValue : ReactNode;

export type SelectItemHandler<Source extends SourceType> = (
  prop: ValueTypeForSource<Source>,
) => void;

export type GroupedFilterElement<Source extends SourceType> =
  | Category[]
  | FilterItem<ValueTypeForSource<Source>>[];

export type FASource = 'font-awesome';

export type DSSource = 'design-system';

export type SourceType = FASource | DSSource | DataSource[];

export type IconPickerProps<Source extends SourceType> = {
  button: ReactElement;
  data: Source;
  onSelect: SelectItemHandler<Source>;
  trigger: PopoverTriggerType[];
  placeholder: string;
  noResultMsg?: ReactNode;
  selectedIcon?: ReactNode;
  onClear?: () => void;
  clearTooltip?: ReactNode;
};

export type ListItemData<Source extends SourceType> = {
  elementSize: number;
  itemsPerRow: number;
  items: GroupedFilterElement<Source>[];
} & Pick<ListProps<Source>, 'onSelect'>;

export type ListProps<Source extends SourceType> = {
  data: FilterElement<ValueTypeForSource<Source>>[];
  onSelect: SelectItemHandler<Source>;
  noResultMsg?: ReactNode;
};

export type RowItemProps<Source extends SourceType> = {
  data: ListItemData<Source>;
  index: number;
  style: CSSProperties;
};
