/**
 * @deprecated - import { FormFieldLabel } from '@synerise/ds-form-field';
 */
export { FormFieldLabel as Label } from '@synerise/ds-form-field';

export { default as AutosizeInput } from './AutosizeInput/AutosizeInput';
export type { AutosizeInputProps } from './AutosizeInput/AutosizeInput.types';
export {
  SIZER_STYLE,
  useAutosizeWidth,
} from './AutosizeInput/useAutosizeWidth';
export type {
  UseAutosizeWidthParams,
  UseAutosizeWidthResult,
} from './AutosizeInput/useAutosizeWidth.types';
export type { UseStretchToFitParams } from './AutosizeInput/useStretchToFit';
export { useStretchToFit } from './AutosizeInput/useStretchToFit';
export { Input, InputGroup, InputMultivalue, RawInput } from './Input';
export * as InputStyles from './Input.styles';
export { autoresizeConfObjToCss } from './Input.styles';
export type {
  AutoResizeProp,
  BaseProps,
  EnhancedProps,
  InputProps,
  InputSize,
  StyledInput,
} from './Input.types';
export type { InputMultivalueProps } from './InputMultivalue/InputMultivalue.types';
export { PasswordInput } from './PasswordInput';
export type {
  PasswordInputProps,
  PasswordInputTexts,
} from './PasswordInput.types';
export { RawTextArea, TextArea } from './TextArea';
export type { TextareaProps } from './TextArea.types';
export { RawTextArea as DSRawTextArea } from './Textarea/Textarea';
export type { RawTextAreaProps } from './Textarea/Textarea.types';
