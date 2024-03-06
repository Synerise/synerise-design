export type SwitchProps = {
  hasError: boolean;
  disabled: boolean;
  errorMessage: string;
  checked: boolean;
  label: string;
}

export type SwitchWithDescriptionProps = SwitchProps & {
  description: string;
}