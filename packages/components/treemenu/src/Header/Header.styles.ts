import styled from 'styled-components';

export const Header = styled.div`
  display: flex;
  line-height: normal;
  font-size: 10px;
  color: ${(props): string => props.theme.palette['gray-400']};
  padding: 0 8px 4px;

  > h3 {
    text-transform: uppercase;
    font-weight: 400;
    flex-grow: 1;
    font-size: inherit;
    color: inherit;
  }
`;

export const HeaderSmth = styled.span``;
