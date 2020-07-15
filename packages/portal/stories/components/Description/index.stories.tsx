import * as React from 'react';

import Description, { DescriptionRow } from '@synerise/ds-description';
import Status from '@synerise/ds-status';
import { select, text } from '@storybook/addon-knobs';
import { AddM, DuplicateS, LockM, MailM, PlayM, SearchM, UserM, VarTypeStringM } from '@synerise/ds-icon/dist/icons';
import Icon from '@synerise/ds-icon';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import Avatar from '@synerise/ds-avatar';
import Switch from '@synerise/ds-switch/dist/Switch';
import Badge from '@synerise/ds-badge';
import DSFlag from '@synerise/ds-flag';
import Button from '@synerise/ds-button';
import { action } from '@storybook/addon-actions';
import ModalProxy from '@synerise/ds-modal';

const SELECT = ['table', 'inline'];
const RATIO = ['20-80', '30-70', '40-60', '50-50', '60-40', '70-30', '80-20'];
const imgSrc = 'https://www.w3schools.com/howto/img_avatar.png';

const stories = {
  default: () => {
    return (
      <div style={{width: 400}}>
        <Description type={select('Select description type', SELECT, 'table')} ratio={select('Select ratio', RATIO, '30-70')}>
          <DescriptionRow label="Label" value={'Value'} />
          <DescriptionRow label="Author" prefixEl={<Avatar src={imgSrc} size='small' shape='circle' />} value={'James Giles Peterson'} />
          <DescriptionRow label="Tag" value={<Status label='Draft' type='disabled'/>} />
          <DescriptionRow label="Author" prefixEl={<Icon component={<UserM />} color={theme.palette['grey-600']} />} value={'James Giles Peterson'} suffixEl={<Button type='ghost' mode='icon-label' onClick={action('Button click')}><Icon component={<AddM />} />Add type</Button>}  />
          <DescriptionRow label="Label" prefixEl={<Icon component={<UserM />} color={theme.palette['grey-600']} />} value={'James Giles Peterson'} />
          <DescriptionRow label="Label" value='Value' starType='active' />
          <DescriptionRow label="Label" value='Value' prefixEl={<Icon component={<VarTypeStringM />} color={theme.palette['grey-600']} />} starType='active' />
          <DescriptionRow label="Action" value={<Switch label={''} checked />} />
          <DescriptionRow label="Label" value={<Badge status='active'><Avatar iconComponent={<Icon component={<DuplicateS />} color={theme.palette['mars-600']} />} backgroundColor="mars" backgroundColorHue="100" size='small' shape='circle' hasStatus /></Badge>} />
          <DescriptionRow label="Label" value={<Badge status='active' outlined dot text="Active" />} />
          <DescriptionRow label="Label" prefixEl={<DSFlag country={'BR'} />} value={'Brazil'} />
          <DescriptionRow label="Status" prefixEl={<Status label='Draft' type='disabled'/>} value={<Icon component={<LockM />} color={theme.palette['grey-500']} />} />
          <DescriptionRow label="Label" value={<Icon component={<PlayM />} color={theme.palette['green-600']} />} />
          <DescriptionRow label="Label" value={<a href="https://design.synerise.com/" target="_blank">Link</a>} />
          <DescriptionRow label="Copy" prefixEl={<Avatar src={imgSrc} size='small' shape='circle' />} value={'James Giles Peterson'} copyValue={'James Giles Peterson'} texts={{copyTooltip: 'Copy value', copiedTooltip: 'Copied!'}} />
        </Description>
      </div>
    )
  },
  labels: () => {
    return (
      <div style={{width: 400}}>
        <Description type={select('Select description type', SELECT, 'table')} ratio={select('Select ratio', RATIO, '30-70')}>
          <DescriptionRow label={text('Set label', 'Label')} value={text('Set value', 'Value')} />
          <DescriptionRow label={text('Set label', 'Label')} labelIcon={<Icon component={<UserM />} />} value={text('Set value', 'Value')} />
        </Description>
      </div>
    )
  },
  onModal: () => {
    return (
      <ModalProxy
        visible
        title={(
          <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start',}}>
            <Badge status="active">
              <Avatar size={'medium'} shape={'circle'} backgroundColor={'red'} backgroundColorHue={'100'} hasStatus>
                <Icon component={<MailM />} color={theme.palette['red-500']} />{' '}
              </Avatar>
            </Badge>
            <span style={{marginLeft: 12}}>Modal header</span>
          </div>
        )}
        closable
        size={'large'}
        footer={null}
        headerActions={(
          <div>
            <Button mode="single-icon" type="ghost" onClick={action('Additional header button clicked')}>
              <Icon component={<SearchM />} color={theme.palette['grey-600']} />
            </Button>
          </div>
        )}
        description={<div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
        <div style={{width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'flex-start'}}>
          <Description type='inline'>
            <DescriptionRow label="Performed by:" prefixEl={<Avatar src={imgSrc} size='small' shape='circle' />} value="James Peterson" />
          </Description>
        </div>
        <div style={{width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'flex-end'}}>
          <Description type='inline'>
            <DescriptionRow label="Created:" value="20 Aug 2020 20:20" />
          </Description>
        </div>
      </div>}>
      </ModalProxy>
    )
  }
};

export default {
  name: 'Components|Description',
  config: {},
  stories,
  Component: Description,
}
