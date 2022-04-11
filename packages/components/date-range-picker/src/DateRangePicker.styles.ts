import styled from 'styled-components';
import { Popover } from 'antd';
import { AdditionalMapper } from './DateRangePicker.types';

export const Container = styled.div`
  width: 636px;
  background-color: ${(props): string => props.theme.palette.white};
  user-select: none;
  margin: -16px;
`;

export const Separator = styled.div`
  margin: 0;
  border-top: 1px solid ${(props): string => props.theme.palette['grey-200']};
`;
export const PopoverWrapper = styled(Popover)``;

export const Addon = styled.div<{ last?: boolean }>`
  ${(props): string | false => !props.last && `border-bottom: 1px solid ${props.theme.palette['grey-200']};`}
`;

export const PickerWrapper = styled.div<{
  arrowColor?: AdditionalMapper;
}>`
  position: relative;
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
