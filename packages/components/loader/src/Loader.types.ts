export enum LoaderSize {
  'S' = 12,
  'M' = 20,
  'L' = 40,
}
export type LoaderProps = {
  size?: 'S' | 'M' | 'L';
  label: string | React.ReactNode;
  elementsPosition: string | 'bottom' | 'right';
  color?: string
    | 'blue'
    | 'grey'
    | 'red'
    | 'green'
    | 'yellow'
    | 'pink'
    | 'mars'
    | 'orange'
    | 'fern'
    | 'cyan'
    | 'purple'
    | 'violet';
};