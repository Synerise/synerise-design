import classnames from 'classnames';
import React, { forwardRef, useEffect, useRef, useState } from 'react';

import { useMergeRefs } from '@floating-ui/react';

import { getDropdownWidth } from '../../utils';
import { OverlayWrapper } from './DropdownOverlay.styles';
import { type DropdownOverlayProps } from './DropdownOverlay.types';

export const DropdownOverlay = forwardRef<HTMLDivElement, DropdownOverlayProps>(
  (
    {
      content,
      size,
      overlayStyle,
      overlayClassName,
      htmlAttributes,
      hideOnItemClick,
      handleItemClick,
      triggerRef,
    },
    ref,
  ) => {
    const overlayWrapperRef = useRef<HTMLDivElement | null>(null);
    const mergedRef = useMergeRefs([overlayWrapperRef, ref]);
    const [overlaySize, setOverlaySize] = useState<number>(
      getDropdownWidth(size) ?? 0,
    );

    useEffect(() => {
      if (
        triggerRef.current &&
        (size === 'match-trigger' || size === 'min-match-trigger')
      ) {
        setOverlaySize(triggerRef.current.clientWidth);
      } else {
        setOverlaySize(getDropdownWidth(size) ?? 0);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [size]);

    useEffect(() => {
      const handleItemSelect = (element: HTMLElement) => {
        const itemSelector =
          typeof hideOnItemClick === 'string'
            ? hideOnItemClick
            : '[role="menuitem"]';
        const listItem = element.closest(itemSelector);
        if (overlayWrapperRef.current?.contains(listItem)) {
          setTimeout(() => {
            handleItemClick?.();
          }, 0);
        }
      };
      const handleOverlayClick = (event: MouseEvent) => {
        if (
          overlayWrapperRef.current &&
          typeof hideOnItemClick === 'string' &&
          event.target instanceof HTMLElement
        ) {
          handleItemSelect(event.target);
        }
      };

      const handleItemEnterPress = (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
          if (
            overlayWrapperRef.current &&
            typeof hideOnItemClick === 'string' &&
            event.target instanceof HTMLElement
          ) {
            handleItemSelect(event.target);
          }
        }
      };
      const overlayNode = overlayWrapperRef.current;
      if (overlayNode) {
        overlayNode.addEventListener('click', handleOverlayClick);
        overlayNode.addEventListener('keydown', handleItemEnterPress);
      }
      return () => {
        if (overlayNode) {
          overlayNode.removeEventListener('click', handleOverlayClick);
          overlayNode.removeEventListener('keydown', handleItemEnterPress);
        }
      };
    });

    return (
      <OverlayWrapper
        style={overlayStyle}
        className={classnames(overlayClassName, htmlAttributes?.className)}
        $width={overlaySize}
        widthProperty={size === 'min-match-trigger' ? 'min-width' : 'width'}
        ref={mergedRef}
        {...htmlAttributes}
      >
        {content}
      </OverlayWrapper>
    );
  },
);
