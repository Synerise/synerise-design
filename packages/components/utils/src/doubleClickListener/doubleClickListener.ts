import * as React from 'react';

const DEFAULT_DELAY = 250;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function doubleClickListener<T extends any>(
  onClick: (e: React.SyntheticEvent<T>) => void,
  onDblClick: (e: React.SyntheticEvent<T>) => void,
  delay = DEFAULT_DELAY
): React.ReactEventHandler<T> {
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
}
export default doubleClickListener;
