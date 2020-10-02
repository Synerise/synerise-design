import * as React from 'react';
import { SubtleFormSubComponents } from './SubtleForm.types';
import { SubtleTextAreaProps } from './Elements/TextArea/TextArea.types';
import { SubtleSelectProps } from './Elements/Select/Select.types';
import SubtleTextArea from './Elements/TextArea/TextArea';
import SubtleSelect from './Elements/Select/Select';

const SubtleForm: React.FC & SubtleFormSubComponents = () => {
  return null;
};
SubtleForm.TextArea = (props: SubtleTextAreaProps): React.ReactElement<SubtleTextAreaProps> =>
  SubtleTextArea(props) as React.ReactElement<SubtleTextAreaProps>;
SubtleForm.Select = (props: SubtleSelectProps): React.ReactElement<SubtleSelectProps> =>
  SubtleSelect(props) as React.ReactElement<SubtleSelectProps>;

export default SubtleForm;
