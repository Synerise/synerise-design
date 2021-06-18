

export enum SkeletonSize {
  'S' = 14,
  'M' = 20,
  'L' = 30,
};
export enum WrapperSize {
  'S' = 14,
  'M' = 20,
  'L' = 30,
};
export enum WidthSize {
  'M' = 25,
  'L' = 68,
};
export enum StartWidthSize {
  'M' = -20,
  'L' = -40,
};


export type SkeletonProps = {
  size?: 'S' | 'M' | 'L';
  number?: boolean;
  width?: 'M' | 'L';
};