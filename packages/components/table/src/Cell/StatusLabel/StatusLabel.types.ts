import { Status } from '@synerise/ds-badge/dist/Badge';
import * as React from 'react';

export type Props = {
  status: Status;
  label: string | React.ReactNode;
};