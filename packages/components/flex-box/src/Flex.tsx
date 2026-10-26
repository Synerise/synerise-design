import styled, {
  type DefaultTheme,
  type StyledComponent,
} from 'styled-components';

import { Box } from './Box';
import type { FlexStyleProps } from './Flex.types';

/**
 * A flex container. Accepts everything `Box` does, plus `gap`.
 *
 * `display: flex` sits in this component's own block, after `Box`'s, so it wins over a
 * `display` prop — the same precedence the previous implementation had.
 */
export const Flex: StyledComponent<
  typeof Box,
  DefaultTheme,
  FlexStyleProps,
  keyof FlexStyleProps
> = styled(Box).withConfig({
  displayName: 'Flex',
})<FlexStyleProps>`
  display: flex;
`;

export default Flex;
