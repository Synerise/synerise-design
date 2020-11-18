import * as React from 'react';
import { text, select, number, boolean, object } from '@storybook/addon-knobs';
import Badge from '@synerise/ds-badge';
import Icon from '@synerise/ds-icon';
import FileM from '@synerise/ds-icon/dist/icons/FileM';
import Avatar from '@synerise/ds-avatar';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';

const decorator = storyFn => (
  <div style={{ display: 'flex', width: '192px', height: '34px', alignItems: 'center', justifyContent: 'center' }}>{storyFn()}</div>
);

const statuses = ['active', 'inactive', 'blocked', 'processing', 'warning'] as const;
const avatarSize = ['small', 'default', 'large', 'extraLarge'] as const;
const avatarShape = ['circle', 'square'] as const;

const stories = {
  standalone: () => {
    const isOutline = boolean('Badge outline', false);
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
            count={number('Count', 1)}
            offset={[0, 0]}
            outlined={isOutline}
            overflowCount={number('OverflowCount', 99)}
            showZero={boolean('ShowZero', false)}
            title={text('Title', 'text')}
            style={ {
              margin: '0 6px 0 11px',
            }}
          />
          <br />
          <Badge
            count={number('Count', 1)}
            overflowCount={number('OverflowCount', 99)}
            outlined={isOutline}
            backgroundColor={'yellow'}
            backgroundColorHue={600}
            textColor={'white'}
            style={{
              margin: '0 6px 0 6px',
              alignItems: 'center',
            }}
          />
          <br />
          <Badge
            count={number('Count', 1)}
            offset={[0, 0]}
            overflowCount={number('OverflowCount', 99)}
            outlined={isOutline}
            backgroundColor={'green'}
            backgroundColorHue={600}
            textColor={'white'}
            style={{
              margin: '0 6px 0 6px',
              alignItems: 'center',
            }}
          />
          <br />
          <Badge
            count={number('Count', 1)}
            offset={[0, 0]}
            overflowCount={number('OverflowCount', 99)}
            outlined={isOutline}
            backgroundColor={'grey'}
            backgroundColorHue={500}
            textColor={'white'}
            style={{
              margin: '0 4px 0 6px',
              alignItems: 'center',
            }}
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
              count={number('Count', 1)}
              offset={[0, 0]}
              outlined={isOutline}
              overflowCount={number('OverflowCount', 99)}
              backgroundColor={'white'}
              textColor={'grey'}
              textColorHue={500}
              style={{
                ...{ boxShadow: isOutline ? `0 0 0 1px ${theme.palette['grey-500']}` : null },
                ...{
                  minWidth: '16px',
                  minHeight: '16px',
                  margin: '9px 8px 7px 8px',
                  alignItems: 'center',
                },
              }}
            />
          </div>
          <Badge
            count={number('Count', 1)}
            overflowCount={number('OverflowCount', 99)}
            outlined={isOutline}
            backgroundColor={'transparent'}
            textColor={'white'}
            style={{
              margin: '0 11px 0 4px',
              alignItems: 'center',
            }}
          />
          <br />
        </div>
      </React.Fragment>
    );
  },
  dot: () => (
    <React.Fragment>
      <Badge dot title={text('Title', 'text')}>
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
        count={number('Count', 5)}
        outlined={boolean('Badge outline', false)}
        overflowCount={number('OverflowCount', 99)}
        showZero={boolean('ShowZero', false)}
        title={text('Title', 'text')}
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
    status: select('Status', statuses, 'active'),
    text: text('Text', 'Success'),
  }),
  statusWithAvatar: () => (
    <>
      <Badge status={select('Status', statuses, 'active')}  >
        <Avatar
          size={select('Avatar size', avatarSize, 'extraLarge')}
          shape={select('Avatar shape', avatarShape, 'square')}
          src={'https://www.w3schools.com/howto/img_avatar.png'}
          hasStatus
        />
      </Badge>
    </>
  ),

  flagDefault: () => (
    <>
      <Badge status={select('Status', statuses, 'active')} flag={true} pulsing={boolean('Set Pulsing', true)} />

    </>
  ),
  flagWithLabel: () => (
    <>
      <Badge status={select('Status', statuses, 'active')} text={text('Text', 'Success')} pulsing={boolean('Set Pulsing', true)}  flag={true} />
    </>
  ),
  flagWithElement: () => (
    <>
      <Badge status={select('Status', statuses, 'active')} pulsing={boolean('Set Pulsing', true)}  flag={true}>
        <div
          style={{
            width: '48px',
            height: '48px',
            background: 'grey',
            borderRadius: '5px',
          }}
        />
      </Badge>
    </>
  ),
  flagWithIcon: () => (
    <>
      <Badge status={select('Status', statuses, 'active')} pulsing={boolean('Set Pulsing', true)}  flag={true}>
        <Icon color={text('IconColor', '#6a7580')} size={number('IconSize', 24)} component={<FileM />} />
      </Badge>
    </>
  ),
  flagWithAvatar: () => (
    <>
      <Badge status={select('Status', statuses, 'active')} pulsing={boolean('Set Pulsing', true)}  flag={true}>
        <Avatar
          size={select('Avatar size', avatarSize, 'extraLarge')}
          shape={select('Avatar shape', avatarShape, 'square')}
          src={'https://www.w3schools.com/howto/img_avatar.png'}
          hasStatus
        />
      </Badge>
    </>
  ),
};

export default {
name: 'Components/Badge',
  decorator,
  stories,
  Component: Badge,
};
