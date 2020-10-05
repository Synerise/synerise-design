import * as React from 'react';
import { SubtleFormSubComponents } from './SubtleForm.types';
import { SubtleTextAreaProps } from './Elements/TextArea/TextArea.types';
import { SubtleSelectProps } from './Elements/Select/Select.types';
import { SubtleDatePickerProps } from './Elements/DatePicker/DatePicker.types';
import SubtleTextArea from './Elements/TextArea/TextArea';
import SubtleSelect from './Elements/Select/Select';
import SubtleDatePicker from './Elements/DatePicker/DatePicker';

const SubtleForm: React.FC & SubtleFormSubComponents = () => {
  return null;
};
SubtleForm.TextArea = (props: SubtleTextAreaProps): React.ReactElement<SubtleTextAreaProps> =>
  SubtleTextArea(props) as React.ReactElement<SubtleTextAreaProps>;
SubtleForm.Select = (props: SubtleSelectProps): React.ReactElement<SubtleSelectProps> =>
  SubtleSelect(props) as React.ReactElement<SubtleSelectProps>;
SubtleForm.DatePicker = (props: SubtleDatePickerProps): React.ReactElement<SubtleDatePickerProps> =>
  SubtleDatePicker(props) as React.ReactElement<SubtleDatePickerProps>;

export default SubtleForm;
