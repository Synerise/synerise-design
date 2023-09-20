import React from 'react';
import { boolean, select, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import Popconfirm from '@synerise/ds-popconfirm';
import Icon, { CloseM, WarningFillM } from '@synerise/ds-icon';
import Button from '@synerise/ds-button';
import Alert from '@synerise/ds-alert';
import IconAlert from '@synerise/ds-alert/dist/IconAlert/IconAlert';

const decorator = storyFn => (
  <div
    style={{
      width: '100%',
      height: '100%',
      position: 'absolute',
      top: 0,
      left: 0,
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
    }}
  >
    <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '400px',
          height: '100%',
          margin: '0 auto',
        }}
      >
      {storyFn()}
    </div>
  </div>
);
const typeOptions = ['default', 'primary', 'ghost', 'dashed', 'danger', 'link', 'success', 'flat', 'warning'] as const;

const placements = [
  'top',
  'left',
  'right',
  'bottom',
  'topLeft',
  'topRight',
  'bottomLeft',
  'bottomRight',
  'leftTop',
  'leftBottom',
  'rightTop',
  'rightBottom',
] as const;
const getPopconfirmAlign = (placements): number[] => {
  if (placements === 'topLeft' ) {
    return [-8,0];
  }
  if (placements === 'topRight' ) {
    return [8,0];
  }
  if (placements === 'bottomLeft' ) {
    return [-8,0];
  }
  if (placements === 'bottomRight' ) {
    return [8,0];
  }
  return [0,0];
};

const triggers = ['hover', 'click'] as const;
const stories = {
  default: () => {
    const getDefaultIconAlertProps = () => ({
      title: '',
      disabled: boolean('Disabled', false),
      trigger: select('Trigger', triggers, 'hover'),
    });
    const placement = select('Placement', placements, 'topLeft');
    return (
      <Popconfirm
        {...getDefaultIconAlertProps()}
        description='I will never close automatically. I will be close automatically. I will never close automatically.'
        closeIcon={<Icon  component={<CloseM/>}/>}
        hideButtons
        titlePadding={true}
        placement={placement}
        align={{ offset: getPopconfirmAlign(placement)}}
      >
        <IconAlert disabled={boolean('Disabled', false)} hoverButton={true} iconAlert={true} type="warning"/>
      </Popconfirm>
    );
  },
  withTitle: () => {
    const getDefaultIconAlertProps = () => ({
      title: text('Set title', 'Notification title'),
      disabled: boolean('Disabled', false),
      onVisibleChange: action('onVisibilityChange'),
      trigger: select('Trigger', triggers, 'hover'),
    });
    const placement = select('Placement', placements, 'topLeft');
    return (
      
        <Popconfirm
          {...getDefaultIconAlertProps()}
          description='I will never close automatically. I will be close automatically. I will never close automatically.'
          closeIcon={<Icon component={<CloseM/>}/>}
          hideButtons
          placement={placement}
          align={{ offset: getPopconfirmAlign(placement)}}
        >
          <IconAlert disabled={boolean('Disabled', false)} hoverButton={true} iconAlert={true} type="warning"/>
        </Popconfirm>
    );
  },
  withHeader: () => {
    const getDefaultIconAlertProps = () => ({
      title: text('Set title', 'Notification title'),
      disabled: boolean('Disabled', false),
      onVisibleChange: action('onVisibilityChange'),
      trigger: select('Trigger', triggers, 'hover'),
    });
    const placement = select('Placement', placements, 'topLeft');
    return (
      
        <Popconfirm
          {...getDefaultIconAlertProps()}
          closeIcon={<Icon component={<CloseM/>}/>}
          hideButtons
          placement={placement}
          align={{ offset: getPopconfirmAlign(placement)}}
        >
          <IconAlert disabled={boolean('Disabled', false)} hoverButton={true} iconAlert={true} type="warning"/>
        </Popconfirm>
    );
  },
  withLink: () => {
    const getDefaultIconAlertProps = () => ({
      title: text('Set title', 'Notification title'),
      disabled: boolean('Disabled', false),
      onVisibleChange: action('onVisibilityChange'),
      trigger: select('Trigger', triggers, 'hover'),
    });
    const placement = select('Placement', placements, 'topLeft');
    return (
      
        <Popconfirm
          {...getDefaultIconAlertProps()}
          description='I will never close automatically. I will be close automatically. I will never close automatically.'
          closeIcon={<Icon component={<CloseM/>}/>}
          withLink={text('withLink', 'This is a link')}
          hideButtons
          placement={placement}
          align={{ offset: getPopconfirmAlign(placement)}}
        >
          <IconAlert disabled={boolean('Disabled', false)} hoverButton={true} iconAlert={true} type="warning"/>
        </Popconfirm>
    );
  },
  withIconAndTitle: () => {
    const getDefaultIconAlertProps = () => ({
      title: text('Set title', 'Notification title'),
      disabled: boolean('Disabled', false),
      onVisibleChange: action('onVisibilityChange'),
      trigger: select('Trigger', triggers, 'hover'),
    });
    const placement = select('Placement', placements, 'topLeft');
    return (
      
        <Popconfirm
          {...getDefaultIconAlertProps()}
          icon={<Icon component={<WarningFillM/>} color='#ffc300'/>}
          description='I will never close automatically. I will be close automatically. I will never close automatically.'
          closeIcon={<Icon component={<CloseM/>}/>}
          hideButtons
          placement={placement}
          align={{ offset: getPopconfirmAlign(placement)}}
        >
          <IconAlert disabled={boolean('Disabled', false)} hoverButton={true} iconAlert={true} type="warning"/>
        </Popconfirm>
    );
  },
  withActions: () => {
    const getDefaultIconAlertProps = () => ({
      title: text('Set title', 'Notification title'),
      cancelText: text('cancelText', 'Button'),
      okText: text('okText', 'Button'),
      okType: select('Set type Button', typeOptions, 'ghost'),
      disabled: boolean('Disabled', false),
      onVisibleChange: action('onVisibilityChange'),
      trigger: select('Trigger', triggers, 'hover'),
      onCancel: action('onCancel Clicked'),
      onConfirm: action('onConfirm Clicked'),
    });
    const placement = select('Placement', placements, 'topLeft');
    return (
      
        <Popconfirm
          {...getDefaultIconAlertProps()}
          icon={<Icon component={<WarningFillM/>} color='#ffc300'/>}
          description='I will never close automatically. I will be close automatically. I will never close automatically.'
          closeIcon={<Icon component={<CloseM/>}/>}
          placement={placement}
          align={{ offset: getPopconfirmAlign(placement)}}
        >
          <IconAlert disabled={boolean('Disabled', false)} hoverButton={true} iconAlert={true} type="warning"/>
        </Popconfirm>
    );
  },

  Playground: () => {
    const getDefaultIconAlertProps = () => ({
      title: text('Set title', 'Notification title'),
      disabled: boolean('Disabled', false),
      cancelText: text('cancelText', 'Button'),
      okText: text('okText', 'Button'),
      onVisibleChange: action('onVisibilityChange'),
      trigger: select('Trigger', triggers, 'hover'),
      onCancel: action('onCancel Clicked'),
      onConfirm: action('onConfirm Clicked'),
    });
    const placement = select('Placement', placements, 'topLeft');
    const hasButtons = boolean('Hide Buttons', true);
    const okType = select('Set type Button', typeOptions, 'ghost');
    const hasDescription = boolean('Set Description', false);
    const hasIcon = boolean('Set Icon', false);
    const hasLink = boolean('Set Link', false);
    return (
      
        <Popconfirm
          {...getDefaultIconAlertProps()}
          icon={ hasIcon && (<Icon component={<WarningFillM/>} color='#ffc300'/>)}
          description={hasDescription && ('I will never close automatically. I will be close automatically. I will never close automatically.')}
          closeIcon={<Icon component={<CloseM/>}/>}
          withLink={hasLink && (text('withLink', 'This is a link'))}
          hideButtons={hasButtons}
          okType={okType}
          placement={placement}
          align={{ offset: getPopconfirmAlign(placement)}}
        >
          <IconAlert disabled={boolean('Disabled', false)} hoverButton={true} iconAlert={true} type="warning"/>
        </Popconfirm>
    );
  },
}
export default {
  name: 'Components/Alert/IconAlert',
  config: {},
  decorator,
  stories,
  Component: Alert,
};
