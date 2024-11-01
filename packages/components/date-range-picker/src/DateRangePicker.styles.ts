import styled from 'styled-components';

import { AdditionalMapper } from './DateRangePicker.types';

const getHeight = (hasFilter?: boolean, hasRelativePicker?: boolean) => {
  let baseHeight = 509;
  if (hasFilter) {
    baseHeight += 127;
  }
  if (hasRelativePicker) {
    baseHeight += 170;
  }
  return baseHeight;
};

export const PopupWrapper = styled.div<{
  hasFilter?: boolean;
  hasRelativePicker?: boolean;
  alignContentToTop?: boolean;
}>`
  height: ${props => getHeight(props.hasFilter, props.hasRelativePicker)}px;
  display: flex;
  flex-direction: row;
  align-items: ${props => (props.alignContentToTop ? 'flex-end' : 'flex-start')};
`;
export const Container = styled.div`
  width: 636px;
  background-color: ${(props): string => props.theme.palette.white};
  user-select: none;
  box-shadow: 0 16px 32px 0 ${(props): string => `${props.theme.palette['grey-900']}1a`};
`;

export const Separator = styled.div`
  margin: 0;
  border-top: 1px solid ${(props): string => props.theme.palette['grey-200']};
`;

export const Addon = styled.div<{ last?: boolean }>`
  ${(props): string | false => !props.last && `border-bottom: 1px solid ${props.theme.palette['grey-200']};`}
`;

export const PickerWrapper = styled.div<{
  arrowColor?: AdditionalMapper;
}>`
  .ant-popover.ds-date-range-popover > .ant-popover-content {
    margin: -5px 0;
  }
  .ant-dropdown.ds-date-range-popover > .ant-popover-arrow.ant-popover-arrow.ant-popover-arrow.ant-popover-arrow {
    display: none !important;
  }
  .ant-dropdown.ds-date-range-popover > .ant-popover-content > .ant-popover-inner {
    background: transparent;
  }
  .ant-dropdown.ds-date-range-popover > .ant-popover-content > .ant-popover-inner > .ant-popover-inner-content {
    padding: 0;
  }
  .ant-dropdown.ds-date-range-popover .ds-date-range-picker {
    box-shadow: 0 16px 32px 0 rgba(35, 41, 54, 0.1);
    padding: 16px;
  }

  .ant-popover.ds-date-range-popover.ant-popover-placement-bottomLeft > .ant-popover-content > .ant-popover-arrow {
    background-color: ${(props): string =>
      props.arrowColor
        ? props.theme.palette[`${props.arrowColor?.bottomLeft}-050`] ?? props.arrowColor?.bottomLeft
        : props.theme.palette.white};
    border-style: none;
    border-width: 0;
  }

  .ant-popover.ds-date-range-popover.ant-popover-placement-bottomRight > .ant-popover-content > .ant-popover-arrow {
    background-color: ${(props): string =>
      props.arrowColor
        ? props.theme.palette[`${props.arrowColor?.bottomRight}-050`] ?? props.arrowColor?.bottomRight
        : props.theme.palette.white};
    border-style: none;
    border-width: 0;
  }
  .ant-popover.ds-date-range-popover.ant-popover-placement-rightTop > .ant-popover-content > .ant-popover-arrow {
    background-color: ${(props): string =>
      props.arrowColor
        ? props.theme.palette[`${props.arrowColor?.rightTop}-050`] ?? props.arrowColor?.rightTop
        : props.theme.palette.white};
    border-style: none;
    border-width: 0;
  }
  .ant-popover.ds-date-range-popover.ant-popover-placement-rightBottom > .ant-popover-content > .ant-popover-arrow {
    background-color: ${(props): string =>
      props.arrowColor
        ? props.theme.palette[`${props.arrowColor?.rightBottom}-050`] ?? props.arrowColor?.rightBottom
        : props.theme.palette.white};
    border-style: none;
    border-width: 0;
  }
  .ant-popover.ds-date-range-popover.ant-popover-placement-leftBottom > .ant-popover-content > .ant-popover-arrow {
    background-color: ${(props): string =>
      props.arrowColor
        ? props.theme.palette[`${props.arrowColor?.leftBottom}-050`] ?? props.arrowColor?.leftBottom
        : props.theme.palette.white};
    border-style: none;
    border-width: 0;
  }
  .ant-popover.ds-date-range-popover.ant-popover-placement-leftTop > .ant-popover-content > .ant-popover-arrow {
    background-color: ${(props): string =>
      props.arrowColor
        ? props.theme.palette[`${props.arrowColor?.leftTop}-050`] ?? props.arrowColor?.leftTop
        : props.theme.palette.white};
    border-style: none;
    border-width: 0;
  }
  .ant-popover.ds-date-range-popover.ant-popover-placement-topRight > .ant-popover-content > .ant-popover-arrow {
    background-color: ${(props): string =>
      props.arrowColor
        ? props.theme.palette[`${props.arrowColor?.topRight}-050`] ?? props.arrowColor?.topRight
        : props.theme.palette['grey-050']};
    border-style: none;
    border-width: 0;
  }
  .ant-popover.ds-date-range-popover.ant-popover-placement-topLeft > .ant-popover-content > .ant-popover-arrow {
    background-color: ${(props): string =>
      props.arrowColor
        ? props.theme.palette[`${props.arrowColor?.topLeft}-050`] ?? props.arrowColor?.topLeft
        : props.theme.palette['grey-050']};
    border-style: none;
    border-width: 0;
  }
`;

export const OverlayContainer = styled.div<{ visible?: boolean }>`
  display: ${(props): string => (props.visible ? 'flex' : 'none')};
`;
