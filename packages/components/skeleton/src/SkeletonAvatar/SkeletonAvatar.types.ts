export enum SkeletonSize {
  'S' = 24,
  'M' = 40,
  'L' = 84,
  'XL' = 120,
}
export enum SkeletonWidth {
  'S' = 80,
  'M' = 80,
  'L' = 80,
  'XL' = 80,
}
export enum LeftSize {
  'S' = 25,
  'M' = 40,
  'L' = 70,
  'XL' = 90,
}

export type SkeletonAvatarProps = {
  size?: 'S' | 'M' | 'L' | 'XL';
  shape?: 'square' | 'circle';
};
