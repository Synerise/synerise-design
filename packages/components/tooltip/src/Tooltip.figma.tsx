// @ts-nocheck
import React from 'react';

import figma from '@figma/code-connect';

import Tooltip from './Tooltip';

const TOOLTIP_URL =
  'https://www.figma.com/design/fsSZONXpVvtrDsCgtu01Jb/Synerise-Design-System?node-id=502-8133&m=dev';

figma.connect(Tooltip, TOOLTIP_URL, {
  variant: { Type: 'Simple' },
  props: {
    title: figma.string('✏️Text#2636:0'),
  },
  example: ({ title }) => (
    <Tooltip type="default" title={title}>
      <span>Trigger</span>
    </Tooltip>
  ),
});

figma.connect(Tooltip, TOOLTIP_URL, {
  variant: { Type: 'Simple+shortcuts' },
  props: {
    title: figma.string('✏️Text#2636:0'),
  },
  example: ({ title }) => (
    <Tooltip type="default" title={title} shortCuts={['⌘', 'S']}>
      <span>Trigger</span>
    </Tooltip>
  ),
});

figma.connect(Tooltip, TOOLTIP_URL, {
  variant: { Type: 'Complex' },
  props: {
    title: figma.string('✏️Text Header#463:3'),
    description: figma.string('✏️Text_#463:0'),
    icon: figma.boolean('Show Icon#463:15', {
      true: figma.instance('Icon#463:6'),
      false: undefined,
    }),
    button: figma.boolean('Show Footer#463:12', {
      true: <button type="button">Action</button>,
      false: undefined,
    }),
  },
  example: ({ title, description, icon, button }) => (
    <Tooltip
      type="largeSimple"
      title={title}
      description={description}
      icon={icon}
      button={button}
    >
      <span>Trigger</span>
    </Tooltip>
  ),
});

figma.connect(Tooltip, TOOLTIP_URL, {
  variant: { Type: 'Scroll' },
  props: {
    title: figma.string('✏️Text Header#463:3'),
    description: figma.string('✏️Text_#463:0'),
    icon: figma.boolean('Show Icon#463:15', {
      true: figma.instance('Icon#463:6'),
      false: undefined,
    }),
    button: figma.boolean('Show Footer#463:12', {
      true: <button type="button">Action</button>,
      false: undefined,
    }),
  },
  example: ({ title, description, icon, button }) => (
    <Tooltip
      type="largeScrollable"
      title={title}
      description={description}
      icon={icon}
      button={button}
    >
      <span>Trigger</span>
    </Tooltip>
  ),
});

figma.connect(Tooltip, TOOLTIP_URL, {
  variant: { Type: 'Image' },
  props: {
    title: figma.string('✏️Text Header#463:3'),
    description: figma.string('✏️Text_#463:0'),
    button: figma.boolean('Show Footer#463:12', {
      true: <button type="button">Action</button>,
      false: undefined,
    }),
  },
  example: ({ title, description, button }) => (
    <Tooltip
      type="largeSimple"
      title={title}
      description={description}
      image={<img alt="" src="" />}
      button={button}
    >
      <span>Trigger</span>
    </Tooltip>
  ),
});
