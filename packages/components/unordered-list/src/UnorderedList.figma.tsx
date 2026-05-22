// @ts-nocheck
import figma from '@figma/code-connect';

import UnorderedList from './Unordered-list';

const URL =
  'https://www.figma.com/design/fsSZONXpVvtrDsCgtu01Jb/Synerise-Design-System?node-id=16617-1906&m=dev';

figma.connect(UnorderedList, URL, {
  variant: { State: 'Default' },
  example: () => (
    <UnorderedList
      text="List Header"
      data={[
        { id: '0', index: 0, label: 'List item' },
        { id: '1', index: 1, label: 'List item' },
        { id: '2', index: 2, label: 'List item' },
        { id: '3', index: 3, label: 'List item' },
        { id: '4', index: 4, label: 'List item' },
      ]}
    />
  ),
});

figma.connect(UnorderedList, URL, {
  variant: { State: 'Multi level' },
  example: () => (
    <UnorderedList
      text="List Header"
      data={[
        { id: '0', index: 0, label: 'List item' },
        {
          id: '1',
          index: 1,
          label: 'List item',
          subMenu: [
            { id: '1-0', index: 0, label: 'Nested item' },
            { id: '1-1', index: 1, label: 'Nested item' },
          ],
        },
        { id: '2', index: 2, label: 'List item' },
        { id: '3', index: 3, label: 'List item' },
      ]}
    />
  ),
});
