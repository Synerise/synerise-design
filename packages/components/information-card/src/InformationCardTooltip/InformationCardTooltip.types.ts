import type { TriggerProps } from 'rc-trigger';
import type { Component, HTMLAttributes, ReactNode } from 'react';

import type { InformationCardProps } from '../InformationCard.types';

export type TriggerHandle = Component<TriggerProps> & {
  getPopupDomNode: () => HTMLElement;
};

export type InformationCardTooltipProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'onClick' | 'onKeyDown'
> & {
  informationCardProps: InformationCardProps;
  children: ReactNode;
  triggerProps?: Partial<TriggerProps> & {
    ref?: React.LegacyRef<TriggerHandle>;
  };
};
