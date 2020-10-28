import * as React from 'react';
import { CollectorTexts, CollectorValue } from '../../Collector.types';

export type OptionsDropdownProps = {
  showAddButton?: boolean;
  options: CollectorValue[];
  visible?: boolean;
  value: React.ReactText;
  onSelect: (value: CollectorValue) => void;
  onItemAdd?: (itemName: React.ReactText) => void;
  onClick: () => void;
  texts: CollectorTexts;
  width: number;
  showNavigationHints?: boolean;
  lookupKey: string;
  customContent?: React.ReactNode;
};
