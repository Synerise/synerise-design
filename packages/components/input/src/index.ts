/**
 * @deprecated - import { FormFieldLabel } from '@synerise/ds-form-field';
 */
export { FormFieldLabel as Label } from '@synerise/ds-form-field';
export { Input, RawInput, InputGroup, InputMultivalue } from './Input';

export { TextArea, RawTextArea } from './TextArea';
export type { TextareaProps } from './TextArea.types';
export type { InputMultivalueProps } from './InputMultivalue/InputMultivalue.types';

export * as InputStyles from './Input.styles';

export type { BaseProps, EnhancedProps, InputProps, AutoResizeProp } from './Input.types';

export { default as AutosizeInput } from './AutosizeInput/AutosizeInput';
export type {
  AutosizeInputProps,
  AutosizeWrapperProps,
  AutosizeInputRefType,
} from './AutosizeInput/AutosizeInput.types';
export { AutosizeWrapper } from './components/AutosizeWrapper';
