import styled from 'styled-components';

export const MonacoWrapper = styled.div<{ error?: boolean}>`
  position: relative;
  border-radius: 3px;
  border: solid ${(props): string => props?.error ? '2px' : '1px'} ${(props): string => props?.error ? props.theme.palette['red-600'] : props.theme.palette['grey-300']};
  
  &:focus-within, :active {
    border: solid 2px ${(props): string => props.theme.palette['blue-600']};
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

export const FullScreenWrapper = styled.div`
  position: absolute;
  top: 3px;
  right: 13px;
`;
