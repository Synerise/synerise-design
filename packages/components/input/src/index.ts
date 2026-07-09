/**
 * @deprecated - import { FormFieldLabel } from '@synerise/ds-form-field';
 */
export { FormFieldLabel as Label } from '@synerise/ds-form-field';

export { Input, RawInput, InputGroup, InputMultivalue } from './Input';

export { TextArea, RawTextArea } from './TextArea';
export { RawTextArea as DSRawTextArea } from './Textarea/Textarea';

export type { TextareaProps } from './TextArea.types';
export type { RawTextAreaProps } from './Textarea/Textarea.types';

export type { InputMultivalueProps } from './InputMultivalue/InputMultivalue.types';

export * as InputStyles from './Input.styles';

export type {
  BaseProps,
  EnhancedProps,
  InputProps,
  AutoResizeProp,
  StyledInput,
} from './Input.types';

export { default as AutosizeInput } from './AutosizeInput/AutosizeInput';
export type { AutosizeInputProps } from './AutosizeInput/AutosizeInput.types';

export {
  useAutosizeWidth,
  SIZER_STYLE,
} from './AutosizeInput/useAutosizeWidth';
export type {
  UseAutosizeWidthParams,
  UseAutosizeWidthResult,
} from './AutosizeInput/useAutosizeWidth.types';
export { useStretchToFit } from './AutosizeInput/useStretchToFit';
export type { UseStretchToFitParams } from './AutosizeInput/useStretchToFit';

export { autoresizeConfObjToCss } from './Input.styles';

export { PasswordInput } from './PasswordInput';
export type {
  PasswordInputProps,
  PasswordInputTexts,
} from './PasswordInput.types';
