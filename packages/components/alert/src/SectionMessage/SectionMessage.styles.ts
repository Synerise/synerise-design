import styled from 'styled-components';

export const AlertContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 12px 0 10px 0;
`;
export const AllContent = styled.div`
  display: flex;
  color: inherit;
`;
export const Text = styled.div`
  display: flex;
`;
export const IconWrapper = styled.div<{ color?: 'blue' | 'grey' | 'red' | 'green' | 'yellow' }>`
  margin: 10px 12px;
  display: flex;
  svg {
    color: ${(props): string =>
      props.color === 'blue' ? props.theme.palette['yellow-600'] : props.theme.palette[`${props.color}-600`]};
    fill: ${(props): string =>
      props.color === 'blue' ? props.theme.palette['yellow-600'] : props.theme.palette[`${props.color}-600`]};
  }
`;
export const ButtonWrapper = styled.div`
  padding: 6px 8px 0 8px;
  display: flex;
`;
export const ButtonsWrapper = styled.div`
  padding: 16px 0 0 0;
  display: flex;
`;
export const Wrapper = styled.div`
  margin-top: 10px;
`;
export const Container = styled.div<{ color?: 'blue' | 'grey' | 'red' | 'green' | 'yellow' }>`
  width: 790px;
  align-items: center;
  justify-content: center;
  background-color: ${(props): string =>
    props.color === 'blue' ? props.theme.palette.white : props.theme.palette[`${props.color}-050`]};
  border: 1px solid
    ${(props): string =>
      props.color === 'blue' ? props.theme.palette['grey-200'] : props.theme.palette[`${props.color}-200`]};
  border-top: 2px solid ${(props): string => props.theme.palette[`${props.color}-600`]};
  border-radius: 4px;
`;
export const WrapperSectionMessage = styled.div`
  display: flex;
  font-size: 13px;
  color: inherit;
  justify-content: space-between;
`;

export const AlertMessage = styled.span`
  display: flex;
  font-size: 16px;
  line-height: 1.25;
  align-items: center;
  justify-content: center;
  letter-spacing: -0.1px;
  font-weight: 500;
  color: ${(props): string => props.theme.palette['grey-700']};
`;

export const AlertDescription = styled.span`
  display: flex;
  font-size: 13px;
  line-height: 1.39;
  font-weight: normal;
  padding-right: 3px;
  margin-top: 2px;
  color: inherit;
`;
export const WithEmphasis = styled.span`
  display: flex;
  font-size: 13px;
  line-height: 1.39;
  font-weight: 500;
  margin-top: 2px;
  color: inherit;
`;
export const WithLink = styled.span`
  display: flex;
  font-size: 13px;
  line-height: 1.5;
  font-weight: 400;
  margin-top: 2px;
  color: inherit;
  text-decoration: underline;
  cursor: pointer;
`;

export const AlertShowMore = styled.span`
  display: flex;
  font-size: 13px;
  font-weight: 500;
  color: inherit;
  text-decoration: underline;
  cursor: pointer;
  margin-top: 6px;
`;
