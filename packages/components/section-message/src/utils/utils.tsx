import React, { type ReactNode } from 'react';

import {
  Check3M,
  HelpFillM,
  NotificationsReceiveM,
  UpdateDataM,
  UserUpM,
  WarningFillM,
} from '@synerise/ds-icon';

import { type SectionType } from '../SectionMessage.types';

export const ICONS: Record<SectionType, ReactNode> = {
  positive: <Check3M />,
  notice: <WarningFillM />,
  negative: <WarningFillM />,
  neutral: <HelpFillM />,
  supply: <UserUpM />,
  service: <UpdateDataM />,
  entity: <NotificationsReceiveM />,
};

export const DEFAULT_ICON = <WarningFillM />;
