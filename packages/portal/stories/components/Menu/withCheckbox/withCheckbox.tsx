import * as React from 'react';
import { withCheckBox } from '../dataset';
import {
  attachKnobsToDataSource,
  decorator,
  getDefaultProps,
  getSuffixElement,
  getSuffixTrigger,
} from '../index.stories';
import Checkbox from '@synerise/ds-checkbox/dist';

const withCheckbox = () => {
  const defaultProps = getDefaultProps();
  const [isChecked, setChecked] = React.useState(false);
  const props = {
    dataSource: attachKnobsToDataSource(withCheckBox),
    suffixel: getSuffixElement(),
    suffixVisibilityTrigger: getSuffixTrigger(),
    prefixel: <Checkbox checked={isChecked} onChange={() => setChecked(!isChecked)} />,
    onClick: () => setChecked(!isChecked),
    selectable: false,
    ...defaultProps,
  };
  return decorator(props);
};
export default withCheckbox;
