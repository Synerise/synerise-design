import type {
  ForwardRefExoticComponent,
  ReactNode,
  RefAttributes,
} from 'react';
import { type StyledComponent } from 'styled-components';

import {
  type LegacyPlacement,
  type PopoverOptions,
} from '@synerise/ds-popover';
import { type WithHTMLAttributes } from '@synerise/ds-utils';

import type { InformationCardProps } from '../InformationCard.types';

export type InformationCardTooltipProps = WithHTMLAttributes<
  HTMLDivElement,
  {
    /**
     * InformationCardProps - will render <InformationCard/> component with these props as the content of the tooltip
     */
    informationCardProps?: InformationCardProps;
    /**
     * rendered content of the infocard tooltip (alternative to informationCardProps prop)
     */
    content?: ReactNode;
    /**
     * trigger to attach the tooltip to
     */
    children: ReactNode;

    popoverProps?: Omit<
      PopoverOptions,
      'listNavigationConfig' | 'arrowConfig' | 'returnFocus' | 'modal'
    >;
    asChild?: boolean;
  }
>;

export type LegacyInformationCardPlacement = Exclude<
  LegacyPlacement,
  'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom'
>;

export type StyledInformationCardTooltip<CustomProps extends object = object> =
  StyledComponent<
    ForwardRefExoticComponent<
      InformationCardTooltipProps & RefAttributes<HTMLDivElement>
    >,
    object,
    CustomProps,
    never
  >;
