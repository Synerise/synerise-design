import figma from '@figma/code-connect';

import CardSelect from './CardSelect';

const FIGMA_URL =
  'https://www.figma.com/design/fsSZONXpVvtrDsCgtu01Jb/Synerise-Design-System?node-id=497-10607&m=dev';

const sharedProps = {
  size: figma.enum('Size', {
    Normal: 'medium',
    Small: 'small',
  }),
  raised: figma.enum('Rised', {
    True: true,
    False: false,
  }),
  title: figma.string('✏️Text Header'),
  description: figma.boolean('Show Description', {
    true: figma.string('✏️Description'),
    false: undefined,
  }),
  tickVisible: figma.boolean('Show Check'),
  icon: figma.boolean('Show Icon', {
    true: figma.instance('Icon XL'),
    false: undefined,
  }),
  infoTooltipProps: figma.boolean('Show Info Icon', {
    true: { title: 'Info' },
    false: undefined,
  }),
};

figma.connect(CardSelect, FIGMA_URL, {
  variant: { State: 'Default', Tag: 'False' },
  props: sharedProps,
  example: ({
    size,
    raised,
    title,
    description,
    tickVisible,
    icon,
    infoTooltipProps,
  }) => (
    <CardSelect
      size={size}
      raised={raised}
      title={title}
      description={description}
      tickVisible={tickVisible}
      icon={icon}
      infoTooltipProps={infoTooltipProps}
    />
  ),
});

figma.connect(CardSelect, FIGMA_URL, {
  variant: { State: 'Selected', Tag: 'False' },
  props: sharedProps,
  example: ({
    size,
    raised,
    title,
    description,
    tickVisible,
    icon,
    infoTooltipProps,
  }) => (
    <CardSelect
      value
      size={size}
      raised={raised}
      title={title}
      description={description}
      tickVisible={tickVisible}
      icon={icon}
      infoTooltipProps={infoTooltipProps}
    />
  ),
});

figma.connect(CardSelect, FIGMA_URL, {
  variant: { State: 'Disabled', Tag: 'False' },
  props: sharedProps,
  example: ({
    size,
    raised,
    title,
    description,
    tickVisible,
    icon,
    infoTooltipProps,
  }) => (
    <CardSelect
      disabled
      size={size}
      raised={raised}
      title={title}
      description={description}
      tickVisible={tickVisible}
      icon={icon}
      infoTooltipProps={infoTooltipProps}
    />
  ),
});

figma.connect(CardSelect, FIGMA_URL, {
  variant: { State: 'Default', Tag: 'True' },
  props: sharedProps,
  example: ({
    size,
    raised,
    title,
    description,
    tickVisible,
    icon,
    infoTooltipProps,
  }) => (
    <CardSelect
      size={size}
      raised={raised}
      title={title}
      description={description}
      tickVisible={tickVisible}
      icon={icon}
      infoTooltipProps={infoTooltipProps}
      tagProps={{ name: 'NEW' }}
    />
  ),
});

figma.connect(CardSelect, FIGMA_URL, {
  variant: { State: 'Selected', Tag: 'True' },
  props: sharedProps,
  example: ({
    size,
    raised,
    title,
    description,
    tickVisible,
    icon,
    infoTooltipProps,
  }) => (
    <CardSelect
      value
      size={size}
      raised={raised}
      title={title}
      description={description}
      tickVisible={tickVisible}
      icon={icon}
      infoTooltipProps={infoTooltipProps}
      tagProps={{ name: 'NEW' }}
    />
  ),
});

figma.connect(CardSelect, FIGMA_URL, {
  variant: { State: 'Disabled', Tag: 'True' },
  props: sharedProps,
  example: ({
    size,
    raised,
    title,
    description,
    tickVisible,
    icon,
    infoTooltipProps,
  }) => (
    <CardSelect
      disabled
      size={size}
      raised={raised}
      title={title}
      description={description}
      tickVisible={tickVisible}
      icon={icon}
      infoTooltipProps={infoTooltipProps}
      tagProps={{ name: 'NEW' }}
    />
  ),
});
