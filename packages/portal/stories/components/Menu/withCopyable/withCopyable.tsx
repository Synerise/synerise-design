import { copyable, remapCopyValueFromText } from '../dataset';
import * as React from 'react';
import { attachKnobsToDataSource, decorator, getDefaultProps } from '../index.stories';

const withCopyable = () => {
  const defaultProps = getDefaultProps();
  const knobs = attachKnobsToDataSource(copyable);
  const props = {
    dataSource: remapCopyValueFromText(knobs),
    selectable: false,
    ...defaultProps,
  } as object;
  return (
      decorator(props)
  );
}
export default withCopyable;