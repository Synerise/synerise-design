// @ts-nocheck
import figma from '@figma/code-connect';

import Tags from './Tags';

const TAGS_URL =
  'https://www.figma.com/design/fsSZONXpVvtrDsCgtu01Jb/Synerise-Design-System?node-id=13243-23832&m=dev';

figma.connect(Tags, TAGS_URL, {
  props: {
    title: figma.boolean('Show Label', {
      true: 'Tags:',
      false: undefined,
    }),
    selected: figma.children('Tags list'),
  },
  example: ({ title, selected }) => (
    <Tags title={title} selected={selected} addable removable />
  ),
});
