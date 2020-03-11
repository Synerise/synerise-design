import * as React from 'react';
import {text, select, number, boolean} from '@storybook/addon-knobs';
import Avatar from '@synerise/ds-avatar';
import Badge from '@synerise/ds-badge';
import Icon from '@synerise/ds-icon';
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
const sizes = ['small', 'medium', 'large', 'extraLarge'] as const;
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

const image = [
  '',
  imgSrc
] as const;

const stories = {
  sizes: () => (
    <div
      style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', paddingTop: 200}}>
      <Badge status={'default'}>
        <Avatar
          disabled={boolean('disabled', false)}
          hasStatus={boolean('has status', false)}
          shape={select('shape', shapes, 'circle')}
          size={'small'}
          tooltip={{name: 'Silvia Jobs', email: 'silvia.jobs@gmail.com'}}
          src={imgSrc}
        />
      </Badge>
      <Badge status={'success'}>
        <Avatar
          disabled={boolean('disabled', false)}
          hasStatus={boolean('has status', false)}
          shape={select('shape', shapes, 'circle')}
          size={'medium'}
          tooltip={{name: 'Silvia Jobs', email: 'silvia.jobs@gmail.com'}}
          src={imgSrc}
        />
      </Badge>
      <Badge status={'error'}>
        <Avatar
          disabled={boolean('disabled', false)}
          hasStatus={boolean('has status', false)}
          shape={select('shape', shapes, 'circle')}
          size={'large'}
          tooltip={{name: 'Silvia Jobs', email: 'silvia.jobs@gmail.com'}}
          src={imgSrc}
        />
      </Badge>
      <Badge status={select('status', statuses, 'error')}>
        <Avatar
          disabled={boolean('disabled', false)}
          hasStatus={boolean('has status', false)}
          shape={select('shape', shapes, 'circle')}
          size={'extraLarge'}
          tooltip={{name: 'Silvia Jobs', email: 'silvia.jobs@gmail.com'}}
          src={imgSrc}
        />
      </Badge>
    </div>
  ),
  withPhoto: () => (
    <div style={{paddingTop: 200}}>
      <Badge status={select('status', statuses, 'error')}>
        <Avatar
          disabled={boolean('disabled', false)}
          size={select('sizeString', sizes, 'large')}
          shape={select('shape', shapes, 'circle')}
          tooltip={{name: 'Silvia Jobs', email: 'silvia.jobs@gmail.com'}}
          src={imgSrc}
          hasStatus={boolean('has status', true)}
        />
      </Badge>
    </div>
  ),
  withInitals: () => (
    <div style={{paddingTop: 200}}>
      <Badge status={select('status', statuses, 'success')}>
        <Avatar
          backgroundColor={select('backgroundColors', backgroundColors, 'blue')}
          backgroundColorHue={select('backgroundColorHue', backgroundColorHue, '800')}
          disabled={boolean('disabled', false)}
          size={select('sizeString', sizes, 'extraLarge')}
          shape={select('shape', shapes, 'square')}
          tooltip={{name: 'Silvia Jobs', email: 'silvia.jobs@gmail.com'}}
          hasStatus={boolean('has status', true)}
        >
          DS
        </Avatar>
      </Badge>
    </div>
  ),
  withIcon: () => (
    <div style={{paddingTop: 200}}>
      <Badge status={select('status', statuses, 'default')}>
        <Avatar
          backgroundColor={select('backgroundColors', backgroundColors, 'blue')}
          backgroundColorHue={select('backgroundColorHue', backgroundColorHue, '800')}
          size={select('sizeString', sizes, 'medium')}
          shape={select('shape', shapes, 'square')}
          disabled={boolean('disabled', false)}
          hasStatus={boolean('has status', true)}
          iconComponent={
            <Icon color={text('IconColor', '#fff')} size={number('iconSize', 20)} component={<DuplicateS/>}/>
          }
          tooltip={{name: 'Silvia Jobs', email: 'silvia.jobs@gmail.com'}}
        />
      </Badge>
    </div>
  ),
  statuses: () => (
    <div
      style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', paddingTop: 200}}>
      <Badge status={'default'}>
        <Avatar
          backgroundColor={'blue'}
          backgroundColorHue={'800'}
          size={'small'}
          shape={'circle'}
          tooltip={{name: 'Silvia Jobs'}}
          hasStatus={true}
        >
          AK
        </Avatar>
      </Badge>
      <Badge status={'success'}>
        <Avatar
          backgroundColor={'blue'}
          backgroundColorHue={'800'}
          size={'medium'}
          shape={'circle'}
          tooltip={{name: 'Silvia Jobs', email: 'silvia.jobs@gmail.com'}}
          hasStatus={true}
        >
          AK
        </Avatar>
      </Badge>
      <Badge status={'error'}>
        <Avatar
          backgroundColor={'blue'}
          backgroundColorHue={'800'}
          size={'large'}
          shape={'circle'}
          tooltip={{name: 'Silvia Jobs', email: 'silvia.jobs@gmail.com'}}
          hasStatus={true}
        >
          AK
        </Avatar>
      </Badge>
      <Badge status={select('status', statuses, 'error')}>
        <Avatar
          backgroundColor={select('backgroundColors', backgroundColors, 'blue')}
          backgroundColorHue={select('backgroundColorHue', backgroundColorHue, '800')}
          disabled={boolean('disabled', false)}
          hasStatus={boolean('has status', true)}
          size={'extraLarge'}
          tooltip={{name: 'Silvia Jobs', email: 'silvia.jobs@gmail.com'}}
        >
          AK
        </Avatar>
      </Badge>
    </div>
  ),
  allOptions: () => (
    <div
      style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', paddingTop: 200}}>
      <Avatar
        backgroundColor={select('backgroundColors', backgroundColors, 'blue')}
        backgroundColorHue={select('backgroundColorHue', backgroundColorHue, '800')}
        disabled={boolean('disabled', false)}
        size={select('sizeString', sizes, 'small')}
        shape={select('shape', shapes, 'circle')}
        tooltip={{name: 'Silvia Jobs'}}
        hasStatus={boolean('has status', true)}
        iconComponent={
          <Icon color={text('IconColor', '#fff')} size={number('iconSize', 20)} component={<DuplicateS/>}/>
        }
      >
        AK
      </Avatar>
      <Badge status={'default'}>
        <Avatar
          backgroundColor={select('backgroundColors', backgroundColors, 'blue')}
          backgroundColorHue={select('backgroundColorHue', backgroundColorHue, '800')}
          disabled={boolean('disabled', false)}
          size={'medium'}
          shape={select('shape', shapes, 'circle')}
          tooltip={{name: 'Silvia Jobs', email: 'silvia.jobs@gmail.com'}}
          src={imgSrc}
          hasStatus={boolean('has status', true)}
        >
          AK
        </Avatar>
      </Badge>
      <Badge status={'success'}>
        <Avatar
          backgroundColor={select('backgroundColors', backgroundColors, 'blue')}
          backgroundColorHue={select('backgroundColorHue', backgroundColorHue, '800')}
          disabled={boolean('disabled', false)}
          size={'large'}
          shape={select('shape', shapes, 'circle')}
          tooltip={{name: 'Silvia Jobs', email: 'silvia.jobs@gmail.com'}}
          src={select('withImage', image, '')}
          hasStatus={boolean('has status', true)}
        >
          AK
        </Avatar>
      </Badge>
      <Badge status={'error'}>
        <Avatar
          backgroundColor={select('backgroundColors', backgroundColors, 'blue')}
          backgroundColorHue={select('backgroundColorHue', backgroundColorHue, '800')}
          disabled={boolean('disabled', false)}
          size={'extraLarge'}
          shape={'square'}
          tooltip={{name: 'Silvia Jobs', email: 'silvia.jobs@gmail.com'}}
          src={imgSrc}
          hasStatus={boolean('has status', true)}
        >
          AK
        </Avatar>
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
