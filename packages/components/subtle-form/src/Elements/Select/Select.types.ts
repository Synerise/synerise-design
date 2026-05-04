import { type SelectProps as DsSelectProps } from '@synerise/ds-select';

import { type SubtleFieldProps } from '../../SubtleForm.types';

export type SubtleSelectProps = {
  placeholder?: string;
} & SubtleFieldProps &
  DsSelectProps;
