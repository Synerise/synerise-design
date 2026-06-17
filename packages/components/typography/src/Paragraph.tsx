import classNames from 'classnames';
import React, { type CSSProperties, type ReactNode } from 'react';

import { type DataAttributes } from '@synerise/ds-utils';

import {
  MediumParagraph,
  SmallParagraph,
  XSmallParagraph,
} from './CommonElements';

type ParagraphProps = DataAttributes & {
  size?: 'medium' | 'small' | 'xsmall';
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
};

const MapSizeToComponent = {
  medium: MediumParagraph,
  small: SmallParagraph,
  xsmall: XSmallParagraph,
};

export const Paragraph = ({
  size = 'medium',
  children,
  className,
  style,
  ...dataAttributes
}: ParagraphProps) => {
  const Component = MapSizeToComponent[size];
  return (
    <Component
      {...dataAttributes}
      className={classNames('ds-paragraph', className)}
      style={style}
    >
      {children}
    </Component>
  );
};
