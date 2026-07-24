import type { ReactNode } from 'react';
import styled from 'styled-components';

import { resolveCustomColor } from '@synerise/ds-utils';

import { type CustomColorType, type SectionType } from './SectionMessage.types';
import {
  getColorBackground,
  getColorBorder,
  getColorBorderTop,
  getColorIconAndBorderTop,
  getColorTextDescription,
  getColorTextHeader,
} from './SectionMessage.utils';

export const AlertContent = styled.div<{ withLink?: ReactNode }>`
  display: flex;
  min-width: 0;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: ${(props) => (props.withLink ? '12px 0 11px' : '12px 0')};
`;
export const AllContent = styled.div`
  display: flex;
  min-width: 0;
  color: inherit;
`;
export const Text = styled.div`
  display: flex;
  min-width: 0;
  width: 100%;
`;
export const IconWrapper = styled.div<{
  type: SectionType;
  customColorIcon?: CustomColorType;
}>`
  margin: 10px 12px;
  display: flex;
  color: ${(props) =>
    props.customColorIcon
      ? resolveCustomColor(
          props.customColorIcon,
          getColorIconAndBorderTop(props.type),
          { defaultShade: '600' },
        )
      : getColorIconAndBorderTop(props.type)};
`;
export const IconCloseWrapper = styled.div`
  margin: 3px 5px 2px;
  cursor: pointer;
`;
export const ButtonWrapper = styled.div`
  padding: 6px 8px 0 8px;
  display: flex;
`;

export const SuffixWrapper = styled.div`
  display: flex;
`;

export const Container = styled.div<{
  type: SectionType;
  customColor?: CustomColorType;
}>`
  width: 100%;
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: ${(props) =>
    props.customColor
      ? resolveCustomColor(props.customColor, getColorBackground(props.type), {
          defaultShade: '50',
        })
      : getColorBackground(props.type)};
  border: 1px solid
    ${(props) =>
      props.customColor
        ? resolveCustomColor(props.customColor, getColorBorder(props.type), {
            defaultShade: '200',
          })
        : getColorBorder(props.type)};
  border-radius: 3px;

  &::after {
    content: '';
    position: absolute;
    top: -1px;
    left: -1px;
    right: -1px;
    height: 2px;
    border-radius: 3px 3px 0 0;
    background-color: ${(props) =>
      props.customColor
        ? resolveCustomColor(props.customColor, getColorBorderTop(props.type), {
            defaultShade: '600',
          })
        : getColorBorderTop(props.type)};
  }
`;
export const WrapperSectionMessage = styled.div`
  display: flex;
  font-size: 13px;
  color: inherit;
  justify-content: space-between;
`;

export const AlertMessage = styled.span<{ type: SectionType }>`
  font-size: 13px;
  line-height: 1.39;
  font-weight: 500;
  overflow-wrap: break-word;
  min-width: 0;
  width: 100%;
  color: ${(props) => getColorTextHeader(props.type)};
`;

export const AlertDescription = styled.span<{ type: SectionType }>`
  overflow-wrap: break-word;
  min-width: 0;
  font-size: 13px;
  line-height: 1.39;
  font-weight: normal;
  padding-right: 3px;
  margin-top: 2px;
  color: ${(props) => getColorTextDescription(props.type)};
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

export const NumberWrapper = styled.div`
  margin-left: 4px;
  color: var(--ds-color-text-base-disabled);
  cursor: pointer;
  &:hover {
    background-image: linear-gradient(
      to right,
      var(--ds-color-text-base-disabled) 20%,
      rgba(255, 255, 255, 0) 10%
    );
    background-color: transparent;
    background-position: bottom left;
    background-size: 5px 1px;
    background-repeat: repeat-x;
    color: var(--ds-color-text-base-subtle);
  }
`;
export const IconOrderWrapper = styled.div`
  display: none;
  margin: -4px 0;
`;
export const OrderWrapper = styled.div`
  display: flex;
  &:hover {
    ${IconOrderWrapper} {
      display: block;
    }
    ${NumberWrapper} {
      background-image: linear-gradient(
        to right,
        var(--ds-color-text-base-disabled) 20%,
        rgba(255, 255, 255, 0) 10%
      );
      background-color: transparent;
      background-position: bottom left;
      background-size: 5px 1px;
      background-repeat: repeat-x;
      color: var(--ds-color-text-base-subtle);
    }
  }
`;
export const Wrapper = styled.div`
  margin-top: 10px;
  color: var(--ds-color-text-base-subtle);
`;
