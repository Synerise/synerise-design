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

export type CardTabProps<IdType extends string | number = number> = {
  /**
   * @deprecated
   */
  intl?: IntlShape;
  id: IdType;
  name: string;
  tag: string;
  prefix: prefixType;
  dragHandleProps?: DragHandlePropType;
  colorDot?: ReactNode;
  color?: Color | DefaultColor | string;
  active?: boolean;
  draggable?: boolean;
  prefixIcon?: ReactNode;
  suffixIcon?: ReactNode;
  disabled?: boolean;
  invalid?: boolean;
  invalidName?: boolean;
  greyBackground?: boolean;
  onSelectTab?: (id: IdType) => void;
  onChangeName?: (id: IdType, name: string) => void;
  onDuplicateTab?: (id: IdType) => void;
  onRemoveTab?: (id: IdType) => void;
  onPreviewTab?: (id: IdType) => void;
  texts?: CardTabTexts;
  itemData?: unknown;
  actionsAsDropdown?: boolean;
  renderSuffix?: (props: CardTabSuffixProps) => ReactNode;
  /**
   * @deprecated
   */
  keyId?: string;
};

export type CardTabSuffixProps = Omit<
  CardTabProps & {
    handleRemove?: (event?: MouseEvent<HTMLElement>) => void;
    handleDuplicate?: (event?: MouseEvent<HTMLElement>) => void;
    handleEditName?: (event?: MouseEvent<HTMLElement>) => void;
  },
  'onChangeName' | 'onDuplicateTab' | 'onRemoveTab' | 'onSelectTab'
>;
