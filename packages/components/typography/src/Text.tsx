import classNames from 'classnames';
import React, { type CSSProperties, type ReactNode } from 'react';

import { type DataAttributes } from '@synerise/ds-utils';

import { MediumText, SmallText, XSmallText } from './CommonElements';
import { Ellipsis, type EllipsisProps } from './Ellipsis';

export type TextSize = 'medium' | 'small' | 'xsmall';

type TextProps = DataAttributes & {
  size?: TextSize;
  ellipsis?: EllipsisProps;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** Renders the text with a heavier (500) weight. */
  strong?: boolean;
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
  style,
  strong,
  ...dataAttributes
}: TextProps) => {
  const Component = MapSizeToComponent[size];
  const mergedStyle = strong ? { fontWeight: 500, ...style } : style;

  if (ellipsis === undefined) {
    return (
      <Component
        {...dataAttributes}
        className={classNames('ds-text', className)}
        style={mergedStyle}
      >
        {children}
      </Component>
    );
  }

  return (
    <Ellipsis
      {...dataAttributes}
      className={className}
      style={style}
      {...ellipsis}
    >
      <Component
        className="ds-text"
        style={strong ? { fontWeight: 500 } : undefined}
      >
        {children}
      </Component>
    </Ellipsis>
  );
};

export default Text;
