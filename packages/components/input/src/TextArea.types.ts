import type { BaseProps } from './Input.types';
import type { RawTextAreaProps } from './Textarea/Textarea.types';

export type TextareaProps = RawTextAreaProps &
  Omit<BaseProps<HTMLTextAreaElement>, 'expandable' | 'expandableTooltip' | 'autoResize' | 'autoResizeProps'>;
