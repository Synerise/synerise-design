// @ts-nocheck
import figma from '@figma/code-connect';

import Pagination from './Pagination';

const PAGINATION_URL =
  'https://www.figma.com/design/fsSZONXpVvtrDsCgtu01Jb/Synerise-Design-System?node-id=1315-31852&m=dev';

figma.connect(Pagination, PAGINATION_URL, {
  props: {
    showSizeChanger: figma.boolean('Show Input#2297:0'),
  },
  example: ({ showSizeChanger }) => (
    <Pagination
      defaultCurrent={1}
      total={500}
      showSizeChanger={showSizeChanger}
    />
  ),
});
