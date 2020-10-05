export enum LoaderSize {
  'S' = 12,
  'M' = 20,
  'L' = 32,
}
export type LoaderProps = {
  size?: 'S' | 'M' | 'L';
  label: string | React.ReactNode;
  elementsPosition: string | 'bottom' | 'right';
};