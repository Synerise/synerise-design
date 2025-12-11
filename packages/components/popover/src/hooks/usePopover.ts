import { useMemo, useState } from 'react';

import {
  type FloatingElement,
  type OpenChangeReason,
  type ReferenceElement,
  autoUpdate,
  useClick,
  useDismiss,
  useFloating,
  useHover,
  useInteractions,
  useListNavigation,
  useRole,
  useTransitionStyles,
} from '@floating-ui/react';

import { HOVER_CLOSE_DELAY, HOVER_OPEN_DELAY } from '../Popover.const';
import { type PopoverOptions } from '../Popover.types';
import { getDefaultTransitionConfig, getMiddleware } from '../utils';
import { useListNavigationConfig } from './useListNavigationConfig';

export const usePopover = ({
  initialOpen = false,
  placement = 'bottom',
  modal,
  trigger = 'click',
  open: controlledOpen,
  onOpenChange: setControlledOpen,
  onDismiss,
  transitionDuration,
  getPopupContainer,
  autoUpdate: autoUpdateWhileMounted,
  dismissConfig = {},
  offsetConfig = {},
  flipConfig = {},
  shiftConfig = {},
  testId = 'noTestId',
  componentId,
  returnFocus,
  listNavigationConfig,
  getTransitionConfig = getDefaultTransitionConfig,
  zIndex,
}: PopoverOptions = {}) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(initialOpen);
  const [labelId, setLabelId] = useState<string | undefined>();
  const [descriptionId, setDescriptionId] = useState<string | undefined>();
  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = setControlledOpen ?? setUncontrolledOpen;

  const triggerArray = Array.isArray(trigger) ? trigger : [trigger];

  const whileElementsMounted = useMemo(() => {
    if (!autoUpdateWhileMounted) {
      return undefined;
    }
    if (autoUpdateWhileMounted === true) {
      return autoUpdate;
    }
    return (
      referenceEl: ReferenceElement,
      floatingEl: FloatingElement,
      update: () => void,
    ) => {
      const cleanup = autoUpdate(
        referenceEl,
        floatingEl,
        update,
        autoUpdateWhileMounted,
      );
      return cleanup;
    };
  }, [autoUpdateWhileMounted]);
  const data = useFloating({
    placement,
    open,
    onOpenChange: (
      newState: boolean,
      event?: Event,
      reason?: OpenChangeReason,
    ) => {
      setOpen(newState, event, reason);
      if (
        dismissConfig.enabled !== false &&
        (reason === 'escape-key' || reason === 'outside-press')
      ) {
        onDismiss?.(event, reason);
      }
    },
    whileElementsMounted,
    middleware: getMiddleware({ offsetConfig, flipConfig, shiftConfig }),
  });

  const context = data.context;

  const isClickEnabled = triggerArray.includes('click');
  const isHoverEnabled = triggerArray.includes('hover');

  const listNavConfig = useListNavigationConfig(listNavigationConfig);
  const listNav = useListNavigation(context, listNavConfig);

  const click = useClick(context, {
    enabled: isClickEnabled && controlledOpen === undefined,
  });
  const hover = useHover(context, {
    enabled: isHoverEnabled,
    delay: {
      open: HOVER_OPEN_DELAY,
      close: HOVER_CLOSE_DELAY,
    },
  });

  const dismiss = useDismiss(context, dismissConfig);
  const role = useRole(context);

  const interactions = useInteractions([click, hover, dismiss, role, listNav]);

  const { styles, isMounted } = useTransitionStyles(context, {
    duration: transitionDuration,
    ...getTransitionConfig(data),
  });

  return useMemo(
    () => ({
      open: isMounted,
      setOpen,
      transitionStyles:
        typeof transitionDuration === 'number' ? styles : undefined,
      ...interactions,
      ...data,
      modal,
      labelId,
      getPopupContainer,
      descriptionId,
      setLabelId,
      setDescriptionId,
      testId,
      zIndex,
      returnFocus,
      componentId,
    }),
    [
      getPopupContainer,
      isMounted,
      setOpen,
      transitionDuration,
      styles,
      interactions,
      data,
      modal,
      labelId,
      descriptionId,
      zIndex,
      testId,
      returnFocus,
      componentId,
    ],
  );
};
