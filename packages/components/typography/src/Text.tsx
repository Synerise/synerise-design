import React, { ReactNode } from 'react';
import { MediumText, SmallText, XSmallText } from './CommonElements';

import { Ellipsis, EllipsisProps } from './Ellipsis';

export type TextSize = 'medium' | 'small' | 'xsmall';

type TextProps = {
  size?: TextSize;
  ellipsis?: EllipsisProps;
  children?: ReactNode;
};

const MapSizeToComponent = {
  medium: MediumText,
  small: SmallText,
  xsmall: XSmallText,
};

export const Text = ({ size = 'medium', children, ellipsis }: TextProps) => {
  const Component = MapSizeToComponent[size];
  const content = <Component className="ds-text">{children}</Component>;
  if (ellipsis === undefined) {
    return content;
  }
  return <Ellipsis {...ellipsis}>{content}</Ellipsis>;
};

export default Text;
