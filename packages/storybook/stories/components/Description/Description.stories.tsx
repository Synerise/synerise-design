import React from 'react';
import { action } from 'storybook/actions';

import { Meta, StoryObj } from '@storybook/react-webpack5';
import Avatar, { UserAvatar } from '@synerise/ds-avatar';
import Badge from '@synerise/ds-badge';
import Button from '@synerise/ds-button';
import { theme } from '@synerise/ds-core';
import Description, { DescriptionRow } from '@synerise/ds-description';
import DSFlag from '@synerise/ds-flag';
import Icon, {
  AddM,
  DuplicateS,
  LockM,
  PlayM,
  UserM,
  VarTypeStringM,
} from '@synerise/ds-icon';
import Status from '@synerise/ds-status';
import Switch from '@synerise/ds-switch';

import { AVATAR_IMAGE } from '../../constants/images';
import { controlFromOptionsArray, fixedWrapper400 } from '../../utils';

const SELECT = ['table', 'inline', 'corner'];
const RATIO = ['50-50', '25-75'];

export default {
  component: Description,
  title: 'Components/Description',
  tags: ['autodocs'],
  decorators: [fixedWrapper400],
  render: (args) => <Description {...args} />,
  argTypes: {
    type: { ...controlFromOptionsArray('select', SELECT) },
    ratio: { ...controlFromOptionsArray('select', RATIO) },
  },
} as Meta<typeof Description>;

type Story = StoryObj<typeof Description>;

export const Default: Story = {
  render: (args) => (
    <Description {...args}>
      <DescriptionRow label={'Label:'} value={'Value'} />
      <DescriptionRow
        label={'Label:'}
        labelIcon={<Icon component={<UserM />} />}
        value={'Value'}
      />
    </Description>
  ),
};

export const moreExamples: Story = {
  render: (args) => (
    <Description {...args}>
      <DescriptionRow label="Label:" value={'Value'} />
      <DescriptionRow
        label="Author:"
        prefixEl={<UserAvatar src={AVATAR_IMAGE} size="small" />}
        value={'James Giles Peterson'}
      />
      <DescriptionRow
        label="Tag:"
        value={<Status label="Draft" type="disabled" />}
      />
      <DescriptionRow
        label="Author:"
        prefixEl={
          <Icon component={<UserM />} color={theme.palette['grey-600']} />
        }
        value={'James Giles Peterson'}
        suffixEl={
          <Button
            type="ghost"
            mode="icon-label"
            onClick={action('Button click')}
          >
            <Icon component={<AddM />} />
            Add type
          </Button>
        }
      />
      <DescriptionRow
        label="Label:"
        prefixEl={
          <Icon component={<UserM />} color={theme.palette['grey-600']} />
        }
        value={'James Giles Peterson'}
      />
      <DescriptionRow label="Label:" value="Value" starType="active" />
      <DescriptionRow
        label="Label:"
        value="Value"
        prefixEl={
          <Icon
            component={<VarTypeStringM />}
            color={theme.palette['grey-600']}
          />
        }
        starType="active"
      />
      <DescriptionRow label="Action:" value={<Switch label={''} checked />} />
      <DescriptionRow
        label="Label:"
        value={
          <Badge status="active">
            <Avatar
              iconComponent={
                <Icon
                  component={<DuplicateS />}
                  color={theme.palette['mars-600']}
                />
              }
              backgroundColor="mars"
              backgroundColorHue="100"
              size="small"
              shape="circle"
              hasStatus
            />
          </Badge>
        }
      />
      <DescriptionRow
        label="Label:"
        value={<Badge status="active" outlined dot text="Active" />}
      />
      <DescriptionRow
        label="Label:"
        prefixEl={<DSFlag country={'BR'} />}
        value={'Brazil'}
      />
      <DescriptionRow
        label="Status:"
        prefixEl={<Status label="Draft" type="disabled" />}
        value={<Icon component={<LockM />} color={theme.palette['grey-500']} />}
      />
      <DescriptionRow
        label="Label:"
        value={
          <Icon component={<PlayM />} color={theme.palette['green-600']} />
        }
      />
      <DescriptionRow
        label="Label:"
        value={
          <a href="https://design.synerise.com/" target="_blank">
            Link
          </a>
        }
      />
      <DescriptionRow
        label="Copy:"
        prefixEl={<UserAvatar src={AVATAR_IMAGE} size="small" />}
        value={'James Giles Peterson'}
        copyValue={'James Giles Peterson'}
        texts={{ copyTooltip: 'Copy value', copiedTooltip: 'Copied!' }}
      />
    </Description>
  ),
};
