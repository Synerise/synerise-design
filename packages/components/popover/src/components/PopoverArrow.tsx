import classNames from 'classnames';
import { type ReactElement, cloneElement, isValidElement } from 'react';

import { type Placement } from '@floating-ui/react';
import { useTheme } from '@synerise/ds-core';

import { usePopoverContext } from '../hooks';

export const PopoverArrow = ({
  children,
  getClassNameFromPlacement,
}: {
  children?: ReactElement;
  getClassNameFromPlacement?: (placement: Placement) => string;
}) => {
  const theme = useTheme();
  const { arrowRef, placement, zIndex, middlewareData } = usePopoverContext();

  const placementClassName =
    getClassNameFromPlacement?.(placement) || `ds-popover-arrow-${placement}`;

  if (isValidElement(children)) {
    return cloneElement(children, {
      // @ts-expect-error ref unknown
      ref: arrowRef,
      // @ts-expect-error props.className may not exist
      className: classNames(placementClassName, children.props?.className),
      style: {
        zIndex:
          zIndex !== undefined
            ? `${zIndex}`
            : theme.variables['zindex-dropdown'],
        position: 'absolute',
        left: middlewareData.arrow?.x,
        top: middlewareData.arrow?.y,
      },
    });
  }
  return children;
};
