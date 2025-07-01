import styled from 'styled-components';

const LEVELS = [
  'yellow',
  'green',
  'cyan',
  'violet',
  'orange',
  'purple',
  'blue',
  'grey',
];

const getColor = (active: boolean, level: number): string => {
  if (level === LEVELS.indexOf('cyan') && active) {
    return '500';
  }
  return active ? '600' : '200';
};

export const Indents = styled.div<{ width: number; withSelection: boolean }>`
  position: absolute;
  top: 0;
  left: ${(props): string => (props.withSelection ? '12px' : '36px')};
  height: 100%;
  width: ${(props): string => `${props.width}px`};
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const Indent = styled.span<{
  width: number;
  active: boolean;
  level: number;
}>`
  width: 42px;
  position: relative;
  height: 100%;
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 2px;
    background-color: ${(props): string =>
      props.level >= 0
        ? props.theme.palette[
            `${LEVELS[props.level % LEVELS.length]}-${getColor(props.active, props.level)}`
          ]
        : props.theme.palette['grey-600']};
  }
`;

export const RowExpander = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  width: 24px;
  margin-right: 24px;
`;

export const TreeTableRow = styled.tr``;

export const TreeTableCell = styled.td`
  &&& {
    font-weight: 500;
    font-size: 13px;
    line-height: 1.38;
  }
`;
