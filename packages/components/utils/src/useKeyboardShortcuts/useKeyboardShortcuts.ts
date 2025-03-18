import { useEffect } from 'react';

type ShortcutsConfig = Record<string, (event: KeyboardEvent) => void>;
export const useKeyboardShortcuts = (keyConfig: ShortcutsConfig) => {
  useEffect(() => {
    const keyboardShortcuts = (event: KeyboardEvent) => {
      keyConfig[event.key] && keyConfig[event.key](event);
    };
    document.addEventListener('keydown', keyboardShortcuts);
    return () => {
      document.removeEventListener('keydown', keyboardShortcuts);
    };
  }, [keyConfig]);
};
