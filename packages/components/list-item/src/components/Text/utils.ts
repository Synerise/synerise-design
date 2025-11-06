import type { ReactNode } from 'react';

import { type AddonRenderer, type BasicItemProps } from '../../ListItem.types';

export const renderAddon = (
  addon: ReactNode | AddonRenderer,
  ...params: Parameters<AddonRenderer>
) => {
  return addon instanceof Function ? addon(...params) : addon;
};

export const removeHandlerProps = (props: BasicItemProps) => {
  return Object.fromEntries(
    Object.entries(props).filter(
      ([key]) => typeof props[key as keyof BasicItemProps] !== 'function',
    ),
  );
};

export const getCopyConfig = ({
  copyable,
  copyValue,
  disabled,
}: Pick<BasicItemProps, 'copyValue' | 'copyable' | 'disabled'>) => {
  const DEFAULT_RESET_TIMER = 1000;
  const DELAY_CLICK_AFTER_COPY_DURATION = 700;
  const enabled =
    copyable &&
    (copyValue || (typeof copyable === 'object' && copyable.copyValue)) &&
    !disabled;
  const valueToCopy =
    typeof copyable === 'object' ? copyable.copyValue : copyValue;
  const copiedLabel =
    typeof copyable === 'object' ? copyable.copiedLabel : null;
  const labelTimerReset =
    (typeof copyable === 'object' && copyable.timeToReset) ||
    DEFAULT_RESET_TIMER;

  const delayClickEvent =
    typeof copyable === 'object' && copyable.delayClickEvent !== undefined
      ? copyable.delayClickEvent
      : copyable
        ? DELAY_CLICK_AFTER_COPY_DURATION
        : false;

  return {
    delayClickEvent,
    enabled,
    valueToCopy,
    copiedLabel,
    labelTimerReset,
  };
};
