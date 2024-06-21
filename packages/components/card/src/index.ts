import * as MainCardStyles from './Card/Card.styles';
import * as CardGroupStyles from './CardGroup/CardGroup.styles';
import * as CardBadgeStyles from './CardBadge/CardBadge.styles';

export { default } from './Card/Card';
export type { Backgrounds, CardProps } from './Card/Card.types';
export { default as CardGroup } from './CardGroup/CardGroup';
export { CardGroupProps } from './CardGroup/CardGroup.types';
export { default as CardBadge } from './CardBadge/CardBadge';
export { CardSummary } from './CardSummary/CardSummary';
export type { CardSummaryProps } from './CardSummary/CardSummary.types';

export const CardStyles = {
  Card: MainCardStyles,
  CardGroup: CardGroupStyles,
  CardBadge: CardBadgeStyles,
};
