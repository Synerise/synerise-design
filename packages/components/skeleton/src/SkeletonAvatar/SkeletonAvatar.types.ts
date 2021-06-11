
export enum SkeletonSize {
  'S' = 24,
  'M' = 40,
  'L' = 84,
  'XL' = 120
};
export enum WrapperSize {
  'S' = 26,
  'M' = 42,
  'L' = 86,
  'XL' = 122
};
export enum SkeletonWidth {
  'S' = 80,
  'M' = 80,
  'L' = 60,
  'XL' = 60,
};
export enum LeftSize {
  'S' = 5,
  'M' = 9,
  'L' = 34,
  'XL' = 48,
};
export enum Left1Size {
  'S' = -5,
  'M' = -10,
  'L' = -15,
  'XL' = -20,
};

export type SkeletonAvatarProps = {
  size?: 'S' | 'M' | 'L'| 'XL';
};