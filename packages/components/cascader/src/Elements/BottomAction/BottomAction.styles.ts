import styled from 'styled-components';

export const IconWrapper = styled.div`
  margin-right: 4px;
  svg {
    fill: ${(props) => props.theme.palette['grey-600']};
  }
`;

export const TextWrapper = styled.div`
  line-height: 12px;
`;

export const BottomAction = styled.div`
  background-color: ${(props) => props.theme.palette['grey-050']};
  padding: 0 16px;
  height: 52px;
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.palette['grey-600']};
  font-weight: 500;
  border-width: 1px 0 0 0;
  border-color: ${(props) => props.theme.palette['grey-100']};
  border-style: solid;
  margin-top: 8px;
  cursor: pointer;
`;
