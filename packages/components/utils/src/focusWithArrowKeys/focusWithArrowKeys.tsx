import { KeyboardEvent } from 'react';

const focusWithArrowKeys = (keyDownEvent: KeyboardEvent, focusableItemClass: string, fallback: () => void): void => {
  const focusableElementsNodeList = document.querySelectorAll(`.${focusableItemClass}`);
  const focusableElements = Array.from(focusableElementsNodeList);
  const activeElement = document.activeElement as HTMLElement;
  const activeElementIndex = focusableElements.indexOf(activeElement);
  const isItemFocused = activeElement && activeElement.classList.contains(focusableItemClass);

  if (keyDownEvent.key === 'ArrowDown') {
    keyDownEvent.preventDefault();
    let elementToFocusOn;
    if (isItemFocused) {
      const nextSibling = activeElement.nextElementSibling as HTMLElement;
      elementToFocusOn =
        nextSibling === null ? (focusableElements[activeElementIndex + 1] as HTMLElement) : nextSibling;
    } else {
      elementToFocusOn = document.querySelector(`.${focusableItemClass}`) as HTMLElement;
    }
    !elementToFocusOn ? fallback() : elementToFocusOn.focus();
    return;
  }

  if (keyDownEvent.key === 'ArrowUp') {
    keyDownEvent.preventDefault();
    let elementToFocusOn;
    if (isItemFocused) {
      const prevSibling = activeElement.previousElementSibling as HTMLElement;
      elementToFocusOn =
        prevSibling === null ? (focusableElements[activeElementIndex - 1] as HTMLElement) : prevSibling;
    }
    !elementToFocusOn ? fallback() : elementToFocusOn.focus();
    return;
  }

  if (keyDownEvent.key === 'Enter') {
    activeElement && activeElement.click();
  }
};

export default focusWithArrowKeys;
