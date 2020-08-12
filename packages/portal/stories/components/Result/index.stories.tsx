import * as React from 'react';
import { text, boolean, select } from '@storybook/addon-knobs';

import Button from '@synerise/ds-button';
import Result from '@synerise/ds-result';
import List from '@synerise/ds-list';
import Avatar from '@synerise/ds-avatar';
import { action } from '@storybook/addon-actions';
import { TextArea } from '@synerise/ds-input';
import ModalProxy from '@synerise/ds-modal';

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

const MODAL_SIZES = ['small', 'medium', 'large', 'extraLarge', 'fullSize'];

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

const listExample = (
  <List
    dataSource={[
      [
        { text: 'Automation name #1' },
        { text: 'Automation name #2' },
        { text: 'Automation name #3' },
        { text: 'Automation name #4' },
        { text: 'Automation name #5' },
      ],
    ]}
    renderItem={(item => (
      <List.Item>
        {item.text}
      </List.Item>
    ))}
  />
);

const getDefaultProps = () => ({
  type: select('Select type', types, 'success'),
  customIcon: boolean('Custom icon', false),
  title: text('Title', 'File upload is in progress…'),
  description: text('Description', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sodales elit ut justo tristique hendrerit.'),
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
  noSearchResults: () => {
    return (
      <Result description="No results" type="no-results" noSearchResults />
    )
  },
  withTextarea: () => {
    const props = getDefaultProps();
    return (
      <Result {...props} customIcon={props.customIcon ? exampleAvatar : null} buttons={buttonSetExample} panel={textareaExample} />
    )
  },
  withList: () => {
    const props = getDefaultProps();
    return (
      <ModalProxy blank closable onCancel={action('onClick: Cancel')} visible size={select('Select modal size', MODAL_SIZES, 'small')} footer={null}>
        <Result {...props} customIcon={props.customIcon ? exampleAvatar : null} buttons={buttonSetExample} panel={listExample} />
      </ModalProxy>
    )
  },
  withModal: () => {
    const props = getDefaultProps();
    return (
      <ModalProxy blank closable onCancel={action('onClick: Cancel')} visible size={select('Select modal size', MODAL_SIZES, 'small')} footer={null}>
        <Result {...props} customIcon={props.customIcon ? exampleAvatar : null} buttons={
          <Button type="default" onClick={action('onClick: Close')}>
            Close
          </Button>
        }
        panel={textareaExample} />
     </ModalProxy>
    )
  },
};

export default {
name: 'Components/Result',
  config: {},
  stories,
  decorator,
  Component: Result,
}
