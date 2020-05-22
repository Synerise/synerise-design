import * as React from 'react';

type ClickEvent = (e: React.SyntheticEvent) => void;
const DEFAULT_DELAY = 250;
const doubleClickListener = (
  onClick: ClickEvent,
  onDblClick: ClickEvent,
  delay = DEFAULT_DELAY
): React.ReactEventHandler<HTMLElement> => {
  let timeout: number | null = null;
  return (event): void => {
    if (!timeout) {
      timeout = setTimeout(() => {
        onClick(event);
        timeout = null;
      }, delay);
    } else {
      clearTimeout(timeout);
      timeout = null;
      onDblClick(event);
    }
  };
};
export default doubleClickListener;
