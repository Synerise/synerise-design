import type { ReactNode, CSSProperties, SVGProps } from 'react';
import type { IntlShape } from 'react-intl';
import type { ListItemProps } from '@synerise/ds-list-item';
import type { DropdownProps } from '@synerise/ds-dropdown/dist/Dropdown';

export type ItemRollElement = ListItemProps & {
  id: string;
  group?: string;
};

export type Texts =
  | 'changeSelectionLabel'
  | 'clearAllLabel'
  | 'itemsLabel'
  | 'moreLabel'
  | 'noResultsLabel'
  | 'popconfirmNoLabel'
  | 'popconfirmTitleLabel'
  | 'popconfirmYesLabel'
  | 'removeTooltipLabel'
  | 'searchClearTooltipLabel'
  | 'showLabel'
  | 'showLessLabel';

export type ItemsRollGroup = string;

export type ItemsRollProps = {
  // @deprecated
  intl?: IntlShape;
  items: ItemRollElement[];
  onSearch?: (value: string) => void;
  onSearchClear?: () => void;
  searchValue?: string;
  searchPlaceholder?: string;
  actions?: ItemRollElement[];
  changeSelectionIcon?: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  changeSelectionDropdownProps?: DropdownProps;
  customSidebarActions?: ReactNode;
  className?: string;
  groups?: ItemsRollGroup[];
  hideSearch?: boolean;
  maxToShowItems?: number;
  onClearAll?: () => void;
  onChangeSelection?: () => void;
  onItemRemove?: (id: string, group?: ItemsRollGroup) => void;
  onItemClick?: (id: string, group?: ItemsRollGroup) => void;
  style?: CSSProperties;
  showMoreStep?: number;
  texts?: {
    [k in Texts]?: ReactNode;
  };
  useFooter?: boolean;
  useVirtualizedList?: boolean;
  virtualizedRowHeight?: number;
  virtualizedRowWidth?: number;
};
