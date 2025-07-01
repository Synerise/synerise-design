import { type MouseEvent } from 'react';

import { type InformationCardProps } from '../InformationCard.types';
import { type InformationCardActionsProps } from '../InformationCardActions/InformationCardActions.types';

export type InformationCardFooterProps = {
  text: InformationCardProps['footerText'];
  actionsMenuButtonLabel?: InformationCardActionsProps['buttonLabel'];
  actionsMenuButtonOnClick?: (event: MouseEvent) => void;
} & Pick<
  InformationCardProps,
  | 'actionButton'
  | 'actionButtonTooltipText'
  | 'actionButtonTooltipText'
  | 'actionButtonCallback'
>;
