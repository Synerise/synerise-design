export enum ExpanderSize {
  'S' = 24,
  'M' = 32,
}

export interface ExpanderProps {
  onClick: () => void;
  size: ExpanderSize;
  disabled: boolean;
  pressed: boolean;
  expanded: boolean;
}
