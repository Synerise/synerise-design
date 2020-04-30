import * as React from 'react';
import { IntlShape } from 'react-intl';
import { MenuItemProps } from '@synerise/ds-menu/dist/Elements/Item/MenuItem.types';

export type ItemRollElement = MenuItemProps & {
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

export type ItemsRollProps = {
  intl: IntlShape;
  items: ItemRollElement[];
  onSearch: (value: string) => void;
  onSearchClear: () => void;
  searchValue: string;
  searchPlaceholder: string;
  actions?: ItemRollElement[];
  changeSelectionIcon?: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
  className?: string;
  groups?: string[];
  maxToShowItems?: number;
  onClearAll?: () => void;
  onChangeSelection?: () => void;
  onItemRemove?: (id: string) => void;
  onItemClick?: (id: string) => void;
  style?: React.CSSProperties;
  showMoreStep?: number;
  texts?: {
    [k in Texts]: string | React.ReactNode;
  };
  useFooter?: boolean;
  useVirtualizedList?: boolean;
  virtualizedRowHeight?: number;
  virtualizedRowWidth?: number;
};
