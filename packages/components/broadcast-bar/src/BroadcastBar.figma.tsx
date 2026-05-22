import figma from '@figma/code-connect';
import Button from '@synerise/ds-button';

import BroadcastBar from './BroadcastBar';

const FIGMA_URL =
  'https://www.figma.com/design/fsSZONXpVvtrDsCgtu01Jb/Synerise-Design-System?node-id=719-13397&m=dev';

const sharedProps = {
  description: figma.string('✏️Text'),
  button: figma.boolean('Show Button', {
    true: <Button type="ghost">Action</Button>,
    false: undefined,
  }),
};

figma.connect(BroadcastBar, FIGMA_URL, {
  variant: { Type: 'Success' },
  props: sharedProps,
  example: ({ description, button }) => (
    <BroadcastBar
      type="success"
      description={description}
      button={button}
      withClose
      onCloseClick={() => {}}
    />
  ),
});

figma.connect(BroadcastBar, FIGMA_URL, {
  variant: { Type: 'Warning' },
  props: sharedProps,
  example: ({ description, button }) => (
    <BroadcastBar
      type="warning"
      description={description}
      button={button}
      withClose
      onCloseClick={() => {}}
    />
  ),
});

figma.connect(BroadcastBar, FIGMA_URL, {
  variant: { Type: 'Error' },
  props: sharedProps,
  example: ({ description, button }) => (
    <BroadcastBar
      type="negative"
      description={description}
      button={button}
      withClose
      onCloseClick={() => {}}
    />
  ),
});
