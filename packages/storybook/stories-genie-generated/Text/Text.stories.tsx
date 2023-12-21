{
  import type {
    Meta,
    StoryObj
  } from '@storybook/react';
  import React, {
    ReactNode
  } from 'react';
  import {
    MediumText,
    SmallText,
    XSmallText
  } from './CommonElements';
  import {
    Ellipsis,
    EllipsisProps
  } from './Ellipsis';
  export type TextSize = 'medium' | 'small' | 'xsmall';
  type TextProps = {
    size ? : TextSize;
    ellipsis ? : EllipsisProps;
    children ? : ReactNode;
  };
  const MapSizeToComponent = {
    medium: MediumText,
    small: SmallText,
    xsmall: XSmallText,
  };
  const Text = ({
    size = 'medium',
    children,
    ellipsis
  }: TextProps) => {
    const Component = MapSizeToComponent[size];
    const content = <Component className="ds-text">{children}</Component>;
    if (ellipsis === undefined) {
      return content;
    }
    return <Ellipsis {...ellipsis}>{content}</Ellipsis>;
  };
  export const meta: Meta < Story > = {
    title: 'Text',
    component: Text,
  };
  export default meta;
  const excludedProps = [];
  const excludeRegexp = new RegExp(`(${excludedProps.join('|')})`, 'g');
  type Story = StoryObj < TextProps > ;
  const StoryTemplate: Story = {
    render: (args) => <Text {...args} />,
  };
  export const Primary = {
    ...StoryTemplate,
    args: {
      children: 'Default Text',
    },
  };
  export const SmallSize = {
    ...StoryTemplate,
    args: {
      children: 'Small Text',
      size: 'small',
    },
  };
  export const ExtraSmallSize = {
    ...StoryTemplate,
    args: {
      children: 'Extra Small Text',
      size: 'xsmall',
    },
  };
  export const WithEllipsis = {
    ...StoryTemplate,
    args: {
      children: 'Text with Ellipsis',
      ellipsis: {
        maxLines: 2
      },
    },
  };
  export const SmallSizeWithEllipsis = {
    ...StoryTemplate,
    args: {
      children: 'Small Text with Ellipsis',
      size: 'small',
      ellipsis: {
        maxLines: 2
      },
    },
  };
  export const ExtraSmallSizeWithEllipsis = {
    ...StoryTemplate,
    args: {
      children: 'Extra Small Text with Ellipsis',
      size: 'xsmall',
      ellipsis: {
        maxLines: 2
      },
    },
  };