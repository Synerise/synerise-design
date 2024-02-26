import * as React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Icon from '@synerise/ds-icon';
import { IconWrapper, IconsWrapper } from './IconStyles';
import { iconNames } from './iconNames';
import { IIconSets, RenderSingleIconProps, SingleIconArgs } from './types';

const iconLoader = async (): Promise<IIconSets> => {
  // @ts-ignore due to the inability to find the module
  const icons = await import('@synerise/ds-icon/dist/icons/index.js');
  // @ts-ignore due to the inability to find the module
  const additionalIcons = await import('@synerise/ds-icon/dist/icons/additional/index.js');
  // @ts-ignore due to the inability to find the module
  const lIcons = await import('@synerise/ds-icon/dist/icons/L/index.js');
  // @ts-ignore due to the inability to find the module
  const xlIcons = await import('@synerise/ds-icon/dist/icons/XL/index.js');

  return {
    icons: icons.default ? icons.default : icons,
    additionalIcons: additionalIcons.default ? additionalIcons.default : additionalIcons,
    lIcons: lIcons.default ? lIcons.default : lIcons,
    xlIcons: xlIcons.default ? xlIcons.default : xlIcons,
  };
};

export default {
  title: 'Components/Icon',
  component: Icon,
  loaders: [iconLoader],
} as Meta<typeof Icon>;

const renderSingleIcon = ({ icon, color, size }: RenderSingleIconProps) => (
  <IconWrapper noBorder>
    <Icon component={icon} color={color} size={size} />
  </IconWrapper>
);

const iconOptions = iconNames.reduce((icons, current) => ({ ...icons, [current]: current }), {});

export const SingleIcon: StoryObj<SingleIconArgs> = {
  render: (args, { loaded }) => {
    const IconComponent = loaded.icons[args.icon];
    const ComponentWithStroke = () => <IconComponent style={{ stroke: args.stroke ? "currentColor" : "none" }} />;
    return renderSingleIcon({
      icon: <ComponentWithStroke />,
      color: args.color,
      size: args.size
    });
  },
  args: {
    size: 40,
    color: '',
    stroke: false,
    icon: iconNames[0],
  },
  argTypes: {
    color: { control: 'color' },
    size: { control: 'number' },
    stroke: { control: 'boolean' },
    icon: {
      control: 'select',
      options: iconOptions,
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

export const ListIcon: StoryObj<typeof Icon> = {
  render: (args, { loaded }) => renderIcons(loaded.icons, args.color, 24),
  args: {
    color: '',
  },
  argTypes: {
    color: { control: 'color' },
  },
};

export const AdditionalIcon: StoryObj<typeof Icon> = {
  render: (args, { loaded }) => renderIcons(loaded.additionalIcons, '', 48),
};

export const AdditionalL: StoryObj<typeof Icon> = {
  render: (args, { loaded }) => renderIcons(loaded.lIcons, '', 48),
};

export const AdditionalXL: StoryObj<typeof Icon> = {
  render: (args, { loaded }) => renderIcons(loaded.xlIcons, '', 96),
};
