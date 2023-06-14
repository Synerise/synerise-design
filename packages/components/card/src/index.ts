import * as MainCardStyles from './Card/Card.styles';
import * as CardGroupStyles from './CardGroup/CardGroup.styles';
import * as CardBadgeStyles from './CardBadge/CardBadge.styles';

export { default } from './Card/Card';
export { default as CardGroup } from './CardGroup/CardGroup';
export { default as CardBadge } from './CardBadge/CardBadge';
export type { Backgrounds, CardProps } from './Card/Card.types';

export const CardStyles = {
  Card: MainCardStyles,
  CardGroup: CardGroupStyles,
  CardBadge: CardBadgeStyles,
};
