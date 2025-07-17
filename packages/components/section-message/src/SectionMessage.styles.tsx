import type { ReactNode } from 'react';
import styled from 'styled-components';

import { type ColorType, type CustomColorType } from './SectionMessage.types';

export const AlertContent = styled.div<{ withLink?: ReactNode }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: ${(props) => (props.withLink ? '12px 0 11px' : '12px 0')};
`;
export const AllContent = styled.div`
  display: flex;
  color: inherit;
`;
export const Text = styled.div`
  display: flex;
`;
export const IconWrapper = styled.div<{
  color?: ColorType;
  customColorIcon?: CustomColorType;
}>`
  margin: 10px 12px;
  display: flex;
  color: ${(props) =>
    props.customColorIcon
      ? props.theme.palette[`${props.customColorIcon}-600`]
      : props.theme.palette[`${props.color}-600`]};
`;
export const IconCloseWrapper = styled.div`
  margin: 3px 5px 2px;
  cursor: pointer;
  color: ${(props) => props.theme.palette['grey-700']};
`;
export const ButtonWrapper = styled.div`
  padding: 6px 8px 0 8px;
  display: flex;
`;

export const SuffixWrapper = styled.div`
  display: flex;
`;

export const Container = styled.div<{
  color?: ColorType;
  customColor?: CustomColorType;
}>`
  width: 100%;
  align-items: center;
  justify-content: center;
  background-color: ${(props) =>
    props.customColor
      ? props.theme.palette[`${props.customColor}-050`]
      : props.theme.palette[`${props.color}-050`]};
  border: 1px solid
    ${(props) =>
      props.customColor
        ? props.theme.palette[`${props.customColor}-200`]
        : props.theme.palette[`${props.color}-200`]};
  border-top: 2px solid
    ${(props) =>
      props.customColor
        ? props.theme.palette[`${props.customColor}-600`]
        : props.theme.palette[`${props.color}-600`]};
  border-radius: 2px;
`;
export const WrapperSectionMessage = styled.div`
  display: flex;
  font-size: 13px;
  color: inherit;
  justify-content: space-between;
`;

export const AlertMessage = styled.span`
  font-size: 13px;
  line-height: 1.39;
  font-weight: 500;
  max-width: 400px;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${(props) => props.theme.palette['grey-700']};
`;

export const AlertDescription = styled.span`
  display: flex;
  font-size: 13px;
  line-height: 1.39;
  font-weight: normal;
  padding-right: 3px;
  margin-top: 2px;
  color: ${(props) => props.theme.palette['grey-700']};
`;
export const EmphasisWrapper = styled.span`
  display: flex;
  font-size: 13px;
  line-height: 1.39;
  font-weight: 500;
  margin-top: 2px;
  color: inherit;
`;
export const LinkWrapper = styled.span`
  display: flex;
  font-size: 13px;
  line-height: 1.5;
  font-weight: 400;
  margin-top: 2px;
  color: inherit;
  text-decoration: underline;
  cursor: pointer;
  a {
    color: inherit;
  }
`;

export const AlertShowMore = styled.span`
  display: flex;
  font-size: 13px;
  font-weight: 500;
  color: inherit;
  text-decoration: underline;
  cursor: pointer;
  margin-top: 6px;
`;
