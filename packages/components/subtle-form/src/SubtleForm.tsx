import * as React from 'react';
import { SubtleFieldProps, SubtleFormSubComponents } from './SubtleForm.types';
import { SubtleTextAreaProps } from './Elements/TextArea/TextArea.types';
import { SubtleSelectProps } from './Elements/Select/Select.types';
import { SubtleDatePickerProps } from './Elements/DatePicker/DatePicker.types';
import SubtleTextArea from './Elements/TextArea/TextArea';
import SubtleSelect from './Elements/Select/Select';
import SubtleDatePicker from './Elements/DatePicker/DatePicker';
import SubtleField from './Elements/Field/Field';
import SubtleInput from './Elements/Input/Input';

import { SubtleInputProps } from './Elements/Input/Input.types';

const SubtleForm: React.FC & SubtleFormSubComponents = () => {
  return null;
};
SubtleForm.TextArea = (props: SubtleTextAreaProps): React.ReactElement<SubtleTextAreaProps> =>
  SubtleTextArea(props) as React.ReactElement<SubtleTextAreaProps>;
SubtleForm.Select = (props: SubtleSelectProps): React.ReactElement<SubtleSelectProps> =>
  SubtleSelect(props) as React.ReactElement<SubtleSelectProps>;
SubtleForm.DatePicker = (props: SubtleDatePickerProps): React.ReactElement<SubtleDatePickerProps> =>
  SubtleDatePicker(props) as React.ReactElement<SubtleDatePickerProps>;
SubtleForm.Field = (props: SubtleFieldProps): React.ReactElement<SubtleFieldProps> =>
  SubtleField(props) as React.ReactElement<SubtleFieldProps>;
SubtleForm.Input = (props: SubtleInputProps): React.ReactElement<SubtleInputProps> =>
  SubtleInput(props) as React.ReactElement<SubtleInputProps>;
export default SubtleForm;
