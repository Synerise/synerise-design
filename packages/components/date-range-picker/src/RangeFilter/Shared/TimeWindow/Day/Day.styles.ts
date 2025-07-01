import styled from 'styled-components';

export const DayTooltip = styled.div`
  display: none;
`;

export const Container = styled.div`
  position: relative;
  &:hover {
    ${DayTooltip} {
      height: 24px;
      position: absolute;
      top: -30px;
      margin-left: calc(-50%);
      display: block;
      white-space: nowrap;
      background-color: rgba(56, 67, 80, 0.9);
      padding: 3px 8px;
      border-radius: 3px;
      z-index: 9;
      font-weight: 400;
      color: ${(props): string => props.theme.palette.white};
    }
  }
`;

export const Content = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 45px;
  margin-left: -8px;
`;
export const IconWrapper = styled.div<{ active: boolean; readonly?: boolean }>`
  position: absolute;
  top: 3px;
  right: 3px;
  pointer-events: ${(props): string => (props.readonly ? 'none' : 'all')};
  &&& .ds-icon svg {
    fill: ${(props): string =>
      props.active && !props.readonly
        ? props.theme.palette['red-600']
        : props.theme.palette['green-600']} !important;
  }
`;
