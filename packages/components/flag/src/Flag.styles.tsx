import styled, { css } from 'styled-components';

import { FLAG_SIZE_RATIO } from './Flag.const';

export const FlagContainer = styled.div<{ size: number }>`
  ${(props) => css`
    vertical-align: middle;
    display: flex;
    width: ${props.size}px;
    height: ${FLAG_SIZE_RATIO * props.size}px;
  `}
`;
