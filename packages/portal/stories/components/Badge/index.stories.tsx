import * as React from 'react';
import { text, select, number, boolean, object } from '@storybook/addon-knobs';
import Badge from '@synerise/ds-badge';
import Icon from '@synerise/ds-icon';
import FileM from '@synerise/ds-icon/dist/icons/FileM';
import Avatar from '@synerise/ds-avatar';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';

const decorator = storyFn => (
  <div style={{ display: 'flex', width: '167px', height: '34px', alignItems: 'center' }}>{storyFn()}</div>
);

const statuses = ['active', 'inactive', 'blocked', 'processing', 'warning'] as const;
const avatarSize = ['small', 'default', 'large', 'extraLarge'] as const;
const avatarShape = ['circle', 'square'] as const;

const stories = {
  standalone: () => {
    const isOutline = boolean('badge outline', false);
    return (
      <React.Fragment>
        <div
          style={{
            display: 'flex',
            background: isOutline ? theme.palette['grey-200'] : 'transparent',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Badge
            count={number('count', 1)}
            offset={[0, 0]}
            outlined={isOutline}
            overflowCount={number('overflowCount', 99)}
            showZero={boolean('showZero', false)}
            title={text('title', 'text')}
            style={object('style', {
              margin: '0 6px 0 11px',
            })}
          />
          <br />
          <Badge
            count={number('count', 1)}
            overflowCount={number('overflowCount', 99)}
            outlined={isOutline}
            style={object('style2', {
              margin: '0 6px 0 6px',
              backgroundColor: theme.palette['yellow-600'],
              color: theme.palette['white'],
              alignItems: 'center',
            })}
          />
          <br />
          <Badge
            count={number('count', 1)}
            offset={[0, 0]}
            overflowCount={number('overflowCount', 99)}
            outlined={isOutline}
            style={object('style3', {
              margin: '0 6px 0 6px',
              backgroundColor: theme.palette['green-600'],
              color: theme.palette['white'],
              alignItems: 'center',
            })}
          />
          <br />
          <Badge
            count={number('count', 1)}
            offset={[0, 0]}
            overflowCount={number('overflowCount', 99)}
            outlined={isOutline}
            style={object('style4', {
              margin: '0 6px 0 6px',
              backgroundColor: theme.palette['grey-500'],
              color: theme.palette['white'],
              alignItems: 'center',
            })}
          />
          <br />
          <div
            style={{
              minWidth: '34px',
              minHeight: '34px',
              background: theme.palette['grey-200'],
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Badge
              count={number('count', 1)}
              offset={[0, 0]}
              outlined={isOutline}
              overflowCount={number('overflowCount', 99)}
              style={{
                ...{ boxShadow: isOutline ? `0 0 0 1px ${theme.palette['grey-500']}` : null },
                ...object('style5', {
                  minWidth: '17px',
                  minHeight: '17px',
                  margin: '8px 8px 8px 8px',
                  backgroundColor: theme.palette['white'],
                  color: theme.palette['grey-500'],
                  alignItems: 'center',
                  justifyContent: 'center',
                }),
              }}
            />
          </div>
        </div>
      </React.Fragment>
    );
  },
  dot: () => (
    <React.Fragment>
      <Badge dot title={text('title', 'text')}>
        <Icon color={text('IconColor', '#fcc600')} size={number('IconSize', 30)} component={<FileM />} />
      </Badge>
      <br />
      <Badge dot>
        <a style={{ marginTop: '10px', display: 'block' }} href="#">
          Link something
        </a>
      </Badge>
    </React.Fragment>
  ),
  count: () => (
    <React.Fragment>
      <Badge
        count={number('count', 5)}
        outlined={boolean('badge outline', false)}
        overflowCount={number('overflowCount', 99)}
        showZero={boolean('showZero', false)}
        title={text('title', 'text')}
      >
        <div
          style={{
            width: '48px',
            height: '48px',
            background: 'grey',
            borderRadius: '5px',
          }}
        />
      </Badge>
      <br />
      <Badge
        count={
          <Icon
            component={<FileM />}
            size={24}
            color="#f5222d"
            style={object('IconStyles', {
              position: 'absolute',
              top: '14px',
              right: '2px',
            })}
          />
        }
      >
        <div
          style={{
            width: '48px',
            height: '48px',
            background: 'grey',
            borderRadius: '5px',
            margin: '10px 0 10px 10px',
          }}
        />
      </Badge>
    </React.Fragment>
  ),
  status: () => ({
    status: select('status', statuses, 'active'),
    text: text('text', 'Success'),
  }),

  statusWithAvatar: () => (
    <>
      <Badge status={select('status', statuses, 'active')}  >
        <Avatar
          size={select('avatar size', avatarSize, 'extraLarge')}
          shape={select('avatar shape', avatarShape, 'square')}
          src={'https://www.w3schools.com/howto/img_avatar.png'}
          hasStatus
        />
      </Badge>
    </>
  ),

  flagDefault: () => (
    <>
      <Badge status={select('status', statuses, 'active')} flag={true} />
      <div style={{ width: '50px', height: '50px' }} />
    </>
  ),
  flagWithLabel: () => (
    <>
      <Badge status={select('status', statuses, 'active')} text={text('text', 'Success')} flag={true} />
      <div style={{ width: '50px', height: '50px' }} />
    </>
  ),
  flagWithElement: () => (
    <>
      <Badge status={select('status', statuses, 'active')} flag={true}>
        <div
          style={{
            width: '48px',
            height: '48px',
            background: 'grey',
            borderRadius: '5px',
          }}
        />
      </Badge>
      <div style={{ width: '50px', height: '50px' }} />
    </>
  ),
  flagWithIcon: () => (
    <>
      <Badge status={select('status', statuses, 'active')} flag={true}>
        <Icon color={text('IconColor', '#6a7580')} size={number('IconSize', 24)} component={<FileM />} />
      </Badge>
      <div style={{ width: '50px', height: '50px' }} />
    </>
  ),
  flagWithAvatar: () => (
    <>
      <Badge status={select('status', statuses, 'active')} flag={true}>
        <Avatar
          size={select('avatar size', avatarSize, 'extraLarge')}
          shape={select('avatar shape', avatarShape, 'square')}
          src={'https://www.w3schools.com/howto/img_avatar.png'}
          hasStatus
        />
      </Badge>
    </>
  ),
};

export default {
  name: 'Components|Badge',
  decorator,
  stories,
  Component: Badge,
};
