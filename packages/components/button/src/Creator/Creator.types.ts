export enum CreatorStatus {
  Default = 'default',
  Error = 'error',
  Upload = 'upload',
}
export interface CreatorProps {
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  disabled?: boolean;
  label?: string | React.ReactNode;
  block?: boolean;
  status?: CreatorStatus;

}
