import * as React from 'react';
import SubtleForm from '@synerise/ds-subtle-form';
import Select from '@synerise/ds-select';
import { Cities } from './dataset';
const decorator = storyFn => <div style={{ width: '350px', padding: '16px', background: '#fff' }}>{storyFn()}</div>;
const renderLabel = (text: string) => {
  return <div style={{ maxWidth: '200px', textOverflow: 'ellipsis', overflow: 'hidden' }}>{text}</div>;
};
const stories = {
  default: () => {
    const [value, setValue] = React.useState<string>();
    return (
      <div>
        <div style={{ marginBottom: '16px' }}>
          <SubtleForm.Select
            onChange={val => setValue(val)}
            value={value}
            placeholder={'City'}
            label={renderLabel('City')}
            labelTooltip={'City'}
            suffixTooltip={'Select'}
          >
            {Cities.map(c => (
              <Select.Option value={c}>{c}</Select.Option>
            ))}
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
