import { remapCopyValueFromText, simpleText } from '../dataset';
import Menu from '@synerise/ds-menu';
import { ItemWithoutHover } from '../stories.styles';
import * as React from 'react';
import { attachKnobsToDataSource } from '../index.stories';

const withoutHover = () => {
  const knobs = attachKnobsToDataSource(simpleText);
  return (
    <div style={{ background: 'rgba(0,0,0,0)', width: '200px' }}>
      <Menu selectable={false}>
        {remapCopyValueFromText(knobs).map(item => (
          <ItemWithoutHover {...item} />
        ))}
      </Menu>
    </div>
  );
};
export default withoutHover;
