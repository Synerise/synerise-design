import styled from 'styled-components';

export const Container = styled.div`
  width: 636px;
  background-color: ${(props): string => props.theme.palette.white};
  user-select: none;
  margin: -16px;
`;

export const Separator = styled.div`
  margin: 0;
  border-top: 1px solid ${(props): string => props.theme.palette['grey-200']};
`;

export const Addon = styled.div<{last?: boolean}>`
 ${(props): string | false=> !props.last && `border-bottom: 1px solid ${props.theme.palette['grey-200']};`}

`;
export const PickerWrapper = styled.div`
  position: relative;
`;
export const OverlayContainer = styled.div<{ visible?: boolean }>`
  display: ${(props): string => (props.visible ? 'flex' : 'none')};
`;
