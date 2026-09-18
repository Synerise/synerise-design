import Button from './Button';
import * as MainButtonStyles from './Button.styles';
import CheckboxButton from './Checkbox/Checkbox';
import * as CheckboxStyles from './Checkbox/Checkbox.styles';
import Creator from './Creator/Creator';
import * as CreatorStyles from './Creator/Creator.styles';
import Expander from './Expander/Expander';
import * as ExpanderStyles from './Expander/Expander.styles';
import StarButton from './Star/Star';
import * as StarStyles from './Star/Star.styles';

export type { ButtonProps, ButtonType, StyledButton } from './Button.types';
export { default as ButtonToggle } from './ButtonToggle/ButtonToggle';
export type { ButtonToggleProps } from './ButtonToggle/ButtonToggle.types';
export type { CheckboxButtonProps } from './Checkbox/Checkbox.types';
export { type CreatorProps, CreatorStatus } from './Creator/Creator.types';
export { type ExpanderProps, ExpanderSize } from './Expander/Expander.types';
export type { StarButtonProps } from './Star/Star.types';
export { CheckboxButton as Checkbox, Creator, Expander, StarButton as Star };

export const ButtonStyles = {
  Button: MainButtonStyles,
  Creator: CreatorStyles,
  Checkbox: CheckboxStyles,
  Expander: ExpanderStyles,
  Star: StarStyles,
};

const staticComponents = {
  /** @deprecated - use named export `Creator` */
  Creator,
  /** @deprecated - use named export `Expander` */
  Expander,
  /** @deprecated - use named export `Star` */
  Star: StarButton,
  /** @deprecated - use named export `Checkbox` */
  Checkbox: CheckboxButton,
};

export default Object.assign(Button, staticComponents);
