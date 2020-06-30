import * as React from 'react';
import { IntlShape } from 'react-intl';

export type Props = {
  value: Date;
  label: string | React.ReactNode;
  onChange: () => void;
  onToggle: () => void;
  active: boolean;
  restricted: boolean;
  intl: IntlShape;
};
