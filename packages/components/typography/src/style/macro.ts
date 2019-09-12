import { css } from 'styled-components';

export const heading = css`
  font-weight: 500;
  color: ${(props): string => props.theme.palette['grey-800']};
`;

export const regular = css`
  font-weight: 400;
`;

export const h700 = css`
  ${heading};
  font-size: 24px;
`;

export const h600 = css`
  ${heading};
  font-size: 21px;
`;

export const h500 = css`
  ${heading};
  font-size: 18px;
`;

export const h400 = css`
  ${heading};
  font-size: 16px;
`;

export const h300 = css`
  ${heading};
  font-size: 14px;
`;

export const h200 = css`
  ${heading};
  font-size: 13px;
`;

export const h100 = css`
  ${heading};
  font-size: 10px;
`;

export const medium = css`
  ${regular};
  font-size: 14px;
`;

export const small = css`
  ${regular};
  font-size: 13px;
`;

export const xsmall = css`
  ${regular};
  font-size: 11px;
`;

export const link = css`
  font-size: 13px;
  font-weight: 500;
  transition: 0.2s ease-in-out;
  color: ${(props): string => props.theme.palette['blue-600']};
  &:hover {
    text-decoration: underline;
    color: ${(props): string => props.theme.palette['blue-500']};
  }
`;

export const linkbutton = css`
  ${link};
  color: ${(props): string => props.theme.palette['grey-600']};
  &:hover {
    color: ${(props): string => props.theme.palette['grey-800']};
  }
`;

export const tag = css`
  font-size: 11px;
`;

export const tooltip = css`
  font-size: 11px;
`;
