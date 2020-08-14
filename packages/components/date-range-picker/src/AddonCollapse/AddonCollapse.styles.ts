import styled from 'styled-components';

export const AddonWrapper = styled.div<{ expanded?: boolean }>`
  margin: 16px 24px 0;
  ${(props): string | false => !props.expanded && `margin-bottom: 8px;`}
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
