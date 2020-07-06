import * as React from 'react';
import { IntlShape } from 'react-intl';

export type Props = {
  value: { days: number };
  label: string | React.ReactNode;
  onChange: ({ days }: { days: number }) => void;
  onToggle: () => void;
  active: boolean;
  restricted: boolean;
  intl: IntlShape;
  style?: React.CSSProperties;
};
