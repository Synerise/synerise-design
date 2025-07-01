import { type HTMLAttributes, type ReactElement, type ReactNode } from 'react';

import { type Status } from '../Badge.types';

export type CustomIconBadgeProps = {
  icon: ReactElement;
};
export type StatusIconBadgeProps = {
  status: Exclude<Status, undefined>;
};
export type IconBadgeProps = (CustomIconBadgeProps | StatusIconBadgeProps) & {
  children?: ReactNode;
} & HTMLAttributes<HTMLDivElement>;
