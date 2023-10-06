import styled from 'styled-components';

export const BlockedHandlerWithTooltipWrapper = styled.div`
  position: relative;
`;

export const ElementOverHandler = styled.div<{ position: number }>`
  width: 20px;
  height: 20px;
  z-index: 98;
  cursor: not-allowed;
  border-radius: 50%;
  border: 3px solid transparent;
  background-color: transparent;
  position: absolute;
  top: -8px;
  left: ${({ position }) => position}%;
  transform: translateX(-50%);
`;
