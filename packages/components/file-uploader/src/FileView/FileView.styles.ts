import styled, { SimpleInterpolation } from 'styled-components';
import Typography, { Label } from '@synerise/ds-typography';
import { IconContainer } from '@synerise/ds-icon/dist/Icon.styles';
import Popconfirm from '@synerise/ds-popconfirm';

export const PreviewImage = styled.div`
  ${IconContainer} {
    fill: ${(props): string => props.theme.palette['grey-700']};
  }
  margin: -4px -8px -4px -4px;
`;

export const PlaceholderImage = styled.div`
  background-color: ${(props): string => props.theme.palette['grey-200']};
  width: 32px;
  height: 32px;
  border-radius: 3px;
  padding: 4px;

  ${IconContainer} {
    fill: ${(props): string => props.theme.palette['grey-500']};
  }
`;

export const Info = styled.div<{ progress: boolean }>`
  overflow: hidden;
  margin: 0 0 0 10px;
  width: ${(props): string => (props.progress ? '100%' : '80%')};
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
  color: ${(props): string => props.theme.palette['grey-500']};
  padding-right: 30px;
  font-weight: normal;
  font-size: 13px;
`;

export const Name = styled(Label)`
  && {
    color: ${(props): string => props.theme.palette['grey-600']};
    display: flex;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
    cursor: initial;
    justify-content: space-between;
  }
`;

export const SizeOrError = styled(Typography.Text)`
  && {
    color: ${(props): string => props.theme.palette['grey-600']};
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
    transition: fill 0.3s;
    fill: ${(props): string => props.theme.palette['grey-300']};

    &:hover {
      fill: ${(props): string => props.theme.palette['red-500']};
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
    transition: fill 0.3s;
    fill: ${(props): string => props.theme.palette['green-600']};
    &:hover {
      fill: ${(props): string => props.theme.palette['green-500']};
    }
  }
`;
export const RemoveButtonWrapper = styled.div<{ pressed?: boolean }>`
  display: ${(props): string => (props.pressed ? 'flex' : 'none')};
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
  overflow: ${(props): string => (props.pressed ? 'visible' : 'hidden')};

  ${IconContainer} {
    position: absolute;
    right: -2px;
    top: -2px;
    transition: fill 0.3s;
    fill: ${(props): string => props.theme.palette['red-600']};

    &:hover {
      fill: ${(props): string => props.theme.palette['red-500']};
    }
  }
`;

export const FileViewContainer = styled.button<{
  disabled?: boolean;
  error?: boolean;
  removable?: boolean;
  success?: boolean;
  progress?: boolean;
}>`
  background-color: ${(props): string => props.theme.palette.white};
  border-radius: 3px;
  border: 1px solid ${(props): string => props.theme.palette['grey-200']};
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
    border-color: ${(props): string => props.theme.palette['grey-300']};

    ${(props): SimpleInterpolation =>
      props.removable &&
      !props.disabled &&
      `
      ${RemoveButtonWrapper} {
        display: block;
      }
    `}
  }
  &:hover {
    ${(props): SimpleInterpolation =>
      !props.disabled &&
      `
      ${CheckButtonWrapper} {
        display: none;
      }
    `}
  }

  &:focus {
    border-color: ${(props): string => props.theme.palette['blue-500']};
    background-color: ${(props): string => props.theme.palette['grey-050']};
  }
  &:hover {
    background-color: ${(props): string => props.theme.palette['grey-050']};
  }

  &:active {
    border-color: ${(props): string => props.theme.palette['grey-300']};
    background-color: ${(props): string => props.theme.palette['grey-100']};
  }

  ${(props): SimpleInterpolation =>
    props.disabled &&
    `
    background-color: ${props.theme.palette['grey-050']};
    opacity: 0.4;
  `};

  ${(props): SimpleInterpolation =>
    props.error &&
    !props.progress &&
    `
    && {
      border: 1px solid ${props.theme.palette['red-600']};

      ${SizeOrError} {
        color: ${props.theme.palette['red-600']};
      }
    }
  `};

  .ant-progress-line {
    margin: 8px 0 0 !important;
    width: 93%;
  }
`;
