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
      disabled: boolean('disabled', false),
      placement: select('placement', placements, 'top'),
      trigger: select('trigger', triggers, 'click'),
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
          closeIcon={<Button type='ghost' mode='single-icon'><Icon component={<CloseM/>}/></Button>}
        >
          <IconAlert iconAlert={true} type="warning"/>
        </Popconfirm>
      </div>
    );
  },
  withTitle: () => {
    const getDefaultIconAlertProps = () => ({
      cancelText: text('cancelText', 'Button'),
      okText: text('okText', 'Button'),
      okType: select('Set type', typeOptions, 'ghost'),
      title: text('Set title', 'Notification title'),
      onCancel: action('onCancel Clicked'),
      onConfirm: action('onConfirm Clicked'),
      disabled: boolean('disabled', false),
      placement: select('placement', placements, 'top'),
      onVisibleChange: action('onVisibilityChange'),
      trigger: select('trigger', triggers, 'click'),
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
          closeIcon={<Button type='ghost' mode='single-icon'><Icon component={<CloseM/>}/></Button>}
        >
          <IconAlert iconAlert={true} type="warning"/>
        </Popconfirm>
      </div>
    );
  },
  withHeader: () => {
    const getDefaultIconAlertProps = () => ({
      cancelText: text('cancelText', 'Button'),
      okText: text('okText', 'Button'),
      okType: select('Set type', typeOptions, 'ghost'),
      title: text('Set title', 'Problem with your request'),
      onCancel: action('onCancel Clicked'),
      onConfirm: action('onConfirm Clicked'),
      disabled: boolean('disabled', false),
      placement: select('placement', placements, 'top'),
      onVisibleChange: action('onVisibilityChange'),
      trigger: select('trigger', triggers, 'click'),
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
          closeIcon={<Button type='ghost' mode='single-icon'><Icon component={<CloseM/>}/></Button>}
        >
          <IconAlert iconAlert={true} type="warning"/>
        </Popconfirm>
      </div>
    );
  },
  withLink: () => {
    const getDefaultIconAlertProps = () => ({
      cancelText: text('cancelText', 'Button'),
      okText: text('okText', 'Button'),
      okType: select('Set type', typeOptions, 'ghost'),
      title: text('Set title', 'Notification title'),
      onCancel: action('onCancel Clicked'),
      onConfirm: action('onConfirm Clicked'),
      disabled: boolean('disabled', false),
      placement: select('placement', placements, 'top'),
      onVisibleChange: action('onVisibilityChange'),
      trigger: select('trigger', triggers, 'click'),
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
          closeIcon={<Button type='ghost' mode='single-icon'><Icon component={<CloseM/>}/></Button>}
          withLink={text('withLink', 'This is a link')}
        >
          <IconAlert iconAlert={true} type="warning"/>
        </Popconfirm>
      </div>
    );
  },
  withIconAndTitle: () => {
    const getDefaultIconAlertProps = () => ({
      cancelText: text('cancelText', 'Button'),
      okText: text('okText', 'Button'),
      okType: select('Set type', typeOptions, 'ghost'),
      title: text('Set title', 'Notification title'),
      onCancel: action('onCancel Clicked'),
      onConfirm: action('onConfirm Clicked'),
      disabled: boolean('disabled', false),
      placement: select('placement', placements, 'top'),
      onVisibleChange: action('onVisibilityChange'),
      trigger: select('trigger', triggers, 'click'),
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
          closeIcon={<Button type='ghost' mode='single-icon'><Icon component={<CloseM/>}/></Button>}
        >
          <IconAlert iconAlert={true} type="warning"/>
        </Popconfirm>
      </div>
    );
  },
  withActions: () => {
    const getDefaultIconAlertProps = () => ({
      cancelText: text('cancelText', 'Button'),
      okText: text('okText', 'Button'),
      okType: select('Set type', typeOptions, 'ghost'),
      title: text('Set title', 'Notification title'),
      onCancel: action('onCancel Clicked'),
      onConfirm: action('onConfirm Clicked'),
      disabled: boolean('disabled', false),
      placement: select('placement', placements, 'top'),
      onVisibleChange: action('onVisibilityChange'),
      trigger: select('trigger', triggers, 'click'),
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
          closeIcon={<Button type='ghost' mode='single-icon'><Icon component={<CloseM/>}/></Button>}
        >
          <IconAlert iconAlert={true} type="warning"/>
        </Popconfirm>
      </div>
    );
  },

  Playground: () => {
    const getDefaultIconAlertProps = () => ({
      cancelText: text('cancelText', 'Button'),
      okText: text('okText', 'Button'),
      okType: select('Set type', typeOptions, 'ghost'),
      title: text('Set title', 'Notification title'),
      onCancel: action('onCancel Clicked'),
      onConfirm: action('onConfirm Clicked'),
      disabled: boolean('disabled', false),
      placement: select('placement', placements, 'top'),
      onVisibleChange: action('onVisibilityChange'),
      trigger: select('trigger', triggers, 'click'),
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
          closeIcon={<Button type='ghost' mode='single-icon'><Icon component={<CloseM/>}/></Button>}
        >
          <IconAlert iconAlert={true}  type="warning"/>
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