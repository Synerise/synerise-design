import { ComponentType } from 'react';
import Moment from 'moment';

import { Props as ContentComponentProps } from '../../DatePicker.types';

export type Props = {
  size?: string;
  format?: string;
  showTime?: boolean;
  allowClear?: boolean;
  value?: Moment;
  onChange?: () => void;
  style?: Object;
  placeholder?: string;
  disabled?: boolean;
  disabledDate?: (currentDate: Moment) => boolean;
  disabledHours: () => void;
  disabledMinutes: () => void;
  disabledSeconds: () => void;
  content: ComponentType<ContentComponentProps>;
};

export type State = {
  visible: boolean;
};
