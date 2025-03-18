import styled from 'styled-components';
import { ModalProps } from 'antd/lib/modal';

import DsModal, { TitleContainer } from '@synerise/ds-modal';
import Tag from '@synerise/ds-tag';
import { UserAvatar } from '@synerise/ds-avatar';

export const Modal = styled(DsModal)<ModalProps & { withTabs?: boolean }>`
  .ant-modal-header {
    ${props => !!props.withTabs && `padding-bottom: 0px;`}
  }
  ${TitleContainer} {
    ${props => !!props.withTabs && `align-items:flex-start`}
  }
`;




export const TagAddon = styled(Tag)`
  height: 32px;
  width: 32px;
  margin: 0;
  opacity: 0.7;
`;
export const Label = styled.span`
  margin: 0 12px;
  max-width: 50px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
export const AvatarWithMargin = styled(UserAvatar)`
  margin: 4px;
`;
export const IconWrapper = styled.div`
  margin: 4px;
`;
