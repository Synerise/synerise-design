import type { ReactNode, CSSProperties, SVGProps } from 'react';
import type { IntlShape } from 'react-intl';
import type { MenuItemProps } from '@synerise/ds-menu';
import type { ListItemProps } from '@synerise/ds-list-item';
import type { DropdownProps } from '@synerise/ds-dropdown/dist/Dropdown';

export type ItemRollElement<BaseType extends ListItemProps | MenuItemProps = ListItemProps> = BaseType & {
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
  isDisabled?: boolean;
  items: ItemRollElement[];
  onSearch?: (value: string) => void;
  renderCount?: (count: number) => ReactNode;
  onSearchClear?: () => void;
  searchValue?: string;
  searchPlaceholder?: string;
  actions?: ItemRollElement<MenuItemProps>[];
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
