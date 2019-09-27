export interface Messages {
  inputTooltip?: string;
  limitReached?: string;
  duplicate?: string;
  remove?: string;
}

export interface Variant {
  className: string;
  tabId: string;
  tabLetter: string;
  name: string;
}

export interface Props {
  currentTabIndex: number;
  intl: Record<string, any>;
  maxTabCount?: number;
  onAddTab: Function;
  onChangeTab: Function;
  onChangeName: Function;
  onDuplicateTab: Function;
  onRemoveTab: Function;
  onSortTabs?: Function;
  tabCount: number;
  variants: Array<Variant>;
  activeColor?: string | ((theme: Record<string, any>, tabIndex: number) => string);
  tabsColorMap?: Record<string, any>;
  className?: string;
  style?: Record<string, any>;
  messages?: Messages;
  nameInputProps?: Record<string, any>;
  hideDragHandle?: boolean;
}

export interface State {
  dragging: boolean;
}
