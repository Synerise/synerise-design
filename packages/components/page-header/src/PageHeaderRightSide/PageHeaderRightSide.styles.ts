import styled from 'styled-components';

export const WrapperPageHeaderRightSide = styled.div`
  display: flex;
  flex: 1 auto;
  justify-content: flex-end;

  > div {
    display: flex;
    flex: 1;
    justify-content: flex-end;
    align-items: center;
    flex-direction: row;

    > * {
      margin-left: 8px;
    }
  }
`;
