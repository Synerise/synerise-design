import styled from 'styled-components';

export const MenuHeader = styled.div`
  display: flex;
  align-items: center;
  font-size: 10px;
  font-weight: 500;
  text-transform: uppercase;
  color: ${(props) => props.theme.palette['grey-500']};
  height: 40px;
  padding: 12px;
  line-height: 1.6;
  letter-spacing: 0.1px;
`;
export const HeaderIconWrapper = styled.div`
  color: ${(props) => props.theme.palette['grey-400']};
`;
