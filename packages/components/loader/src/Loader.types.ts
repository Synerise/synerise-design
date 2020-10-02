export enum LoaderSize {
  'S' = 12,
  'M' = 20,
  'L' = 32,
}
export type LoaderProps = {
  size?: 'S' | 'M' | 'L';
  textLoader: string;
  elementsPosition: string | 'bottom' | 'right';
};