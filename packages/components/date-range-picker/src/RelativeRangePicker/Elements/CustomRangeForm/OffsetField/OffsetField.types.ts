import { FieldProps } from '../CustomRangeForm.types';

export type Props = {
  handleOffsetValueChange: (value?: string | number | null) => void;
} & FieldProps;
