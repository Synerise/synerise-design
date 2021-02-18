import styled from 'styled-components';

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
export const Label = styled.label`
  color: ${(props): string => props.theme.palette['grey-800']};
  font-weight: 500;
  display: block;
`;
export const ContentAbove = styled.div`
  margin-bottom: 8px;
  min-height: 18px;
`;
