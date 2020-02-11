import styled from 'styled-components';

export const Container = styled.div<{ options?: boolean }>`
  .ant-btn-group {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;

    .ant-btn {
      width: auto;
      &:focus {
        z-index: 99999;
      }
    }
  }
`;

export const Title = styled.h4`
  margin: 0 0 8px;
`;

export const Description = styled.p`
  margin: 8px 0 0;
  color: ${(props): string => props.theme.palette['grey-500']};
`;
