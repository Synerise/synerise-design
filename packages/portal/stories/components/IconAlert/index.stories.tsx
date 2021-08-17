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

const triggers = ['hover', 'click'] as const;
const stories = {
  default: () => {
    const getDefaultIconAlertProps = () => ({
      disabled: boolean('Disabled', false),
      placement: select('Placement', placements, 'top'),
      trigger: select('Trigger', triggers, 'hover'),
    });
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
      placement: select('Placement', placements, 'top'),
      onVisibleChange: action('onVisibilityChange'),
      trigger: select('Trigger', triggers, 'hover'),
    });
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
      placement: select('Placement', placements, 'top'),
      onVisibleChange: action('onVisibilityChange'),
      trigger: select('Trigger', triggers, 'hover'),
    });
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
      placement: select('Placement', placements, 'top'),
      onVisibleChange: action('onVisibilityChange'),
      trigger: select('Trigger', triggers, 'hover'),
    });
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
      placement: select('Placement', placements, 'top'),
      onVisibleChange: action('onVisibilityChange'),
      trigger: select('Trigger', triggers, 'hover'),
    });
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
        >
          <IconAlert disabled={boolean('Disabled', false)} hoverButton={true} iconAlert={true} type="warning"/>
        </Popconfirm>
      </div>
    );
  },
  withActions: () => {
    const getDefaultIconAlertProps = () => ({
      title: text('Set title', 'Notification title'),
      okType: select('Set type', typeOptions, 'ghost'),
      disabled: boolean('Disabled', false),
      placement: select('Placement', placements, 'top'),
      onVisibleChange: action('onVisibilityChange'),
      trigger: select('Trigger', triggers, 'hover'),
      onCancel:() => action('onCancel Clicked'),
      onConfirm:() => action('onConfirm Clicked'),
    });
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
      okType: select('Set type', typeOptions, 'ghost'),
      placement: select('Placement', placements, 'top'),
      onVisibleChange: action('onVisibilityChange'),
      trigger: select('Trigger', triggers, 'hover'),
      onCancel:() => action('onCancel Clicked'),
      onConfirm:() => action('onConfirm Clicked'),
    });
    const hasButtons = boolean('Set Buttons', false);
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
          text={texts}
          titlePadding={true}
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