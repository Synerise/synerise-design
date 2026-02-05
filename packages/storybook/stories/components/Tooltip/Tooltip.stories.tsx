import isChromatic from 'chromatic/isChromatic';
import React from 'react';
import { action } from 'storybook/actions';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';

import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { UserAvatar } from '@synerise/ds-avatar';
import Button from '@synerise/ds-button';
import { theme } from '@synerise/ds-core';
import FileUploader from '@synerise/ds-file-uploader';
import Icon, { InfoFillS, InfoM, SegmentM } from '@synerise/ds-icon';
import { KeyboardEnterM } from '@synerise/ds-icon';
import InformationCard from '@synerise/ds-information-card';
import ShortCuts from '@synerise/ds-short-cuts';
import Tag, { TagShape } from '@synerise/ds-tag';
import Tooltip, { TooltipProps } from '@synerise/ds-tooltip';

import { tooltipImage } from '../../constants/images';
import {
  BOOLEAN_CONTROL,
  CLASSNAME_ARG_CONTROL,
  NUMBER_CONTROL,
  PREFIXCLS_ARG_CONTROL,
  REACT_NODE_AS_STRING,
  STYLE_ARG_CONTROL,
  centeredPaddedWrapper,
  controlFromOptionsArray,
  fixedWrapper400,
} from '../../utils';
import { TOOLTIP_TITLE } from './Tooltip.data';

export type StoryProps = TooltipProps & {};

export default {
  title: 'Components/Tooltip',
  tags: ['autodocs'],
  component: Tooltip,
  decorators: [centeredPaddedWrapper],
  argTypes: {
    className: CLASSNAME_ARG_CONTROL,
    style: STYLE_ARG_CONTROL,
    activeIndex: { table: { category: 'Story options' } },
    steps: { table: { category: 'Story options' } },
    title: REACT_NODE_AS_STRING,
    description: REACT_NODE_AS_STRING,
    mouseEnterDelay: NUMBER_CONTROL,
    mouseLeaveDelay: NUMBER_CONTROL,
    prefixCls: PREFIXCLS_ARG_CONTROL,
    disabled: BOOLEAN_CONTROL,
    visible: BOOLEAN_CONTROL,
    defaultVisible: BOOLEAN_CONTROL,
    arrowPointAtCenter: BOOLEAN_CONTROL,
    autoAdjustOverflow: BOOLEAN_CONTROL,
    tutorialAutoplay: BOOLEAN_CONTROL,
    tutorialAutoplaySpeed: NUMBER_CONTROL,
    trigger: controlFromOptionsArray('inline-radio', [
      'hover',
      'focus',
      'click',
    ]),
  },
  render: ({ ...args }) => {
    return (
      <Tooltip {...args}>
        <span style={{ display: 'flex' }}>
          <Icon
            data-testid="tooltip-trigger"
            component={<InfoFillS />}
            color={theme.palette['grey-400']}
          />
        </span>
      </Tooltip>
    );
  },
  args: {
    title: TOOLTIP_TITLE,
    description: 'Tooltip description',
    trigger: isChromatic() ? 'click' : 'hover',
    offset: 'small',
    type: 'default',
    onOpenChange: fn(),
    onVisibleChange: fn(),
    onPopupAlign: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement.parentElement!);
    await userEvent.click(await canvas.findByTestId('tooltip-trigger'));
    let propToFind = args.title;
    if (args.type === 'largeSimple') {
      propToFind = args.description;
    }
    if (!args.render) {
      await waitFor(async () =>
        expect(
          await canvas.findByText(propToFind as string),
        ).toBeInTheDocument(),
      );
    }
  },
} as Meta<StoryProps>;

type Story = StoryObj<StoryProps>;

export const Simple: Story = {};
export const WithShortcuts: Story = {
  args: {
    shortCuts: [<KeyboardEnterM height={18} />, '⌘'],
  },
};

export const LargeType: Story = {
  args: {
    type: 'largeSimple',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras quis pellentesque felis, luctus vestibulum ligula. Vestibulum tristique vulputate nulla, sed tempor nisi rhoncus a.',
  },
};

export const LargeTypeWithImage: Story = {
  args: {
    type: 'largeSimple',
    image: <img src={tooltipImage} />,
    button: (
      <Button type="ghost-white" mode="icon-label" onClick={action('click')}>
        <Icon component={<InfoM />} /> More info
      </Button>
    ),
    icon: <Icon color={theme.palette.white} component={<InfoM />} />,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
};

export const LargeScrollableType: Story = {
  args: {
    type: 'largeScrollable',
    title: TOOLTIP_TITLE,
    icon: <Icon color={theme.palette.white} component={<InfoM />} />,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras quis pellentesque felis, luctus vestibulum ligula. Vestibulum tristique vulputate nulla, sed tempor nisi rhoncus a. Suspendisse sit amet vulputate dui, sit amet congue dolor. Ut sagittis ex sed turpis tristique, in hendrerit ligula venenatis. Aenean fringilla libero a rhoncus viverra. Sed non orci libero. Etiam venenatis ultrices odio, vel sodales massa facilisis ac. Vivamus ac fermentum elit. Aenean vel facilisis tortor, sit amet ornare erat. ',

    button: (
      <Button type="ghost-white" mode="icon-label" onClick={action('click')}>
        <Icon component={<InfoM />} /> More info
      </Button>
    ),
  },
};

export const TagWithTooltip: Story = {
  render: ({ title }) => (
    <Tooltip title={title}>
      <Tag
        name="A"
        shape={TagShape.SINGLE_CHARACTER_ROUND}
        color={theme.palette['grey-100']}
        textColor={theme.palette['grey-500']}
        asPill
        data-testid="tooltip-trigger"
      />
    </Tooltip>
  ),
};

export const FileUploaderWithTooltip: Story = {
  decorators: [fixedWrapper400],
  render: ({ title }) => (
    <Tooltip title={title}>
      <FileUploader data-testid="tooltip-trigger" mode="single" files={[]} />
    </Tooltip>
  ),
};

const firstName = 'Jan';
const lastName = 'Nowak';
export const AvatarWithTooltip: Story = {
  args: {
    title: `${firstName} ${lastName}`,
    description: 'jan.nowak@gmail.com',
  },
  render: (args) => {
    const user = { firstName, lastName };
    return (
      <UserAvatar
        data-testid="tooltip-trigger"
        backgroundColor="blue"
        user={user}
        tooltip={args}
      />
    );
  },
};

export const WithButtonInFooter: Story = {
  args: {
    type: 'largeSimple',
    button: (
      <Button type="ghost-white" mode="icon-label" onClick={action('click')}>
        <Icon component={<InfoM />} /> More info
      </Button>
    ),
  },
};

export const WithCustomComponent: Story = {
  args: {
    render: () => (
      <InformationCard
        asTooltip={true}
        title={TOOLTIP_TITLE}
        subtitle={'subtitle'}
        icon={<SegmentM />}
        iconColor="red"
      />
    ),
  },
};
