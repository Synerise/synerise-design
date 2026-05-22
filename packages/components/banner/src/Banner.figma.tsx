// @ts-nocheck
import figma from '@figma/code-connect';

import Banner from './Banner';

const EXPANDABLE_URL =
  'https://www.figma.com/design/fsSZONXpVvtrDsCgtu01Jb/Synerise-Design-System?node-id=8530-1698&m=dev';

const STATIC_URL =
  'https://www.figma.com/design/fsSZONXpVvtrDsCgtu01Jb/Synerise-Design-System?node-id=8530-1704&m=dev';

figma.connect(Banner, EXPANDABLE_URL, {
  variant: { State: 'Collapsed' },
  props: {
    barText: figma.string('Bar Text'),
    onClose: figma.boolean('Close button', {
      true: () => {},
      false: undefined,
    }),
    icon: figma.instance('Bar Icon'),
  },
  example: ({ barText, onClose, icon }) => (
    <Banner
      slides={[{ mainContent: { title: 'Slide content' } }]}
      expandable={{
        title: barText,
        icon,
        isExpanded: false,
      }}
      onClose={onClose}
    />
  ),
});

figma.connect(Banner, EXPANDABLE_URL, {
  variant: { State: 'Expanded' },
  props: {
    barText: figma.string('Bar Text'),
    onClose: figma.boolean('Close button', {
      true: () => {},
      false: undefined,
    }),
    icon: figma.instance('Bar Icon'),
  },
  example: ({ barText, onClose, icon }) => (
    <Banner
      slides={[{ mainContent: { title: 'Slide content' } }]}
      expandable={{
        title: barText,
        icon,
        isExpanded: true,
      }}
      onClose={onClose}
    />
  ),
});

figma.connect(Banner, STATIC_URL, {
  props: {
    onClose: figma.boolean('Close button', {
      true: () => {},
      false: undefined,
    }),
    slides: figma.boolean('Show slider nav', {
      true: [
        { mainContent: { title: 'Slide 1' } },
        { mainContent: { title: 'Slide 2' } },
      ],
      false: [{ mainContent: { title: 'Slide content' } }],
    }),
  },
  example: ({ onClose, slides }) => (
    <Banner slides={slides} onClose={onClose} />
  ),
});
