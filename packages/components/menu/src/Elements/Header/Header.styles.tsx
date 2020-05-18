import styled from 'styled-components';

export const MenuHeader = styled.div`
  display: flex;
  align-items: center;
  font-size: 10px;
  font-weight: 500;
  text-transform: uppercase;
  color: ${(props): string => props.theme.palette['grey-500']};
  height: 16px;
  margin: 12px;
  line-height: 1.6;
  letter-spacing: 0.1px;
`;
export const HeaderIconWrapper = styled.div`
  & > .ds-icon > svg {
    fill: ${(props): string => props.theme.palette['grey-400']};
  }
`;
