import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { text, select, number, boolean } from '@storybook/addon-knobs';
import { DSProvider } from '@synerise/ds-core';

import Avatar from '@synerise/ds-avatar';
import Badge from '@synerise/ds-badge';
import Icon from '@synerise/ds-icon';
import { ReactComponent as FileM } from '@synerise/ds-icon/dist/icons/file-m.svg';
import { ReactComponent as ArroUpM } from '@synerise/ds-icon/dist/icons/arrow-up-m.svg';
import { ReactComponent as ArrowDownM } from '@synerise/ds-icon/dist/icons/arrow-down-m.svg';

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

const imgSrc = 'https://hsto.org/web/77c/061/c05/77c061c0550f4acd98380bf554eb8886.png';

const wrapperStyles = {
  padding: '40px',
  width: '80%',
  margin: '0 auto',
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
};

const stories = storiesOf('Components|Avatar', module);

stories.add('sizes', () => {
  return (
    <DSProvider code="en_GB">
      <div style={{ ...wrapperStyles, flexDirection: 'column' }}>
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
      </div>
    </DSProvider>
  );
});

stories.add('types', () => {
  return (
    <DSProvider code="en_GB">
      <div style={wrapperStyles}>
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
              component={<ArroUpM />}
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
      </div>
    </DSProvider>
  );
});

stories.add('statuses', () => {
  return (
    <DSProvider code="en_GB">
      <div style={wrapperStyles}>
        <Badge status={select('status', statuses, 'default')}>
          <Avatar
            backgroundColor={select('backgroundColors', backgroundColors, 'mars')}
            disabled={boolean('disabled', false)}
            hasStatus
            shape={select('shape', shapes, 'circle')}
            size={number('size', 32)}
            src={imgSrc}
          />
        </Badge>
      </div>
    </DSProvider>
  );
});

export default stories;
