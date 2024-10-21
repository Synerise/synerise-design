import React from 'react';
import { GroupSettings } from '../ColumnManager.types';
import { Column } from '../ColumnManagerItem/ColumManagerItem.types';

export type GroupSettingsTexts =
  | 'groupByValue'
  | 'groupByRanges'
  | 'groupByIntervals'
  | 'groupDisabled'
  | 'groupTitle'
  | 'selectPlaceholder'
  | 'intervalPlaceholder'
  | 'groupingType'
  | 'groupingTypeTooltip'
  | 'from'
  | 'to'
  | 'remove'
  | 'addRange'
  | 'errorEmptyRange'
  | 'errorEmptyFromField'
  | 'errorEmptyToField'
  | 'errorChooseGrouping'
  | 'errorInterval'
  | 'errorRange';

export const GROUP_BY: { [key: string]: string } = {
  value: 'value',
  ranges: 'ranges',
  interval: 'interval',
  disabled: 'disabled',
};

export interface GroupSettingsProps {
  hide: () => void;
  onOk: (settings: GroupSettings | undefined) => void;
  visible: boolean;
  settings?: GroupSettings;
  column?: Column;
  texts: {
    [k in GroupSettingsTexts]: string | React.ReactNode;
  };
}

export interface Range {
  from: {
    value: string | number | null | undefined;
    error: React.ReactNode | undefined;
  };
  to: {
    value: string | number | null | undefined;
    error: React.ReactNode | undefined;
  };
}
