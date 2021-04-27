import styled, { SimpleInterpolation } from 'styled-components';
import Typography, { Label } from '@synerise/ds-typography';
import { IconContainer } from '@synerise/ds-icon/dist/Icon.styles';

export const PreviewImage = styled.div<{ source: string }>`
  background: url('${(props): string => props.source}') 50% 50% no-repeat;
  background-size: cover;
  min-width: 32px;
  min-height: 32px;
  width: 32px;
  height: 32px;
  border-radius: 3px;
  overflow: hidden;
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

export const Info = styled.div`
  overflow: hidden;
  margin: 0 0 0 10px;
  width: 100%;
`;
export const FileWeight = styled.div`
  color: ${(props): string => props.theme.palette['grey-500']};
  padding-right: 30px;
  font-weight: normal;
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

export const RemoveButtonWrapper = styled.div<{ pressed?: boolean }>`
  display: ${(props): string => (props.pressed ? 'flex' : 'none')};
  background-color: #fff;
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
export const RemoveWrapper = styled.div`
  display: flex;
  background-color: #fff;
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
  background-color: #fff;
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

export const FileViewContainer = styled.button<{ disabled?: boolean; error?: boolean; removable?: boolean }>`
  background-color: ${(props): string => props.theme.palette.white};
  border-radius: 3px;
  border: 1px solid ${(props): string => props.theme.palette['grey-200']};
  display: flex;
  align-items: center;
  padding: 7px;
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

  &:focus {
    border-color: ${(props): string => props.theme.palette['blue-500']};
    background-color: ${(props): string => props.theme.palette['grey-100']};
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
