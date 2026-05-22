// @ts-nocheck
import figma from '@figma/code-connect';

import IconPicker from './IconPicker';

const FIGMA_URL =
  'https://www.figma.com/design/fsSZONXpVvtrDsCgtu01Jb/Synerise-Design-System?node-id=2014-35830&m=dev';

figma.connect(IconPicker, FIGMA_URL, {
  variant: { 'Content Type': 'Complex' },
  example: () => (
    <IconPicker
      data={[
        {
          category: 'Icons',
          items: [{ item: 'icon', value: 'icon', keywords: 'icon' }],
        },
        {
          category: 'Emoji',
          items: [{ item: '😀', value: 'grinning', keywords: 'smile happy' }],
        },
      ]}
      onSelect={() => {}}
      trigger={['click']}
      placeholder="Search"
    />
  ),
});

figma.connect(IconPicker, FIGMA_URL, {
  variant: { 'Content Type': 'Icons' },
  example: () => (
    <IconPicker
      data="design-system"
      onSelect={() => {}}
      trigger={['click']}
      placeholder="Search icons"
    />
  ),
});

figma.connect(IconPicker, FIGMA_URL, {
  variant: { 'Content Type': 'Emoji' },
  example: () => (
    <IconPicker
      data={[
        {
          category: 'Emoji',
          items: [
            { item: '😀', value: 'grinning', keywords: 'grinning smile happy' },
            { item: '😊', value: 'blush', keywords: 'blush smile' },
            { item: '😍', value: 'heart-eyes', keywords: 'love heart eyes' },
          ],
        },
      ]}
      onSelect={() => {}}
      trigger={['click']}
      placeholder="Search emoji"
    />
  ),
});

figma.connect(IconPicker, FIGMA_URL, {
  variant: { 'Content Type': 'Avatars' },
  example: () => (
    <IconPicker
      data={[
        {
          category: 'Avatars',
          items: [{ item: 'avatar', value: 'avatar', keywords: 'avatar' }],
        },
      ]}
      onSelect={() => {}}
      trigger={['click']}
      placeholder="Search avatars"
    />
  ),
});
