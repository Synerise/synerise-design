export enum SkeletonSize {
  'S' = 14,
  'M' = 16,
  'L' = 30,
}

export type DropdownSkeletonProps = {
  size?: 'S' | 'M' | 'L';
  numberOfSkeletons?: number;
};
