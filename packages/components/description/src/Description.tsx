import classnames from 'classnames';
import React from 'react';

import * as S from './Description.styles';
import { type DescriptionProps } from './Description.types';

const Description = ({
  type = 'table',
  children,
  ratio = '50-50',
}: DescriptionProps) => {
  const hasSingleChild = React.useMemo(() => {
    return !Array.isArray(children);
  }, [children]);
  const className = classnames('ds-description', {
    'single-row': hasSingleChild,
  });
  return (
    <S.Description
      type={type}
      ratio={ratio}
      className={className}
      singleRow={hasSingleChild}
    >
      {children}
    </S.Description>
  );
};

export default Description;
