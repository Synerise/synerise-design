export enum ExpanderSize {
  'S' = 24,
  'M' = 32,
}

export interface ExpanderProps {
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  size?: 'S' | 'M';
  disabled?: boolean;
  expanded?: boolean;
}
