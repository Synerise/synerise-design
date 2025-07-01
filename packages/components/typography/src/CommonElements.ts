import styled, {
  type FlattenInterpolation,
  type ThemeProps,
  css,
} from 'styled-components';

import {
  h100,
  h200,
  h300,
  h400,
  h500,
  h600,
  h700,
  medium,
  small,
  xsmall,
} from './style/macro-utils';

export const Description = styled.div<{ disabled?: boolean }>`
  color: ${(props): string => props.theme.palette['grey-600']};
  ${(props): string => (props.disabled ? `opacity: 0.4;` : '')}
`;

export const ErrorText = styled.div`
  color: ${(props): string => props.theme.palette['red-600']};
  margin-bottom: 4px;
`;

export const Label = styled.label`
  color: ${(props): string => props.theme.palette['grey-800']};
  font-weight: 500;
  display: block;
  cursor: pointer;
`;

export const MediumText = styled.span`
  ${(): FlattenInterpolation<ThemeProps<unknown>> => css`
    ${medium};
  `}
`;

export const SmallText = styled.span`
  ${(): FlattenInterpolation<ThemeProps<unknown>> => css`
    ${small};
  `}
`;

export const XSmallText = styled.span`
  ${(): FlattenInterpolation<ThemeProps<unknown>> => css`
    ${xsmall};
  `}
`;

export const MediumParagraph = styled.span`
  ${(): FlattenInterpolation<ThemeProps<unknown>> => css`
    ${medium};
  `}
`;

export const SmallParagraph = styled.span`
  ${(): FlattenInterpolation<ThemeProps<unknown>> => css`
    ${small};
  `}
`;

export const XSmallParagraph = styled.span`
  ${(): FlattenInterpolation<ThemeProps<unknown>> => css`
    ${xsmall};
  `}
`;

export const H1 = styled.h1<{ withoutMargin: boolean }>`
  ${(): FlattenInterpolation<ThemeProps<unknown>> => css`
    ${h700};
  `}
  ${(props): FlattenInterpolation<ThemeProps<unknown>> | false =>
    props.withoutMargin &&
    css`
      margin-bottom: 0;
    `}
`;

export const H2 = styled.h2<{ withoutMargin: boolean }>`
  ${(): FlattenInterpolation<ThemeProps<unknown>> => css`
    ${h600};
  `}
  ${(props): FlattenInterpolation<ThemeProps<unknown>> | false =>
    props.withoutMargin &&
    css`
      margin-bottom: 0;
    `}
`;

export const H3 = styled.h3<{ withoutMargin: boolean }>`
  ${(): FlattenInterpolation<ThemeProps<unknown>> => css`
    ${h500};
  `}
  ${(props): FlattenInterpolation<ThemeProps<unknown>> | false =>
    props.withoutMargin &&
    css`
      margin-bottom: 0;
    `}
`;

export const H4 = styled.h4<{ withoutMargin: boolean }>`
  ${(): FlattenInterpolation<ThemeProps<unknown>> => css`
    ${h400};
  `}
  ${(props): FlattenInterpolation<ThemeProps<unknown>> | false =>
    props.withoutMargin &&
    css`
      margin-bottom: 0;
    `}
`;

export const H5 = styled.h5<{ withoutMargin: boolean }>`
  ${(): FlattenInterpolation<ThemeProps<unknown>> => css`
    ${h300};
  `}
  ${(props): FlattenInterpolation<ThemeProps<unknown>> | false =>
    props.withoutMargin &&
    css`
      margin-bottom: 0;
    `}
`;

export const H6 = styled.h6<{ withoutMargin: boolean }>`
  ${(): FlattenInterpolation<ThemeProps<unknown>> => css`
    ${h200};
  `}
  ${(props): FlattenInterpolation<ThemeProps<unknown>> | false =>
    props.withoutMargin &&
    css`
      margin-bottom: 0;
    `}
`;

export const H7 = styled.h6<{ withoutMargin: boolean }>`
  ${(): FlattenInterpolation<ThemeProps<unknown>> => css`
    ${h100};
  `}
  ${(props): FlattenInterpolation<ThemeProps<unknown>> | false =>
    props.withoutMargin &&
    css`
      margin-bottom: 0;
    `}
`;
export const EllipsisText = styled.div`
  display: block;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 100%;
  overflow: hidden;
  ${H1}, ${H2}, ${H3}, ${H4}, ${H5}, ${H6}, ${H7} {
    display: inline;
  }
  ${MediumText},
  ${SmallText},
  ${XSmallText} {
    font-size: inherit;
    color: inherit;
    line-height: inherit;
    font-weight: inherit;
  }
`;
