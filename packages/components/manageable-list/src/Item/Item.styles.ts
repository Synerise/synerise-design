import styled from 'styled-components';
import { Input } from '@synerise/ds-input';
import Icon from '@synerise/ds-icon';

export const ItemActions = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  span {
    margin: 0 0 0 8px;
  }
`;

export const ItemContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  ${Input} {
    background: transparent;
    outline: 0;
    border: 0;
    border-radius: 0;
  }

  input {
    border: 0;
    display: inline-block;
    padding: 0;
    border: 0;
    outline: 0;
    border-radius: 0;
    box-shadow: none;
    background: transparent;
    background-image: linear-gradient(to right, rgb(148, 158, 166) 20%, rgba(255, 255, 255, 0) 0%);
    background-size: 5px 1px;
    background-position: center bottom;
    background-repeat: repeat-x;
    height: 24px;
    color: #000;
    &:focus {
      border: 0;
      display: inline-block;
      padding: 0;
      border: 0;
      outline: 0;
      border-radius: 0;
      box-shadow: none;
      background: transparent;
      background-image: linear-gradient(to right, rgb(148, 158, 166) 20%, rgba(255, 255, 255, 0) 0%);
      background-size: 5px 1px;
      background-position: center bottom;
      background-repeat: repeat-x;
      height: 24px;
      color: #57616d;
      font-weight: 500;
    }
  }
`;

export const ItemLabel = styled.span`
  height: 24px;
  display: inline-flex;
  align-items: center;
`;
