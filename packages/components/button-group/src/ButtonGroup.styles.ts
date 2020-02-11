import styled from 'styled-components';

export const Container = styled.div`
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
        + .ant-btn {
          &:before {
            content: '';
            display: flex;
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: 1px;
            z-index: 99999;
            opacity: 1;
            background-color: ${(props): string => props.theme.palette['blue-600']};
          }
        }
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
