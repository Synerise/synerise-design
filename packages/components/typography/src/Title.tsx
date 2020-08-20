import * as React from 'react';
import { TitleProps } from 'antd/es/typography/Title';
import { H1, H2, H3, H4, H5, H6 } from './CommonElements';

interface Props extends Omit<TitleProps, 'level'> {
  level: 1 | 2 | 3 | 4 | 5 | 6;
}

const StyledElements = {
  1: H1,
  2: H2,
  3: H3,
  4: H4,
  5: H5,
  6: H6,
};

const Title: React.FC<Props> = ({ level, children }) => {
  const TitleElement = React.useMemo(() => {
    return StyledElements[level];
  }, [level]);

  return <TitleElement>{children}</TitleElement>;
};

export default Title;
