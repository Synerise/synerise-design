import React, { ReactNode } from 'react';
import { MediumParagraph, SmallParagraph, XSmallParagraph } from './CommonElements';

type TextProps = {
  size?: 'medium' | 'small' | 'xsmall';
  children?: ReactNode;
};

const MapSizeToComponent = {
  medium: MediumParagraph,
  small: SmallParagraph,
  xsmall: XSmallParagraph,
};

export const Paragraph = ({ size = 'medium', children }: TextProps) => {
  const Component = MapSizeToComponent[size];
  return <Component className="ds-paragraph">{children}</Component>;
};
