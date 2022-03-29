import * as React from 'react';
import {notification} from 'antd';
import rcNotificationsApi from "antd/es/notification";
import {boolean, number, select, text} from '@storybook/addon-knobs';
import {action} from '@storybook/addon-actions';

import Button from '@synerise/ds-button';
import {Notification, notificationOpen} from "@synerise/ds-alert";
import Icon, {UserAddM, AddM, ShowM} from "@synerise/ds-icon";
import { Text } from '@synerise/ds-typography';

const req = require.context('@synerise/ds-icon/dist/esm/icons/', false, /index.js/);
export const iconsRaw = req(req.keys()[0]);
export const iconsNames = Object.keys(iconsRaw);
const icons = Object.assign({}, ...iconsNames.map(e => {
    const IconModule = iconsRaw[e] as React.ComponentType
    return ({
        [e]: <Icon component={<IconModule/>}/>,
    })}));

const SomeIcon = iconsRaw['Add3M'];
const name2icon = {
    'ShowM': <Icon component={<ShowM />} />,
    'User': <Icon component={<UserAddM />} />,
    'Add': <Icon component={<AddM />} />,
    'Add3m': <Icon component={<SomeIcon/>}/>,
    'None': undefined,
    ...icons,
} as const;
const iconOptions = Object.assign({}, ...Object.keys(name2icon).map(e => ({[e]: e})));
const defaultIcon: keyof typeof name2icon = 'ShowM';

const stories = {
    default: () => {
        const message = text('Message', 'Message');
        const [api, contextHolder] = notification.useNotification();
        return <div>
            {contextHolder}
            <Button type="primary" onClick={() => notificationOpen({
                message: <Notification>{message}</Notification>,
                duration: number('duration', 3),
            }, api, contextHolder)}>
                Notification
            </Button>
        </div>
    },
    customize: function(): React.ReactNode {
        const [api, contextHolder] = notification.useNotification();
        const showClose = boolean('Show close', false)
        const isActionButton = boolean('Action button', true)
        const message = text('Message', 'sample')
        const duration = number('duration', 3)
        let iconName: keyof typeof name2icon = 'none';
        let buttonText = ''
        if (isActionButton) {
            iconName = select('Icon', iconOptions, defaultIcon)
            buttonText = text('Button text', 'Show preview');
        }
        const placement = select('Placement', {
            'bottom': 'bottom',
            'bottomRight': 'bottomRight',
            'bottomLeft': 'bottomLeft',
            'topLeft': 'topLeft',
            'topRight': 'topRight'}, 'bottom');
        React.useEffect(() => {
            if (boolean('Destroy notification container on placement change', false)) {
              rcNotificationsApi.destroy();
            }
        }, [placement])
        return (<div>
            {contextHolder}
            <Button type="primary" onClick={() => notificationOpen({
                message: boolean('Styled message', true) ? <Notification
                    buttonText={isActionButton && buttonText}
                    icon={name2icon[iconName]}
                    onClick={action('onClick Notification')}
                    onClose={showClose ? () => {
                        action('onClose Notification')();
                        // FIXME: pass noticeKey and change to .close when antd is upgraded
                        rcNotificationsApi.destroy();
                    } : undefined}
                >{message === 'sample' && "You've changed conditions" || message || <Text>new Date().toLocaleString()</Text>}</Notification> : "Some special characters <>'&.",
                duration,
                onClose: action('onClose notification\'s api'),
                onClick: action('onClick notification\'s api'),
                placement,
            }, api, contextHolder)}>
                Show notification
            </Button>
        </div>)
    },
    notification: {
      children: text('Message', 'You have changed conditions'),
    },
}

export default {
  name: 'Components/Alert/Notification',
  config: {},
  stories,
  Component: Notification,
};
