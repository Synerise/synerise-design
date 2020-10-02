import { SubtleFieldProps } from '../../SubtleForm.types';
import { Props as DsSelectProps } from '@synerise/ds-select/dist/Select.types';
export type SubtleSelectProps = {
  placeholder?: string;
} & SubtleFieldProps &
  DsSelectProps;
