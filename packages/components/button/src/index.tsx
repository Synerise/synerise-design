import React from 'react';
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

  render() {
    return <MainButton {...this.props} />;
  }
}

export default Button;

export { default as ButtonToggle } from './ButtonToggle/ButtonToggle';

export type { ButtonToggleProps } from './ButtonToggle/ButtonToggle.types';
export type { CreatorProps } from './Creator/Creator.types';
export type { StarButtonProps } from './Star/Star.types';
export type { CheckboxButtonProps } from './Checkbox/Checkbox.types';
export type { ExpanderProps } from './Expander/Expander.types';
export type { Props as ButtonProps } from './Button.types';

export { ExpanderSize } from './Expander/Expander.types';
export { CreatorStatus } from './Creator/Creator.types';

export const ButtonStyles = {
  Button: MainButtonStyles,
  Creator: CreatorStyles,
  Checkbox: CheckboxStyles,
  Expander: ExpanderStyles,
  Star: StarStyles,
};
