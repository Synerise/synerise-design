import { isItemAboveScrollViewport } from '../isItemAboveScrollViewport';

const elementAt = (top: number) =>
  ({ getBoundingClientRect: () => ({ top }) }) as Element;

describe('isItemAboveScrollViewport', () => {
  const scrollElement = elementAt(100);

  it('is true for an item that starts above the scroll viewport', () => {
    // body scrolled 300px past the viewport top
    const bodyElement = elementAt(-200);

    expect(
      isItemAboveScrollViewport({ itemStart: 200, bodyElement, scrollElement }),
    ).toBe(true);
  });

  it('is false for a visible item whose start is below the scroll offset only because content precedes the body', () => {
    // a 137px title bar and header sit above the body inside the scroll element
    const bodyElement = elementAt(100 + 137 - 1500);

    expect(
      isItemAboveScrollViewport({
        itemStart: 1400,
        bodyElement,
        scrollElement,
      }),
    ).toBe(false);
  });

  it('counts the top infinite-loader row in the item position', () => {
    const bodyElement = elementAt(-20);

    expect(
      isItemAboveScrollViewport({ itemStart: 100, bodyElement, scrollElement }),
    ).toBe(true);
    expect(
      isItemAboveScrollViewport({
        itemStart: 100,
        bodyElement,
        scrollElement,
        rowOffset: 64,
      }),
    ).toBe(false);
  });
});
