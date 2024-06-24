import { MouseEvent } from 'react';
import { InformationCardActionsProps } from '../InformationCardActions/InformationCardActions.types';
import { InformationCardProps } from '../InformationCard.types';

export type InformationCardFooterProps = {
  text: InformationCardProps['footerText'];
  actionsMenuButtonLabel?: InformationCardActionsProps['buttonLabel'];
  actionsMenuButtonOnClick?: (event: MouseEvent) => void;
} & Pick<
  InformationCardProps,
  'actionButton' | 'actionButtonTooltipText' | 'actionButtonTooltipText' | 'actionButtonCallback'
>;
