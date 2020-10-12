import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  .ds-select-wrapper {
    min-width: 20%;
    margin-right: 8px;
  }
  .ds-time-picker {
    max-width: 220px;
    width: 100%;
    .filter-time-picker {
      box-shadow: 5px 5px 5px 5px red;
    }
  }
`;
export const Row = styled.div<{ justifyContent: string }>`
  width: 100%;
  display: flex;
  justify-content: ${(props): string => props.justifyContent};
  min-height: 32px;
  margin: 8px 0;
  
`;
export const Separator = styled.span`
  & {
    line-height: 32px;
    height: 32px;
    margin: 0 8px;
  }
`;
