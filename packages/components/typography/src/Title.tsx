import React from 'react';
import classNames from 'classnames';
import { H1, H2, H3, H4, H5, H6, H7 } from './CommonElements';
import { Props } from './Title.types';
import { Ellipsis } from './Ellipsis';

const StyledElements = {
  1: H1,
  2: H2,
  3: H3,
  4: H4,
  5: H5,
  6: H6,
  7: H7,
};

const Title = ({ level = 1, withoutMargin, children, className, ellipsis, ...antdProps }: Props) => {
  const TitleElement = StyledElements[level];
  const elementClassName = classNames('ds-title', className);
  const content = (
    <TitleElement {...antdProps} className={elementClassName} withoutMargin={Boolean(withoutMargin)}>
      {children}
    </TitleElement>
  );
  if (ellipsis === undefined) {
    return content;
  }
  return <Ellipsis {...ellipsis}>{content}</Ellipsis>;
};

export default Title;
