import type { BaseProps } from './Input.types';
import type { TextAreaProps } from './Textarea/Textarea.types';

export type TextareaProps = BaseProps<HTMLTextAreaElement> & TextAreaProps;
