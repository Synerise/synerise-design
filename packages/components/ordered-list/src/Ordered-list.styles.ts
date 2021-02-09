import styled from 'styled-components';

export const OrderedList = styled.ol`
  display: flex;
  flex-direction: column;
  padding: 0;
  ol {
    padding-left: 40px;
  }
  ol li {
    margin: 10px 0;
    padding: 0;
  }
`;
export const OrderedListWrapper = styled.div``;
export const LowerWrapper = styled.div`
  padding: 12px 0px 6px 32px;
`;
export const OptionWrapper = styled.div`
  padding: 12px 0px 6px 56px;
`;

export const OrderedListItem = styled.div`
  padding: 12px 0 6px 0;
`;
