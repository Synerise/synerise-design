// @ts-nocheck
import figma from '@figma/code-connect';

import ShortCuts from './ShortCuts';

const SHORTCUTS_URL =
  'https://www.figma.com/design/fsSZONXpVvtrDsCgtu01Jb/Synerise-Design-System?node-id=7790-419&m=dev';

figma.connect(ShortCuts, SHORTCUTS_URL, {
  variant: { Content: 'Icon', Size: 'Small', Theme: 'Light' },
  props: {
    icon: figma.instance('Icon#9341:0'),
  },
  example: ({ icon }) => <ShortCuts size="S" color="light" icon={icon} />,
});

figma.connect(ShortCuts, SHORTCUTS_URL, {
  variant: { Content: 'Icon', Size: 'Small', Theme: 'Dark' },
  props: {
    icon: figma.instance('Icon#9341:0'),
  },
  example: ({ icon }) => <ShortCuts size="S" color="dark" icon={icon} />,
});

figma.connect(ShortCuts, SHORTCUTS_URL, {
  variant: { Content: 'Icon', Size: 'Large', Theme: 'Light' },
  props: {
    icon: figma.instance('Icon#9341:0'),
  },
  example: ({ icon }) => <ShortCuts size="L" color="light" icon={icon} />,
});

figma.connect(ShortCuts, SHORTCUTS_URL, {
  variant: { Content: 'Icon', Size: 'Large', Theme: 'Dark' },
  props: {
    icon: figma.instance('Icon#9341:0'),
  },
  example: ({ icon }) => <ShortCuts size="L" color="dark" icon={icon} />,
});

figma.connect(ShortCuts, SHORTCUTS_URL, {
  variant: { Content: 'Letter', Size: 'Small', Theme: 'Light' },
  example: () => (
    <ShortCuts size="S" color="light">
      S
    </ShortCuts>
  ),
});

figma.connect(ShortCuts, SHORTCUTS_URL, {
  variant: { Content: 'Letter', Size: 'Small', Theme: 'Dark' },
  example: () => (
    <ShortCuts size="S" color="dark">
      S
    </ShortCuts>
  ),
});

figma.connect(ShortCuts, SHORTCUTS_URL, {
  variant: { Content: 'Letter', Size: 'Large', Theme: 'Light' },
  example: () => (
    <ShortCuts size="L" color="light">
      S
    </ShortCuts>
  ),
});

figma.connect(ShortCuts, SHORTCUTS_URL, {
  variant: { Content: 'Letter', Size: 'Large', Theme: 'Dark' },
  example: () => (
    <ShortCuts size="L" color="dark">
      S
    </ShortCuts>
  ),
});

figma.connect(ShortCuts, SHORTCUTS_URL, {
  variant: { Content: 'Text', Size: 'Small', Theme: 'Light' },
  example: () => (
    <ShortCuts size="S" color="light" autoWidth>
      Ctrl
    </ShortCuts>
  ),
});

figma.connect(ShortCuts, SHORTCUTS_URL, {
  variant: { Content: 'Text', Size: 'Small', Theme: 'Dark' },
  example: () => (
    <ShortCuts size="S" color="dark" autoWidth>
      Ctrl
    </ShortCuts>
  ),
});

figma.connect(ShortCuts, SHORTCUTS_URL, {
  variant: { Content: 'Text', Size: 'Large', Theme: 'Light' },
  example: () => (
    <ShortCuts size="L" color="light" autoWidth>
      Ctrl
    </ShortCuts>
  ),
});

figma.connect(ShortCuts, SHORTCUTS_URL, {
  variant: { Content: 'Text', Size: 'Large', Theme: 'Dark' },
  example: () => (
    <ShortCuts size="L" color="dark" autoWidth>
      Ctrl
    </ShortCuts>
  ),
});
