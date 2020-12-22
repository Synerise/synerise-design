import styled from 'styled-components';
import Progress from 'antd/lib/progress';
import { ProgressProps } from './ProgressBar.types';

export const Container = styled.div`
  && {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    color: ${(props): string => props.theme.palette['grey-500']};
    .ant-progress {
      margin: 14px 0;
    }
  }
`;

export const MaxValue = styled.strong`
  font-weight: 500;
  color: ${(props): string => props.theme.palette['grey-800']};
`;
export const AntdProgressBar = styled(Progress)<ProgressProps>`
  &.ant-progress-line {
    width: 100%;
    height: ${(props): string => (props.thick ? '3px' : '6px')};
    margin-top: ${(props): string => (props.thick ? '3px' : '0px')};
    margin: 14px 0;
    border-radius: 3px;
    color: ${(props): string => props.theme.palette['grey-200']};
    overflow: hidden;
    box-sizing: content-box;
    .ant-progress-outer {
      display: flex;
    }
    .ant-progress-inner {
      width: 100%;
    }
    .ant-progress-outer,
    .ant-progress-inner {
      background: ${(props): string => props.theme.palette['grey-100']};
    }
    .ant-progress-outer,
    .ant-progress-inner,
    .ant-progress-bg {
      height: 6px !important;
    }
    .ant-progress-bg:first-child {
      border-top-right-radius: 0px;
      border-bottom-right-radius: 0px;
      border-right: 2px solid ${(props): string => props.theme.palette.white};
    }
  }
`;
