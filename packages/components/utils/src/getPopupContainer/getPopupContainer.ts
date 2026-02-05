export function getClosest(
  elem: HTMLElement | null,
  selector: string,
): HTMLElement | null {
  for (
    let node = elem;
    node && node !== document.body;
    node = node.parentElement
  ) {
    if (node.matches(selector)) {
      return node;
    }
  }
  return null;
}

export function getPopupContainer(trigger: HTMLElement | null): HTMLElement {
  return (
    (trigger instanceof HTMLElement &&
      getClosest(trigger, '[data-popup-container]')) ||
    document.body
  );
}
