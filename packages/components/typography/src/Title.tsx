import * as React from 'react';
import { H1, H2, H3, H4, H5, H6 } from './CommonElements';
import { Props } from './Title.types';

const StyledElements = {
  1: H1,
  2: H2,
  3: H3,
  4: H4,
  5: H5,
  6: H6,
};

const Title: React.FC<Props> = ({ level = 1, children }) => {
  const TitleElement = React.useMemo(() => {
    return StyledElements[level];
  }, [level]);

  return <TitleElement>{children}</TitleElement>;
};

export default Title;
