import styled from 'styled-components';

export const Container = styled.div``;

export const InputWrapper = styled.div`
  position: relative;
`;

export const IconWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto 4px;
  display: flex;
  align-items: center;
  color: ${(props): string => props.theme.palette['grey-400']};
`;
