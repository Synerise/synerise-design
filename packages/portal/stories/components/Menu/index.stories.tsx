import * as React from 'react';

import Icon from '@synerise/ds-icon';
import ShowM from '@synerise/ds-icon/dist/icons/ShowM';
import TrashM from '@synerise/ds-icon/dist/icons/TrashM';
import Menu from '@synerise/ds-menu';
import Avatar from "@synerise/ds-avatar/";
import {boolean} from "@storybook/addon-knobs";
import Badge from '@synerise/ds-badge';
import {action} from "@storybook/addon-actions";

const decorator = (storyFn) => (
  <div style={{ width: '200px' }}>
    <div style={{ background: '#fff', width: '300px' }}>
      {storyFn()}
    </div>
  </div>
);

const getDefaultProps = () => ({
  disabled: boolean('disabled', false),
});

const defaultProps = getDefaultProps();

const imgSrc = 'https://www.w3schools.com/howto/img_avatar.png';

const simpleText = [
  [
    { text: 'Option', disabled: defaultProps.disabled },
  ],
];

const textWithIcon = [
  [
    { text: 'Option', prefixel: <Icon component={<ShowM />} />, disabled: defaultProps.disabled },
  ],
];

const ordered = [
  [
    { text: 'Option', disabled: defaultProps.disabled },
    { text: 'Option', disabled: defaultProps.disabled },
    { text: 'Option', disabled: defaultProps.disabled },
    { text: 'Option', disabled: defaultProps.disabled },
  ],
];

const parent = [
  [
    { text: 'Parent',
      subMenu: [
        { text: 'Child 1', },
        { text: 'Child 2', },
        { text: 'Child 3', }
      ],
      disabled: defaultProps.disabled
    }
  ],
];

const avatar = [
  [
    { text: 'Option', prefixel: <Badge status="active"><Avatar size="small" backgroundColor="green" backgroundColorHue="400" shape="square">AK</Avatar></Badge>, disabled: defaultProps.disabled },
  ],
];

const avatarSmall = [
  [
    { text: 'Option', prefixel: <Badge status="active"><Avatar size="small" src={imgSrc} shape="circle" /></Badge>, description: 'description', disabled: defaultProps.disabled },
  ],
];

const avatarMedium = [
  [
    { text: 'Option', prefixel: <Avatar size="medium" src={imgSrc} shape="circle" />, description: 'description', disabled: defaultProps.disabled },
  ],
];

const deleteState = [
  [
    { text: 'Delete', danger: true, prefixel: <Icon component={<TrashM />} />, disabled: defaultProps.disabled },
  ],
];

const parentEl = [
  [
    { text: 'Parent', parent: true, disabled: defaultProps.disabled },
  ],
];

const checked = [
  [
    { text: 'Parent', checked: true, disabled: defaultProps.disabled },
  ],
];

const stories = {
  SimpleText: {
    dataSource: simpleText,
    onSelect: action('onSelect'),
  },
  textWithIcon: {
    dataSource: textWithIcon,
    onSelect: action('onSelect'),
  },
  ordered: {
    dataSource: ordered,
    onSelect: action('onSelect'),
    ordered: true,
  },
  parent: {
    dataSource: parent,
    onSelect: action('onSelect'),
  },
  avatar: {
    dataSource: avatar,
    onSelect: action('onSelect'),
  },
  avatarSmall: {
    dataSource: avatarSmall,
    onSelect: action('onSelect'),
  },
  avatarMedium: {
    dataSource: avatarMedium,
    onSelect: action('onSelect'),
  },
  deleteState: {
    dataSource: deleteState,
    onSelect: action('onSelect'),
  },
  parentEl: {
    dataSource: parentEl,
    onSelect: action('onSelect'),
  },
  checked: {
    dataSource: checked,
    onSelect: action('onSelect'),
  },
};

export default {
  name: 'Components|Menu',
  config: {},
  decorator,
  stories,
  Component: Menu,
}
