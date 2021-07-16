import * as React from 'react';
import { MediumText, SmallText, XSmallText } from './CommonElements';

type TextProps = {
  size?: 'medium' | 'small' | 'xsmall';
};

const MapSizeToComponent = {
  medium: MediumText,
  small: SmallText,
  xsmall: XSmallText,
};

export const Text: React.FC<TextProps> = ({ size = 'medium', children }) => {
  const Component = MapSizeToComponent[size];
  return <Component className="ds-text">{children}</Component>;
};
