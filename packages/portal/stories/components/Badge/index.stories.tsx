import * as React from 'react';
import { text, select, number, boolean, object } from '@storybook/addon-knobs';
import Badge from '@synerise/ds-badge';
import Icon from '@synerise/ds-icon';
import FileM from '@synerise/ds-icon/dist/icons/FileM';

const decorator = (storyFn) => (
  <div style={{ padding: '40px' }}>
    {storyFn()}
  </div>
);

const statuses = ['success', 'processing', 'default', 'error', 'warning'] as const;

const stories = {
  standalone: () => (
    <React.Fragment>
      <Badge
        count={number('count', 4)}
        offset={[0, 0]}
        overflowCount={number('overflowCount', 99)}
        showZero={boolean('showZero', false)}
        title={text('title', 'text')}
      />
      <br />
      <Badge
        count={4}
        style={object('style', {
          marginTop: '10px',
          backgroundColor: '#fCC600',
          color: 'blue',
          boxShadow: '0 0 0 2px #FF0000',
        })}
      />
    </React.Fragment>
  ),
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
            marginTop: '10px',
          }}
        />
      </Badge>
    </React.Fragment>
  ),
  status: () => ({
    status: select('status', statuses, 'success'),
    text: text('text', 'Success'),
  }),
  flag: () => (
    <div style={wrapperStyles}>
      <DSProvider code="en_GB">
        <>
          <Badge
            status={select('status', statuses, 'success')}
            text={text('text', 'Success')}
            flag={true}
          />
          <div style={{width: '50px', height: '50px'}} />
          <Badge
            status={select('status', statuses, 'success')}
            flag={true}
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
          <div style={{width: '50px', height: '50px'}} />
          <Badge
            status={select('status', statuses, 'success')}
            flag={true}
          >
            <Icon color={text('IconColor', '#6a7580')} size={number('IconSize', 24)} component={<FileM />} />
          </Badge>
        </>
      </DSProvider>
    </div>
  )
};

export default {
  name: 'Components|Badge',
  decorator,
  stories,
  Component: Badge,
};
