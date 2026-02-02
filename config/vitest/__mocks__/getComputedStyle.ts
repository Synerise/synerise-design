const original = window.getComputedStyle;

window.getComputedStyle = (elt: Element, pseudoElt?: string | null) => {
  if (pseudoElt) {
    // jsdom doesn't support pseudo elements; fall back to normal
    return original(elt);
  }
  return original(elt);
};