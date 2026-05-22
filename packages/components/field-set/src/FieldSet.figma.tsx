import figma from '@figma/code-connect';

import FieldSet from './FieldSet';

const FIGMA_URL =
  'https://www.figma.com/design/fsSZONXpVvtrDsCgtu01Jb/Synerise-Design-System?node-id=2455-50340&m=dev';

figma.connect(FieldSet, FIGMA_URL, {
  variant: { 'Prefix Type': 'Default' },
  props: {
    title: figma.string('Header Text#2455:2'),
    divider: figma.boolean('Show Seperator#2455:0'),
  },
  example: ({ title, divider }) => <FieldSet title={title} divider={divider} />,
});

figma.connect(FieldSet, FIGMA_URL, {
  variant: { 'Prefix Type': 'With Description' },
  props: {
    title: figma.string('Header Text#2455:2'),
    description: figma.string('Description Text#2455:1'),
    divider: figma.boolean('Show Seperator#2455:0'),
  },
  example: ({ title, description, divider }) => (
    <FieldSet title={title} description={description} divider={divider} />
  ),
});

figma.connect(FieldSet, FIGMA_URL, {
  variant: { 'Prefix Type': 'Expandable' },
  props: {
    title: figma.string('Header Text#2455:2'),
    divider: figma.boolean('Show Seperator#2455:0'),
  },
  example: ({ title, divider }) => (
    <FieldSet
      title={title}
      divider={divider}
      expandable
      triggerType="expander"
    />
  ),
});

figma.connect(FieldSet, FIGMA_URL, {
  variant: { 'Prefix Type': 'With Expander' },
  props: {
    title: figma.string('Header Text#2455:2'),
    divider: figma.boolean('Show Seperator#2455:0'),
  },
  example: ({ title, divider }) => (
    <FieldSet
      title={title}
      divider={divider}
      expandable
      triggerType="expander"
      defaultExpanded
      component={<div>Expandable content</div>}
    />
  ),
});

figma.connect(FieldSet, FIGMA_URL, {
  variant: { 'Prefix Type': 'With Switch' },
  props: {
    title: figma.string('Header Text#2455:2'),
    divider: figma.boolean('Show Seperator#2455:0'),
  },
  example: ({ title, divider }) => (
    <FieldSet title={title} divider={divider} expandable triggerType="switch" />
  ),
});

figma.connect(FieldSet, FIGMA_URL, {
  variant: { 'Prefix Type': 'Switch Expanded' },
  props: {
    title: figma.string('Header Text#2455:2'),
    divider: figma.boolean('Show Seperator#2455:0'),
  },
  example: ({ title, divider }) => (
    <FieldSet
      title={title}
      divider={divider}
      expandable
      triggerType="switch"
      defaultExpanded
      component={<div>Expandable content</div>}
    />
  ),
});

figma.connect(FieldSet, FIGMA_URL, {
  variant: { 'Prefix Type': 'With Second Level' },
  props: {
    title: figma.string('Header Text#2455:2'),
    divider: figma.boolean('Show Seperator#2455:0'),
  },
  example: ({ title, divider }) => (
    <FieldSet
      title={title}
      divider={divider}
      component={
        <>
          <FieldSet title="Nested field" />
          <FieldSet title="Nested field" />
        </>
      }
    />
  ),
});
