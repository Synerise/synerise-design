import * as  React from 'react';
import { WrappedComponentProps } from 'react-intl';

export type Props = {
  tooltip?: string;
  label: React.ReactNode | ((hovered: boolean) => React.ReactNode);
  restricted: boolean;
  active: boolean;
  onToggle: (forceState: boolean) => void;
  onChange: Function;
  value?: any;
  readOnly: boolean;
} & WrappedComponentProps;
