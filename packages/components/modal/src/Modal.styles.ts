import styled, { css } from 'styled-components';
import Modal from 'antd/lib/modal';

export const SettingButton = styled.div`
  display: flex;
  width: 100%;
`;
export const ButtonsWrapper = styled.div`
  display: flex;
`;

export const AntdModal = styled(Modal)<{
  isFullscreen?: boolean;
}>`
  ${props =>
    props.isFullscreen &&
    css`
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: 0;
      max-width: none;
      padding: 0;
      .ant-modal-content {
        display: flex;
        flex-direction: column;
        height: 100%;
      }
      .ant-modal-body {
        flex: 1 1 100%;
        overflow: scroll;
      }
    `}
`;
