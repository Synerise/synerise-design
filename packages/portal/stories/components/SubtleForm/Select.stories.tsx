import * as React from 'react';
import SubtleForm from '@synerise/ds-subtle-form';
import Select from '@synerise/ds-select';
const decorator = storyFn => <div style={{ width: '400px', padding: '16px', background: '#fff' }}>{storyFn()}</div>;
const renderLabel = (text: string) => {
  return <div style={{ maxWidth: '200px', textOverflow: 'ellipsis', overflow: 'hidden' }}>{text}</div>;
};
const stories = {
  default: () => {
    const [value, setValue] = React.useState()
    return (
      <div>
        <div style={{ marginBottom: '16px' }}>
          <SubtleForm.Select onChange={val=>setValue(val)} value={value}>
            <Select.Option value={"Select"}>
              Select
            </Select.Option>
            <Select.Option value="Select 2">
              Select 2
            </Select.Option>
          </SubtleForm.Select>
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
