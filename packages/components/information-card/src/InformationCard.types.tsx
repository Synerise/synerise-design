import type { ReactNode } from 'react';

import { SubtleTextAreaProps } from '@synerise/ds-subtle-form/dist/Elements/TextArea/TextArea.types';
import { Color, Size } from '@synerise/ds-avatar/dist/Avatar.types';
import { IconProps } from '@synerise/ds-icon';

export type BadgeData = {
  type?: string;
  title?: string;
  name?: string;
  iconColor?: Color | IconProps['color'];
  iconElement?: InformationCardProps['icon'];
  iconSize?: Size | string;
  avatarTooltipText?: string;
};

export type InformationCardProps = {
  /**
   * custom jsx element for rendering in action button (bottom-right)
   */
  actionButton?: boolean | (() => ReactNode);
  /**
   * default action button callback methodd
   */
  actionButtonCallback?: () => void;
  /**
   * default action button tooltip
   */
  actionButtonTooltipText?: string;
  /**
   * adjusts the styles to be displayed as a tooltip
   */
  asTooltip?: boolean;
  /**
   * description in a tooltip shown when user (note renderBadge has to be provided)
   */
  avatarTooltipText?: string;
  className?: string;
  /**
   * subtitle's value to be copied when clicking on the copy button
   */
  copyTooltip?: string;
  /**
   * feedback to the user once information card's subtitle has been copied
   */
  copiedTooltip?: string;
  /**
   * when information-card's `children` prop is not provided,
   * `defaultTextAreaProps` can be used to parametrize default textarea
   */
  descriptionConfig?: SubtleTextAreaProps | string | null | undefined;
  /**
   * render prop for rendering the bottom part of (by default section with a small text and an optional action button on the right)
   */
  renderFooter?: () => JSX.Element;
  /**
   * additional feedback info to the user, when set to null - footer is hidden
   */
  footerText?: ReactNode | null;
  /**
   * icon (note this needs to be pure SVG icon, it relies on `buildBadgeIcon` helper)
   */
  icon?: ReactNode;
  /**
   * icon color to be applied to `icon` element
   */
  iconColor?: string;
  /**
   * additional information shown between subtitle and description section.
   * Can be used for warnings, errors, destructive actions, notices. See `buildExtraInfo` and alert `level` there.
   */
  notice?: ReactNode;
  /**
   * Custom render prop for displaying. If set to `null` - badge won't be shown.
   */
  renderBadge?: Function | null;
  /**
   * Second line. Required prop. Can be copied.
   */
  subtitle?: string;
  /**
   * Title of the information-card. Can be copied.
   */
  title: string;
  /**
   * list of object parameters to display
   */
  renderAdditionalDescription?: () => ReactNode;
};
