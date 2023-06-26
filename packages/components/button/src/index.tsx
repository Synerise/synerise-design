import * as React from 'react';
import MainButton from './Button';
import { Props as ButtonProps } from './Button.types';
import CheckboxButton from './Checkbox/Checkbox';
import Creator from './Creator/Creator';
import Expander from './Expander/Expander';
import StarButton from './Star/Star';

import * as MainButtonStyles from './Button.styles';
import * as CheckboxStyles from './Checkbox/Checkbox.styles';
import * as CreatorStyles from './Creator/Creator.styles';
import * as ExpanderStyles from './Expander/Expander.styles';
import * as StarStyles from './Star/Star.styles';

class Button extends React.Component<ButtonProps> {
  static readonly Checkbox = CheckboxButton;
  static readonly Creator = Creator;
  static readonly Expander = Expander;
  static readonly Star = StarButton;

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  render() {
    return <MainButton {...this.props} />;
  }
}

export default Button;
export type { Props as ButtonProps } from './Button.types';
export { CreatorStatus } from './Creator/Creator.types';
export { ExpanderSize } from './Expander/Expander.types';

export const ButtonStyles = {
  Button: MainButtonStyles,
  Creator: CreatorStyles,
  Checkbox: CheckboxStyles,
  Expander: ExpanderStyles,
  Star: StarStyles,
};
