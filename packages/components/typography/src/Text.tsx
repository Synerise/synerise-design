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

// eslint-disable-next-line import/prefer-default-export
export const Text: React.FC<TextProps> = ({ size = 'medium', children }) => {
  const Component = MapSizeToComponent[size];
  return <Component className="ds-text">{children}</Component>;
};
