export enum CreatorStatus {
  Default = 'default',
  Error = 'error',
  Upload = 'upload',
}
export interface CreatorProps {
  onClick: () => void;
  disabled?: boolean;
  label?: string;
  block?: boolean;
  status?: CreatorStatus;
}
