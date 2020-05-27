import * as React from 'react';
import { ExtendedAntdSwitchComponent, simpleText } from '../dataset';
import { attachKnobsToDataSource, decorator, getDefaultProps } from '../index.stories';

const withSwitch = () => {
  const defaultProps = getDefaultProps();
  const [isChecked, setChecked] = React.useState(false);
  const prefixel = (
    <ExtendedAntdSwitchComponent id={'toggle'} checked={isChecked} onChange={() => setChecked(!isChecked)} />
  );
  const props = {
    dataSource: attachKnobsToDataSource(simpleText),
    prefixel,
    onClick: () => setChecked(!isChecked),
    ...defaultProps,
  } as object;
  return decorator(props);
};
export default withSwitch;
