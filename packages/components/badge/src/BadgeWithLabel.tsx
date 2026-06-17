import React, { type CSSProperties, type ReactNode } from 'react';

import { type BadgeProps } from './Badge.types';
import BadgeCore from './BadgeCore';
import * as S from './BadgeWithLabel.styles';

export type BadgeWithLabelProps = Pick<
  BadgeProps,
  'status' | 'customColor' | 'flag' | 'pulsing' | 'dot'
> & {
  /** Label rendered next to the badge dot. */
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
};

/**
 * A status/dot `Badge` aligned next to a text label — the antd-free replacement for the old
 * `Badge` `text` prop. Owns the dot↔label alignment so consumers don't have to.
 */
const BadgeWithLabel = ({
  children,
  className,
  style,
  ...badgeProps
}: BadgeWithLabelProps) => (
  <S.Wrapper className={className} style={style}>
    <BadgeCore {...badgeProps} />
    <S.Label>{children}</S.Label>
  </S.Wrapper>
);

export default BadgeWithLabel;
