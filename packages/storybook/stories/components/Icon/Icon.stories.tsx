import React from 'react';

import { Meta, StoryObj } from '@storybook/react-webpack5';
import Icon, {
  additionalIconMapping,
  colorIconMapping,
  largeIconMapping,
  mediumIconMapping,
  xlargeIconMapping,
} from '@synerise/ds-icon';
import type { BaseIconProps } from '@synerise/ds-icon';

import {
  CLASSNAME_ARG_CONTROL,
  STYLE_ARG_CONTROL,
  reactNodeAsSelect,
} from '../../utils';
import { IconWrapper, IconsWrapper } from './Icon.stories.styles';

const iconNames = Object.keys(mediumIconMapping);
const iconOptions = iconNames.reduce(
  (icons, current) => ({ ...icons, [current]: current }),
  {},
);
type IconStoryProps = Omit<BaseIconProps, 'component'> & { component: string };

export default {
  title: 'Components/Icon',
  tags: ['autodocs'],
  component: Icon,
  render: ({ component, color, size, stroke }) => {
    const IconComponent = mediumIconMapping[component];
    console.log(IconComponent);
    return (
      <IconWrapper noBorder>
        <Icon
          component={
            <IconComponent
              style={{ stroke: stroke ? 'currentColor' : 'none' }}
            />
          }
          color={color}
          size={size}
        />
      </IconWrapper>
    );
  },
  args: {
    size: 40,
    stroke: false,
    component: iconNames[0],
  },
  argTypes: {
    style: STYLE_ARG_CONTROL,
    className: CLASSNAME_ARG_CONTROL,
    color: { control: 'color' },
    size: { control: 'number' },
    stroke: { control: 'boolean' },
    component: {
      ...reactNodeAsSelect(iconNames, iconOptions),
    },
  },
} as Meta<IconStoryProps>;

export const SingleIcon: StoryObj<typeof Icon> = {};

export const ListIcon: StoryObj<typeof Icon> = {
  render: (args) => renderIcons(mediumIconMapping, args.color, 24),
  args: {
    color: '',
  },
  argTypes: {
    color: { control: 'color' },
  },
};

export const AdditionalIcon: StoryObj<typeof Icon> = {
  render: (args) => renderIcons(additionalIconMapping, args.color, 48),
};

export const AdditionalL: StoryObj<typeof Icon> = {
  render: (args) => renderIcons(largeIconMapping, args.color, 48),
};

export const AdditionalXL: StoryObj<typeof Icon> = {
  render: (args) => renderIcons(xlargeIconMapping, args.color, 96),
};

export const AdditionalColor: StoryObj<typeof Icon> = {
  render: () => renderIcons(colorIconMapping, '', 48),
};

const renderIcons = (
  icons: Record<string, React.ComponentType>,
  color = '',
  size: number,
  noBorder?: boolean,
) => (
  <IconsWrapper>
    {Object.entries(icons).map(([key, IconComponent]) => (
      <IconWrapper key={key} noBorder={noBorder}>
        <Icon component={<IconComponent />} color={color} size={size} />
        <br />
        <p>{key}</p>
      </IconWrapper>
    ))}
  </IconsWrapper>
);
