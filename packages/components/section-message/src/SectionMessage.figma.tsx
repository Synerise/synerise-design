import figma from '@figma/code-connect';

import SectionMessage from './SectionMessage';

const FIGMA_URL =
  'https://www.figma.com/design/fsSZONXpVvtrDsCgtu01Jb/Synerise-Design-System?node-id=467-7877&m=dev';

const sharedProps = {
  description: figma.string('Text'),
  message: figma.boolean('Show Header', {
    true: figma.string('Text Header'),
    false: undefined,
  }),
  withClose: figma.boolean('Show Close'),
  withEmphasis: figma.boolean('Show Emphasis Text', {
    true: figma.string('Emphasis'),
    false: undefined,
  }),
  withLink: figma.boolean('Show Link text', {
    true: <a href="#">Link</a>,
    false: undefined,
  }),
};

figma.connect(SectionMessage, FIGMA_URL, {
  variant: { Type: 'Neutral' },
  props: sharedProps,
  example: ({ message, description, withClose, withEmphasis, withLink }) => (
    <SectionMessage
      type="neutral"
      message={message}
      description={description}
      withClose={withClose}
      withEmphasis={withEmphasis}
      withLink={withLink}
    />
  ),
});

figma.connect(SectionMessage, FIGMA_URL, {
  variant: { Type: 'Notice' },
  props: sharedProps,
  example: ({ message, description, withClose, withEmphasis, withLink }) => (
    <SectionMessage
      type="notice"
      message={message}
      description={description}
      withClose={withClose}
      withEmphasis={withEmphasis}
      withLink={withLink}
    />
  ),
});

figma.connect(SectionMessage, FIGMA_URL, {
  variant: { Type: 'Negative' },
  props: sharedProps,
  example: ({ message, description, withClose, withEmphasis, withLink }) => (
    <SectionMessage
      type="negative"
      message={message}
      description={description}
      withClose={withClose}
      withEmphasis={withEmphasis}
      withLink={withLink}
    />
  ),
});

figma.connect(SectionMessage, FIGMA_URL, {
  variant: { Type: 'Positive' },
  props: sharedProps,
  example: ({ message, description, withClose, withEmphasis, withLink }) => (
    <SectionMessage
      type="positive"
      message={message}
      description={description}
      withClose={withClose}
      withEmphasis={withEmphasis}
      withLink={withLink}
    />
  ),
});

figma.connect(SectionMessage, FIGMA_URL, {
  variant: { Type: 'Supply' },
  props: sharedProps,
  example: ({ message, description, withClose, withEmphasis, withLink }) => (
    <SectionMessage
      type="supply"
      message={message}
      description={description}
      withClose={withClose}
      withEmphasis={withEmphasis}
      withLink={withLink}
    />
  ),
});

figma.connect(SectionMessage, FIGMA_URL, {
  variant: { Type: 'Service' },
  props: sharedProps,
  example: ({ message, description, withClose, withEmphasis, withLink }) => (
    <SectionMessage
      type="service"
      message={message}
      description={description}
      withClose={withClose}
      withEmphasis={withEmphasis}
      withLink={withLink}
    />
  ),
});

figma.connect(SectionMessage, FIGMA_URL, {
  variant: { Type: 'Entity' },
  props: sharedProps,
  example: ({ message, description, withClose, withEmphasis, withLink }) => (
    <SectionMessage
      type="entity"
      message={message}
      description={description}
      withClose={withClose}
      withEmphasis={withEmphasis}
      withLink={withLink}
    />
  ),
});
