import * as React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Icon from '@synerise/ds-icon';
import type { IconProps } from '@synerise/ds-icon';
import * as allIcons from '@synerise/ds-icon/dist/icons';
import * as allIconsL from '@synerise/ds-icon/dist/icons/L';
import * as allIconsXL from '@synerise/ds-icon/dist/icons/XL';
import * as allIconsAdditional from '@synerise/ds-icon/dist/icons/additional';

import { IconWrapper, IconsWrapper } from './Icon.stories.styles';

import { CLASSNAME_ARG_CONTROL, reactNodeAsSelect, STYLE_ARG_CONTROL } from '../../utils';

const iconNames = Object.keys(allIcons);
const iconOptions = iconNames.reduce((icons, current) => ({ ...icons, [current]: current }), {});

export default {
  title: 'Components/Icon',
  tags: ['autodocs'],
  component: Icon,
} as Meta<IconProps>;

const renderSingleIcon = ({ component, color, size }: IconProps) => (
  <IconWrapper noBorder>
    <Icon component={component} color={color} size={size} />
  </IconWrapper>
);

export const SingleIcon: StoryObj<IconProps> = {
  render: (args) => {
    const IconComponent = allIcons[args.component];
    const ComponentWithStroke = () => <IconComponent style={{ stroke: args.stroke ? "currentColor" : "none" }} />;
    return renderSingleIcon({
      component: <ComponentWithStroke />,
      color: args.color,
      size: args.size
    });
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
      ...reactNodeAsSelect(
        iconNames,
        iconOptions
      ),
    },
  },
};


const renderIcons = (icons: Record<string, React.ComponentType>, color = '', size: number, noBorder?: boolean) => (
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

export const ListIcon: StoryObj<IconProps> = {
  render: (args) => renderIcons(allIcons, args.color, 24),
  args: {
    color: '',
  },
  argTypes: {
    color: { control: 'color' },
  },
};

export const AdditionalIcon: StoryObj<IconProps> = {
  render: (args) => renderIcons(allIconsAdditional, '', 48),
};

export const AdditionalL: StoryObj<IconProps> = {
  render: (args) => renderIcons(allIconsL, '', 48),
};

export const AdditionalXL: StoryObj<IconProps> = {
  render: (args) => renderIcons(allIconsXL, '', 96),
};
