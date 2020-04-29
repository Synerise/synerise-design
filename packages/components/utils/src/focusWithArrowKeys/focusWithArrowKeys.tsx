import { KeyboardEvent } from 'react';

const focusWithArrowKeys = (keyDownEvent: KeyboardEvent, focusableItemClass: string, fallback: () => void): void => {
  const focusableElementsNodeList = document.querySelectorAll(`.${focusableItemClass}`);
  const focusableElements = Array.from(focusableElementsNodeList);
  const activeElement = document.activeElement as HTMLElement;
  const activeElementIndex = focusableElements.indexOf(activeElement);
  if (keyDownEvent.key === 'ArrowDown' || keyDownEvent.key === 'ArrowUp') {
    keyDownEvent.preventDefault();
    const isItemFocused = activeElement && activeElement.classList.contains(focusableItemClass);
    if (keyDownEvent.key === 'ArrowDown') {
      let elementToFocusOn = null;
      if (isItemFocused) {
        const nextSibling = activeElement.nextElementSibling as HTMLElement;
        elementToFocusOn =
          nextSibling === null ? (focusableElements[activeElementIndex + 1] as HTMLElement) : nextSibling;
      } else {
        elementToFocusOn = document.querySelector(`.${focusableItemClass}`) as HTMLElement;
      }
      elementToFocusOn === null || elementToFocusOn === undefined ? fallback() : elementToFocusOn.focus();
    }
    if (keyDownEvent.key === 'ArrowUp') {
      let elementToFocusOn = null;
      if (isItemFocused) {
        const prevSibling = activeElement.previousElementSibling as HTMLElement;
        elementToFocusOn =
          prevSibling === null ? (focusableElements[activeElementIndex - 1] as HTMLElement) : prevSibling;
      }
      elementToFocusOn === null || elementToFocusOn === undefined ? fallback() : elementToFocusOn.focus();
    }
  }
  if (keyDownEvent.key === 'Enter') {
    activeElement.click();
  }
};

export default focusWithArrowKeys;
