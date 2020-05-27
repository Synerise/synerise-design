import { KeyboardEvent } from 'react';

const hasFocusableElementInside = (element: HTMLElement, query: string): boolean => {
  return element.querySelectorAll(query).length > 0;
};

const focusWithArrowKeys = (keyDownEvent: KeyboardEvent, focusableItemClass: string, fallback: () => void): void => {
  const selector = `.${focusableItemClass}`;
  const focusableElementsNodeList = document.querySelectorAll(selector);
  const focusableElements = Array.from(focusableElementsNodeList);
  const activeElement = document.activeElement as HTMLElement;
  const activeElementIndex = focusableElements.indexOf(activeElement);
  const isItemFocused = activeElement && activeElement.classList.contains(focusableItemClass);

  if (keyDownEvent.key === 'ArrowDown') {
    keyDownEvent.preventDefault();
    let elementToFocusOn;
    if (isItemFocused) {
      const nextSibling = activeElement.nextElementSibling as HTMLElement;
      const hasFocusableChildren = hasFocusableElementInside(activeElement, selector);
      elementToFocusOn =
        nextSibling !== null && !hasFocusableChildren
          ? nextSibling
          : (focusableElements[activeElementIndex + 1] as HTMLElement);
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
      const hasFocusableChildren = hasFocusableElementInside(activeElement, selector);
      elementToFocusOn =
        prevSibling !== null && !hasFocusableChildren
          ? prevSibling
          : (focusableElements[activeElementIndex - 1] as HTMLElement);
    }
    !elementToFocusOn ? fallback() : elementToFocusOn.focus();
    return;
  }

  if (keyDownEvent.key === 'Enter') {
    activeElement && activeElement.click();
  }
};
export default focusWithArrowKeys;
