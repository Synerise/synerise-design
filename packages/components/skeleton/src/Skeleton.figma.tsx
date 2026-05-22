import figma from '@figma/code-connect';

import Skeleton from './Skeleton';

figma.connect(
  Skeleton,
  'https://www.figma.com/design/fsSZONXpVvtrDsCgtu01Jb/Synerise-Design-System?node-id=16324-15086&m=dev',
  {
    example: () => <Skeleton numberOfSkeletons={1} />,
  },
);

figma.connect(
  Skeleton,
  'https://www.figma.com/design/fsSZONXpVvtrDsCgtu01Jb/Synerise-Design-System?node-id=16324-15239&m=dev',
  {
    example: () => <Skeleton numberOfSkeletons={3} />,
  },
);
