import styled from 'styled-components';
import Modal, { ModalProps } from 'antd/lib/modal';

export const SettingButton = styled.div`
  display: flex;
  width: 100%;
`;
export const ButtonsWrapper = styled.div`
  display: flex;
`;

// FIXME: Exported variable 'AntdModal' has or is using name 'ModalInterface' from external module (probabli Antd's types issue)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const AntdModal = styled(Modal as any)<ModalProps>``;
