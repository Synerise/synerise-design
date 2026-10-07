import styled, { keyframes } from 'styled-components';

import { IconContainer } from '@synerise/ds-icon';
import { Loader } from '@synerise/ds-loader/dist/Loader.styles';
import { Description, Label } from '@synerise/ds-typography';
import { resolveCustomColor } from '@synerise/ds-utils';

export const PreviewImage = styled.div`
  ${IconContainer} {
    color: var(--ds-color-text-base-subtle);
  }
`;
export const RepeatIcon = styled.div`
  ${IconContainer} {
    color: var(--ds-color-icon-brand-default);
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
  border: 1px solid ${(props) =>
    resolveCustomColor(props.color, 'var(--ds-color-icon-neutral-default)')};
  border-top: 2px solid transparent;
  border-radius: 50%;
  animation: ${spinnerAnimation} 2s linear infinite;
`;

export const PreviewThumbnail = styled.img`
  /* Matches this variant's 24px glyph: the row is a fixed 32px with 7px padding, so a 32px
     thumbnail would overflow it. */
  width: 24px;
  height: 24px;
  border-radius: 3px;
  object-fit: contain;
  background-color: var(--ds-color-background-base-mutedhover);
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
  color: var(--ds-color-text-neutral-default);
`;

export const Name = styled(Label)`
  && {
    color: var(--ds-color-text-base-muted);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 260px;
    cursor: initial;
  }
`;

export const RemoveButtonWrapper = styled.div<{ pressed?: boolean }>`
  display: ${(props) => (props.pressed ? 'flex' : 'none')};
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
  overflow: ${(props) => (props.pressed ? 'visible' : 'hidden')};

  ${IconContainer} {
    position: absolute;
    right: -2px;
    top: -2px;
    color: var(--ds-color-icon-danger-default);
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
    color: var(--ds-color-icon-danger-default);
  }
`;
export const AvatarContainer = styled.div<{
  source: string;
  disabled?: boolean;
  removable?: boolean;
}>`
  background: url('${(props) => props.source}') 50% 50% no-repeat;
  background-size: cover;
  min-width: 80px;
  min-height: 80px;
  width: 80px;
  height: 80px;
  border-radius: 3px;
  overflow: visible;
  margin-right: 14px;
  ${(props) =>
    props.disabled &&
    `
    background-color: var(--ds-color-background-base-muted);
    opacity: 0.4;
  `};

  &:hover {
    ${RemoveWrapper} {
      display: flex;
      overflow: visible;
    }
  }
`;

export const FileView = styled.button<{
  disabled?: boolean;
  error?: boolean;
  removable?: boolean;
  progress?: boolean;
}>`
  background-color: var(--ds-color-background-base-muted);
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
    border-color: var(--ds-color-border-base-default);
    padding-right: ${(props) => (props.removable ? '30px' : '12px')};
    ${Name} {
      color: var(--ds-color-text-brand-default);
    }
    ${PreviewImage} {
      ${IconContainer} {
        color: var(--ds-color-icon-brand-default);
      }
    }

    ${(props) =>
      props.removable &&
      !props.disabled &&
      `
      ${RemoveButtonWrapper} {
        display: block;
      }
    `}
  }

  &:focus {
    border-color: var(--ds-color-border-brand-default);
    background-color: var(--ds-color-background-base-muted);
  }
  &:hover {
    background-color: var(--ds-color-background-base-mutedhover);
  }

  &:active {
    border-color: var(--ds-color-border-base-strong);
    background-color: var(--ds-color-background-base-mutedhover);
    ${Name} {
      color: var(--ds-color-text-brand-default);
    }
    ${PreviewImage} {
      ${IconContainer} {
        color: var(--ds-color-icon-brand-default);
      }
    }
  }

  ${(props) =>
    props.disabled &&
    `
    background-color: var(--ds-color-background-base-muted);
    opacity: 0.4;
  `};

  ${(props) =>
    props.error &&
    `
    && {
      padding-right: 7px;
      border: 1px solid var(--ds-color-border-danger-default);
      background-color: var(--ds-color-background-base-subtle);
      ${Name} {
        padding-right: 4px;
      }
    }
  `};
  ${(props) =>
    props.progress &&
    `
    && {
      padding-right: 7px;
    }
  `};
`;
