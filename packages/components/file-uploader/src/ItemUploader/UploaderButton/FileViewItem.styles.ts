import styled, { keyframes, SimpleInterpolation } from 'styled-components';
import { Label } from '@synerise/ds-typography';
import { IconContainer } from '@synerise/ds-icon';
import { Loader } from '@synerise/ds-loader/dist/Loader.styles';

export const PreviewImage = styled.div`
  ${IconContainer} {
    display: flex;
    fill: ${(props): string => props.theme.palette['grey-700']};
  }
`;
export const RepeatIcon = styled.div`
  ${IconContainer} {
    fill: ${(props): string => props.theme.palette['blue-600']};
  }
  &:hover {
    cursor: pointer;
  }
`;
export const LoaderIcon = styled.div`
  padding-left: 10px;
`;
export const spinnerAnimation = keyframes`

  0% {
     transform: rotate(0deg);
  }
  100% {
     transform: rotate(720deg);
  }
`;
export const SmallLoader = styled(Loader)`
  border: 1px solid ${(props): string => props.theme.palette[`${props.color}-600`]};
  border-top: 2px solid transparent;
  border-radius: 50%;
  animation: ${spinnerAnimation} 2s linear infinite;
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
export const FileViewContainer = styled.div`
  padding-bottom: 8px;
`;

export const Info = styled.div`
  overflow: hidden;
  margin: 0 0 0 4px;
  width: 100%;
`;

export const Name = styled(Label)`
  && {
    color: ${(props): string => props.theme.palette['grey-600']};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 260px;
    cursor: initial;
  }
`;

export const RemoveButtonWrapper = styled.div<{ pressed?: boolean }>`
  display: ${(props): string => (props.pressed ? 'flex' : 'none')};
  background-color: transparent;
  z-index: 10;
  border: 0;
  padding: 0;
  margin: 0 4px 0 0;
  height: 16px;
  width: 16px;
  position: absolute;
  top: 8px;
  right: 5px;
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

export const FileView = styled.button<{ disabled?: boolean; error?: boolean; removable?: boolean; progress?: boolean }>`
  background-color: ${(props): string => props.theme.palette['grey-100']};
  border-radius: 3px;
  border: 2px solid transparent;
  display: flex;
  align-items: center;
  padding: 7px 12px 7px 6px;
  height: 32px;
  text-align: left;
  line-height: initial;
  position: relative;
  margin: 0 0 12px;

  &:last-of-type {
    margin: 0;
  }

  &:hover {
    border-color: ${(props): string => props.theme.palette['grey-200']};
    padding-right: ${(props): string => (props.removable ? '30px' : '12px')};
    ${Name} {
      color: ${(props): string => props.theme.palette['blue-600']};
    }
    ${PreviewImage} {
      ${IconContainer} {
        fill: ${(props): string => props.theme.palette['blue-600']};
      }
    }

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
    border-color: ${(props): string => props.theme.palette['blue-600']};
    background-color: ${(props): string => props.theme.palette['grey-100']};
  }
  &:hover {
    background-color: ${(props): string => props.theme.palette['grey-200']};
  }

  &:active {
    border-color: ${(props): string => props.theme.palette['grey-300']};
    background-color: ${(props): string => props.theme.palette['grey-300']};
    ${Name} {
      color: ${(props): string => props.theme.palette['blue-600']};
    }
    ${PreviewImage} {
      ${IconContainer} {
        fill: ${(props): string => props.theme.palette['blue-600']};
      }
    }
  }

  ${(props): SimpleInterpolation =>
    props.disabled &&
    `
    background-color: ${props.theme.palette['grey-100']};
    opacity: 0.4;
  `};

  ${(props): SimpleInterpolation =>
    props.error &&
    `
    && {
      padding-right: 7px;
      border: 1px solid ${props.theme.palette['red-600']};
      background-color: ${props.theme.palette['grey-050']};
      ${Name} {
        padding-right: 4px;
      }
    }
  `};
  ${(props): SimpleInterpolation =>
    props.progress &&
    `
    && {
      padding-right: 7px;
    }
  `};
`;
