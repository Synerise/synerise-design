import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const OrderedList = styled.ol<{ listStyle?: string }>`
  display: flex;
  flex-direction: column;
  padding: 0;
  ol {
    margin-left: 10px;
    padding-left: 30px;
  }
  ol li {
    padding: 0;
    list-style-type: ${(props): string => (props.listStyle ? props.listStyle : 'none')};
  }
  li {
    margin-right: 4px;
  }
`;
