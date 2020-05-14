import styled from 'styled-components';
import * as React from 'react';
import Text from '../Item/Text/Text';

// eslint-disable-next-line @typescript-eslint/no-empty-function
const NOOP = (): void => {};

export const ArrowRight = styled.div<{ visible: boolean }>`
  transition: opacity 0.3s ease;
  opacity: ${(props): string => (props.visible ? '1' : '0')};
`;
export const BreadcrumbName = styled.div`
  font-weight: 400;
  background-image: linear-gradient(
    to right,
    ${(props): string => props.theme.palette['grey-100']},
    ${(props): string => props.theme.palette['grey-600']} 50%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  .search-highlight {
    font-weight: 500;
  }
`;

export const Breadcrumb = styled(({ children, disabled, ...rest }) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Text disabled={disabled} onItemHover={NOOP} onClick={NOOP} {...rest}>
    {children}
  </Text>
))`
  &:hover {
    ${ArrowRight} > .ds-icon > svg {
      fill: ${(props): string => (props.disabled ? props.theme.palette['grey-600'] : props.theme.palette['blue-600'])};
    }
    ${BreadcrumbName} {
      background-image: ${(props): string =>
        props.disabled
          ? `linear-gradient( to right,
    ${props.theme.palette['grey-100']},
    ${props.theme.palette['grey-600']} 50%
  )`
          : `linear-gradient(
    to right,
    ${props.theme.palette['blue-100']},
    ${props.theme.palette['blue-600']} 50%
  )`};
    }
  }
  &:focus:active {
    .route:first-child > .ds-breadcrumb-name,
    .route:last-child > .ds-breadcrumb-name {
      color: ${(props): string => (props.disabled ? props.theme.palette['grey-600'] : 'inherit')};
      background-image: unset;
      -webkit-background-clip: unset;
      -webkit-text-fill-color: unset;
    }
  }
`;

export const BreadcrumbRoute = styled.div`
  display: flex;
  padding-top:
  height: 18px;
`;

export const BreadcrumbContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  &&& {
    .route:first-child > .ds-breadcrumb-name,
    .route:last-child > .ds-breadcrumb-name {
      background-image: unset;
      -webkit-background-clip: unset;
      -webkit-text-fill-color: unset;
    }
  }
`;
