
export interface Props {
  value: string | undefined;
  onChange: (newValue: string) => void;
  placeholder?: string;
}