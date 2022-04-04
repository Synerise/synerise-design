import styled from 'styled-components';
import { Popover } from 'antd';

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
export const PickerWrapper = styled.div<{ arrowColor?: boolean }>`
  position: relative;
  .ant-popover.ds-date-range-popover.ant-popover-placement-bottomLeft > .ant-popover-content > .ant-popover-arrow {
    background-color: ${(props): string => props.theme.palette.white};
    border-style: none;
    border-width: 0;
  }
  .ant-popover.ds-date-range-popover.ant-popover-placement-bottomRight > .ant-popover-content > .ant-popover-arrow {
    background-color: ${(props): string => props.theme.palette.white};
    border-style: none;
    border-width: 0;
  }
  .ant-popover.ds-date-range-popover.ant-popover-placement-topRight > .ant-popover-content > .ant-popover-arrow {
    background-color: ${(props): string =>
      props.arrowColor ? props.theme.palette['grey-050'] : props.theme.palette.white};
    border-style: none;
    border-width: 0;
  }
  .ant-popover.ds-date-range-popover.ant-popover-placement-topLeft > .ant-popover-content > .ant-popover-arrow {
    background-color: ${(props): string =>
      props.arrowColor ? props.theme.palette['grey-050'] : props.theme.palette.white};
    border-style: none;
    border-width: 0;
  }
`;
export const OverlayContainer = styled.div<{ visible?: boolean }>`
  display: ${(props): string => (props.visible ? 'flex' : 'none')};
`;
