import { WrappedComponentProps } from 'react-intl';

export type Props = {
  text: string;
  mode: string;
  dateOnly?: boolean;
  canApply?: boolean;
  canSwitchMode?: boolean;
  onApply?: () => void;
  onSwitchMode?: () => void;
  message?: React.ReactNode | string;
} & WrappedComponentProps;
