import * as React from 'react';
import { H1, H2, H3, H4, H5, H6, H7 } from './CommonElements';
import { Props } from './Title.types';

const StyledElements = {
  1: H1,
  2: H2,
  3: H3,
  4: H4,
  5: H5,
  6: H6,
  7: H7,
};

const Title: React.FC<Props> = ({ level = 1, withoutMargin, children }) => {
  const TitleElement = React.useMemo(() => {
    return StyledElements[level];
  }, [level]);

  return (
    <TitleElement className="ds-title" withoutMargin={Boolean(withoutMargin)}>
      {children}
    </TitleElement>
  );
};

export default Title;
