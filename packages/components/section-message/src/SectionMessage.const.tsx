import React, { type ReactNode } from 'react';

import {
  Check2M,
  InfoM,
  NotificationsReceiveM,
  UpdateDataM,
  UserUpM,
  WarningM,
} from '@synerise/ds-icon';

import { type SectionType } from './SectionMessage.types';

export const ICONS: Record<SectionType, ReactNode> = {
  positive: <Check2M />,
  notice: <WarningM />,
  negative: <WarningM />,
  neutral: <InfoM />,
  supply: <UserUpM />,
  service: <UpdateDataM />,
  entity: <NotificationsReceiveM />,
};

export const DEFAULT_ICON = <WarningM />;

export const SECTION_TYPES: SectionType[] = [
  'positive',
  'notice',
  'negative',
  'neutral',
  'supply',
  'service',
  'entity',
];
