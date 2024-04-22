export type StatusType = 'primary' | 'success' | 'warning' | 'danger' | 'disabled' | 'default' | 'custom';
export interface StatusProps {
  label: string;
  type: StatusType;
  className?: string;
  onClick?: () => void;
  color?: string;
}
