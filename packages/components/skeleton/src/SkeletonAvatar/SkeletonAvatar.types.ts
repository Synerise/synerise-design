
export enum SkeletonSize {
  'S' = 24,
  'M' = 40,
  'L' = 84,
  'XL' = 120
};
export enum WrapperSize {
  'S' = 24,
  'M' = 40,
  'L' = 84,
  'XL' = 120
};
export enum SkeletonWidth {
  'S' = 80,
  'M' = 80,
  'L' = 80,
  'XL' = 80,
};
export enum LeftSize {
  'S' = 4,
  'M' = 8,
  'L' = 18,
  'XL' = 26,
};
export enum Left1Size {
  'S' = -5,
  'M' = -10,
  'L' = -25,
  'XL' = -35,
};

export type SkeletonAvatarProps = {
  size?: 'S' | 'M' | 'L'| 'XL';
};