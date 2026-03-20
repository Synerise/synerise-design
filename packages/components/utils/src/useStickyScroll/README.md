# useStickyScroll

A hook that implements bidirectional sticky scroll behavior for a sidebar element within a scroll container.

## Behavior

- **Scrolling down** — the element scrolls with the page. Once its bottom aligns with the viewport bottom, it pins in place while the rest of the content continues scrolling.
- **Scrolling up** — the element scrolls back up with the page. Once its top aligns with the viewport top, it pins in place.
- **Element fits in viewport** — pins at the top (equivalent to `position: sticky; top: 0`).

The hook automatically accounts for the scroll container's padding when calculating the visible content area.

## Usage

```tsx
import { useStickyScroll } from '@synerise/ds-utils';

const MyPage = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useStickyScroll({ scrollContainerRef });

  return (
    <div ref={scrollContainerRef} style={{ overflow: 'auto', height: '100vh', padding: 24 }}>
      <div style={{ display: 'flex' }}>
        {/* Left column — virtual list stretches this */}
        <div style={{ flex: 1 }}>
          <VirtualList scrollContainerRef={scrollContainerRef} />
        </div>

        {/* Right column — sticky scroll behavior */}
        <div style={{ width: 400 }}>
          <div ref={stickyRef}>
            {/* Your right column content */}
          </div>
        </div>
      </div>
    </div>
  );
};
```

## API

### Options

| Prop                 | Type                     | Default | Description                                          |
| -------------------- | ------------------------ | ------- | ---------------------------------------------------- |
| `scrollContainerRef` | `RefObject<HTMLElement>` | —       | Ref to the scrollable container element              |
| `offsetTop`          | `number`                 | `0`     | Extra offset from the top when sticking at the top   |
| `offsetBottom`       | `number`                 | `0`     | Extra offset from the bottom when sticking at bottom |

### Returns

| Value       | Type                        | Description                                        |
| ----------- | --------------------------- | -------------------------------------------------- |
| `stickyRef` | `RefObject<HTMLDivElement>` | Ref to attach to the element that should be sticky |

## Notes

- The `stickyRef` should be placed on the **inner content** div of the right column, not the column wrapper itself.
- The hook applies `position: sticky` and dynamically updates the `top` value based on scroll direction.
- The scroll container's `paddingTop` and `paddingBottom` are automatically read and subtracted from `clientHeight` to determine the visible content area.
- Works with any scroll container, including ones stretched by react-window virtual lists.
