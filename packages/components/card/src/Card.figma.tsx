import figma from '@figma/code-connect';

import Card from './Card/Card';

const FIGMA_URL =
  'https://www.figma.com/design/fsSZONXpVvtrDsCgtu01Jb/Synerise-Design-System?node-id=342-7789&m=dev';

figma.connect(Card, FIGMA_URL, {
  variant: { State: 'Default' },
  props: {
    background: figma.enum('Color', {
      'White Shadow': 'white-shadow',
      'Grey Shadow': 'grey-shadow',
      Grey: 'grey',
      White: 'white',
      Outline: 'outline',
    }),
  },
  example: ({ background }) => (
    <Card
      withHeader
      background={background}
      title="Title"
      description="Subtitle"
    >
      Content
    </Card>
  ),
});

figma.connect(Card, FIGMA_URL, {
  variant: { State: 'Hover' },
  props: {
    background: figma.enum('Color', {
      'White Shadow': 'white-shadow',
      'Grey Shadow': 'grey-shadow',
      Grey: 'grey',
      White: 'white',
      Outline: 'outline',
    }),
  },
  example: ({ background }) => (
    <Card
      withHeader
      lively
      background={background}
      title="Title"
      description="Subtitle"
    >
      Content
    </Card>
  ),
});

figma.connect(Card, FIGMA_URL, {
  variant: { State: 'Active' },
  props: {
    background: figma.enum('Color', {
      'White Shadow': 'white-shadow',
      'Grey Shadow': 'grey-shadow',
      Grey: 'grey',
      White: 'white',
      Outline: 'outline',
    }),
  },
  example: ({ background }) => (
    <Card
      withHeader
      raised
      background={background}
      title="Title"
      description="Subtitle"
    >
      Content
    </Card>
  ),
});

figma.connect(Card, FIGMA_URL, {
  variant: { State: 'Filled' },
  props: {
    background: figma.enum('Color', {
      'White Shadow': 'white-shadow',
      'Grey Shadow': 'grey-shadow',
      Grey: 'grey',
      White: 'white',
      Outline: 'outline',
    }),
  },
  example: ({ background }) => (
    <Card
      withHeader
      background={background}
      title="Title"
      description="Subtitle"
      hideContent
      staticContent={<div>Summary</div>}
    />
  ),
});

figma.connect(Card, FIGMA_URL, {
  variant: { State: 'Disabled' },
  props: {
    background: figma.enum('Color', {
      'White Shadow': 'white-shadow',
      'Grey Shadow': 'grey-shadow',
      Grey: 'grey',
      White: 'white',
      Outline: 'outline',
    }),
  },
  example: ({ background }) => (
    <Card
      withHeader
      disabled
      background={background}
      title="Title"
      description="Subtitle"
    >
      Content
    </Card>
  ),
});
