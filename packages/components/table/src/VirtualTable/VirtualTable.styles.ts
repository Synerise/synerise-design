import styled from 'styled-components';

type ColWrapperProps = {
  width?: number | null;
  minWidth?: number | null;
  maxWidth?: number | null;
};
const numberToPixels = (num: number): string => `${num}px`;

const getColumnMaxWidth = (props: ColWrapperProps): React.CSSProperties['maxWidth'] => {
  if (props.maxWidth) {
    return numberToPixels(props.maxWidth);
  }
  return props.width ? numberToPixels(props.width) : 'initial';
};

const getColumnMinWidth = (props: ColWrapperProps): React.CSSProperties['minWidth'] => {
  if (props.minWidth) {
    return numberToPixels(props.minWidth);
  }
  return props.width ? numberToPixels(props.width) : 'initial';
};

export const RowWrapper = styled.div`
  display: inline-table;
`;

export const ColWrapper = styled.div<ColWrapperProps>`
  display: table-cell;
  vertical-align: middle;
  min-width: ${(props): ReturnType<typeof getColumnMinWidth> => getColumnMinWidth(props)};
  max-width: ${(props): ReturnType<typeof getColumnMaxWidth> => getColumnMaxWidth(props)};
  padding: 0 24px;

  &.virtual-table-cell.ant-table-selection-column {
    padding: 0 8px 0 24px;
  }

  &.virtual-table-cell.ds-table-star-column {
    padding: 0 8px 0 24px;

    & > button {
      display: flex;
    }
  }

  &.virtual-table-cell.ant-table-selection-column + .virtual-table-cell.ds-table-star-column {
    padding-left: 0;
  }
`;

export const RelativeContainer = styled.div`
  position: relative;
`;
