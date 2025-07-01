export type DescriptionType =
  | 'inline'
  | 'table'
  | 'dotted-list'
  | 'numbered-list';
export type DescriptionRatio =
  | '20-80'
  | '30-70'
  | '40-60'
  | '50-50'
  | '60-40'
  | '70-30'
  | '80-20';

export interface DescriptionProps {
  type?: DescriptionType;
  ratio?: DescriptionRatio;
  children: JSX.Element | JSX.Element[];
}
