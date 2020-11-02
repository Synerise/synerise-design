import * as React from 'react';
import styled from 'styled-components';
import Popconfirm from 'antd/lib/popconfirm';
import Button from '@synerise/ds-button';
import { Props as ButtonProps } from '@synerise/ds-button/dist/Button.types';

export const AntdPopconfirm = styled(({ ...rest }) => <Popconfirm {...rest} />)``;

export const PopconfirmChildren = styled.div``;
export const PopconfirmButton = styled(Button)<ButtonProps>`
  && {
    height: 28px;
  }
`;

export const PopconfirmButtonsWrapper = styled.div`
  width: 100%;
  display: flex;
  margin-top: 16px;
  justify-content: flex-end;
  align-items: center;
  ${PopconfirmButton}:not(:first-of-type) {
    margin-left: 8px;
  }
`;

export const PopconfirmContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

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

export const PopconfirmDescription = styled.div`
  font-size: 13px;
  line-height: 1.38;
  font-weight: 400;
  margin-top: 16px;
  color: ${(props): string => props.theme.palette['grey-800']};
`;

export const PopconfirmIcon = styled.div`
  margin-right: 8px;
`;

export const PopconfirmContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const PopconfirmTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
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
