import * as React from 'react';
import DSFlag, {countryCodes} from '@synerise/ds-flag';
import { number, select } from '@storybook/addon-knobs';

const stories = {
  default: () => {
    return (
      <DSFlag country={select('Select country', countryCodes, countryCodes[0])} size={number('Set size', 20)} />
    )
  },
  allFlags: () => {
    return (
      <div style={{display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', flexWrap: 'wrap'}}>
        {countryCodes.map((code) => (
          <div key={code} style={{minWidth: '145px', minHeight: '145px', margin: 10, padding: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '1px solid #e0e0e0'}}>
            <DSFlag country={code} size={number('Set size', 20)} />
            <span style={{marginTop: 12}}>{code}</span>
          </div>
        ))}
      </div>
    )

  }
};

export default {
name: 'Components/Flag',
  config: {},
  stories,
}
