import * as React from 'react';
import { text, boolean } from '@storybook/addon-knobs';

import Button from '@synerise/ds-button';
import Card from '@synerise/ds-card';
import Result from '@synerise/ds-result';

const decorator = storyFn => (
  <div style={{ width: '520px' }}>
    {storyFn()}
  </div>
);

const stories = {
  default: () => (
    <Result
      onClose={() => alert('Close event')}
      closable={boolean('Closable', true)}
      title={text('Title', 'Chicken has been successfully cooked')}
      description={text('Description', 'At 150 degrees, as you requested')}
      buttons={boolean('Show buttons', true) && (
        <>
          <Button type="secondary">
            Cancel
          </Button>
          <Button type="primary">
            Freeze
          </Button>
        </>
      )}
    />
  ),

  insideCard: () => (
    <Card>
      <Result
        type="success"
        onClose={() => alert('Close event')}
        closable={boolean('Closable', true)}
        title={text('Title', 'Chicken has been successfully cooked')}
        description={text('Description', 'At 150 degrees, as you requested')}
        buttons={boolean('Show buttons', true) && (
          <>
            <Button type="secondary">
              Cancel
            </Button>
            <Button type="primary">
              Freeze
            </Button>
          </>
        )}
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
