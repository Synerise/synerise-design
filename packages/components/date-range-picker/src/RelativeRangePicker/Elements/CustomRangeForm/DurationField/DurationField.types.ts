import { FieldProps } from '../CustomRangeForm.types';

export type Props = {
  handleDurationValueChange: (value?: string | number | null) => void;
} & FieldProps;
