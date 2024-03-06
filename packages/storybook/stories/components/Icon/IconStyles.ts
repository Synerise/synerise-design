import styled from 'styled-components';

export const IconWrapper = styled.div<{ noBorder?: boolean }>`
    margin: 10px;
    padding: 10px;
    min-width: 145px;
    text-align: center;
    ${props => props.noBorder ? `` : `border: 1px solid #e0e0e0;`}
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
`;

export const IconsWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;
