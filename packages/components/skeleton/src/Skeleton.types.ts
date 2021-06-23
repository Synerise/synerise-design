export enum SkeletonSize {
  'S' = 14,
  'M' = 16,
  'L' = 30,
}
export enum WrapperSize {
  'S' = 14,
  'M' = 16,
  'L' = 30,
}
export enum WidthSize {
  'M' = 60,
  'L' = 140,
}
export enum StartWidthSize {
  'M' = -30,
  'L' = -80,
}

export type SkeletonProps = {
  size?: 'S' | 'M' | 'L';
  number?: boolean;
  width?: 'M' | 'L';
};
