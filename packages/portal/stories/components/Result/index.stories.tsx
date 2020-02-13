import * as React from 'react';
import { text, boolean, select } from '@storybook/addon-knobs';

import Button from '@synerise/ds-button';
import Card from '@synerise/ds-card';
import Result from '@synerise/ds-result';
import List from '@synerise/ds-list';
import Icon from '@synerise/ds-icon';
import WthTemperatureM from '@synerise/ds-icon/dist/icons/WthTemperatureM';
import Avatar from '@synerise/ds-avatar';
import { action } from '@storybook/addon-actions';
import { TextArea } from '@synerise/ds-input';

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
    <Button type="default" onClick={action('onClick: Cancel')}>
      Cancel
    </Button>
    <Button type="primary" onClick={action('onClick: Unpublish')}>
      Unpublish
    </Button>
  </>
);

const textareaExample = (
  <TextArea resetMargin rows={8} disabled value="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in dignissim odio, et luctus risus. Suspendisse vitae dignissim dolor. Nunc vel mollis massa. Cras laoreet nulla in velit elementum sollicitudin. Mauris ut erat nisi. Sed sapien ex, commodo sit amet neque varius, mollis egestas orci. Aenean maximus nibh nec arcu dapibus varius. Nulla lorem magna, maximus vel neque ac, consectetur finibus massa. Etiam bibendum augue in finibus tincidunt. Etiam dui risus, vehicula et massa sed, congue consectetur enim. Integer aliquet purus vitae elit congue, laoreet faucibus odio iaculis. In tincidunt viverra lacus id aliquet." />
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
  title: text('Title', 'File upload is in progress…'),
  description: text('Description', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'),
  // panel: boolean('Show panel', true) && panelExample,
});

const exampleAvatar = <Avatar
  backgroundColor='mars'
  backgroundColorHue='100'
  size='large'
  shape='circle'
  src={'https://www.w3schools.com/howto/img_avatar.png'}
/>;

const stories = {
  default: () => {
    const props = getDefaultProps();
    return (
      <Result {...props} customIcon={props.customIcon ? exampleAvatar : null} buttons={buttonSetExample} />
    )
  },
  withTextarea: () => {
    const props = getDefaultProps();
    return (
      <Result {...props} customIcon={props.customIcon ? exampleAvatar : null} buttons={buttonSetExample} panel={textareaExample} />
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
