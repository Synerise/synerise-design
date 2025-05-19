import styled, { keyframes } from 'styled-components';
import { Description, Label } from '@synerise/ds-typography';
import { IconContainer } from '@synerise/ds-icon';
import { Loader } from '@synerise/ds-loader/dist/Loader.styles';

export const PreviewImage = styled.div`
  ${IconContainer} {
    color: ${props => props.theme.palette['grey-700']};
  }
`;
export const RepeatIcon = styled.div`
  ${IconContainer} {
    color: ${props => props.theme.palette['blue-600']};
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
  border: 1px solid ${props => props.theme.palette[`${props.color}-600`]};
  border-top: 2px solid transparent;
  border-radius: 50%;
  animation: ${spinnerAnimation} 2s linear infinite;
`;

export const PlaceholderImage = styled.div`
  background-color: ${props => props.theme.palette['grey-200']};
  width: 32px;
  height: 32px;
  border-radius: 3px;
  padding: 4px;

  ${IconContainer} {
    color: ${props => props.theme.palette['grey-500']};
  }
`;

export const FileAvatarContainer = styled.div`
  display: flex;
`;
export const FileViewContainer = styled.div``;

export const Info = styled.div`
  overflow: hidden;
  margin: 0 0 0 4px;
  width: 100%;
`;
export const DescriptionUploader = styled(Description)`
  margin: 16px 0 8px 0;
  color: ${props => props.theme.palette['grey-500']};
`;

export const Name = styled(Label)`
  && {
    color: ${props => props.theme.palette['grey-600']};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 260px;
    cursor: initial;
  }
`;

export const RemoveButtonWrapper = styled.div<{ pressed?: boolean }>`
  display: ${props => (props.pressed ? 'flex' : 'none')};
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
  overflow: ${props => (props.pressed ? 'visible' : 'hidden')};

  ${IconContainer} {
    position: absolute;
    right: -2px;
    top: -2px;
    transition: fill 0.3s;
    color: ${props => props.theme.palette['red-600']};

    &:hover {
      color: ${props => props.theme.palette['red-500']};
    }
  }
`;
export const RemoveWrapper = styled.div<{ pressed?: boolean }>`
  z-index: 100;
  height: 0;
  width: 0;
  position: relative;
  bottom: 10px;
  left: 68px;
  cursor: pointer;
  overflow: hidden;

  ${IconContainer} {
    transition: fill 0.3s;
    color: ${props => props.theme.palette['red-600']};
    &:hover {
      color: ${props => props.theme.palette['red-600']};
    }
  }
`;
export const AvatarContainer = styled.div<{ source: string; disabled?: boolean; removable?: boolean }>`
  background: url('${props => props.source}') 50% 50% no-repeat;
  background-size: cover;
  min-width: 80px;
  min-height: 80px;
  width: 80px;
  height: 80px;
  border-radius: 3px;
  overflow: visible;
  margin-right: 14px;
  ${props =>
    props.disabled &&
    `
    background-color: ${props.theme.palette['grey-100']};
    opacity: 0.4;
  `};

  &:hover {
    ${RemoveWrapper} {
      display: flex;
      overflow: visible;
    }
  }
`;

export const FileView = styled.button<{ disabled?: boolean; error?: boolean; removable?: boolean; progress?: boolean }>`
  background-color: ${props => props.theme.palette['grey-100']};
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
    border-color: ${props => props.theme.palette['grey-200']};
    padding-right: ${props => (props.removable ? '30px' : '12px')};
    ${Name} {
      color: ${props => props.theme.palette['blue-600']};
    }
    ${PreviewImage} {
      ${IconContainer} {
        color: ${props => props.theme.palette['blue-600']};
      }
    }

    ${props =>
      props.removable &&
      !props.disabled &&
      `
      ${RemoveButtonWrapper} {
        display: block;
      }
    `}
  }

  &:focus {
    border-color: ${props => props.theme.palette['blue-600']};
    background-color: ${props => props.theme.palette['grey-100']};
  }
  &:hover {
    background-color: ${props => props.theme.palette['grey-200']};
  }

  &:active {
    border-color: ${props => props.theme.palette['grey-300']};
    background-color: ${props => props.theme.palette['grey-300']};
    ${Name} {
      color: ${props => props.theme.palette['blue-600']};
    }
    ${PreviewImage} {
      ${IconContainer} {
        color: ${props => props.theme.palette['blue-600']};
      }
    }
  }

  ${props =>
    props.disabled &&
    `
    background-color: ${props.theme.palette['grey-100']};
    opacity: 0.4;
  `};

  ${props =>
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
  ${props =>
    props.progress &&
    `
    && {
      padding-right: 7px;
    }
  `};
`;
