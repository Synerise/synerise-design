import * as MainCardStyles from './Card/Card.styles';
import * as CardBadgeStyles from './CardBadge/CardBadge.styles';
import * as CardGroupStyles from './CardGroup/CardGroup.styles';

export { default } from './Card/Card';
export { default as CardGroup } from './CardGroup/CardGroup';
export { default as CardBadge } from './CardBadge/CardBadge';
export { CardSummary } from './CardSummary/CardSummary';

export type { CardSummaryProps } from './CardSummary/CardSummary.types';
export type { Backgrounds, CardProps } from './Card/Card.types';
export type { CardGroupProps } from './CardGroup/CardGroup.types';
export type { CardBadgeProps, BadgeStatus } from './CardBadge/CardBadge.types';

export const CardStyles = {
  Card: MainCardStyles,
  CardGroup: CardGroupStyles,
  CardBadge: CardBadgeStyles,
};
