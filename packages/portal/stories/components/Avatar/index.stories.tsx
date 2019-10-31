import * as React from 'react';
import { text, select, number, boolean } from '@storybook/addon-knobs';
import Avatar from '@synerise/ds-avatar';
import Badge from '@synerise/ds-badge';
import Icon from '@synerise/ds-icon';
import { FileM, ArrowUpM, ArrowDownM } from '@synerise/ds-icon/dist/icons';
import DuplicateS from "@synerise/ds-icon/dist/icons/DuplicateS";

const wrapperStyles = {
  padding: '40px',
  width: '80%',
  margin: '0 auto',
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
};

const decorator = (storyFn) => (
  <div style={wrapperStyles}>
    {storyFn()}
  </div>
);

const shapes = ['circle', 'square'] as const;
const sizes = ['small', 'default', 'large', 'extraLarge'] as const;
const statuses = ['error', 'default', 'success'] as const;
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

const imgSrc = 'https://www.w3schools.com/howto/img_avatar.png';

const stories = {
  sizes: () => (
    <React.Fragment>
      <div style={wrapperStyles}>
        <Avatar
          backgroundColor={select('backgroundColors', backgroundColors, 'mars')}
          disabled={boolean('disabled', false)}
          size={select('sizeString', sizes, 'default')}
          shape={select('shape', shapes, 'circle')}
          style={{
            background: '#fcc600',
          }}
        >
          WW
        </Avatar>
        <Avatar
          backgroundColor={select('backgroundColors', backgroundColors, 'mars')}
          disabled={boolean('disabled', false)}
          iconComponent={
            <Icon color={text('IconColor', '#ff5831')} size={number('iconSize', 32)} component={<FileM />} />
          }
          size={select('sizeString', sizes, 'default')}
          shape={select('shape', shapes, 'circle')}
        />
        <Avatar
          backgroundColor={select('backgroundColors', backgroundColors, 'mars')}
          disabled={boolean('disabled', false)}
          icon={'user'}
          size={select('sizeString', sizes, 'default')}
          shape={select('shape', shapes, 'circle')}
        />
        <Avatar
          backgroundColor={select('backgroundColors', backgroundColors, 'mars')}
          disabled={boolean('disabled', false)}
          size={select('sizeString', sizes, 'default')}
          shape={select('shape', shapes, 'circle')}
          src={imgSrc}
        />
        <Avatar
          backgroundColor={select('backgroundColors', backgroundColors, 'mars')}
          disabled={boolean('disabled', false)}
          shape={select('shape', shapes, 'circle')}
          size={select('sizeString', sizes, 'default')}
        >
          <a href="#">link to something</a>
        </Avatar>
      </div>

      <div style={wrapperStyles}>
        <Avatar
          backgroundColor={select('backgroundColors', backgroundColors, 'mars')}
          disabled={boolean('disabled', false)}
          size={number('sizeNumber', 48)}
          shape={select('shape', shapes, 'circle')}
        >
          WW
        </Avatar>
        <Avatar
          backgroundColor={select('backgroundColors', backgroundColors, 'mars')}
          disabled={boolean('disabled', false)}
          iconComponent={
            <Icon color={text('IconColor', '#ff5831')} size={number('sizeNumber', 48)} component={<ArrowDownM />} />
          }
          size={number('sizeNumber', 48)}
          shape={select('shape', shapes, 'circle')}
          style={{
            background: '#ffe9e9',
          }}
        />
        <Avatar
          backgroundColor={select('backgroundColors', backgroundColors, 'mars')}
          disabled={boolean('disabled', false)}
          icon={'user'}
          size={number('sizeNumber', 48)}
          shape={select('shape', shapes, 'circle')}
        />
        <Avatar
          disabled={boolean('disabled', false)}
          size={number('sizeNumber', 48)}
          shape={select('shape', shapes, 'circle')}
          src={imgSrc}
        />
      </div>
    </React.Fragment>
  ),
  types: () => (
    <React.Fragment>
      <Avatar
        backgroundColor={select('backgroundColors', backgroundColors, 'mars')}
        disabled={boolean('disabled', false)}
        size={number('size', 32)}
        shape={select('shape', shapes, 'circle')}
      >
        WW
      </Avatar>
      <Avatar
        backgroundColor={select('backgroundColors', backgroundColors, 'mars')}
        disabled={boolean('disabled', false)}
        iconComponent={
          <Icon
            color={text('CustomIconColor', '#ff5831')}
            size={number('CustomIconSize', 32)}
            component={<ArrowUpM />}
          />
        }
        size={number('CustomIconSize', 32)}
        shape={select('shape', shapes, 'circle')}
        style={{
          background: '#fcc600',
        }}
      />
      <Avatar
        backgroundColor={select('backgroundColors', backgroundColors, 'mars')}
        disabled={boolean('disabled', false)}
        icon={'user'}
        size={select('IconAvatarSize', sizes, 'default')}
        shape={select('shape', shapes, 'circle')}
      />
      <Avatar
        src={imgSrc}
        disabled={boolean('disabled', false)}
        size={number('size', 32)}
        shape={select('shape', shapes, 'circle')}
      />
    </React.Fragment>
  ),
  statuses: () => (
    <Badge status={select('status', statuses, 'default')}>
      <Avatar
        backgroundColor={select('backgroundColors', backgroundColors, 'mars')}
        disabled={boolean('disabled', false)}
        hasStatus
        shape={select('shape', shapes, 'circle')}
        size={select('sizeString', sizes, 'default')}
        src={imgSrc}
      />
    </Badge>
  ),
  allOptions: () => (
    <React.Fragment>
      <Badge status={select('status', statuses, 'default')}>
        <Avatar
          backgroundColor={select('backgroundColors', backgroundColors, 'green')}
          disabled={boolean('disabled', false)}
          hasStatus={boolean('has status', false)}
          shape={select('shape', shapes, 'circle')}
          size={select('sizeString', sizes, 'default')}
        >
          AK
        </Avatar>
      </Badge>
      <Badge status={select('status', statuses, 'default')}>
        <Avatar
          backgroundColor={select('backgroundColors', backgroundColors, 'green')}
          disabled={boolean('disabled', false)}
          hasStatus={boolean('has status', false)}
          shape={select('shape', shapes, 'circle')}
          size={select('sizeString', sizes, 'default')}
          iconComponent={
            <Icon color={text('IconColor', '#fff')} size={number('sizeNumber', 32)} component={<DuplicateS />} />
          }
        />
      </Badge>
      <Badge status={select('status', statuses, 'default')}>
        <Avatar
          backgroundColor={select('backgroundColors', backgroundColors, 'green')}
          disabled={boolean('disabled', false)}
          hasStatus={boolean('has status', false)}
          shape={select('shape', shapes, 'circle')}
          size={select('sizeString', sizes, 'default')}
          src={imgSrc}
        />
      </Badge>
    </React.Fragment>
  ),
};

export default {
  name: 'Components|Avatar',
  withoutCenter: true,
  decorator,
  stories,
  Component: Avatar,
};
