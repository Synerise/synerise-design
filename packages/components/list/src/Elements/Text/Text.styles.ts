import styled, { type SimpleInterpolation, css } from 'styled-components';

type WrapperProps = {
  disabled?: boolean;
  danger?: boolean;
  icon?: JSX.Element;
  size?: ListItemType;
};
type ContentWrapperProps = {
  icon?: JSX.Element;
};

export type ListItemType = 'small' | 'medium';

export const IconWrapper = styled.div``;

export const Wrapper = styled.li<WrapperProps>`
  color: ${(props: WrapperProps): string => {
    if (props.danger) {
      return 'var(--ds-color-text-danger-default)';
    }

    if (props.disabled) {
      return 'var(--ds-color-text-base-subtle)';
    }

    return 'var(--ds-color-text-base-subtle)';
  }};
  opacity: ${(props): string => (props.disabled ? '0.4' : '1')};
  cursor: ${(props): string => (props.disabled ? 'not-allowed' : 'pointer')};
  font-weight: 500;
  border-radius: 3px;
  display: flex;
  align-items: center;
  ${(props): SimpleInterpolation =>
    props.size === 'small' &&
    css`
      padding: 5px 12px 4px 7px;
    `}
  ${(props): SimpleInterpolation =>
    props.size === 'medium' &&
    css`
      padding: 12px;
      padding-left: ${props.icon ? '12px' : '16px'};
    `}
  ${IconWrapper} {
    svg {
      ${(props): string | false =>
        !props.disabled &&
        `
        fill: ${
          props.danger
            ? 'var(--ds-color-icon-danger-default)'
            : 'var(--ds-color-icon-base-default)'
        };
      `}
    }
  }
  &:hover {
    ${(props): string | false =>
      !props.disabled &&
      `
      ${IconWrapper} {
        svg {
          fill: ${
            props.danger
              ? 'var(--ds-color-icon-danger-default)'
              : 'var(--ds-color-icon-brand-default)'
          };
        }
      }
      color: ${
        props.danger
          ? 'var(--ds-color-text-danger-default)'
          : 'var(--ds-color-text-brand-default)'
      };
      background: ${
        props.danger
          ? 'var(--ds-color-background-danger-subtle)'
          : 'var(--ds-color-background-base-subtle)'
      };
    `}
    span {
      color: var(--ds-color-text-brand-default);
    }
  }

  &:focus {
    box-shadow: inset 0 0 0 2px var(--ds-color-border-brand-default);
  }
`;

export const ContentWrapper = styled.div<ContentWrapperProps>`
  overflow: hidden;
  overflow-wrap: normal;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 14px;
  padding-left: ${(props): string => (props.icon ? '12px' : '0')};
`;

export const ActionWraper = styled.div`
  flex: 1;
`;
