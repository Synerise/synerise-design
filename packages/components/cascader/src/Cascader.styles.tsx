import styled from 'styled-components';

export const InputWrapper = styled.div`
  box-shadow: 0 16px 32px 0 rgba(35, 41, 54, 0.05);
`;
export const Dropdown = styled.div<{ visible?: boolean; searching?: boolean }>`
  display: ${(props): string => (!props.visible ? 'none' : 'block')};
  position: absolute;
  width: 100%;
  background: ${(props): string => props.theme.palette.white};
  border-radius: 0 3px 3px 0;
  padding: 8px;
  ${(props): string | false => !!props.searching && `padding-right:0px;`}
  box-shadow: 0 16px 32px 0 rgba(35, 41, 54, 0.05);
`;
export const Wrapper = styled.div`
  position: relative;
`;
export const BreadcrumbPrefix = styled.div``;
export const DividerContainer = styled.div`
  padding: 8px;
`;
