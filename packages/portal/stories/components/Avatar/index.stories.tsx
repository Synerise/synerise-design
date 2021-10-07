import * as React from 'react';
import { text, select, boolean, object } from '@storybook/addon-knobs';
import Avatar, { ObjectAvatar, UserAvatar } from '@synerise/ds-avatar';
import Badge from '@synerise/ds-badge';
import Icon from '@synerise/ds-icon';
import theme from "@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme";
import MailM from "@synerise/ds-icon/dist/icons/MailM";
import { Thunder2M, UserCircleM } from "@synerise/ds-icon/dist/icons";
import { action } from '@storybook/addon-actions';

import { sizes, shapes, backgroundColorHue, backgroundColors, iconColors, image as anonymImage } from './constants';
import { statuses } from '../Badge/constants';
import SkeletonAvatar from '@synerise/ds-skeleton/dist/SkeletonAvatar/SkeletonAvatar';
import mdx from './Avatar.mdx';

// const wrapperStyles = {
//   position: 'fixed',
//   top: 0,
//   left: 0,
//   bottom: 0,
//   right: 0,
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
//   overflow: 'auto',
//   width: '100%',
//   height: '100%',
// };
const SkeletonAvatarSizes = {
  Small: 'S',
  Medium: 'M',
  Large: 'L',
  ExtraLarge: 'XL'
};

// const decorator = storyFn => <div style={wrapperStyles}>{storyFn()}</div>;

const objectDataGroup = 'Object data';
const userDataGroup = 'User data';

const getColor = (name) => {
  return theme.palette[name];
};

export default {
  title: 'Components/Avatar/Avatar',
  component: Avatar,
  parameters: {
    docs: { page: mdx },
  },

  // decorators:[
  //   (Story) => (<div style={wrapperStyles}>{Story()}</div>)
  // ],
};

export const userAvatar = () => {
  const customText = text('Custom text', '', userDataGroup);
  const user = boolean('Show user data', false, userDataGroup) ? {
    tooltip: boolean('Show tooltip', true, userDataGroup) ? undefined : false, 
    firstName: text('First Name', 'John', userDataGroup),
    lastName: text('Last name', 'Doe', userDataGroup),
    email: text('E-mail', 'john.doe@synerise.com', userDataGroup),
    avatar: boolean('Avatar', false, userDataGroup) ? anonymImage : undefined
  } : {};

  return (
    <div style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <UserAvatar 
        text={customText}
        tooltip={user.tooltip}
        user={user}
        size={select('Set size', sizes, 'medium')}
        onClick={boolean('Use onClick', true) ? action('UserAvatar clicked!') : undefined}
        badgeStatus={select('Set badge status', [...statuses, undefined], 'active')}          
        backgroundColor={select('Set background color', backgroundColors, 'auto')}
        iconComponent={boolean('Use custom icon', false) ? <Icon component={<UserCircleM />} /> : undefined}
        disabled={boolean('Disabled', false)}
      />
    </div>
      )
    }

export const objectAvatar = () => {
  const customText = text('Custom text', '', objectDataGroup);
  const product = boolean('Show object data', false, objectDataGroup) ? { 
    tooltip: boolean('Show tooltip', true, objectDataGroup) ? undefined : false,
    name: text('Name', 'Shovel Import', objectDataGroup),
    status: text('Type', 'API', objectDataGroup),
    description: text('Description', 'Some great description', objectDataGroup),
    avatar: boolean('Avatar', false, objectDataGroup) ? anonymImage : undefined
  } : {};

  return (
    <div style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <ObjectAvatar
        text={customText}
        size={select('Set size', sizes, 'medium')}
        onClick={boolean('Use onClick handler', true) ? action('ObjectAvatar clicked!') : undefined}
        object={product}
        color={select('Set icon color', backgroundColors.slice(1), 'mars')}
        backgroundColor={select('Set background color', backgroundColors, 'auto')}
        badgeStatus={select('Set badge status', [...statuses, undefined], 'active')}
        iconComponent={boolean('Use custom icon', false) ? <Icon component={<Thunder2M />} /> : undefined}
        disabled={boolean('Disabled', false)}
      />
    </div>
      );
    }

export const custom = () => (
  <Badge status={select('Set status', [...statuses, undefined], 'blocked')}>
    <Avatar
      backgroundColor={select('Set background color', backgroundColors, 'green')}
      backgroundColorHue={select('Set background color hue', backgroundColorHue, '600')}
      onClick={boolean('Use onClick handler', true) ? action('ObjectAvatar clicked!') : undefined}
      size={select('Set size', sizes, 'large')}
      shape={select('Set shape', shapes, 'circle')}
      tooltip={boolean('Show tooltip', true) ? {title: 'Silvia Jobs', description: 'silvia.jobs@gmail.com'} : false}
      src={boolean('Avatar', false) ? anonymImage : undefined}
      iconComponent={
        <Icon color={getColor(select('Set icon color', iconColors, 'white'))} component={<MailM/>}/>
      }
      iconScale={boolean('Auto-scale icon', true)}
      hasStatus
      disabled={boolean('Disabled', false)}
    >JJ</Avatar>
  </Badge>
)

custom.argTypes = { 
  label:{control:'text'},
  description:{control:'text'},
  actionLabel:{control:'text'},
  action: { table: { disable: true } },
}


export const userAvatarSkeleton = () => {
  const size = select('Size', SkeletonAvatarSizes,'M');
  return (
    <SkeletonAvatar size={size}  />
  )
}

export const objectAvatarSkeleton = () => {
  const size = select('Size', SkeletonAvatarSizes,'M');
  return (
    <SkeletonAvatar size={size} shape='square'  />
  )
}