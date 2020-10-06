import * as React from 'react';

import SubtleForm from '@synerise/ds-subtle-form';
import { number, text } from '@storybook/addon-knobs';
const decorator = storyFn => <div style={{ width: '400px', padding: '16px', background: '#fff' }}>{storyFn()}</div>;
const renderLabel = (text: string) => {
  return <div style={{ maxWidth: '200px', textOverflow: 'ellipsis', overflow: 'hidden' }}>{text}</div>;
};
const stories = {

};

export default {
  name: 'Components/SubtleForm/TextArea',
  config: {},
  stories,
  decorator,
};
