// @ts-nocheck
import figma from '@figma/code-connect';

import { Toast } from './Toast';

const TOAST_URL =
  'https://www.figma.com/design/fsSZONXpVvtrDsCgtu01Jb/Synerise-Design-System?node-id=580-9753&m=dev';

figma.connect(Toast, TOAST_URL, {
  variant: { Type: 'Informative' },
  props: {
    message: figma.string('Label Text'),
    description: figma.boolean('Show Description', {
      true: figma.string('Description'),
      false: undefined,
    }),
    withClose: figma.boolean('Show Close'),
    expander: figma.boolean('Show Expander'),
  },
  example: ({ message, description, withClose, expander }) => (
    <Toast
      type="informative"
      message={message}
      description={description}
      withClose={withClose}
      expander={expander}
    />
  ),
});

figma.connect(Toast, TOAST_URL, {
  variant: { Type: 'Success' },
  props: {
    message: figma.string('Label Text'),
    description: figma.boolean('Show Description', {
      true: figma.string('Description'),
      false: undefined,
    }),
    withClose: figma.boolean('Show Close'),
    expander: figma.boolean('Show Expander'),
  },
  example: ({ message, description, withClose, expander }) => (
    <Toast
      type="success"
      message={message}
      description={description}
      withClose={withClose}
      expander={expander}
    />
  ),
});

figma.connect(Toast, TOAST_URL, {
  variant: { Type: 'Warning' },
  props: {
    message: figma.string('Label Text'),
    description: figma.boolean('Show Description', {
      true: figma.string('Description'),
      false: undefined,
    }),
    withClose: figma.boolean('Show Close'),
    expander: figma.boolean('Show Expander'),
  },
  example: ({ message, description, withClose, expander }) => (
    <Toast
      type="warning"
      message={message}
      description={description}
      withClose={withClose}
      expander={expander}
    />
  ),
});

figma.connect(Toast, TOAST_URL, {
  variant: { Type: 'Error' },
  props: {
    message: figma.string('Label Text'),
    description: figma.boolean('Show Description', {
      true: figma.string('Description'),
      false: undefined,
    }),
    withClose: figma.boolean('Show Close'),
    expander: figma.boolean('Show Expander'),
  },
  example: ({ message, description, withClose, expander }) => (
    <Toast
      type="negative"
      message={message}
      description={description}
      withClose={withClose}
      expander={expander}
    />
  ),
});
