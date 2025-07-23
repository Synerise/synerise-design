export type DescriptionType = 'inline' | 'table' | 'corner' | 'numbered-list';
export type DescriptionRatio = '50-50' | '25-75';

export interface DescriptionProps {
  type?: DescriptionType;
  ratio?: DescriptionRatio;
  children: JSX.Element | JSX.Element[];
}
