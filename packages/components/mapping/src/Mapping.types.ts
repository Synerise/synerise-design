import { type ReactNode } from 'react';

import { type CheckboxProps } from '@synerise/ds-checkbox';
import { type CheckboxTristateProps } from '@synerise/ds-checkbox-tristate';
import { type TooltipProps } from '@synerise/ds-tooltip';
import { type WithHTMLAttributes } from '@synerise/ds-utils';

export type BaseItemType = {
  id: string | number;
};

type BaseColumnComponentProps = {
  index: number;
};

export type ColumnComponentProps<T extends BaseItemType> = {
  item: T;
} & BaseColumnComponentProps;

export type MappingTexts = {
  enableBatchSelection: ReactNode;
  disableBatchSelection: ReactNode;
};

type BaseMappingProps = {
  leftTitle?: ReactNode;
  leftTitleTooltip?: TooltipProps;
  rightTitle?: ReactNode;
  rightTitleTooltip?: TooltipProps;
};

export type MappingProps<T extends BaseItemType> = WithHTMLAttributes<
  HTMLDivElement,
  {
    dataSource: Array<T>;
    leftComponent: (props: ColumnComponentProps<T>) => ReactNode;
    rightComponent: (props: ColumnComponentProps<T>) => ReactNode;
    centerComponent?: (props: ColumnComponentProps<T>) => ReactNode;
    batchSelection?: BatchSelectionType<T>;
    texts?: Partial<MappingTexts>;
  } & BaseMappingProps
>;

export type TitleRowProps = BaseMappingProps & {
  hasSelection?: boolean;
  hasCenterComponent?: boolean;
};

export type BatchSelectionType<T extends BaseItemType> = {
  onSelectionChange: (selectedIndexes: T['id'][]) => void;
  renderCounter?: (selectedCount: number, total: number) => ReactNode;
} & Pick<BatchSelectionProps, 'actionButtons'>;

export type BatchSelectionProps = {
  actionButtons: ReactNode;
  checkboxState: CheckboxTristateProps['checked'];
  onChange: (checked?: boolean) => void;
  counter: ReactNode;
  batchButton: ReactNode;
  enabled?: boolean;
};

export type RowSelectionProps<T extends BaseItemType> = {
  checkboxState: CheckboxProps['checked'];
  itemId: T['id'];
  onChange: (checked: boolean, id: T['id']) => void;
};
