import { Props as DsSelectProps } from '@synerise/ds-select/dist/Select.types';
import { SubtleFieldProps } from '../../SubtleForm.types';

export type SubtleSelectProps = {
  placeholder?: string;
} & SubtleFieldProps &
  DsSelectProps;
