import styled, { css, keyframes } from 'styled-components';

import DSIcon from '@synerise/ds-icon';

const spinnerAnimation = keyframes`
  0% {
     transform: rotate(0deg);
  }
  100% {
     transform: rotate(720deg);
  }
`;

export const IconBadgeWrapper = styled.div`
  position: relative;
  display: inline-block;
`;
export const IconBadgeIcon = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 10;
`;

export const Icon = styled(DSIcon)<{ status?: string }>`
  ${(props) =>
    props.status === 'processing' &&
    css`
      animation: ${spinnerAnimation} 2s linear infinite;
    `}
`;
