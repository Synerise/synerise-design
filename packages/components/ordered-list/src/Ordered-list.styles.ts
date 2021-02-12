import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const OrderedList = styled.ol`
  display: flex;
  flex-direction: column;
  padding: 0;
  ol {
    padding-left: 30px;
  }
  ol li {
    margin: 10px 0;
    padding: 0;
  }
`;

