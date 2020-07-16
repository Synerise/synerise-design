import styled from 'styled-components';

const mapButtonsPosition = {
  left: 'flex-start',
  right: 'flex-end',
  center: 'center',
};

export const Container = styled.div<{
  options?: boolean;
  fullWidth?: boolean;
  buttonsPosition: string | 'left' | 'center' | 'right';
  disabled?: boolean;
}>`
  width: 100%;
  items-align: center;
  .ant-btn-group {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: ${(props): string => mapButtonsPosition[props.buttonsPosition]};

    .ant-btn {
      width: auto;
      flex: ${(props): string => (props.fullWidth ? '1' : 'none')};
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
