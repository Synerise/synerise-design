import { FieldProps } from '../CustomRangeForm.types';

export type Props = {
  handleDurationValueChange: (value?: number) => void;
} & FieldProps;
