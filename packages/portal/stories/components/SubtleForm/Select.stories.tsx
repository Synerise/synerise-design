import * as React from 'react';
import SubtleForm from '@synerise/ds-subtle-form';

const decorator = storyFn => <div style={{ width: '400px', padding: '16px', background: '#fff' }}>{storyFn()}</div>;
const renderLabel = (text: string) => {
  return <div style={{ maxWidth: '200px', textOverflow: 'ellipsis', overflow: 'hidden' }}>{text}</div>;
};
const stories = {
  default: () => {
    const [city, setCity] = React.useState<string | undefined>();
    const [description, setDescription] = React.useState<string | undefined>();
    const [name, setName] = React.useState<string | undefined>();
    return (
      <div>
        <div style={{ marginBottom: '16px' }}>
          <SubtleForm.Select
          />
        </div>
      </div>
    );
  },
};

export default {
  name: 'Components/SubtleForm/Select',
  config: {},
  stories,
  decorator,
};
