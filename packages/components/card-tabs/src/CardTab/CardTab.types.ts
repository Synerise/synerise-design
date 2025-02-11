import type { ReactNode, MouseEvent, KeyboardEvent } from 'react';
import type { IntlShape } from 'react-intl';
import type { DefaultColor } from '@synerise/ds-core';

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

export type CardTabProps = {
  intl: IntlShape;
  id: number;
  name: string;
  tag: string;
  prefix: prefixType;
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
  onSelectTab?: (id: number) => void;
  onChangeName?: (id: number, name: string) => void;
  onDuplicateTab?: (id: number) => void;
  onRemoveTab?: (id: number) => void;
  onPreviewTab?: (id: number) => void;
  texts?: CardTabTexts;
  itemData?: unknown;
  actionsAsDropdown?: boolean;
  renderSuffix?: (props: CardTabSuffixProps) => ReactNode;
};

export type CardTabSuffixProps = Omit<
  CardTabProps & {
    handleRemove?: (event?: MouseEvent<HTMLElement>) => void;
    handleDuplicate?: (event?: MouseEvent<HTMLElement>) => void;
    handleEditName?: (event?: MouseEvent<HTMLElement>) => void;
  },
  'onChangeName' | 'onDuplicateTab' | 'onRemoveTab' | 'onSelectTab'
>;
