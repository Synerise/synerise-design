import figma from '@figma/code-connect';

import InlineAlert from './InlineAlert';

const FIGMA_URL =
  'https://www.figma.com/design/fsSZONXpVvtrDsCgtu01Jb/Synerise-Design-System?node-id=342-6900&m=dev';

const sharedProps = {
  message: figma.string('Text'),
  withLink: figma.boolean('Show Link', {
    true: <a href="#">Link</a>,
    false: undefined,
  }),
  withEmphasis: figma.boolean('Show Emphasis', {
    true: 'Emphasis',
    false: undefined,
  }),
};

figma.connect(InlineAlert, FIGMA_URL, {
  variant: { 'Message Type': 'Informative' },
  props: sharedProps,
  example: ({ message, withLink, withEmphasis }) => (
    <InlineAlert
      type="info"
      message={message}
      withLink={withLink}
      withEmphasis={withEmphasis}
    />
  ),
});

figma.connect(InlineAlert, FIGMA_URL, {
  variant: { 'Message Type': 'Success' },
  props: sharedProps,
  example: ({ message, withLink, withEmphasis }) => (
    <InlineAlert
      type="success"
      message={message}
      withLink={withLink}
      withEmphasis={withEmphasis}
    />
  ),
});

figma.connect(InlineAlert, FIGMA_URL, {
  variant: { 'Message Type': 'Warning' },
  props: sharedProps,
  example: ({ message, withLink, withEmphasis }) => (
    <InlineAlert
      type="warning"
      message={message}
      withLink={withLink}
      withEmphasis={withEmphasis}
    />
  ),
});

figma.connect(InlineAlert, FIGMA_URL, {
  variant: { 'Message Type': 'Error' },
  props: sharedProps,
  example: ({ message, withLink, withEmphasis }) => (
    <InlineAlert
      type="alert"
      message={message}
      withLink={withLink}
      withEmphasis={withEmphasis}
    />
  ),
});
