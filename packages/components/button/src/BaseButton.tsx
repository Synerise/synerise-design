import React, { type ReactNode, forwardRef, useEffect, useState } from 'react';

import * as S from './BaseButton.styles';
import { type BaseButtonProps } from './BaseButton.types';

const sizeClassMap: Record<string, string> = {
  large: 'ant-btn-lg',
  small: 'ant-btn-sm',
};

function isFragment(child: ReactNode): boolean {
  return React.isValidElement(child) && child.type === React.Fragment;
}

/**
 * Wraps string, number, and Fragment children in <span> elements,
 * matching the original ant-btn DOM structure.
 */
function wrapChildren(children: ReactNode): ReactNode {
  return React.Children.map(children, (child) => {
    if (typeof child === 'string' || typeof child === 'number') {
      return <span>{child}</span>;
    }
    if (isFragment(child)) {
      return <span>{child}</span>;
    }
    return child;
  });
}

/**
 * Base button component.
 *
 * Produces CSS class names:
 *   ant-btn ant-btn-{type} [ant-btn-lg] [ant-btn-sm] [ant-btn-block] [ant-btn-loading]
 */
const BaseButton = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  BaseButtonProps
>(
  (
    {
      type = 'default',
      size,
      loading = false,
      block = false,
      htmlType = 'button',
      href,
      target,
      download,
      className,
      children,
      disabled,
      onClick,
      ...rest
    },
    ref,
  ) => {
    const [innerLoading, setInnerLoading] = useState(false);

    useEffect(() => {
      let delayTimer: ReturnType<typeof setTimeout> | null = null;

      if (typeof loading === 'object' && loading.delay) {
        delayTimer = setTimeout(() => {
          delayTimer = null;
          setInnerLoading(true);
        }, loading.delay);
      } else {
        setInnerLoading(!!loading);
      }

      return () => {
        if (delayTimer) {
          clearTimeout(delayTimer);
          delayTimer = null;
        }
      };
    }, [loading]);

    const handleClick = (e: React.MouseEvent<HTMLElement>): void => {
      if (innerLoading || disabled) {
        e.preventDefault();
        return;
      }
      onClick?.(e);
    };

    const classes = [
      'ant-btn',
      type && `ant-btn-${type}`,
      size && sizeClassMap[size],
      block && 'ant-btn-block',
      innerLoading && 'ant-btn-loading',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const sharedProps = {
      className: classes,
      'aria-disabled': innerLoading || disabled || undefined,
      tabIndex: innerLoading ? -1 : undefined,
      onClick: handleClick,
      ...rest,
    };

    if (href) {
      const anchorProps = {
        ...sharedProps,
        as: 'a' as const,
        ref: ref as React.Ref<HTMLAnchorElement>,
        href: disabled ? undefined : href,
        target,
        download,
      };
      return (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        <S.Button {...(anchorProps as any)}>{wrapChildren(children)}</S.Button>
      );
    }

    return (
      <S.Button
        ref={ref as React.Ref<HTMLButtonElement>}
        type={htmlType}
        disabled={disabled}
        {...sharedProps}
      >
        {wrapChildren(children)}
      </S.Button>
    );
  },
);

BaseButton.displayName = 'BaseButton';

export default BaseButton;
