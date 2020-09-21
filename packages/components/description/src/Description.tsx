import * as React from 'react';
import classnames from 'classnames';
import * as S from './Description.styles';
import { DescriptionProps } from './Description.types';

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
