import styled from 'styled-components';

export const AllocationMarks = styled.div`
  height: 40px;
  position: relative;
  margin-top: -16px;
`;

export const AllocationMark = styled.div<{ $left: number; $width: number }>`
  left: ${(props) => props.$left}%;
  width: ${(props) => props.$width}%;
  position: absolute;
  bottom: 13px;
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  pointer-events: none;
`;

export const MarkValue = styled.div``;

export const MarkLetter = styled.div<{ $color?: string }>`
  border-radius: ${(props) => props.theme.variable('@border-radius-base')};
  width: 25px;
  height: 25px;
  display: inline-block;
  position: relative;
  text-align: center;
  line-height: 25px;
  color: white;

  background-color: ${(props) =>
    props.theme.palette[props.$color || 'grey-400']};
`;

export const MarkTooltipWrapper = styled.div`
  display: block;
  width: 100%;
  justify-content: center;
  text-align: center;
  min-width: 14px;
`;
