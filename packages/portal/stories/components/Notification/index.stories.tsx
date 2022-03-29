import * as React from 'react';
import {boolean, number, select, text} from '@storybook/addon-knobs';
import {action} from '@storybook/addon-actions';
import {notification} from 'antd';
import rcNotificationsApi from "antd/es/notification";
import Button from '@synerise/ds-button';
import {Notification, notificationOpen} from "@synerise/ds-alert";
import Icon, {UserAddM, AddM} from "@synerise/ds-icon";

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
    'User': <Icon component={<UserAddM />} />,
    'Add': <Icon component={<AddM />} />,
    'Add3m': <Icon component={<SomeIcon/>}/>,
    'None': undefined,
    ...icons,
}
const iconOptions = Object.assign({}, ...Object.keys(name2icon).map(e => ({[e]: e})))
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
    customize: () => {
        const [api, contextHolder] = notification.useNotification();
        const showClose = boolean('Show close', false)
        const isActionButton = boolean('Action button', true)
        const message = text('Message', 'Message')
        const duration = number('duration', 3)
        let iconName: keyof typeof name2icon = 'none';
        if (isActionButton) {
            iconName = select('Icon', iconOptions, 'user')
        }
        return (<div>
            {contextHolder}
            <Button type="primary" onClick={() => notificationOpen({
                message: boolean('is a styled message?', true) ? <Notification
                    label={isActionButton && text('Button text', 'Load more')}
                    icon={name2icon[iconName]}
                    onClick={action('onClick Notification')}
                    onClose={showClose ? action('onClose Notification') : undefined}
                   >{message || new Date().toLocaleString()}</Notification> : message,
                duration,
                ...showClose ? {onClose: () => {
                    action('onClose')();
                    // FIXME: pass noticeKey and change to .close when antd is upgraded
                    rcNotificationsApi.destroy();
                }} : {},
                onClick: action('onClick notification\'s api'),
            }, api, contextHolder)}>
                Show notification
            </Button>
        </div>)
    },
}

export default {
  name: 'Components/Alert/Notification',
  config: {},
  stories,
  Component: Notification,
};
