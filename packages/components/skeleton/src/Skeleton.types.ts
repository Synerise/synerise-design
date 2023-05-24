export enum SkeletonSize {
  'S' = 14,
  'M' = 16,
  'L' = 32,
}
export enum WidthSize {
  'M' = 60,
  'L' = 140,
}
export enum StartOffsetSize {
  'M' = -50,
  'L' = -120,
}

export type SkeletonProps = {
  size?: 'S' | 'M' | 'L';
  numberOfSkeletons?: number;
  width?: 'M' | 'L';
};
