import * as React from 'react';
import { text, boolean, select } from '@storybook/addon-knobs';

import Button from '@synerise/ds-button';
import Card from '@synerise/ds-card';
import Result from '@synerise/ds-result';
import List from '@synerise/ds-list';
import Icon from '@synerise/ds-icon';
import WthTemperatureM from '@synerise/ds-icon/dist/icons/WthTemperatureM';
import Avatar from '@synerise/ds-avatar';

const decorator = storyFn => (
  <div style={{ width: '520px' }}>
    {storyFn()}
  </div>
);

const types = {
  success: 'success',
  warning: 'warning',
  info: 'info',
  error: 'error',
  progress: 'progress',
  'no-results': 'no-results',
};

const buttonSetExample = (
  <>
    <Button type="default">
      Cancel
    </Button>
    <Button type="primary">
      Cook
    </Button>
  </>
);

const panelExample = (
  <List
    header="Select chicken to cook"
    dataSource={[
      [
        { text: 'Chicken ID 20291', disabled: true },
        { text: 'Chicken ID 11925', disabled: false },
        { text: 'Chicken ID 69209', disabled: false },
        { text: 'Chicken ID 96022', disabled: false },
        { text: 'Chicken ID 10921', disabled: false, danger: true },
      ],
    ]}
    renderItem={(item => (
      <List.Item
        disabled={item.disabled}
        danger={item.danger}
        icon={<Icon component={<WthTemperatureM />} />}
      >
        {item.text}
      </List.Item>
    ))}
  />
);

const getDefaultProps = () => ({
  type: select('type', types, 'success'),
  customIcon: boolean('Custom icon', false),
  title: text('Title', 'Chicken has been successfully cooked'),
  description: text('Description', 'Would you like to cook any other chickens?'),
  // panel: boolean('Show panel', true) && panelExample,
});

const exampleAvatar = <Avatar
  backgroundColor='mars'
  backgroundColorHue='100'
  size='default'
  shape='circle'
  src={'https://www.w3schools.com/howto/img_avatar.png'}
/>

const stories = {
  default: () => {
    const props = getDefaultProps();
    return (
      <Result {...props} customIcon={props.customIcon ? exampleAvatar : null} buttons={buttonSetExample} />
    )
  },

  insideCard: () => (
    <Card>
      <Result
        type={select('type', types, 'success')}
        onClose={() => alert('Close event')}
        closable={boolean('Closable', true)}
        title={text('Title', 'Chicken has been successfully cooked')}
        description={text('Description', 'Would you like to cook any other chickens?')}
        buttons={boolean('Show buttons', true) && buttonSetExample}
        panel={boolean('Show panel', true) && panelExample}
      />
    </Card>
  ),
};

export default {
  name: 'Components|Result',
  config: {},
  stories,
  decorator,
  Component: Result,
}
