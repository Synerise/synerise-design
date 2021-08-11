import * as React from 'react';
import styled from 'styled-components';
import Popconfirm from 'antd/lib/popconfirm';

export const AntdPopconfirm = styled(({ ...rest }) => <Popconfirm {...rest} />)`
`;

export const PopconfirmContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin: 0px;

  .ant-carousel {
    position: relative;
    width: 100%;
    margin-top: 24px;
    .slick-track {
      width: 100%;
    }
    .slick-dots-bottom {
      position: relative;
      bottom: 0;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      padding: 24px 0 0;
      margin: 0;
      li {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        margin: 0 8px 0 0;
        display: flex;
        align-items: center;
        justify-content: center;
        button {
          box-sizing: content-box;
          background-color: ${(props): string => props.theme.palette['grey-600']};
          border: 2px solid ${(props): string => props.theme.palette.white};
          height: 4px;
          width: 4px;
          border-radius: 50%;
          opacity: 1;
        }
      }
      li.slick-active {
        button {
          border: 2px solid ${(props): string => props.theme.palette['green-600']};
          background-color: ${(props): string => `${props.theme.palette.white}`};
        }
      }
    }
  }
`;

export const PopconfirmTitle = styled.div`
  font-size: 14px;
  line-height: 1.43;
  color: ${(props): string => props.theme.palette['grey-800']};
  font-weight: 500;
  padding-top: 2px;
`;
export const PopconfirmButtonWrapper = styled.div`
  display: flex;
  padding-top: 16px;
  align-items: center;
  justify-content: flex-start;
`;
export const ButtonWrapper = styled.div`
  margin-left: 8px;
`;

export const PopconfirmDescription = styled.div`
  font-size: 13px;
  line-height: 1.38;
  font-weight: 400;
  margin: 6px 0;
  color: ${(props): string => props.theme.palette['grey-800']};
`;

export const PopconfirmIcon = styled.div`
  margin-right: 8px;
  
`;
export const PopconfirmCloseIcon = styled.div`
  margin-left: 8px;
`;
export const PopconfirmWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

export const PopconfirmContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const PopconfirmTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;
export const PopconfirmHeaderWrapper = styled.div<{ titlePadding?: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  padding-top: ${(props): string => (props.titlePadding ? '4px' : 'none')};
`;

export const PopconfirmImage = styled.img`
  display: flex;
  width: 100%;
  height: auto;
  border-radius: 8px;
  & > * {
    max-width: 100%;
  }
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
`;
