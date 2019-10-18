import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, text, select, number, object } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered/react';
import { DSProvider } from '@synerise/ds-core';

import Badge from '@synerise/ds-badge';
import Icon from '@synerise/ds-icon';
import { ReactComponent as FileM } from '@synerise/ds-icon/dist/icons/file-m.svg';

const wrapperStyles = {
  padding: '40px',
};

const statuses = ['success', 'processing', 'default', 'error', 'warning'] as const;

storiesOf('Components|Badge', module)
  .addDecorator(centered)
  .add('standalone', () => (
    <div style={wrapperStyles}>
      <DSProvider code="en_GB">
        <>
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
        </>
      </DSProvider>
    </div>
  ));

storiesOf('Components|Badge', module)
  .addDecorator(centered)
  .add('dot', () => (
    <div style={wrapperStyles}>
      <DSProvider code="en_GB">
        <>
          <Badge dot title={text('title', 'text')}>
            <Icon color={text('IconColor', '#fcc600')} size={number('IconSize', 30)} component={<FileM />} />
          </Badge>
          <br />
          <Badge dot>
            <a style={{ marginTop: '10px', display: 'block' }} href="#">
              Link something
            </a>
          </Badge>
        </>
      </DSProvider>
    </div>
  ));

storiesOf('Components|Badge', module)
  .addDecorator(centered)
  .add('count', () => (
    <div style={wrapperStyles}>
      <DSProvider code="en_GB">
        <>
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
        </>
      </DSProvider>
    </div>
  ));

storiesOf('Components|Badge', module)
  .addDecorator(centered)
  .add('status', () => (
    <div style={wrapperStyles}>
      <DSProvider code="en_GB">
        <>
          <Badge status={select('status', statuses, 'success')} text={text('text', 'Success')} />
        </>
      </DSProvider>
    </div>
  ));
