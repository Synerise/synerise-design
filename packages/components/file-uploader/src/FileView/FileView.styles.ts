import styled from 'styled-components';

import { IconContainer } from '@synerise/ds-icon';
import Popconfirm from '@synerise/ds-popconfirm';
import { Label, Text } from '@synerise/ds-typography';

export const PreviewImage = styled.div`
  ${IconContainer} {
    color: var(--ds-color-text-base-subtle);
  }
  margin: -4px -8px -4px -4px;
`;

export const PlaceholderImage = styled.div`
  background-color: var(--ds-color-background-base-mutedhover);
  width: 32px;
  height: 32px;
  border-radius: 3px;
  padding: 4px;

  ${IconContainer} {
    color: var(--ds-color-icon-base-subtle);
  }
`;

export const PreviewThumbnail = styled.img`
  /* Matches PreviewImage exactly — the branch a stored image actually replaces — box and negative
     margins alike, so a list mixing a stored file with a freshly picked one keeps one shape.
     Measured: that box is 40x40 here, not the 32x32 of the PlaceholderImage branch. */
  width: 40px;
  height: 40px;
  margin: -4px -8px -4px -4px;
  border-radius: 3px;
  object-fit: contain;
  background-color: ${(props) => props.theme.palette['grey-200']};
`;

export const Info = styled.div<{ progress: boolean }>`
  overflow: hidden;
  margin: 0 0 0 10px;
  width: ${(props) => (props.progress ? '100%' : '80%')};
`;

export const PopconfirmOnRemove = styled(Popconfirm)`
  .ant-popover-buttons {
    .ant-btn-sm {
      &:first-of-type {
        padding-left: 6px;
      }
    }
  }
`;
export const FileWeight = styled.div`
  color: var(--ds-color-text-neutral-default);
  padding-right: 30px;
  font-weight: normal;
  font-size: 13px;
`;
export const FileName = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 0;
`;
export const Name = styled(Label)`
  && {
    color: var(--ds-color-text-base-muted);
    max-width: 100%;
    cursor: initial;
    white-space: nowrap;
    display: flex;
    justify-content: space-between;
  }
`;

export const FlexRow = styled.div`
  display: flex;
`;

export const SizeOrError = styled(Text)`
  && {
    color: var(--ds-color-text-base-muted);
  }
`;
export const RemoveWrapper = styled.div`
  display: flex;
  background-color: transparent;
  z-index: 10;
  border: 0;
  padding: 0;
  margin: 0;
  height: 16px;
  width: 16px;
  position: absolute;
  top: 14px;
  right: 10px;
  cursor: pointer;

  ${IconContainer} {
    position: absolute;
    right: -2px;
    top: -2px;
    transition: color 0.3s;
    color: var(--ds-color-icon-base-muted);

    &:hover {
      color: var(--ds-color-icon-danger-default);
    }
  }
`;
export const CheckButtonWrapper = styled.div`
  display: flex;
  background-color: transparent;
  z-index: 10;
  margin: 0;
  height: 16px;
  width: 16px;
  position: absolute;
  top: 14px;
  right: 10px;
  cursor: pointer;

  ${IconContainer} {
    position: absolute;
    right: -2px;
    top: -2px;
    color: var(--ds-color-icon-success-default);
  }
`;
export const RemoveButtonWrapper = styled.div<{ pressed?: boolean }>`
  display: ${(props) => (props.pressed ? 'flex' : 'none')};
  background-color: transparent;
  z-index: 10;
  border: 0;
  padding: 0;
  margin: 0;
  height: 16px;
  width: 16px;
  position: absolute;
  top: 14px;
  right: 10px;
  cursor: pointer;
  overflow: ${(props) => (props.pressed ? 'visible' : 'hidden')};

  ${IconContainer} {
    position: absolute;
    right: -2px;
    top: -2px;
    color: var(--ds-color-icon-danger-default);
  }
`;

export const FileViewContainer = styled.button<{
  disabled?: boolean;
  error?: boolean;
  removable?: boolean;
  success?: boolean;
  progress?: boolean;
  pressed?: boolean;
}>`
  background-color: var(--ds-color-background-base-default);
  border-radius: 3px;
  border: 1px solid var(--ds-color-border-base-default);
  display: flex;
  align-items: center;
  padding: 12px 6px;
  height: 48px;
  width: 100%;
  text-align: left;
  line-height: initial;
  position: relative;
  margin: 0 0 12px;

  &:last-of-type {
    margin: 0;
  }

  &:hover {
    border-color: var(--ds-color-border-base-strong);

    ${(props) =>
      props.removable &&
      !props.disabled &&
      `
      ${RemoveButtonWrapper} {
        display: block;
      }
    `}
  }
  &:hover {
    ${(props) =>
      !props.disabled &&
      `
      ${CheckButtonWrapper} {
        display: none;
      }
    `}
  }

  &:focus {
    border-color: var(--ds-color-border-brand-default);
    background-color: var(--ds-color-background-base-subtle);
    ${(props) =>
      props.pressed &&
      `
      ${CheckButtonWrapper} {
        display: none;
      }
    `}
  }
  &:hover {
    background-color: var(--ds-color-background-base-subtle);
  }

  &:active {
    border-color: var(--ds-color-border-base-strong);
    background-color: var(--ds-color-background-base-muted);
  }

  ${(props) =>
    props.disabled &&
    `
    background-color: var(--ds-color-background-base-subtle);
    opacity: 0.4;
  `};

  ${(props) =>
    props.error &&
    !props.progress &&
    `
    && {
      border: 1px solid var(--ds-color-border-danger-default);

      ${SizeOrError} {
        color: var(--ds-color-text-danger-default);
      }
    }
  `};

  .ant-progress-line {
    margin: 8px 0 0 !important;
    width: 93%;
  }
`;
