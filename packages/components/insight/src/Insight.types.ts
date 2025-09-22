import { type ReactNode } from 'react';

import { type InlineAlertProps } from '@synerise/ds-inline-alert';
import { type WithHTMLAttributes } from '@synerise/ds-utils';

export type InsightProps = WithHTMLAttributes<
  HTMLDivElement,
  {
    avatar?: ReactNode;
    headerRightSide?: ReactNode;
    subTitle?: ReactNode;
    title: ReactNode;
    content?: InlineAlertProps[] | ReactNode;
    footer?: ReactNode;
    onClick?: () => void;
  }
>;
