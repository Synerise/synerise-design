import React, { type ReactNode } from 'react';

import '@synerise/ds-core/dist/js/style';

import { MediumText, SmallText, XSmallText } from './CommonElements';
import { Ellipsis, type EllipsisProps } from './Ellipsis';
import './style/index.less';

export type TextSize = 'medium' | 'small' | 'xsmall';

type TextProps = {
  size?: TextSize;
  ellipsis?: EllipsisProps;
  children?: ReactNode;
  className?: string;
};

const MapSizeToComponent = {
  medium: MediumText,
  small: SmallText,
  xsmall: XSmallText,
};

export const Text = ({
  size = 'medium',
  className,
  children,
  ellipsis,
}: TextProps) => {
  const Component = MapSizeToComponent[size];
  const textClassNames = `ds-text ${!ellipsis && className}`;
  const content = <Component className={textClassNames}>{children}</Component>;
  if (ellipsis === undefined) {
    return content;
  }
  return (
    <Ellipsis className={className} {...ellipsis}>
      {content}
    </Ellipsis>
  );
};

export default Text;
