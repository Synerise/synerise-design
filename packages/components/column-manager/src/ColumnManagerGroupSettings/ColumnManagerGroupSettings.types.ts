import * as React from 'react';
import { GroupSettings, Texts } from '../ColumnManager.types';
import { Column } from '../ColumnManagerItem/ColumManagerItem.types';

export const GROUP_BY: { [key: string]: string } = {
  value: 'Value',
  ranges: 'Ranges',
  interval: 'Interval',
  disabled: 'Disabled',
};

export interface GroupSettingsProps {
  hide: () => void;
  onOk: (settings: GroupSettings | undefined) => void;
  visible: boolean;
  settings?: GroupSettings;
  column?: Column;
  texts: {
    [k in Texts]: string | React.ReactNode;
  };
}

export interface Range {
  from: {
    value: React.ReactText | undefined;
    error: React.ReactNode | undefined;
  };
  to: {
    value: React.ReactText | undefined;
    error: React.ReactNode | undefined;
  };
}
