import styled, { css } from 'styled-components';

export const FullScreenWrapper = styled.div<{height: string}>`
  position: absolute;
  top: 0;
  right: 0;
  height: ${props => props.height};
  display: none;
  padding-right: 8px;
  background-color: white;
  &:hover svg {
    fill: ${(props): string => props.theme.palette['blue-600']};
    color: ${(props): string => props.theme.palette['blue-600']};
  }
`;

export const MonacoWrapper = styled.div<{ error?: boolean}>`
  position: relative;
  border-radius: 3px;
  border: solid ${(props): string => props?.error ? '2px' : '1px'} ${(props): string => props?.error ? props.theme.palette['red-600'] : props.theme.palette['grey-300']};
  
  &:focus-within, :active {
    ${props => !props.error && css`
      border: solid 2px ${(props): string => props.theme.palette['blue-600']};
    `}
    ${FullScreenWrapper} {
      display: block;
      ${props => props.error && css`
        background-color: ${props.theme.palette['red-100']}
      `}
    };
  };
`

export const LabelModalWrapper = styled.div`
  height: 80px;
  display: flex;
  align-items: center;
  padding: 27px 24px;
`

export const LabelWrapper = styled.div`
  pointer-events: none;
  padding: 8px 0;
`


