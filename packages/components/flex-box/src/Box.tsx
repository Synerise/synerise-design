import styled, {
  type DefaultTheme,
  type StyledComponent,
} from 'styled-components';

import type { BoxStyleProps } from './Box.types';
import { shouldForwardStyleProp, styleProps } from './styleProps';

/**
 * A `div` that takes spacing, size, layout, flex-child, colour and type props.
 *
 * `styled(Box)` folds into this component, so a consumer's override lands in a later stylesheet
 * group and wins at equal specificity — the same contract as before.
 *
 * The return type is annotated rather than inferred so the published declarations stay portable —
 * an inferred one names `csstype` aliases through a path consumers cannot resolve. The fourth type
 * argument removes the style-prop names from the underlying `div` attributes instead of
 * intersecting with them, so a shared name like `color` resolves to our type alone.
 */
export const Box: StyledComponent<
  'div',
  DefaultTheme,
  BoxStyleProps,
  keyof BoxStyleProps
> = styled.div.withConfig({
  displayName: 'Box',
  shouldForwardProp: shouldForwardStyleProp,
})<BoxStyleProps>`
  box-sizing: border-box;
  ${styleProps}
`;

export default Box;
