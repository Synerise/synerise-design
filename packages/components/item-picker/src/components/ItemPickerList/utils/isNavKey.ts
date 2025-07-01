import { type KeyboardEvent } from 'react';

const NAV_KEYS = ['ArrowUp', 'Enter', 'ArrowDown'];
export const isNavKey = (event: KeyboardEvent) => {
  return NAV_KEYS.includes(event.key);
};
