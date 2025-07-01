import styled from 'styled-components';

import Button from '@synerise/ds-button';
import EmptyStateBase from '@synerise/ds-empty-states';
import Icon from '@synerise/ds-icon';
import { RawTextArea } from '@synerise/ds-input';
import ModalBase from '@synerise/ds-modal';

export const TextArea = styled(RawTextArea)``;

export const Modal = styled(ModalBase)<{ viewportHeight: number }>`
  && {
    top: 50px;
    .ant-modal-content {
      height: ${(props) => props.viewportHeight}vh;
    }
  }
  ${TextArea} {
    height: calc(${(props) => props.viewportHeight}vh - 211px);
    min-height: auto;
    resize: none;
    font-family: 'IBM Plex Mono Regular', monospace;
    &,
    &:focus {
      border: 0;
      background: transparent;
      box-shadow: none;
    }
  }
`;

export const EmptyState = styled(EmptyStateBase)`
  margin: 90px auto 120px;
`;

export const TriggerButtonLabel = styled.div`
  min-width: 0;
  text-overflow: ellipsis;
  overflow: hidden;
`;

export const TriggerButton = styled(Button)`
  max-width: 100%;
`;

export const ModalFooterLeftSide = styled.div`
  flex: 1 1 100%;
  text-align: left;
`;

export const ModalSubHeader = styled.div`
  padding: 12px 24px;
  display: flex;
  justify-content: space-between;
`;

export const ModalContentWrapper = styled.div`
  padding: 24px;
`;

export const Limit = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;

export const LimitPart = styled.div``;

export const SearchWrapper = styled.div`
  max-width: 200px;
  min-width: 32px;
`;

export const RightSide = styled.div`
  flex: 1 1 auto;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 12px;
`;

export const LeftSide = styled.div`
  flex: 0 0 auto;
  text-align: left;
`;

export const CreatorItemsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const DeleteIcon = styled(Icon)`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  display: none;
  color: ${(props) => props.theme.palette['red-600']};
  &:hover {
    color: ${(props) => props.theme.palette['red-500']};
  }
`;

export const CollectorWrapper = styled.div`
  padding: 0 34px;
  margin-bottom: 24px;
`;

export const CreatorRow = styled.div`
  padding: 0 34px;
  position: relative;
  &:hover {
    ${DeleteIcon} {
      display: block;
    }
  }
`;
