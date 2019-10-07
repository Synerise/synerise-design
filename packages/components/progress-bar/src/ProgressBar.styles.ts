import styled from 'styled-components';
import { macro } from '@synerise/ds-typography';

export const ProgressBarContainer = styled.div`
  ${macro.small};
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  color: #949ea6;

  strong {
    font-weight: 500;
    color: #384350;
  }
`;

export const ValueBar = styled.div`
  position: relative;
  height: 100%;
  background: ${(props): string => props.color};
  width: ${(props): string => `${props.percent}%`};
  border-right: 2px solid #fff;
  box-sizing: border-box;
`;

export const ProgressBar = styled.div`
  height: 6px;
  border-radius: 3px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  margin: 14px 0;
  background: #e9edee;
  overflow: hidden;
  ${ValueBar} {
    &:last-of-type {
      border-right-width: ${props => (props.fullFilled ? '0px' : '2px')};
    }
  }
`;
