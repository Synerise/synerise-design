import React, { type ReactNode } from 'react';

import * as S from './Badge.styles';
import { type BadgeProps } from './Badge.types';

const DEFAULT_OVERFLOW_COUNT = 99;

const toOffsetUnit = (value: number | string): string =>
  typeof value === 'number' ? `${value}px` : value;

const renderCount = (count: ReactNode, overflowCount: number): ReactNode => {
  if (typeof count === 'number' && count > overflowCount) {
    return `${overflowCount}+`;
  }
  return count;
};

/**
 * DS-native, antd-free badge core (status dot / count). Renders DS styled-components (no styling via
 * class selectors). Each element carries `ds-badge-*` class hooks for DS consumers (avatar, tabs,
 * tag, …), external CSS and ui-tests. The legacy `ant-badge-*` / `ant-scroll-number-*` hooks have
 * been dropped so a parent app still on the old antd-based badge can no longer leak its global
 * `.ant-badge*` styles onto this one.
 *
 * Public entry is `./Badge` — it delegates here, or to `BadgeWithLabel` when `text` is set.
 */
const BadgeCore = ({
  children,
  status,
  count,
  dot,
  flag,
  pulsing,
  outlined,
  customColor,
  overflowCount = DEFAULT_OVERFLOW_COUNT,
  offset,
  className,
  style,
  ...passthrough
}: BadgeProps) => {
  const hasCount =
    count !== undefined &&
    count !== null &&
    count !== false &&
    count !== 0 &&
    count !== '0';
  // A present count wins over dot mode, so `status`/`customColor` can colour the count.
  const isDot = dot !== undefined ? dot : status !== undefined && !hasCount;
  const hasChildren =
    children !== undefined && children !== null && children !== false;
  const standalone = !hasChildren;
  const showCount = !isDot && hasCount;
  // A custom node (e.g. an icon) renders bare — no count-pill background behind it.
  const isCustomCount = React.isValidElement(count);

  const wrapperClassName = [
    'ds-badge',
    standalone && 'ds-badge-not-a-wrapper',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // Like antd, the consumer's `style` is applied to the indicator element (count/dot), not the
  // wrapper — so a consumer can recolour/hide the badge. Offset is merged in for wrapping badges.
  const indicatorStyle =
    offset && hasChildren
      ? {
          transform: `translate(calc(50% + ${toOffsetUnit(offset[0])}), calc(-50% + ${toOffsetUnit(
            offset[1],
          )}))`,
          ...style,
        }
      : style;

  const statusClassName = status
    ? ` ds-badge-status-dot ds-badge-status-${status}`
    : '';

  return (
    <S.Wrapper className={wrapperClassName} {...passthrough}>
      {children}
      {showCount &&
        (isCustomCount ? (
          <S.CustomCountSup
            className="ds-badge-scroll-number-custom-component"
            $standalone={standalone}
            style={indicatorStyle}
          >
            {count}
          </S.CustomCountSup>
        ) : (
          <S.CountSup
            className="ds-badge-scroll-number ds-badge-count"
            $standalone={standalone}
            $status={status}
            $customColor={customColor}
            $outlined={outlined}
            title={
              typeof count === 'string' || typeof count === 'number'
                ? String(count)
                : undefined
            }
            style={indicatorStyle}
          >
            <S.ScrollNumberOnly className="ds-badge-scroll-number-only">
              <S.Current className="current">
                {renderCount(count, overflowCount)}
              </S.Current>
            </S.ScrollNumberOnly>
          </S.CountSup>
        ))}
      {isDot && (
        <S.DotSup
          className={`ds-badge-dot${statusClassName}`}
          $standalone={standalone}
          $status={status}
          $customColor={customColor}
          $flag={flag}
          $pulsing={pulsing}
          style={indicatorStyle}
        />
      )}
    </S.Wrapper>
  );
};

export default BadgeCore;
