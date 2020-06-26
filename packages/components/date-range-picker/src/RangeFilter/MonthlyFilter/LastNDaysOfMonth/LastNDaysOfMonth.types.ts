import * as React from 'react';
import { IntlShape } from 'react-intl';

export type Props = {
  value: Date;
  label: string | React.ReactNode;
  onChange:
  onToggle,
  active,
  restricted: boolean;
  intl: IntlShape
}