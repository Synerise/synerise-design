import * as React from 'react';
import { SubtleFormSubComponents } from './SubtleForm.types';
import { SubtleTextAreaProps } from './Elements/TextArea/TextArea.types';
import SubtleTextArea from './Elements/TextArea/TextArea';

const SubtleForm: React.FC & SubtleFormSubComponents = () => {
  return null;
};
SubtleForm.TextArea = (props: SubtleTextAreaProps): React.ReactElement<SubtleTextAreaProps> =>
  SubtleTextArea(props) as React.ReactElement<SubtleTextAreaProps>;

export default SubtleForm;
