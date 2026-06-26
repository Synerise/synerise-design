import RadioGroup from './RadioGroup';
import { RadioBase, RadioButton } from './components';

/**
 * DS-native, antd-free radio. `Radio` (radio + label + description) with `Radio.Group` (single-select
 * context) and `Radio.Button` (segmented control) attached as static members.
 */
const Radio = Object.assign(RadioBase, {
  Group: RadioGroup,
  Button: RadioButton,
});

export default Radio;
