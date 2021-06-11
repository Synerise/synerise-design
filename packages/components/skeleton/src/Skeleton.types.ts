

export enum SkeletonSize {
  'S' = 14,
  'M' = 20,
  'L' = 30,
};
export enum WrapperSize {
  'S' = 16,
  'M' = 22,
  'L' = 32,
}

export type SkeletonProps = {
  size?: 'S' | 'M' | 'L';
  number?: boolean;
};