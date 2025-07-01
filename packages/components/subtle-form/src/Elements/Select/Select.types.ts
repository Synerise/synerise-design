import { type Props as DsSelectProps } from '@synerise/ds-select/dist/Select.types';

import { type SubtleFieldProps } from '../../SubtleForm.types';

export type SubtleSelectProps = {
  placeholder?: string;
} & SubtleFieldProps &
  DsSelectProps;
