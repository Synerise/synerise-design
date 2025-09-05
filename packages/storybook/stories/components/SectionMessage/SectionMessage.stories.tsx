import React, { useState } from 'react';
import { action } from 'storybook/actions';

import { Meta, StoryObj } from '@storybook/react-webpack5';
import Button from '@synerise/ds-button';
import Card, { CardBadge } from '@synerise/ds-card';
import Icon, { CheckS, DuplicateS, UserAddM } from '@synerise/ds-icon';
import Modal from '@synerise/ds-modal';
import SectionMessage, {
  SectionMessageProps,
} from '@synerise/ds-section-message';
import Tooltip from '@synerise/ds-tooltip';
import UnorderedList from '@synerise/ds-unordered-list';

import {
  BOOLEAN_CONTROL,
  CLASSNAME_ARG_CONTROL,
  PREFIXCLS_ARG_CONTROL,
  REACT_NODE_AS_STRING,
  STYLE_ARG_CONTROL,
  controlFromOptionsArray,
  fixedWrapper800,
  gappedColumnDecorator,
} from '../../utils';
import { TYPE_MAPPING } from './SectionMessage.data';
import {
  ButtonsWrapper,
  FirstButtonWrapper,
  IconOrderWrapper,
  NumberWrapper,
  OrderWrapper,
  Wrapper,
} from './stories.styles';

type StoryProps = SectionMessageProps & {
  showTagInHeader: boolean;
  showFooter: boolean;
};
export default {
  component: SectionMessage,
  title: 'Components/Alert/SectionMessage',
  tags: ['autodocs'],
  decorators: [gappedColumnDecorator, fixedWrapper800],
  argTypes: {
    type: { ...controlFromOptionsArray('select', TYPE_MAPPING) },
    banner: BOOLEAN_CONTROL,
    closable: BOOLEAN_CONTROL,
    showIcon: BOOLEAN_CONTROL,
    className: CLASSNAME_ARG_CONTROL,
    style: STYLE_ARG_CONTROL,
    prefixCls: PREFIXCLS_ARG_CONTROL,
    description: REACT_NODE_AS_STRING,
    message: REACT_NODE_AS_STRING,
    withLink: REACT_NODE_AS_STRING,
    withEmphasis: REACT_NODE_AS_STRING,
    withClose: BOOLEAN_CONTROL,
  },
  args: {
    type: 'positive',
    message: 'This is a message',
    description: 'This is a section message description',
    withClose: true,
    suffixel: (
      <Button type="ghost" mode="icon-label">
        <Icon component={<UserAddM />} />
        {'Suffix button'}
      </Button>
    ),
  },
} as Meta<StoryProps>;

type Story = StoryObj<StoryProps>;

export const Default: Story = {};

export const WithLink: Story = {
  args: {
    withLink: <a href="#">More information</a>,
  },
};

export const WithEmphasis: Story = {
  args: {
    withEmphasis: 'with emphasis',
  },
};

export const WithButtons: Story = {
  args: {
    moreButtons: (
      <ButtonsWrapper>
        <FirstButtonWrapper>
          <Button type="secondary" mode="label">
            Button
          </Button>
        </FirstButtonWrapper>
        <Button type="ghost" mode="label">
          Button
        </Button>
      </ButtonsWrapper>
    ),
  },
};

export const WithList: Story = {
  render: (args) => {
    const [iconCopied, setIconCopied] = useState(false);
    const LIST_DATA = [
      {
        label: (
          <OrderWrapper>
            <div style={{ marginRight: '10px' }}>•</div> Schedule section must
            be defined
            <NumberWrapper>(505-456)</NumberWrapper>
            <Tooltip title={iconCopied ? 'Copied!' : 'Copy'}>
              <IconOrderWrapper>
                <Icon
                  onClick={(): void => setIconCopied(!iconCopied)}
                  component={<DuplicateS />}
                />
              </IconOrderWrapper>
            </Tooltip>
          </OrderWrapper>
        ),
        index: 1,
        id: 'list',
      },
      {
        label: (
          <OrderWrapper>
            <div style={{ marginRight: '10px' }}>•</div> Missing email template
            <NumberWrapper>(505-456)</NumberWrapper>
            <Tooltip title={iconCopied ? 'Copied!' : 'Copy'}>
              <IconOrderWrapper>
                <Icon
                  onClick={(): void => setIconCopied(!iconCopied)}
                  component={<DuplicateS />}
                />
              </IconOrderWrapper>
            </Tooltip>
          </OrderWrapper>
        ),
        index: 1,
        id: 'list',
      },
    ];
    return (
      <SectionMessage
        {...args}
        unorderedList={
          <Wrapper>
            <UnorderedList data={LIST_DATA} indexFormatter={undefined} />
          </Wrapper>
        }
      />
    );
  },
  args: {
    moreButtons: undefined,
  },
};

export const AllTypes: Story = {
  render: (args) => {
    return (
      <>
        {TYPE_MAPPING.map((type: string) => (
          <SectionMessage
            {...args}
            type={type}
            description={`This is a "${type}" type section message`}
          />
        ))}
      </>
    );
  },
};

export const CardWithSectionMessage: Story = {
  render: (args) => {
    return (
      <Card
        lively
        withHeader
        title="Card header"
        description="Description"
        icon={<CardBadge icon={<CheckS />} />}
        iconColor="#54cb0b"
        onHeaderClick={action('onHeaderClick')}
        headerSideChildren={
          <div>
            <Button>Define</Button>
          </div>
        }
        background="white-shadow"
      >
        <SectionMessage {...args} />
      </Card>
    );
  },
};

export const ModalWithSectionMessage: Story = {
  render: (args) => {
    return (
      <Modal size="medium" visible title="Modal header">
        <div style={{ width: '566px', margin: '0 70px' }}>
          <SectionMessage {...args} />
        </div>
      </Modal>
    );
  },
};
