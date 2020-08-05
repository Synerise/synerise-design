import * as React from 'react';
import classnames from 'classnames';
import * as S from './Description.styles';

export type DescriptionType = 'inline' | 'table';
export type DescriptionRatio = '20-80' | '30-70' | '40-60' | '50-50' | '60-40' | '70-30' | '80-20';

export interface DescriptionProps {
  type?: DescriptionType;
  ratio?: DescriptionRatio;
  children: JSX.Element | JSX.Element[];
}

const Description: React.FC<DescriptionProps> = ({ type = 'table', children, ratio = '30-70' }) => {
  const hasSingleChild = React.useMemo(() => {
    return !Array.isArray(children);
  }, [children]);
  const className = classnames('ds-description', { 'single-row': hasSingleChild });
  return (
    <S.Description type={type} ratio={ratio} className={className} singleRow={hasSingleChild}>
      {children}
    </S.Description>
  );
};

export default Description;
