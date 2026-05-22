import figma from '@figma/code-connect';

import AvatarGroup from './AvatarGroup';
import { type DataSource } from './AvatarGroup.types';

const FIGMA_URL =
  'https://www.figma.com/design/fsSZONXpVvtrDsCgtu01Jb/Synerise-Design-System?node-id=252-4918&m=dev';

const dataSource: DataSource[] = [
  {
    id: 0,
    initials: 'KK',
    firstname: 'Kamil',
    lastname: 'Kowalski',
    email: 'k.kowalski@example.com',
    status: 'active',
    avatarProps: {
      backgroundColor: 'blue',
      backgroundColorHue: '600',
    },
  },
  {
    id: 1,
    initials: 'AN',
    firstname: 'Anna',
    lastname: 'Nowak',
    email: 'a.nowak@example.com',
    status: 'active',
    avatarProps: {
      backgroundColor: 'fern',
      backgroundColorHue: '600',
    },
  },
  {
    id: 2,
    initials: 'JS',
    firstname: 'Jan',
    lastname: 'Stamford',
    email: 'j.stamford@example.com',
    status: 'inactive',
    avatarProps: {
      backgroundColor: 'pink',
      backgroundColorHue: '600',
    },
  },
  {
    id: 3,
    initials: 'MW',
    firstname: 'Maria',
    lastname: 'Wiśniewska',
    email: 'm.wisniewska@example.com',
    status: 'active',
    avatarProps: {
      backgroundColor: 'mars',
      backgroundColorHue: '600',
    },
  },
];

figma.connect(AvatarGroup, FIGMA_URL, {
  props: {
    size: figma.enum('Size', {
      Small: 'small',
      Medium: 'medium',
      Large: 'large',
      'Extra Large': 'large',
    }),
  },
  example: ({ size }) => (
    <AvatarGroup
      size={size}
      dataSource={dataSource}
      numberOfVisibleUsers={3}
      moreInfoTooltip="more users"
      hasStatus
    />
  ),
});
