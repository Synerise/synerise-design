import styled from 'styled-components';

export const AddonWrapper = styled.div<{ expanded?: boolean }>`
  padding: 16px 24px 0;
  ${(props): string | false => !props.expanded && `padding-bottom: 8px;`}
`;
export const Title = styled.h3`
  font-size: 16px;
  line-height: 1.39;
  color: ${(props): string => props.theme.palette['grey-800']};
`;
export const AddonHeader = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: no-wrap;
`;
export const Content = styled.div``;

export const Suffix = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  && {
    font-size: 13px;
    line-height: 22px;
    margin-right: 16px;
    font-weight: normal;
  }
`;
