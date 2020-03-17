import * as React from 'react';
import {text, select, boolean} from '@storybook/addon-knobs';
import Avatar from '@synerise/ds-avatar';
import Badge from '@synerise/ds-badge';
import Icon from '@synerise/ds-icon';
import theme from "@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme";
import MailS from "@synerise/ds-icon/dist/icons/MailS";
import MailM from "@synerise/ds-icon/dist/icons/MailM";

const wrapperStyles = {
  padding: '40px',
  width: '80%',
  margin: '0 auto',
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
};

const decorator = storyFn => <div style={wrapperStyles}>{storyFn()}</div>;

const shapes = ['circle', 'square'] as const;
const sizes = ['small', 'medium', 'large', 'extraLarge'] as const;
const statuses = ['blocked', 'inactive', 'active'] as const;
const backgroundColors = [
  'red',
  'green',
  'grey',
  'yellow',
  'blue',
  'pink',
  'mars',
  'orange',
  'fern',
  'cyan',
  'purple',
  'violet',
] as const;

const iconColors = [
  'red-600',
  'green-600',
  'grey-600',
  'yellow-600',
  'blue-600',
  'pink-600',
  'mars-600',
  'orange-600',
  'fern-600',
  'cyan-600',
  'purple-600',
  'violet-600',
] as const;

const backgroundColorHue = [
  '900',
  '800',
  '700',
  '600',
  '500',
  '400',
  '300',
  '200',
  '100',
  '050',
] as const;

const imgSrc = 'https://www.w3schools.com/howto/img_avatar.png';

const getColor = (name) => {
  return theme.palette[name];
};

const getIconSize = (size) => {
  return size === 'small' ? <MailS/> : <MailM/>;
};

const stories = {
  withPhoto: () => (
    <div style={{paddingTop: 200}}>
      <Badge status={select('Set status', statuses, 'blocked')}>
        <Avatar
          size={select('Set size', sizes, 'large')}
          shape={select('Set shape', shapes, 'circle')}
          tooltip={{name: 'Silvia Jobs', email: 'silvia.jobs@gmail.com'}}
          src={imgSrc}
          hasStatus={boolean('Has status', true)}
          disabled={boolean('Disabled', false)}
        />
      </Badge>
    </div>
  ),
  withInitals: () => (
    <div style={{paddingTop: 200}}>
      <Badge status={select('Set status', statuses, 'active')}>
        <Avatar
          backgroundColor={select('Set background color', backgroundColors, 'green')}
          backgroundColorHue={select('Set background color hue', backgroundColorHue, '600')}
          disabled={boolean('Disabled', false)}
          size={select('Set size', sizes, 'extraLarge')}
          shape={select('Set shape', shapes, 'circle')}
          tooltip={{name: 'Silvia Jobs', email: 'silvia.jobs@gmail.com'}}
          hasStatus={boolean('Has status', true)}
        >
          {text('Set initals', 'DS')}
        </Avatar>
      </Badge>
    </div>
  ),
  withIcon: () => (
    <div style={{paddingTop: 200}}>
      <Badge status={select('Set status', statuses, 'blocked')}>
        <Avatar
          backgroundColor={select('Set background color', backgroundColors, 'blue')}
          backgroundColorHue={select('Set background color hue', backgroundColorHue, '100')}
          size={select('Set size', sizes, 'extraLarge')}
          shape={select('Set shape', shapes, 'circle')}
          iconComponent={
            <Icon color={getColor(select('Set icon color', iconColors, 'blue-600'))} component={getIconSize(select('Set size', sizes, 'extraLarge'))}/>
          }
          tooltip={{name: 'Silvia Jobs', email: 'silvia.jobs@gmail.com'}}
          hasStatus={boolean('Has status', true)}
          disabled={boolean('Disabled', false)}
        />
      </Badge>
    </div>
  ),
};

export default {
  name: 'Components|Avatar',
  withoutCenter: true,
  decorator,
  stories,
  Component: Avatar,
};
