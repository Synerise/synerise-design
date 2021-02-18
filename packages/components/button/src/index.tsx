import * as React from 'react';
import MainButton from './Button';
import { Props as ButtonProps } from './Button.types';
import CheckboxButton from './Checkbox/Checkbox';
import Creator from './Creator/Creator';
import Expander from './Expander/Expander';

class Button extends React.Component<ButtonProps> {
  static readonly Checkbox = CheckboxButton;
  static readonly Creator = Creator;
  static readonly Expander = Expander;

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  render() {
    return <MainButton {...this.props} />;
  }
}

export default Button;
