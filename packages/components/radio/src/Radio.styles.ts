import styled from 'styled-components';

export const RadioWrapper = styled.div`
  & {
    padding: 8px 12px;
    display: block;
  }
`;

export const Description = styled.div`
  color: ${(props): string => props.theme.palette['grey-600']};
  ${(props): string => props.disabled && `opacity: 0.4;`}
`;

export const AdditionalData = styled.div`
  margin-left: 32px;
  margin-top: 4px;
`;
