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
import { GlobalStyles } from './PopoverContent.styles';

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
    returnFocus = true,
    closeOnFocusOut = true,
    zIndex,
    middlewareData,
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

  // Reported by the `hide` middleware when the anchor is scrolled out of the viewport or clipped by
  // a scrolling ancestor. `autoUpdate` keeps the overlay glued to its anchor, so without this an
  // overlay whose anchor scrolls away would follow it off-screen and stay mounted — invisible, yet
  // still holding focus and swallowing clicks.
  //
  // Hidden rather than closed, so nothing the user has typed is lost: scrolling the anchor back into
  // view brings the overlay back as it was. It takes three declarations, each covering what the
  // others cannot:
  //
  // - `visibility: hidden` takes the subtree out of hit-testing and out of the focus order, which
  //   `opacity: 0` on its own would not.
  // - `opacity: 0` is what actually guarantees nothing paints. `visibility` is inherited, and a
  //   descendant declaring `visibility: visible` overrides an ancestor that asked to be hidden —
  //   unlike `display: none`, being hidden this way is something a child can undo. Opacity is not
  //   inherited and applies to the subtree as a single group, so no descendant can raise it back.
  // - `pointer-events: none` catches that same descendant on the way back: having re-asserted its
  //   own visibility it would still be clickable, and an invisible click target is worse than a
  //   visible one.
  //
  // An anchor reporting no box at all reads as hidden only if it once reported one. A box that was
  // there and is now gone belongs to an anchor that stopped being rendered — a hover-revealed row
  // action on mouse-out, a collapsed accordion, a tab that is no longer the current one — and
  // `autoUpdate` will already have repositioned the overlay against that 0×0 box at the document
  // origin, which `flip` and `shift` then clamp into the viewport: the overlay lands in the top-left
  // corner and sits there for as long as it stays open, `HOVER_CLOSE_DELAY` in a tooltip's case.
  //
  // A box that was never there is no layout information at all, and reading that as hidden is what
  // would break jsdom, where nothing has layout and every anchor would otherwise report as hidden,
  // silently making every consumer's `toBeVisible()` assertion on overlay content fail.
  //
  // `hide` stays the only thing that decides; the latch below just widens what it is allowed to
  // judge. So `hideConfig={{ enabled: false }}` still opts out of all of this, and an anchor that is
  // genuinely 0×0 while in view — a marker span — is still left alone.
  //
  // The latch is written during render on purpose: the measurement has to be latched in the pass
  // that consumes it, or the masking commits one paint after the coordinates it is masking. It is
  // monotonic and read off the DOM rather than derived from props or state, so neither a
  // double-invoked (StrictMode) nor a discarded (concurrent) render can make it disagree with
  // itself — and hiding needs the current render to measure zero as well.
  const anchorRect = (
    refs.reference.current as HTMLElement | null
  )?.getBoundingClientRect();
  const anchorHasLayout = Boolean(
    anchorRect && (anchorRect.width > 0 || anchorRect.height > 0),
  );
  const anchorHadLayoutRef = useRef(false);
  if (anchorHasLayout) {
    anchorHadLayoutRef.current = true;
  }
  const isAnchorHidden =
    anchorHadLayoutRef.current &&
    middlewareData?.hide?.referenceHidden === true;

  const dataProps = useMemo(() => {
    const propsSet: Record<string, string> = {
      'data-testid': `popover-${testId}-content`,
      'data-popover-content': 'true',
    };
    if (componentId) {
      propsSet[`data-popover-${componentId}`] = 'true';
    }
    if (isAnchorHidden) {
      // Exposed so a consumer can style or assert on it; the hiding itself is done below.
      propsSet['data-popover-anchor-hidden'] = 'true';
    }
    return propsSet;
  }, [componentId, testId, isAnchorHidden]);

  if (!floatingContext.open) {
    return null;
  }

  return (
    <FloatingPortal root={getPopupContainer ? popupContainerRef : undefined}>
      <GlobalStyles />
      <FloatingFocusManager
        initialFocus={-1}
        context={floatingContext}
        modal={modal}
        returnFocus={returnFocus}
        closeOnFocusOut={closeOnFocusOut}
      >
        <div
          {...dataProps}
          ref={ref}
          style={{
            ...floatingStyles,
            ...style,
            ...(isAnchorHidden && {
              visibility: 'hidden',
              opacity: 0,
              pointerEvents: 'none',
            }),
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
