import { type WrappedComponentProps } from 'react-intl';

import { type Texts } from '../../DatePicker.types';

export type Props = {
  text?: string;
  mode: string;
  dateOnly?: boolean;
  canApply?: boolean;
  canSwitchMode?: boolean;
  onApply?: (date?: Date | undefined) => void;
  onSwitchMode?: () => void;
  message?: React.ReactNode | string;
  texts: Texts;
  hideNow?: boolean;
} & WrappedComponentProps;
