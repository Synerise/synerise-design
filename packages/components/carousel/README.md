# @synerise/ds-carousel

DS-native carousel primitive for the Synerise Design System — slides with `scrollx`/`fade`
transitions, autoplay, built-in dots, and an imperative `goTo/next/prev` ref. antd-free.

```tsx
import Carousel, { type CarouselRef } from '@synerise/ds-carousel';

const ref = useRef<CarouselRef>(null);

<Carousel ref={ref} effect="fade" autoplay autoplaySpeed={4000}>
  <img src="/a.jpg" />
  <img src="/b.jpg" />
</Carousel>;

// imperative navigation
ref.current?.next();
```

See `CLAUDE.md` for the full API.
