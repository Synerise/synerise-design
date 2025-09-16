import * as BreadcrumbStyles from './Elements/Breadcrumb/Breadcrumb.styles';
import * as HeaderStyles from './Elements/Header/Header.styles';
import * as ItemDangerStyles from './Elements/Item/Danger/Danger.styles';
import * as ItemSelectStyles from './Elements/Item/Select/Select.styles';
import * as ItemSubmenuTextStyles from './Elements/Item/SubmenuText/SubmenuText.styles';
import * as ItemTextStyles from './Elements/Item/Text/Text.styles';
import * as MainMenuStyles from './Menu.styles';

export { default } from './Menu';
export * from './Menu.types';
export * from './utils';

export const MenuStyles = {
  MenuStyles: MainMenuStyles,
  Breadcrumb: BreadcrumbStyles,
  Header: HeaderStyles,
  ItemDanger: ItemDangerStyles,
  ItemSelect: ItemSelectStyles,
  ItemSubmenuText: ItemSubmenuTextStyles,
  ItemText: ItemTextStyles,
};
