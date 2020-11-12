export interface StatusProps {
  label: string;
  type: 'primary' | 'success' | 'warning' | 'danger' | 'disabled';
  className?: string;
  onClick?: () => void;
  color?: string;
}
