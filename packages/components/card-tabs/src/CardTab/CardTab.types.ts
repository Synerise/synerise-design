import { ReactNode, MouseEvent } from 'react';
import { IntlShape } from 'react-intl';
import { DefaultColor } from '@synerise/ds-core';

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

export type CardTabTexts = {
  changeNameTooltip?: string | ReactNode;
  removeTooltip?: string | ReactNode;
  duplicateTooltip?: string | ReactNode;
  changeNameMenuItem?: string | ReactNode;
  removeMenuItem?: string | ReactNode;
  duplicateMenuItem?: string | ReactNode;
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
