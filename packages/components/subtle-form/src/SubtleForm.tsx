import { type FC, type ReactElement } from 'react';

import SubtleDatePicker from './Elements/DatePicker/DatePicker';
import { type SubtleDatePickerProps } from './Elements/DatePicker/DatePicker.types';
import SubtleField from './Elements/Field/Field';
import SubtleInput from './Elements/Input/Input';
import { type SubtleInputProps } from './Elements/Input/Input.types';
import SubtleSelect from './Elements/Select/Select';
import { type SubtleSelectProps } from './Elements/Select/Select.types';
import SubtleTextArea from './Elements/TextArea/TextArea';
import { type SubtleTextAreaProps } from './Elements/TextArea/TextArea.types';
import {
  type SubtleFieldProps,
  type SubtleFormSubComponents,
} from './SubtleForm.types';

const SubtleForm: FC & SubtleFormSubComponents = () => {
  return null;
};
SubtleForm.TextArea = (
  props: SubtleTextAreaProps,
): ReactElement<SubtleTextAreaProps> =>
  SubtleTextArea(props) as ReactElement<SubtleTextAreaProps>;
SubtleForm.TextArea.displayName = 'SubtleTextArea';

SubtleForm.Select = (
  props: SubtleSelectProps,
): ReactElement<SubtleSelectProps> =>
  SubtleSelect(props) as ReactElement<SubtleSelectProps>;
SubtleForm.Select.displayName = 'SubtleSelect';

SubtleForm.DatePicker = (
  props: SubtleDatePickerProps,
): ReactElement<SubtleDatePickerProps> =>
  SubtleDatePicker(props) as ReactElement<SubtleDatePickerProps>;
SubtleForm.DatePicker.displayName = 'SubtleDatePicker';

SubtleForm.Field = (props: SubtleFieldProps): ReactElement<SubtleFieldProps> =>
  SubtleField(props) as ReactElement<SubtleFieldProps>;
SubtleForm.Field.displayName = 'SubtleField';

SubtleForm.Input = (props: SubtleInputProps): ReactElement<SubtleInputProps> =>
  SubtleInput(props) as ReactElement<SubtleInputProps>;
SubtleForm.Input.displayName = 'SubtleInput';

export default SubtleForm;
