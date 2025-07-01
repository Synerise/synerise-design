import styled from 'styled-components';

export const UnorderedList = styled.ul<{ listStyle?: string }>`
  display: flex;
  flex-direction: column;
  padding: 0;
  list-style-type: ${(props): string =>
    props.listStyle ? props.listStyle : 'none'};
  list-style-position: inside;
  ul {
    margin-left: 20px;
    padding: 5px 0 5px 0;
    list-style-type: ${(props): string =>
      props.listStyle ? props.listStyle : 'none'};
  }
  li {
    margin-right: 4px;
    list-style-type: ${(props): string =>
      props.listStyle ? props.listStyle : 'none'};
  }
`;
export const Label = styled.label`
  color: ${(props): string => props.theme.palette['grey-800']};
  font-weight: 500;
  display: block;
`;
export const ContentAbove = styled.div`
  margin-bottom: 8px;
  min-height: 18px;
`;
