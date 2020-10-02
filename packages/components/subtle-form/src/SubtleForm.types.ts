import * as React from 'react';
import { SubtleTextAreaProps } from './Elements/TextArea/TextArea.types';
import { SubtleSelectProps } from './Elements/Select/Select.types';

export type SubtleFormSubComponents ={
  TextArea: React.ElementType<SubtleTextAreaProps>;
  Select: React.ElementType<SubtleSelectProps>;
}