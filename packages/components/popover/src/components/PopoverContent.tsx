import React, {
  type HTMLProps,
  forwardRef,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import {
  FloatingFocusManager,
  FloatingPortal,
  useMergeRefs,
} from '@floating-ui/react';
import { useTheme } from '@synerise/ds-core';

import { usePopoverContext } from '../hooks/usePopoverContext';

export const PopoverContent = forwardRef<
  HTMLDivElement,
  HTMLProps<HTMLDivElement>
>(function PopoverContent({ style, ...props }, propRef) {
  const {
    context: floatingContext,
    getPopupContainer,
    modal,
    testId,
    refs,
    getFloatingProps,
    floatingStyles,
    labelId,
    descriptionId,
    transitionStyles,
    componentId,
    zIndex,
  } = usePopoverContext();
  const theme = useTheme();
  const [transitionEnded, setTransitionEnded] = useState(false);
  const popupContainerRef = useRef<HTMLElement | null>(null);
  const ref = useMergeRefs([refs.setFloating, propRef]);

  useEffect(() => {
    if (!floatingContext.open) {
      setTransitionEnded(false);
    }
  }, [floatingContext.open]);

  useEffect(() => {
    if (getPopupContainer && refs.reference.current) {
      popupContainerRef.current = getPopupContainer(
        refs.reference.current as HTMLElement,
      );
    }
  }, [getPopupContainer, refs.reference]);

  const dataProps = useMemo(() => {
    const propsSet: Record<string, string> = {
      'data-testid': `popover-${testId}-content`,
      'data-popover-content': 'true',
    };
    if (componentId) {
      propsSet[`data-popover-${componentId}`] = 'true';
    }
    return propsSet;
  }, [componentId, testId]);

  if (!floatingContext.open) {
    return null;
  }

  return (
    <FloatingPortal root={getPopupContainer ? popupContainerRef : undefined}>
      <FloatingFocusManager
        initialFocus={-1}
        context={floatingContext}
        modal={modal}
      >
        <div
          {...dataProps}
          ref={ref}
          style={{
            ...floatingStyles,
            ...style,
            zIndex:
              zIndex !== undefined
                ? `${zIndex}`
                : theme.variables['zindex-dropdown'],
          }}
          aria-labelledby={labelId}
          aria-describedby={descriptionId}
          {...getFloatingProps(props)}
        >
          {transitionStyles ? (
            <div
              data-transition-state={transitionEnded ? 'ended' : 'started'}
              style={transitionStyles}
              onTransitionEnd={() => setTransitionEnded(true)}
            >
              {props.children}
            </div>
          ) : (
            props.children
          )}
        </div>
      </FloatingFocusManager>
    </FloatingPortal>
  );
});
