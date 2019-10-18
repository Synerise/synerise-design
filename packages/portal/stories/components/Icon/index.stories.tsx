import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, number, text } from '@storybook/addon-knobs';
import Icon from '@synerise/ds-icon';
import centered from '@storybook/addon-centered/react';
import iconArr from './icons';
import AngleLeftM from '@synerise/ds-icon/dist/icons/AngleLeftM';

const stories = storiesOf('Components|Icon', module);

const listyStyles: React.CSSProperties = {
  margin: 10,
  padding: 10,
  minWidth: 145,
  textAlign: 'center',
  border: 1,
  borderStyle: 'solid',
  borderColor: '#e0e0e0',
};

const setIcon = name => React.lazy(() => import(`@synerise/ds-icon/dist/icons/${name}.js`));

const IconComponent = iconArr.map(i => {
  const IconComponent = setIcon(i);

  return (
    <div style={listyStyles}>
      <Icon
        component={
          <React.Suspense fallback="">
            <IconComponent />
          </React.Suspense>
        }
      />
      <br />
      <br />
      <p>{i}</p>
    </div>
  );
});

const props = () => ({
  // name: select('Select icon name', type, 'angle-up-m'),
  color: text('Set color', 'red'),
  size: number('Size', 40),
  stroke: boolean('Set stroke', false),
});

stories
  .addDecorator(centered)
  .add('single icon', () => {
    return (
      <>
        <Icon {...props()} component={<AngleLeftM />} />
      </>
    );
  })
  .add('list icon', () => {
    return <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>{IconComponent}</div>;
  });

export default stories;
