import styled from 'styled-components';

export const DropdownWrapper = styled.div`
  background: ${(props): string => props.theme.palette.white};
  width: 220px;
  border-radius: 3px;
`;
export const MenuWrapper = styled.div<{ withBottomAction: boolean }>`
  padding: 8px;
  ${(props): string | false => props.withBottomAction && `padding-bottom: 0;`}
`;
