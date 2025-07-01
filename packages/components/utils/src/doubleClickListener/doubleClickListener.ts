import type React from 'react';

const DEFAULT_DELAY = 250;

function doubleClickListener<T>(
  onClick: (e: React.SyntheticEvent<T>) => void,
  onDblClick: (e: React.SyntheticEvent<T>) => void,
  delay = DEFAULT_DELAY,
): React.ReactEventHandler<T> {
  let timeout: ReturnType<typeof setTimeout> | null;
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
