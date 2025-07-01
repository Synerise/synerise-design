import styled from 'styled-components';

export const MenuDivider = styled.div<{
  higher?: boolean;
  level?: number;
}>`
  height: 1px;
  width: ${(props) => (props?.level && props?.level > 1 ? '75%' : '100%')};
  margin: ${(props) =>
    `${props.higher ? '16px' : '8px'} ${props?.level && props?.level > 1 ? '35px' : '0'} `};
  border-top: 1px dashed ${(props) => props.theme.palette['grey-300']};
`;
