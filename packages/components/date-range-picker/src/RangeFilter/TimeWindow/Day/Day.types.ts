import * as React from 'react';
import { WrappedComponentProps } from 'react-intl';
import { GridTexts } from '../Grid/Grid.types';

export type Props = {
  tooltip?: string;
  label: React.ReactNode | ((hovered: boolean) => React.ReactNode);
  restricted: boolean;
  active: boolean;
  onToggle: (forceState?: boolean) => void;
  onChange: Function;
  readOnly: boolean;
  texts?: GridTexts;
} & WrappedComponentProps;
