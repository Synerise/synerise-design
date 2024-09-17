import React from 'react';
import { ScrollbarAdditionalProps } from '@synerise/ds-scrollbar';

import { CollectorTexts, CollectorValue } from '../../Collector.types';

export type OptionsDropdownProps = {
  showAddButton?: boolean;
  options: CollectorValue[];
  visible?: boolean;
  value: React.ReactText;
  onSelect: (value: CollectorValue) => void;
  renderItem?: (value: CollectorValue) => JSX.Element;
  onItemAdd?: (itemName: React.ReactText) => void;
  onClick: () => void;
  texts: CollectorTexts;
  width: number;
  showNavigationHints?: boolean;
  lookupKey: string;
  customContent?: React.ReactNode;
  dropdownItemHeight?: 'large';
  scrollbarProps?: ScrollbarAdditionalProps;
  listHeader?: React.ReactNode;
};
