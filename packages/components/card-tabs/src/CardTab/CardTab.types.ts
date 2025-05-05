import type { ReactNode, MouseEvent, KeyboardEvent } from 'react';
import type { IntlShape } from 'react-intl';
import type { DefaultColor } from '@synerise/ds-core';
import type { DragHandlePropType } from '@synerise/ds-sortable';

export enum prefixType {
  TAG,
  ICON,
  DOT,
  HANDLE,
}

export type Color =
  | 'red'
  | 'green'
  | 'grey'
  | 'yellow'
  | 'blue'
  | 'pink'
  | 'mars'
  | 'orange'
  | 'fern'
  | 'cyan'
  | 'purple'
  | 'violet';

export type ListItemEventType = MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>;

export type CardTabTexts = {
  changeNameTooltip?: ReactNode;
  previewTooltip?: ReactNode;
  removeTooltip?: ReactNode;
  duplicateTooltip?: ReactNode;
  changeNameMenuItem?: ReactNode;
  removeMenuItem?: ReactNode;
  duplicateMenuItem?: ReactNode;
};

export type TagPrefixProps = {
  prefix: prefixType.TAG;
  tag: string;
};
export type DotPrefixProps = {
  prefix: prefixType.DOT;
  colorDot?: ReactNode;
};
export type IconPrefixProps = {
  prefix: prefixType.ICON;
  prefixIcon: ReactNode;
};
export type HandlePrefixProps = {
  prefix: prefixType.HANDLE;
};

export type PrefixProps = DotPrefixProps | HandlePrefixProps | IconPrefixProps | TagPrefixProps;

type CardTabCommonProps = {
  name: string;
  dragHandleProps?: DragHandlePropType;
  color?: Color | DefaultColor | string;
  active?: boolean;
  draggable?: boolean;
  suffixIcon?: ReactNode;
  disabled?: boolean;
  invalid?: boolean;
  invalidName?: boolean;
  greyBackground?: boolean;
  texts?: CardTabTexts;
  itemData?: unknown;
  actionsAsDropdown?: boolean;
    /**
   * @deprecated
   */
  keyId?: string;
} & PrefixProps;

export type CardTabProps<IdType extends string | number = number> = {
  /**
   * @deprecated
   */
  intl?: IntlShape;
  id: IdType;
  onSelectTab?: (id: IdType) => void;
  onChangeName?: (id: IdType, name: string) => void;
  onDuplicateTab?: (id: IdType) => void;
  onRemoveTab?: (id: IdType) => void;
  onPreviewTab?: (id: IdType) => void;
  renderSuffix?: (props: CardTabSuffixProps) => ReactNode;
} & CardTabCommonProps;

export type CardTabSuffixProps = CardTabCommonProps & {
  handleRemove?: (event?: MouseEvent<HTMLElement>) => void;
  handleDuplicate?: (event?: MouseEvent<HTMLElement>) => void;
  handleEditName?: (event?: MouseEvent<HTMLElement>) => void;
};
