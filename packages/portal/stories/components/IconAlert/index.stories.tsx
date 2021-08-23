import { boolean, number, select, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import Popconfirm from '@synerise/ds-popconfirm';
import Icon from '@synerise/ds-icon';
import { CloseM, WarningFillM } from '@synerise/ds-icon/dist/icons';
import Button from '@synerise/ds-button';
import * as React from 'react';
import Alert from '@synerise/ds-alert';
import IconAlert from '@synerise/ds-alert/dist/IconAlert/IconsAlert';
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
    {storyFn()}
  </div>
);
const typeOptions = ['default', 'primary', 'ghost', 'dashed', 'danger', 'link', 'success', 'flat', 'warning'] as const;
const texts = {
  cancelButton: 'Button',
  applyButton: 'Button',
};
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
      disabled: boolean('Disabled', false),
      trigger: select('Trigger', triggers, 'hover'),
    });
    const placement = select('Placement', placements, 'topLeft');
    return (
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
        <Popconfirm
          {...getDefaultIconAlertProps()}
          description='I will never close automatically. I will be close automatically. I will never close automatically.'
          closeIcon={<Icon  component={<CloseM/>}/>}
          placement={placement}
          align={{ offset: getPopconfirmAlign(placement)}}
        >
          <IconAlert disabled={boolean('Disabled', false)} hoverButton={true} iconAlert={true} type="warning"/>
        </Popconfirm>
      </div>
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
        <Popconfirm
          {...getDefaultIconAlertProps()}
          description='I will never close automatically. I will be close automatically. I will never close automatically.'
          closeIcon={<Icon component={<CloseM/>}/>}
          buttons={false}
          titlePadding={true}
          placement={placement}
          align={{ offset: getPopconfirmAlign(placement)}}
        >
          <IconAlert disabled={boolean('Disabled', false)} hoverButton={true} iconAlert={true} type="warning"/>
        </Popconfirm>
      </div>
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
        <Popconfirm
          {...getDefaultIconAlertProps()}
          closeIcon={<Icon component={<CloseM/>}/>}
          buttons={false}
          titlePadding={true}
          placement={placement}
          align={{ offset: getPopconfirmAlign(placement)}}
        >
          <IconAlert disabled={boolean('Disabled', false)} hoverButton={true} iconAlert={true} type="warning"/>
        </Popconfirm>
      </div>
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
        <Popconfirm
          {...getDefaultIconAlertProps()}
          description='I will never close automatically. I will be close automatically. I will never close automatically.'
          closeIcon={<Icon component={<CloseM/>}/>}
          withLink={text('withLink', 'This is a link')}
          buttons={false}
          titlePadding={true}
          placement={placement}
          align={{ offset: getPopconfirmAlign(placement)}}
        >
          <IconAlert disabled={boolean('Disabled', false)} hoverButton={true} iconAlert={true} type="warning"/>
        </Popconfirm>
      </div>
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
        <Popconfirm
          {...getDefaultIconAlertProps()}
          icon={<Icon component={<WarningFillM/>} color='#ffc300'/>}
          description='I will never close automatically. I will be close automatically. I will never close automatically.'
          closeIcon={<Icon component={<CloseM/>}/>}
          buttons={false}
          titlePadding={true}
          placement={placement}
          align={{ offset: getPopconfirmAlign(placement)}}
        >
          <IconAlert disabled={boolean('Disabled', false)} hoverButton={true} iconAlert={true} type="warning"/>
        </Popconfirm>
      </div>
    );
  },
  withActions: () => {
    const getDefaultIconAlertProps = () => ({
      title: text('Set title', 'Notification title'),
      okType: select('Set type Button', typeOptions, 'ghost'),
      disabled: boolean('Disabled', false),
      onVisibleChange: action('onVisibilityChange'),
      trigger: select('Trigger', triggers, 'hover'),
      onCancel:() => action('onCancel Clicked'),
      onConfirm:() => action('onConfirm Clicked'),
    });
    const placement = select('Placement', placements, 'topLeft');
    return (
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
        <Popconfirm
          {...getDefaultIconAlertProps()}
          icon={<Icon component={<WarningFillM/>} color='#ffc300'/>}
          description='I will never close automatically. I will be close automatically. I will never close automatically.'
          closeIcon={<Icon component={<CloseM/>}/>}
          buttons={true}
          text={texts}
          titlePadding={true}
          placement={placement}
          align={{ offset: getPopconfirmAlign(placement)}}
        >
          <IconAlert disabled={boolean('Disabled', false)} hoverButton={true} iconAlert={true} type="warning"/>
        </Popconfirm>
      </div>
    );
  },

  Playground: () => {
    const getDefaultIconAlertProps = () => ({
      title: text('Set title', 'Notification title'),
      disabled: boolean('Disabled', false),
      onVisibleChange: action('onVisibilityChange'),
      trigger: select('Trigger', triggers, 'hover'),
      onCancel:() => action('onCancel Clicked'),
      onConfirm:() => action('onConfirm Clicked'),
    });
    const placement = select('Placement', placements, 'topLeft');
    const hasButtons = boolean('Set Buttons', false);
    const okType = select('Set type Button', typeOptions, 'ghost');
    const hasDescription = boolean('Set Description', false);
    const hasIcon = boolean('Set Icon', false);
    const hasLink = boolean('Set Link', false);
    return (
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
        <Popconfirm
          {...getDefaultIconAlertProps()}
          icon={ hasIcon && (<Icon component={<WarningFillM/>} color='#ffc300'/>)}
          description={hasDescription && ('I will never close automatically. I will be close automatically. I will never close automatically.')}
          closeIcon={<Icon component={<CloseM/>}/>}
          withLink={hasLink && (text('withLink', 'This is a link'))}
          buttons={hasButtons}
          okType={okType}
          text={texts}
          titlePadding={true}
          placement={placement}
          align={{ offset: getPopconfirmAlign(placement)}}
        >
          <IconAlert disabled={boolean('Disabled', false)} hoverButton={true} iconAlert={true} type="warning"/>
        </Popconfirm>
      </div>
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