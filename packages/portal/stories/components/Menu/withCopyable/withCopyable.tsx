import { copyable, remapCopyValueFromText } from '../dataset';
import Tooltip from '@synerise/ds-tooltip/dist/Tooltip';
import Menu from '@synerise/ds-menu';
import * as React from 'react';
import { attachKnobsToDataSource, getDefaultProps } from '../index.stories';

const withCopyable = () => {
  const defaultProps = getDefaultProps();
  const knobs = attachKnobsToDataSource(copyable);
  const props = {
    dataSource: remapCopyValueFromText(knobs),
    ...defaultProps,
  } as object;
  return (
    <Tooltip type="default" trigger={'click'} title={'Copied!'}>
      <div style={{ background: 'rgba(0,0,0,0)', width: '200px' }}>
        <Menu {...props} />
      </div>
    </Tooltip>
  );
}
export default withCopyable;